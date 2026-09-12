// Idempotent: chạy lại nhiều lần chỉ cập nhật, không tạo trùng (khớp theo post + user + body).
// Bình luận lấy từ dữ liệu mẫu của FE (FE/src/data/posts.js — mảng comments),
// gắn vào bài "Ví da nâu..." (bài đầu tiên trong feed, /post/0).

const Comment = require('../models/Comment')
const Post = require('../models/Post')
const User = require('../models/User')

// Bài được bình luận (khớp title với postSeed.js).
const TARGET_POST_TITLE = 'Ví da nâu có giấy tờ tùy thân, nhặt tại phố đi bộ Nguyễn Huệ'

const SEED_COMMENTS = [
  {
    handle: 'ngockhanh.dn',
    body: 'Tối qua em cũng thấy một chiếc ví nâu rơi gần bùng binh, không rõ có phải cái này không ạ.',
  },
  {
    handle: 'thuylinh.hn',
    body: 'Cảm ơn anh đã đăng tin. Mong chủ nhân sớm nhận lại được giấy tờ.',
  },
  {
    handle: 'baotran.sg',
    body: 'Anh nên gửi tạm ở công an phường cho an toàn nhé, khu đó đông người qua lại lắm.',
  },
]

const seedComments = async () => {
  const post = await Post.findOne({ title: TARGET_POST_TITLE }, { _id: 1 }).lean()
  if (!post) {
    console.log('  ⚠ Bỏ qua seed bình luận (chưa có bài đích, hãy chạy seed bài đăng trước).')
    return
  }

  const users = await User.find({}, { username: 1 }).lean()
  const userIdByName = Object.fromEntries(users.map((u) => [u.username, u._id]))

  for (const c of SEED_COMMENTS) {
    const user = userIdByName[c.handle]
    if (!user) {
      console.log(`  ⚠ Bỏ qua bình luận của ${c.handle} (thiếu user)`)
      continue
    }
    await Comment.findOneAndUpdate(
      { post: post._id, user, body: c.body },
      { $setOnInsert: { post: post._id, user, body: c.body } },
      { upsert: true, setDefaultsOnInsert: true }
    )
    console.log(`  ✓ ${c.handle}: ${c.body.slice(0, 40)}…`)
  }
}

module.exports = { seedComments, SEED_COMMENTS }
