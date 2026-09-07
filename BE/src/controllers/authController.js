// authController.js — Nhận request, gọi authService, trả JSON thống nhất.

const asyncHandler = require('../utils/asyncHandler')
const authService = require('../services/authService')
const { verifyRefreshToken, signAccessToken } = require('../utils/token')
const User = require('../models/User')
const ApiError = require('../utils/ApiError')

// POST /api/auth/register — tạo tài khoản chưa xác thực & gửi OTP.
const register = asyncHandler(async (req, res) => {
  const { username, email, password, emailOptIn } = req.body
  const data = await authService.register({ username, email, password, emailOptIn })
  res.status(201).json({
    success: true,
    message: 'Đã gửi mã xác thực tới email của bạn.',
    data,
  })
})

// POST /api/auth/verify-email — xác thực OTP, trả token đăng nhập.
const verifyEmail = asyncHandler(async (req, res) => {
  const { email, code } = req.body
  const data = await authService.verifyEmail({ email, code })
  res.json({ success: true, message: 'Xác thực email thành công.', data })
})

// POST /api/auth/resend-code — gửi lại OTP.
const resendCode = asyncHandler(async (req, res) => {
  const data = await authService.resendCode({ email: req.body.email })
  res.json({ success: true, message: 'Đã gửi lại mã xác thực.', data })
})

// POST /api/auth/login — đăng nhập email/mật khẩu.
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const data = await authService.login({ email, password })
  res.json({ success: true, message: 'Đăng nhập thành công.', data })
})

// POST /api/auth/google — đăng nhập/đăng ký bằng Google ID token.
const google = asyncHandler(async (req, res) => {
  const data = await authService.googleLogin({ idToken: req.body.idToken })
  res.json({ success: true, message: 'Đăng nhập Google thành công.', data })
})

// POST /api/auth/forgot-password — gửi liên kết đặt lại.
const forgotPassword = asyncHandler(async (req, res) => {
  const data = await authService.forgotPassword({ email: req.body.email })
  res.json({ success: true, ...data })
})

// POST /api/auth/reset-password — đặt mật khẩu mới bằng token trong email.
const resetPassword = asyncHandler(async (req, res) => {
  const { email, token, password } = req.body
  const data = await authService.resetPassword({ email, token, password })
  res.json({ success: true, ...data })
})

// GET /api/auth/me — thông tin người dùng hiện tại (yêu cầu đăng nhập).
const me = asyncHandler(async (req, res) => {
  res.json({ success: true, data: { user: authService.publicUser(req.user) } })
})

// POST /api/auth/refresh — cấp access token mới từ refresh token.
const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body
  if (!refreshToken) throw ApiError.badRequest('Thiếu refresh token.')

  let payload
  try {
    payload = verifyRefreshToken(refreshToken)
  } catch {
    throw ApiError.unauthorized('Refresh token không hợp lệ hoặc đã hết hạn.')
  }

  const user = await User.findById(payload.sub)
  if (!user) throw ApiError.unauthorized('Tài khoản không tồn tại.')

  res.json({ success: true, data: { token: signAccessToken(user) } })
})

// POST /api/auth/logout — với JWT không trạng thái, client chỉ cần xoá token.
const logout = asyncHandler(async (req, res) => {
  res.json({ success: true, message: 'Đã đăng xuất.' })
})

module.exports = {
  register,
  verifyEmail,
  resendCode,
  login,
  google,
  forgotPassword,
  resetPassword,
  me,
  refresh,
  logout,
}
