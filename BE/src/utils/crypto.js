// crypto.js — Sinh mã OTP 6 số, token reset, và hash chúng trước khi lưu DB.
// Không bao giờ lưu mã/token dạng thô: chỉ lưu SHA-256 để chống lộ khi rò rỉ DB.

const crypto = require('crypto')

// Mã xác thực email: 6 chữ số (000000–999999).
const generateOtp = () => crypto.randomInt(0, 1_000_000).toString().padStart(6, '0')

// Token đặt lại mật khẩu: chuỗi hex ngẫu nhiên dùng trong link email.
const generateResetToken = () => crypto.randomBytes(32).toString('hex')

// Hash 1 chiều để so khớp (SHA-256, đủ cho giá trị ngẫu nhiên entropy cao).
const hashToken = (value) => crypto.createHash('sha256').update(value).digest('hex')

module.exports = { generateOtp, generateResetToken, hashToken }
