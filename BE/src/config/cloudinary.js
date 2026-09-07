// cloudinary.js — Cấu hình Cloudinary SDK từ config env, export instance dùng chung.

const { v2: cloudinary } = require('cloudinary')
const { cloudinary: cfg } = require('./env')

if (!cfg.cloudName || !cfg.apiKey || !cfg.apiSecret) {
  console.warn('⚠️  Chưa cấu hình Cloudinary — chức năng upload ảnh sẽ không hoạt động.')
}

cloudinary.config({
  cloud_name: cfg.cloudName,
  api_key: cfg.apiKey,
  api_secret: cfg.apiSecret,
  secure: true, // luôn trả URL https
})

module.exports = cloudinary
