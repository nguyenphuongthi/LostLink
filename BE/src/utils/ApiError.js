// ApiError.js — Lỗi có mã HTTP để controller/service ném ra và errorHandler bắt.

class ApiError extends Error {
  constructor(statusCode, message, details = undefined) {
    super(message)
    this.statusCode = statusCode
    this.details = details
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }

  static badRequest(msg, details) {
    return new ApiError(400, msg, details)
  }
  static unauthorized(msg = 'Chưa xác thực.') {
    return new ApiError(401, msg)
  }
  static forbidden(msg = 'Không có quyền truy cập.') {
    return new ApiError(403, msg)
  }
  static notFound(msg = 'Không tìm thấy tài nguyên.') {
    return new ApiError(404, msg)
  }
  static conflict(msg) {
    return new ApiError(409, msg)
  }
}

module.exports = ApiError
