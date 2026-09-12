// Idempotent: chạy lại nhiều lần chỉ cập nhật, không tạo trùng (khớp theo email).
// Gồm 3 tài khoản theo vai trò để đăng nhập test, và 6 thành viên cộng đồng
// lấy từ dữ liệu mẫu của FE (handle trong bài đăng, bảng vinh danh, hồ sơ).
// Điểm uy tín khớp bảng vinh danh (FE/src/data/catalog.js — leaders).
// Huy hiệu khớp hồ sơ mẫu (FE/src/data/people.js — profile.badges).

const bcrypt = require('bcryptjs')
const User = require('../models/User')
const Badge = require('../models/Badge')

// 3 tài khoản chuẩn để đăng nhập thử theo từng vai trò.
const SEED_USERS = [
  { username: 'admin', email: 'admin@lostlink.vn', password: 'Admin@123', role: 'admin' },
  { username: 'moderator', email: 'mod@lostlink.vn', password: 'Mod@1234', role: 'moderator' },
  { username: 'user01', email: 'user@lostlink.vn', password: 'User@1234', role: 'user' },
]

// Thành viên cộng đồng — chính là các handle xuất hiện trong giao diện mẫu.
// Tất cả dùng chung mật khẩu 'User@1234' cho tiện đăng nhập thử.
// badges: danh sách tên huy hiệu (khớp badgeSeed.js).
const SEED_MEMBERS = [
  {
    username: 'hoangnam.q1',
    email: 'hoangnam.q1@lostlink.vn',
    reputationScore: 248,
    badges: ['Người tốt bụng', 'Trả 20+ món', 'Phản hồi nhanh', 'Đã xác thực email'],
  },
  {
    username: 'minhkhoi.td',
    email: 'minhkhoi.td@lostlink.vn',
    reputationScore: 312,
    badges: ['Người tốt bụng', 'Trả 20+ món', 'Đã xác thực email'],
  },
  {
    username: 'baotran.sg',
    email: 'baotran.sg@lostlink.vn',
    reputationScore: 174,
    badges: ['Người tốt bụng', 'Đã xác thực email'],
  },
  {
    username: 'ngockhanh.dn',
    email: 'ngockhanh.dn@lostlink.vn',
    reputationScore: 141,
    badges: ['Phản hồi nhanh', 'Đã xác thực email'],
  },
  {
    username: 'thuylinh.hn',
    email: 'thuylinh.hn@lostlink.vn',
    reputationScore: 96,
    badges: ['Đã xác thực email'],
  },
  {
    username: 'ducanh.bk',
    email: 'ducanh.bk@lostlink.vn',
    reputationScore: 60,
    badges: ['Đã xác thực email'],
  },
]

const MEMBER_PASSWORD = 'User@1234'

const seedUsers = async () => {
  // Tra cứu id huy hiệu theo tên để nhúng vào User.badges.
  const badges = await Badge.find({}, { name: 1 }).lean()
  const badgeIdByName = Object.fromEntries(badges.map((b) => [b.name, b._id]))

  for (const u of SEED_USERS) {
    const passwordHash = await bcrypt.hash(u.password, 10)
    await User.findOneAndUpdate(
      { email: u.email },
      {
        $set: {
          username: u.username,
          role: u.role,
          passwordHash,
          emailVerifiedAt: new Date(),
          status: 'active',
        },
      },
      { upsert: true, setDefaultsOnInsert: true }
    )
    console.log(`  ✓ ${u.role.padEnd(9)} ${u.email}  (mật khẩu: ${u.password})`)
  }

  const passwordHash = await bcrypt.hash(MEMBER_PASSWORD, 10)
  for (const m of SEED_MEMBERS) {
    const userBadges = (m.badges || [])
      .filter((name) => badgeIdByName[name])
      .map((name) => ({ badge: badgeIdByName[name] }))

    await User.findOneAndUpdate(
      { email: m.email },
      {
        $set: {
          username: m.username,
          role: 'user',
          passwordHash,
          reputationScore: m.reputationScore,
          emailVerifiedAt: new Date(),
          status: 'active',
          badges: userBadges,
        },
      },
      { upsert: true, setDefaultsOnInsert: true }
    )
    console.log(`  ✓ ${'user'.padEnd(9)} ${m.email}  (mật khẩu: ${MEMBER_PASSWORD})`)
  }
}

module.exports = { seedUsers, SEED_USERS, SEED_MEMBERS, MEMBER_PASSWORD }
