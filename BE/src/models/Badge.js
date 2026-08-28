// Badge.js — Danh mục huy hiệu.
// Liên kết người dùng ↔ huy hiệu được nhúng trong User.badges.

const mongoose = require('mongoose')

const { Schema } = mongoose

const badgeSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true }, // vd "Người tốt bụng"
    description: { type: String, default: '' },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Badge', badgeSchema)
