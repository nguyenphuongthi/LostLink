// Report.js — Báo cáo vi phạm.
// Đếm theo số người report khác nhau, trọng số theo uy tín người report.

const mongoose = require('mongoose')

const { Schema } = mongoose

const reportSchema = new Schema(
  {
    reporter: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },

    targetType: { type: String, enum: ['post', 'user'], required: true },
    targetId: { type: Schema.Types.ObjectId, required: true, index: true },

    reason: {
      type: String,
      enum: ['spam', 'lua_dao', 'voi_tien', 'noi_dung_sai'], // spam / lừa đảo / vòi tiền / nội dung sai
      required: true,
    },
    description: { type: String, default: '' },

    status: {
      type: String,
      enum: ['pending', 'reviewing', 'resolved', 'dismissed'],
      default: 'pending',
      index: true,
    },
  },
  { timestamps: true }
)

// Một người chỉ report một đối tượng một lần (đếm theo người report khác nhau).
reportSchema.index({ reporter: 1, targetType: 1, targetId: 1 }, { unique: true })

module.exports = mongoose.model('Report', reportSchema)
