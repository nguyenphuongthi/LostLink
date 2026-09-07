// index.js — Điểm chạy seed: `npm run seed`. Kết nối DB, chạy các seeder, thoát.

const config = require('../config/env')
const mongoose = require('mongoose')
const { seedUsers } = require('./userSeed')

const run = async () => {
  await mongoose.connect(config.mongoUri)
  console.log('🌱 Bắt đầu seed dữ liệu...')

  await seedUsers()

  console.log('✅ Seed hoàn tất.')
  await mongoose.disconnect()
  process.exit(0)
}

run().catch((err) => {
  console.error('❌ Seed thất bại:', err)
  process.exit(1)
})
