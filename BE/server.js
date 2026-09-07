// server.js — Điểm khởi động: nạp config, kết nối DB rồi mở cổng lắng nghe.

const config = require('./src/config/env')
const connectDB = require('./src/config/database')
const app = require('./src/app')

connectDB().then(() => {
  app.listen(config.port, () => console.log(`🚀 Server chạy tại http://localhost:${config.port}`))
})
