// index.js — Điểm chạy seed: `npm run seed`. Kết nối DB, chạy các seeder, thoát.
// Thứ tự chạy theo phụ thuộc: huy hiệu & danh mục trước, rồi người dùng
// (tham chiếu huy hiệu), rồi bài đăng (tham chiếu người dùng + danh mục),
// cuối cùng là bình luận (tham chiếu bài đăng + người dùng).

const config = require('../config/env')
const mongoose = require('mongoose')
const { seedBadges } = require('./badgeSeed')
const { seedCategories } = require('./categorySeed')
const { seedUsers } = require('./userSeed')
const { seedPosts } = require('./postSeed')
const { seedComments } = require('./commentSeed')

const run = async () => {
  await mongoose.connect(config.mongoUri)
  console.log('🌱 Bắt đầu seed dữ liệu...')

  console.log('• Huy hiệu')
  await seedBadges()
  console.log('• Danh mục')
  await seedCategories()
  console.log('• Người dùng')
  await seedUsers()
  console.log('• Bài đăng')
  await seedPosts()
  console.log('• Bình luận')
  await seedComments()

  console.log('✅ Seed hoàn tất.')
  await mongoose.disconnect()
  process.exit(0)
}

run().catch((err) => {
  console.error('❌ Seed thất bại:', err)
  process.exit(1)
})
