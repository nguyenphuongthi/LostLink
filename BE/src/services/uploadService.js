// uploadService.js — Tải ảnh lên Cloudinary và xoá ảnh theo publicId.
// Nhận file từ multer (bộ nhớ), chuyển buffer thành data URI rồi upload.

const cloudinary = require('../config/cloudinary')

const DEFAULT_FOLDER = 'lostlink'

// Buffer (multer memoryStorage) → data URI để đưa thẳng vào Cloudinary.
const bufferToDataUri = (file) => `data:${file.mimetype};base64,${file.buffer.toString('base64')}`

// Chỉ giữ lại các trường thường dùng từ phản hồi Cloudinary.
const pick = (res) => ({
  url: res.secure_url,
  publicId: res.public_id,
  width: res.width,
  height: res.height,
  format: res.format,
  bytes: res.bytes,
})

// Upload một ảnh; trả về { url, publicId, ... }.
const uploadImage = async (file, { folder = DEFAULT_FOLDER } = {}) => {
  const res = await cloudinary.uploader.upload(bufferToDataUri(file), {
    folder,
    resource_type: 'image',
  })
  return pick(res)
}

// Upload nhiều ảnh song song.
const uploadImages = (files, opts) => Promise.all(files.map((file) => uploadImage(file, opts)))

// Xoá ảnh theo publicId (dùng khi gỡ ảnh khỏi bài đăng sau này).
const deleteImage = (publicId) => cloudinary.uploader.destroy(publicId)

module.exports = { uploadImage, uploadImages, deleteImage }
