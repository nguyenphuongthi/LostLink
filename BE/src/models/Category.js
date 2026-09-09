// Category.js — Danh mục (danh sách phẳng, mỗi danh mục có tên + ảnh đại diện).

const mongoose = require('mongoose')

const { Schema } = mongoose

const categorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    // Hình ảnh đại diện: markup SVG line-icon, đồng bộ với FE (CategoryIcon.jsx).
    // Dùng currentColor nên tự ăn theo màu chữ nơi hiển thị.
    icon: { type: String, trim: true, default: '' },
    // Thứ tự hiển thị trên giao diện (nhỏ hơn hiện trước).
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Category', categorySchema)
