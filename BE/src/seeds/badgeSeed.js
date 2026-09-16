// Idempotent: chạy lại nhiều lần chỉ cập nhật, không tạo trùng (khớp theo name).
// Danh mục huy hiệu, khớp với các nhãn hiển thị trong giao diện
// (FE/src/data/people.js — profile.badges).

const Badge = require('../models/Badge')

const SEED_BADGES = [
  { name: 'Người tốt bụng', tone: 'good', description: 'Chủ động trao trả đồ nhặt được cho người mất.' },
  { name: 'Được yêu thích', tone: 'love', description: 'Nhận nhiều lượt thích và lời cảm ơn từ cộng đồng.' },
  { name: 'Trả 20+ món', tone: 'good', description: 'Đã hoàn tất trao trả từ 20 món đồ trở lên.' },
  { name: 'Phản hồi nhanh', tone: 'good', description: 'Thường phản hồi tin nhắn và yêu cầu trong thời gian ngắn.' },
  { name: 'Đã xác thực email', tone: 'good', description: 'Đã xác thực địa chỉ email của tài khoản.' },
  { name: 'Lừa đảo', tone: 'bad', description: 'Bị cộng đồng báo cáo có hành vi gian dối, cần thận trọng.' },
]

const seedBadges = async () => {
  for (const b of SEED_BADGES) {
    await Badge.findOneAndUpdate(
      { name: b.name },
      { $set: { description: b.description, tone: b.tone } },
      { upsert: true, setDefaultsOnInsert: true }
    )
    console.log(`  ✓ ${b.name}`)
  }
}

module.exports = { seedBadges, SEED_BADGES }
