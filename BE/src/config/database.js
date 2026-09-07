// database.js — Kết nối MongoDB qua Mongoose.
// Đọc MONGO_URI từ .env; thoát tiến trình nếu không kết nối được.

const mongoose = require('mongoose')
const config = require('./env')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoUri)
    console.log(`✅ MongoDB đã kết nối: ${conn.connection.host}/${conn.connection.name}`)
  } catch (err) {
    console.error('❌ Kết nối MongoDB thất bại:', err.message)
    process.exit(1)
  }
}

module.exports = connectDB
