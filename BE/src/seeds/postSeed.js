// Idempotent: chạy lại nhiều lần chỉ cập nhật, không tạo trùng (khớp theo title).
// Bài đăng lấy từ feed mẫu của FE (FE/src/data/posts.js — mảng posts).
// - owner: khớp theo handle (username) đã seed ở userSeed.js
// - category: khớp theo tên danh mục đã seed ở categorySeed.js
// - ảnh: dùng cùng nguồn placeholder như FE (picsum theo seed)
// - toạ độ: đặt xấp xỉ theo khu vực để dùng thử geo-index (chưa cần chính xác)

const Post = require('../models/Post')
const User = require('../models/User')
const Category = require('../models/Category')

// Ảnh placeholder giống helper IMG/galleryFor của FE (FE/src/theme/tokens.js).
const img = (seed, n = 800) => `https://picsum.photos/seed/${seed}/${n}/${n}`
const gallery = (seed) => [seed, seed + '2', seed + '3', seed + '4'].map((s, i) => ({ url: img(s), order: i }))

// Toạ độ xấp xỉ [lng, lat] theo khu vực hiển thị trong bài.
const COORDS = {
  'Quận 1, TP.HCM': [106.7009, 10.7769], // phố đi bộ Nguyễn Huệ
  'Cầu Giấy, Hà Nội': [105.7998, 21.0313],
  'TP. Thủ Đức, TP.HCM': [106.7371, 10.8031], // Thảo Điền
  'Nam Từ Liêm, Hà Nội': [105.7639, 21.0289], // bến xe Mỹ Đình
}

// Feed mẫu — cùng nội dung với FE, bổ sung các trường mà model Post yêu cầu.
const SEED_POSTS = [
  {
    handle: 'hoangnam.q1',
    type: 'found',
    category: 'Ví & tiền',
    title: 'Ví da nâu có giấy tờ tùy thân, nhặt tại phố đi bộ Nguyễn Huệ',
    description: 'Ví da nâu sẫm, sờn góc phải, bên trong có CCCD và một thẻ ngân hàng.',
    area: 'Quận 1, TP.HCM',
    timeFrom: new Date('2026-08-18T06:00:00+07:00'),
    timeTo: new Date('2026-08-18T07:00:00+07:00'),
    contents: ['CCCD', 'Thẻ ngân hàng'],
    tags: ['ví da', 'giấy tờ'],
    seed: 'lostlink-wallet',
    status: 'searching',
  },
  {
    handle: 'thuylinh.hn',
    type: 'lost',
    category: 'Thiết bị điện tử',
    title: 'iPhone 13 màu xanh, ốp lưng trong suốt có dán ảnh mèo',
    description:
      'Rơi khi xuống xe buýt tuyến 32. Máy dán decal hình mèo mướp sau ốp, màn hình nứt góc trên.',
    area: 'Cầu Giấy, Hà Nội',
    timeFrom: new Date('2026-08-17T13:00:00+07:00'),
    timeTo: new Date('2026-08-17T18:00:00+07:00'),
    contents: [],
    tags: ['iphone', 'điện thoại'],
    seed: 'lostlink-phone',
    status: 'searching',
  },
  {
    handle: 'minhkhoi.td',
    type: 'found',
    category: 'Thú cưng',
    title: 'Chó Poodle nâu đeo vòng cổ đỏ đi lạc ở Thảo Điền',
    description:
      'Bé rất hiền, đang được giữ tạm tại nhà. Vòng cổ có chuông nhưng không có thẻ tên.',
    area: 'TP. Thủ Đức, TP.HCM',
    timeFrom: new Date('2026-08-18T08:00:00+07:00'),
    timeTo: null,
    contents: [],
    tags: ['chó', 'poodle'],
    seed: 'lostlink-dog',
    status: 'searching',
  },
  {
    handle: 'ducanh.bk',
    type: 'lost',
    category: 'Túi & balo',
    title: 'Túi tote vải xanh navy, bên trong có ví và thẻ sinh viên',
    description:
      'Để quên ở ghế chờ bến xe Mỹ Đình. Trong túi có ví da be, thẻ sinh viên Bách Khoa và sổ tay bìa nâu.',
    area: 'Nam Từ Liêm, Hà Nội',
    timeFrom: new Date('2026-08-17T17:00:00+07:00'),
    timeTo: new Date('2026-08-17T21:00:00+07:00'),
    contents: ['Ví da be', 'Thẻ sinh viên', 'Sổ tay'],
    tags: ['túi tote', 'thẻ sinh viên'],
    seed: 'lostlink-bag',
    status: 'searching',
  },
  {
    handle: 'baotran.sg',
    type: 'found',
    category: 'Chìa khóa & xe cộ',
    title: 'Chùm chìa khóa xe Vision kèm móc gấu bông xám',
    description:
      'Nhặt trước cổng chợ Bến Thành, đã gửi tạm ở quầy bảo vệ chợ. Có 3 chìa và một thẻ từ chung cư.',
    area: 'Quận 1, TP.HCM',
    timeFrom: new Date('2026-08-17T11:30:00+07:00'),
    timeTo: new Date('2026-08-17T12:30:00+07:00'),
    contents: ['3 chìa khóa', 'Thẻ từ chung cư'],
    tags: ['chìa khóa', 'xe máy'],
    seed: 'lostlink-keys',
    status: 'searching',
  },
]

const seedPosts = async () => {
  // Tra cứu id user (theo username) và category (theo name) để tham chiếu.
  const users = await User.find({}, { username: 1 }).lean()
  const userIdByName = Object.fromEntries(users.map((u) => [u.username, u._id]))

  const categories = await Category.find({}, { name: 1 }).lean()
  const categoryIdByName = Object.fromEntries(categories.map((c) => [c.name, c._id]))

  for (const p of SEED_POSTS) {
    const owner = userIdByName[p.handle]
    const category = categoryIdByName[p.category]
    if (!owner || !category) {
      console.log(`  ⚠ Bỏ qua "${p.title}" (thiếu owner hoặc category)`)
      continue
    }

    const coords = COORDS[p.area] || [106.7009, 10.7769]
    const point = { type: 'Point', coordinates: coords }

    await Post.findOneAndUpdate(
      { title: p.title },
      {
        $set: {
          owner,
          type: p.type,
          category,
          description: p.description,
          area: p.area,
          timeFrom: p.timeFrom,
          timeTo: p.timeTo,
          locExact: point,
          locPublic: point,
          locPublicRadius: 300,
          status: p.status,
          contents: p.contents.map((label) => ({ label })),
          images: gallery(p.seed),
          tags: p.tags,
        },
      },
      { upsert: true, setDefaultsOnInsert: true }
    )
    console.log(`  ✓ [${p.type}] ${p.title}`)
  }
}

module.exports = { seedPosts, SEED_POSTS }
