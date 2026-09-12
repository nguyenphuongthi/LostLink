// Idempotent: chạy lại nhiều lần chỉ cập nhật, không tạo trùng (khớp theo name).
// Danh mục huy hiệu, khớp với các nhãn hiển thị trong giao diện
// (FE/src/data/people.js — profile.badges).

const Badge = require('../models/Badge')

const SEED_BADGES = [
  { name: 'Người tốt bụng', description: 'Chủ động trao trả đồ nhặt được cho người mất.' },
  { name: 'Trả 20+ món', description: 'Đã hoàn tất trao trả từ 20 món đồ trở lên.' },
  { name: 'Phản hồi nhanh', description: 'Thường phản hồi tin nhắn và yêu cầu trong thời gian ngắn.' },
  { name: 'Đã xác thực email', description: 'Đã xác thực địa chỉ email của tài khoản.' },
]

const seedBadges = async () => {
  for (const b of SEED_BADGES) {
    await Badge.findOneAndUpdate(
      { name: b.name },
      { $set: { description: b.description } },
      { upsert: true, setDefaultsOnInsert: true }
    )
    console.log(`  ✓ ${b.name}`)
  }
}

module.exports = { seedBadges, SEED_BADGES }
