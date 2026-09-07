// asyncHandler.js — Bọc controller async để tự chuyển lỗi sang next() (errorHandler).

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

module.exports = asyncHandler
