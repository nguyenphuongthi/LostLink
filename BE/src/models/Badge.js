// Badge.js — Danh mục huy hiệu.
// Liên kết người dùng ↔ huy hiệu được nhúng trong User.badges.

const mongoose = require('mongoose')

const { Schema } = mongoose

const badgeSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true }, // vd "Người tốt bụng"
    description: { type: String, default: '' },

    // Sắc thái huy hiệu — quyết định màu hiển thị dưới tên user (FE: .ubadge-*).
    //   good → tích cực (người tốt bụng, trả nhiều món…)
    //   love → được cộng đồng yêu thích
    //   bad  → cảnh báo (bị báo cáo lừa đảo)
    tone: {
      type: String,
      enum: ['good', 'love', 'bad', 'neutral'],
      default: 'good',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Badge', badgeSchema)
