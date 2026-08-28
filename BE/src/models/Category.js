// Category.js — Danh mục (danh sách phẳng, mỗi danh mục chỉ có tên).

const mongoose = require('mongoose')

const { Schema } = mongoose

const categorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Category', categorySchema)
