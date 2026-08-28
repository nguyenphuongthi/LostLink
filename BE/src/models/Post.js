// Post.js — Bài đăng LOST/FOUND.
// Gộp các bảng con thuộc sở hữu của bài: post_contents, post_images,
// post_tags, status_history được nhúng như mảng subdocument.
// Vị trí lưu dạng GeoJSON Point để dùng index địa lý 2dsphere (geo-index).

const mongoose = require('mongoose')

const { Schema } = mongoose

// Điểm GeoJSON: [kinh độ, vĩ độ].
const pointSchema = new Schema(
  {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }, // [lng, lat]
  },
  { _id: false }
)

// Checklist "bên trong có" cho bài vật-chứa, đa nhãn (post_contents).
const postContentSchema = new Schema(
  {
    label: { type: String, required: true }, // vd ví, giấy tờ, tiền, chìa khóa
  },
  { _id: false }
)

// Ảnh (≤ 9, không phân biệt ảnh bìa) — post_images.
const postImageSchema = new Schema(
  {
    url: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { _id: false }
)

// Mốc trạng thái để dựng timeline (status_history).
const statusHistorySchema = new Schema(
  {
    status: {
      type: String,
      enum: ['pending', 'searching', 'contacted', 'returned'],
      required: true,
    },
    changedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null }, // null = hệ thống
    note: { type: String, default: '' },
    changedAt: { type: Date, default: Date.now },
  },
  { _id: false }
)

const postSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },

    type: { type: String, enum: ['lost', 'found'], required: true, index: true },

    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true, index: true },

    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },

    // Mốc hoặc khoảng thời gian mất/nhặt.
    timeFrom: { type: Date, required: true },
    timeTo: { type: Date, default: null },

    // Tọa độ thật (nội bộ) — chỉ lộ sau khi hai bên xác nhận trò chuyện.
    locExact: { type: pointSchema, required: true, select: false },

    // Vùng mờ hiển thị công khai (tâm + bán kính ~200–500m).
    locPublic: { type: pointSchema, required: true },
    locPublicRadius: { type: Number, default: 300 }, // mét

    locType: { type: String, enum: ['point', 'road_segment'], default: 'point' },

    status: {
      type: String,
      enum: [
        'pending', // chờ xét duyệt
        'searching', // đang tìm (active, tham gia matching)
        'contacted', // đã liên hệ (hai bên vượt xác minh, chat mở)
        'returned', // đã trao trả (cả hai/hệ thống xác nhận → khóa bài, cộng uy tín)
      ],
      default: 'pending',
      index: true,
    },

    contents: [postContentSchema],
    images: [postImageSchema],
    tags: [{ type: String, trim: true }],
    statusHistory: [statusHistorySchema],
  },
  { timestamps: true }
)

// Index địa lý cho cửa chặn cứng theo bán kính.
postSchema.index({ locPublic: '2dsphere' })
// Hỗ trợ lọc feed & matching hai chiều.
postSchema.index({ type: 1, status: 1, createdAt: -1 })
// Tìm kiếm toàn văn tiêu đề + mô tả.
postSchema.index({ title: 'text', description: 'text' })

module.exports = mongoose.model('Post', postSchema)
