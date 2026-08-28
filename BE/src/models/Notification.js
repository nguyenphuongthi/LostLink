// Notification.js — Thông báo trong app (và trigger email).

const mongoose = require('mongoose')

const { Schema } = mongoose

const notificationSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },

    type: {
      type: String,
      enum: ['match', 'tip', 'contact_12h', 'stale', 'report_result', 'badge'],
      required: true,
    },

    // Đối tượng liên quan (post / match / report...).
    refType: { type: String, default: null },
    refId: { type: Schema.Types.ObjectId, default: null },

    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
)

notificationSchema.index({ user: 1, isRead: 1, createdAt: -1 })

module.exports = mongoose.model('Notification', notificationSchema)
