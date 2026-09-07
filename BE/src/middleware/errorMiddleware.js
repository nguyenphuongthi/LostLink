// errorMiddleware.js — 404 và bộ xử lý lỗi tập trung, luôn trả JSON thống nhất.

const ApiError = require('../utils/ApiError')

// Route không khớp → 404.
const notFound = (req, res, next) => {
  next(ApiError.notFound(`Không tìm thấy đường dẫn: ${req.method} ${req.originalUrl}`))
}

// eslint-disable-next-line no-unused-vars — Express nhận diện error handler qua 4 tham số.
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Lỗi máy chủ.'
  let details = err.details

  // Trùng khoá unique của Mongo (vd email/username đã tồn tại).
  if (err.code === 11000) {
    statusCode = 409
    const field = Object.keys(err.keyValue || {})[0] || 'trường'
    message = `Giá trị của "${field}" đã tồn tại.`
  }

  // Lỗi validation của Mongoose.
  if (err.name === 'ValidationError') {
    statusCode = 422
    message = 'Dữ liệu không hợp lệ.'
    details = Object.values(err.errors).map((e) => ({ field: e.path, message: e.message }))
  }

  if (statusCode >= 500) console.error('💥', err)

  res.status(statusCode).json({
    success: false,
    message,
    ...(details ? { errors: details } : {}),
  })
}

module.exports = { notFound, errorHandler }
