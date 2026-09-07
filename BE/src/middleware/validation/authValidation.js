// authValidation.js — Quy tắc kiểm tra dữ liệu đầu vào cho các route auth.

const { body } = require('express-validator')

const email = () =>
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Vui lòng nhập email.')
    .isEmail()
    .withMessage('Email không hợp lệ.')
    .normalizeEmail()

const password = (field = 'password') =>
  body(field)
    .isString()
    .withMessage('Mật khẩu không hợp lệ.')
    .isLength({ min: 8 })
    .withMessage('Mật khẩu tối thiểu 8 ký tự.')

const username = () =>
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Vui lòng nhập tên người dùng.')
    .isLength({ min: 3, max: 30 })
    .withMessage('Tên người dùng từ 3–30 ký tự.')
    .matches(/^[a-zA-Z0-9._]+$/)
    .withMessage('Tên người dùng chỉ gồm chữ, số, dấu chấm và gạch dưới.')

const registerRules = [
  username(),
  email(),
  password(),
  body('emailOptIn').optional().isBoolean().withMessage('emailOptIn phải là true/false.'),
]

const verifyRules = [
  email(),
  body('code')
    .trim()
    .matches(/^\d{6}$/)
    .withMessage('Mã xác thực gồm 6 chữ số.'),
]

const resendRules = [email()]

const loginRules = [email(), body('password').notEmpty().withMessage('Vui lòng nhập mật khẩu.')]

const googleRules = [body('idToken').trim().notEmpty().withMessage('Thiếu Google ID token.')]

const forgotRules = [email()]

const resetRules = [
  email(),
  body('token').trim().notEmpty().withMessage('Thiếu token đặt lại mật khẩu.'),
  password(),
]

module.exports = {
  registerRules,
  verifyRules,
  resendRules,
  loginRules,
  googleRules,
  forgotRules,
  resetRules,
}
