// SystemConfig.js — Tham số cấu hình Admin chỉnh không cần sửa code.
// vd stale_days, radius_m, w_location, report_threshold, top_n...

const mongoose = require('mongoose')

const { Schema } = mongoose

const systemConfigSchema = new Schema(
  {
    key: { type: String, required: true, unique: true }, // PK
    value: { type: String, required: true }, // VARCHAR — parse theo key khi dùng
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: { createdAt: false, updatedAt: true } }
)

module.exports = mongoose.model('SystemConfig', systemConfigSchema)
