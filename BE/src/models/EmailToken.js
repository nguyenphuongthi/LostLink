// EmailToken.js — Mã dùng một lần gửi qua email: OTP xác thực đăng ký và
// token đặt lại mật khẩu. Chỉ lưu HASH của mã (không lưu mã thô).
// Bản ghi tự xoá khi hết hạn nhờ TTL index trên expiresAt.

const mongoose = require('mongoose')

const { Schema } = mongoose

const emailTokenSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },

    // 'verify' = OTP kích hoạt tài khoản; 'reset' = đặt lại mật khẩu.
    purpose: { type: String, enum: ['verify', 'reset'], required: true },

    // SHA-256 của OTP/token — so khớp khi người dùng nhập lại.
    codeHash: { type: String, required: true },

    // Số lần nhập sai, để khoá sau quá nhiều lần thử.
    attempts: { type: Number, default: 0 },

    // Thời điểm hết hạn — TTL index xoá tự động khi tới hạn.
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
)

// TTL: MongoDB xoá bản ghi khi vượt expiresAt.
emailTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

module.exports = mongoose.model('EmailToken', emailTokenSchema)
