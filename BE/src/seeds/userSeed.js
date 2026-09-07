// Idempotent: chạy lại nhiều lần chỉ cập nhật, không tạo trùng (khớp theo email).

const bcrypt = require('bcryptjs')
const User = require('../models/User')

const SEED_USERS = [
  { username: 'admin', email: 'admin@lostlink.vn', password: 'Admin@123', role: 'admin' },
  { username: 'moderator', email: 'mod@lostlink.vn', password: 'Mod@1234', role: 'moderator' },
  { username: 'user01', email: 'user@lostlink.vn', password: 'User@1234', role: 'user' },
]

const seedUsers = async () => {
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
}

module.exports = { seedUsers, SEED_USERS }
