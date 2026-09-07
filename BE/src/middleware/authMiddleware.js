// authMiddleware.js — Bảo vệ route: xác minh JWT và nạp user vào req.user.

const User = require('../models/User')
const ApiError = require('../utils/ApiError')
const { verifyAccessToken } = require('../utils/token')
const asyncHandler = require('../utils/asyncHandler')

// Lấy token từ header "Authorization: Bearer <token>".
const extractToken = (req) => {
  const header = req.headers.authorization || ''
  return header.startsWith('Bearer ') ? header.slice(7).trim() : null
}

// Bắt buộc đăng nhập.
const protect = asyncHandler(async (req, res, next) => {
  const token = extractToken(req)
  if (!token) throw ApiError.unauthorized('Vui lòng đăng nhập.')

  let payload
  try {
    payload = verifyAccessToken(token)
  } catch {
    throw ApiError.unauthorized('Phiên đăng nhập không hợp lệ hoặc đã hết hạn.')
  }

  const user = await User.findById(payload.sub)
  if (!user) throw ApiError.unauthorized('Tài khoản không tồn tại.')
  if (user.status === 'locked') throw ApiError.forbidden('Tài khoản đã bị khoá.')

  req.user = user
  next()
})

// Giới hạn theo role, dùng sau protect: authorize('admin', 'moderator').
const authorize =
  (...roles) =>
  (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(ApiError.forbidden('Bạn không có quyền thực hiện thao tác này.'))
    }
    next()
  }

module.exports = { protect, authorize }
