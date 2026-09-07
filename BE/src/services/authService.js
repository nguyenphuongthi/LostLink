// authService.js — Nghiệp vụ xác thực: đăng ký, OTP, đăng nhập, quên/đặt lại
// mật khẩu, đăng nhập Google.

const bcrypt = require('bcryptjs')

const User = require('../models/User')
const EmailToken = require('../models/EmailToken')
const ApiError = require('../utils/ApiError')
const { issueTokens } = require('../utils/token')
const { generateOtp, generateResetToken, hashToken } = require('../utils/crypto')
const { verifyGoogleIdToken } = require('./googleService')
const emailService = require('./emailService')
const config = require('../config/env')

const OTP_TTL_MIN = 10
const RESET_TTL_MIN = 30
const MAX_ATTEMPTS = 5
const BCRYPT_ROUNDS = 10

const minutesFromNow = (m) => new Date(Date.now() + m * 60 * 1000)

// Dữ liệu user an toàn trả về client (không lộ hash mật khẩu).
const publicUser = (user) => ({
  id: user._id,
  username: user.username,
  email: user.email,
  role: user.role,
  reputationScore: user.reputationScore,
  emailOptIn: user.emailOptIn,
  emailVerified: Boolean(user.emailVerifiedAt),
  status: user.status,
  createdAt: user.createdAt,
})

// Tạo & gửi OTP xác thực, xoá mã verify cũ trước khi tạo mã mới.
const issueVerificationOtp = async (user) => {
  await EmailToken.deleteMany({ user: user._id, purpose: 'verify' })
  const code = generateOtp()
  await EmailToken.create({
    user: user._id,
    purpose: 'verify',
    codeHash: hashToken(code),
    expiresAt: minutesFromNow(OTP_TTL_MIN),
  })
  // Gửi email nền — không chặn phản hồi API (tránh chờ SMTP 1–3s).
  emailService
    .sendVerificationCode({ to: user.email, code, minutes: OTP_TTL_MIN })
    .catch((e) => console.error('Gửi email xác thực lỗi:', e.message))
}

const register = async ({ username, email, password, emailOptIn = true }) => {
  if (await User.exists({ username })) throw ApiError.conflict('Tên người dùng đã được sử dụng.')

  const existing = await User.findOne({ email })
  if (existing && existing.emailVerifiedAt) throw ApiError.conflict('Email này đã được đăng ký.')

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS)

  let user
  if (existing) {
    existing.username = username
    existing.passwordHash = passwordHash
    existing.emailOptIn = emailOptIn
    user = await existing.save()
  } else {
    user = await User.create({ username, email, passwordHash, emailOptIn })
  }

  await issueVerificationOtp(user)
  return { email: user.email }
}

const verifyEmail = async ({ email, code }) => {
  const user = await User.findOne({ email })
  if (!user) throw ApiError.badRequest('Email không tồn tại.')
  if (user.emailVerifiedAt) return { user: publicUser(user), ...issueTokens(user) }

  const record = await EmailToken.findOne({ user: user._id, purpose: 'verify' })
  if (!record) throw ApiError.badRequest('Mã đã hết hạn, vui lòng yêu cầu gửi lại.')

  if (record.attempts >= MAX_ATTEMPTS) {
    await record.deleteOne()
    throw ApiError.badRequest('Nhập sai quá nhiều lần, vui lòng yêu cầu mã mới.')
  }

  if (record.codeHash !== hashToken(String(code))) {
    record.attempts += 1
    await record.save()
    throw ApiError.badRequest('Mã xác thực không đúng.')
  }

  user.emailVerifiedAt = new Date()
  await user.save()
  await EmailToken.deleteMany({ user: user._id, purpose: 'verify' })

  return { user: publicUser(user), ...issueTokens(user) }
}

const resendCode = async ({ email }) => {
  const user = await User.findOne({ email })
  if (!user) throw ApiError.badRequest('Email không tồn tại.')
  if (user.emailVerifiedAt) throw ApiError.badRequest('Tài khoản đã được xác thực.')
  await issueVerificationOtp(user)
  return { email: user.email }
}

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+passwordHash')
  if (!user || !user.passwordHash) throw ApiError.unauthorized('Email hoặc mật khẩu không đúng.')

  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) throw ApiError.unauthorized('Email hoặc mật khẩu không đúng.')

  if (!user.emailVerifiedAt) {
    await issueVerificationOtp(user)
    throw new ApiError(403, 'Tài khoản chưa xác thực email. Mã mới đã được gửi.', {
      code: 'EMAIL_NOT_VERIFIED',
      email: user.email,
    })
  }

  if (user.status === 'locked') throw ApiError.forbidden('Tài khoản đã bị khoá.')

  return { user: publicUser(user), ...issueTokens(user) }
}

// Đăng nhập/đăng ký bằng Google.
const googleLogin = async ({ idToken }) => {
  const profile = await verifyGoogleIdToken(idToken)

  // 1) Đã liên kết Google trước đó → đăng nhập luôn.
  let user = await User.findOne({ googleId: profile.googleId })

  // 2) Chưa liên kết nhưng email đã tồn tại (tài khoản mật khẩu) → auto-link,
  //    nhưng chỉ khi Google xác nhận email đã được xác minh (cách A).
  if (!user) {
    const byEmail = await User.findOne({ email: profile.email })
    if (byEmail) {
      if (!profile.emailVerified) {
        throw ApiError.badRequest('Email này đã được đăng ký. Vui lòng đăng nhập bằng mật khẩu.')
      }
      byEmail.googleId = profile.googleId
      if (!byEmail.emailVerifiedAt) byEmail.emailVerifiedAt = new Date()
      user = await byEmail.save()
    }
  }

  // 3) Chưa có tài khoản nào → tạo mới từ hồ sơ Google.
  if (!user) {
    const username = await deriveUsernameFromEmail(profile.email)
    user = await User.create({
      username,
      email: profile.email,
      googleId: profile.googleId,
      emailVerifiedAt: new Date(),
    })
  }

  if (user.status === 'locked') throw ApiError.forbidden('Tài khoản đã bị khoá.')
  return { user: publicUser(user), ...issueTokens(user) }
}

// Sinh username hợp lệ từ email khi tạo tài khoản Google (thêm hậu tố nếu trùng).
const deriveUsernameFromEmail = async (email) => {
  const base =
    email
      .split('@')[0]
      .replace(/[^a-zA-Z0-9._]/g, '')
      .slice(0, 24) || 'user'
  let candidate = base.length >= 3 ? base : `${base}user`
  let n = 0
  while (await User.exists({ username: candidate })) {
    n += 1
    candidate = `${base}${n}`
  }
  return candidate
}

const forgotPassword = async ({ email }) => {
  const user = await User.findOne({ email }).select('+passwordHash')
  if (user && user.passwordHash) {
    await EmailToken.deleteMany({ user: user._id, purpose: 'reset' })
    const token = generateResetToken()
    await EmailToken.create({
      user: user._id,
      purpose: 'reset',
      codeHash: hashToken(token),
      expiresAt: minutesFromNow(RESET_TTL_MIN),
    })
    const resetUrl = `${config.clientUrl}/auth?screen=reset&token=${token}&email=${encodeURIComponent(user.email)}`
    emailService
      .sendResetLink({ to: user.email, resetUrl, minutes: RESET_TTL_MIN })
      .catch((e) => console.error('Gửi email đặt lại mật khẩu lỗi:', e.message))
  }
  return { message: 'Nếu email tồn tại, hướng dẫn đặt lại đã được gửi.' }
}

const resetPassword = async ({ email, token, password }) => {
  const user = await User.findOne({ email })
  if (!user) throw ApiError.badRequest('Liên kết không hợp lệ hoặc đã hết hạn.')

  const record = await EmailToken.findOne({ user: user._id, purpose: 'reset' })
  if (!record || record.codeHash !== hashToken(String(token))) {
    throw ApiError.badRequest('Liên kết không hợp lệ hoặc đã hết hạn.')
  }

  user.passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS)
  if (!user.emailVerifiedAt) user.emailVerifiedAt = new Date()
  await user.save()
  await EmailToken.deleteMany({ user: user._id, purpose: 'reset' })

  return { message: 'Đặt lại mật khẩu thành công.' }
}

module.exports = {
  publicUser,
  register,
  verifyEmail,
  resendCode,
  login,
  googleLogin,
  forgotPassword,
  resetPassword,
}
