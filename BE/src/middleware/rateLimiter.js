// rateLimiter.js — Giới hạn tần suất request theo IP, chống brute-force & spam.

const rateLimit = require('express-rate-limit')

const makeLimiter = ({ windowMs, max, message }) =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => res.status(429).json({ success: false, message }),
  })

// Chặt cho các thao tác nhạy cảm: login, register, quên/đặt lại mật khẩu, OTP.
const authLimiter = makeLimiter({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 20,
  message: 'Bạn thao tác quá nhiều lần. Vui lòng thử lại sau ít phút.',
})

// Rộng hơn cho toàn bộ API để chống lạm dụng chung.
const apiLimiter = makeLimiter({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: 'Quá nhiều yêu cầu. Vui lòng thử lại sau.',
})

module.exports = { authLimiter, apiLimiter }
