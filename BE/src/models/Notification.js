// Notification.js — Thông báo trong app (và trigger email).

const mongoose = require('mongoose')

const { Schema } = mongoose

const notificationSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },

    type: {
      type: String,
      enum: [
        'match', // gợi ý ghép cặp
        'like', // có người thích bài / bình luận
        'comment', // có người bình luận bài viết
        'post_approved', // bài đăng được kiểm duyệt viên duyệt
        'tip',
        'contact_12h',
        'stale',
        'report_result',
        'badge',
      ],
      required: true,
    },

    // Người tạo ra thông báo (ai thích / ai bình luận). null = hệ thống.
    actor: { type: Schema.Types.ObjectId, ref: 'User', default: null },

    // Đối tượng liên quan (post / match / report / comment...).
    refType: { type: String, default: null },
    refId: { type: Schema.Types.ObjectId, default: null },

    // Đoạn nội dung tóm tắt hiển thị nhanh (trích bình luận, lý do khớp...).
    preview: { type: String, default: '' },

    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
)

notificationSchema.index({ user: 1, isRead: 1, createdAt: -1 })

module.exports = mongoose.model('Notification', notificationSchema)
