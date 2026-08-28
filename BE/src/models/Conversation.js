// Conversation.js — Kênh chat mở sau xác minh.
// Tin nhắn tách sang collection Message để tránh document phình to.

const mongoose = require('mongoose')

const { Schema } = mongoose

const conversationSchema = new Schema(
  {
    match: { type: Schema.Types.ObjectId, ref: 'MatchSuggestion', required: true, index: true },

    meetingPoint: { type: String, default: '' }, // điểm giao nhận đã chọn

    // Hai cờ "Đã trao trả" — cần cả hai để đóng bài.
    confirmedLost: { type: Boolean, default: false },
    confirmedFound: { type: Boolean, default: false },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Conversation', conversationSchema)
