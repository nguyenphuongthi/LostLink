// User.js — Tài khoản người dùng cho mọi role (guest ngầm định / user / moderator / admin).
// Gộp bảng users + user_badges: huy hiệu được nhúng như mảng con tham chiếu Badge.

const mongoose = require('mongoose')

const { Schema } = mongoose

// Huy hiệu người dùng đã đạt (user_badges).
const userBadgeSchema = new Schema(
  {
    badge: { type: Schema.Types.ObjectId, ref: 'Badge', required: true },
    awardedAt: { type: Date, default: Date.now },
  },
  { _id: false }
)

const userSchema = new Schema(
  {
    // Tên đăng nhập kiêm tên hiển thị, duy nhất (vd "hoangnam123").
    // Ràng buộc kiểu Instagram: 3–30 ký tự, chỉ chữ/số/dấu chấm/gạch dưới.
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [3, 'Tên người dùng tối thiểu 3 ký tự.'],
      maxlength: [30, 'Tên người dùng tối đa 30 ký tự.'],
      match: [/^[a-zA-Z0-9._]+$/, 'Tên người dùng chỉ gồm chữ, số, dấu chấm và gạch dưới.'],
    },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    // Bắt buộc với tài khoản email/mật khẩu; bỏ trống nếu đăng nhập bằng Google.
    passwordHash: { type: String, select: false },

    // ID tài khoản Google (đăng nhập OAuth), null nếu không dùng.
    googleId: { type: String, default: null, index: true, sparse: true },

    // guest là trạng thái ngầm định (chưa đăng nhập) nên không lưu trong DB.
    role: {
      type: String,
      enum: ['user', 'moderator', 'admin'],
      default: 'user',
      index: true,
    },

    // Điểm uy tín cộng dồn từ giao dịch trao trả & đánh giá.
    reputationScore: { type: Number, default: 0 },

    // Đồng ý nhận email (điều kiện cho nhắc 12h / STALE).
    emailOptIn: { type: Boolean, default: true },

    // Trạng thái tài khoản (Moderator có thể khóa tạm).
    status: {
      type: String,
      enum: ['active', 'restricted', 'locked'],
      default: 'active',
      index: true,
    },

    // null nếu chưa xác thực email — hạn chế đăng tin khi chưa xác thực.
    emailVerifiedAt: { type: Date, default: null },

    badges: [userBadgeSchema],
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
