// viewEngine.js — Cấu hình phục vụ tài nguyên tĩnh cho Express.
// LostLink là API JSON nên không cần template engine; ở đây chỉ mở thư mục
// public/ để phục vụ ảnh, file tải lên tạm... nếu có.

const path = require('path')
const express = require('express')

const configViewEngine = (app) => {
  app.use('/public', express.static(path.join(__dirname, '..', '..', 'public')))
}

module.exports = configViewEngine
