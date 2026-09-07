// uploadMiddleware.js — Nhận file ảnh dạng multipart/form-data bằng multer.
// Lưu tạm trong RAM (memoryStorage) để đẩy thẳng lên Cloudinary, không ghi đĩa.

const multer = require('multer')
const ApiError = require('../utils/ApiError')

const MAX_FILE_MB = 5
const MAX_FILES = 9 // theo SRS: mỗi bài đăng tối đa 9 ảnh

const storage = multer.memoryStorage()

// Chỉ cho phép ảnh phổ biến.
const fileFilter = (req, file, cb) => {
  if (/^image\/(jpe?g|png|webp|gif|heic|heif)$/i.test(file.mimetype)) {
    cb(null, true)
  } else {
    cb(ApiError.badRequest('Chỉ chấp nhận tệp ảnh (JPG, PNG, WEBP, GIF, HEIC).'), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_MB * 1024 * 1024,
    files: MAX_FILES,
  },
})

module.exports = upload
