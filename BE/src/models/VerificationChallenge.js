// VerificationChallenge.js — Câu hỏi xác minh quyền sở hữu, dạng trắc nghiệm.
// Nhúng challenge_options; correctOptionHash lưu hash ID đáp án đúng (không lưu đáp án thô).

const mongoose = require('mongoose')

const { Schema } = mongoose

// Phương án trắc nghiệm (challenge_options).
const challengeOptionSchema = new Schema(
  {
    text: { type: String, required: true }, // vd "Màu đen", "Màu vàng"
  },
  { _id: true } // giữ _id để tham chiếu đáp án đúng qua hash
)

const verificationChallengeSchema = new Schema(
  {
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true, index: true },

    question: { type: String, required: true },

    options: [challengeOptionSchema],

    // Hash ID của phương án đúng để so khớp, không lộ đáp án.
    correctOptionHash: { type: String, required: true },

    maxAttempts: { type: Number, default: 3 },
  },
  { timestamps: true }
)

module.exports = mongoose.model('VerificationChallenge', verificationChallengeSchema)
