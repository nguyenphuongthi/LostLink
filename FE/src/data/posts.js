import { IMG } from '../theme/tokens'

// The public feed. Index in this array is the post id used in routes (/post/:id).
export const posts = [
  {
    id: 0,
    type: 'found',
    category: 'Ví & tiền',
    timeAgo: '2 giờ trước',
    title: 'Ví da nâu có giấy tờ tùy thân, nhặt tại phố đi bộ Nguyễn Huệ',
    desc: 'Ví da nâu sẫm, sờn góc phải, bên trong có CCCD và một thẻ ngân hàng.',
    area: 'Quận 1, TP.HCM',
    timeWindow: '18/08, 06:00 – 07:00',
    handle: 'hoangnam.q1',
    initials: 'HN',
    likeBase: 24,
    commentLabel: '3 bình luận',
    viewLabel: '412 lượt xem',
    seed: 'lostlink-wallet',
  },
  {
    id: 1,
    type: 'lost',
    category: 'Thiết bị điện tử',
    timeAgo: '5 giờ trước',
    title: 'iPhone 13 màu xanh, ốp lưng trong suốt có dán ảnh mèo',
    desc: 'Rơi khi xuống xe buýt tuyến 32. Máy dán decal hình mèo mướp sau ốp, màn hình nứt góc trên.',
    area: 'Cầu Giấy, Hà Nội',
    timeWindow: 'Chiều 17/08',
    handle: 'thuylinh.hn',
    initials: 'TL',
    likeBase: 41,
    commentLabel: '7 bình luận',
    viewLabel: '1.204 lượt xem',
    seed: 'lostlink-phone',
  },
  {
    id: 2,
    type: 'found',
    category: 'Thú cưng',
    timeAgo: '8 giờ trước',
    title: 'Chó Poodle nâu đeo vòng cổ đỏ đi lạc ở Thảo Điền',
    desc: 'Bé rất hiền, đang được giữ tạm tại nhà. Vòng cổ có chuông nhưng không có thẻ tên.',
    area: 'TP. Thủ Đức, TP.HCM',
    timeWindow: 'Sáng 18/08',
    handle: 'minhkhoi.td',
    initials: 'MK',
    likeBase: 63,
    commentLabel: '12 bình luận',
    viewLabel: '2.881 lượt xem',
    seed: 'lostlink-dog',
  },
  {
    id: 3,
    type: 'lost',
    category: 'Túi & balo',
    timeAgo: '1 ngày trước',
    title: 'Túi tote vải xanh navy, bên trong có ví và thẻ sinh viên',
    desc: 'Để quên ở ghế chờ bến xe Mỹ Đình. Trong túi có ví da be, thẻ sinh viên Bách Khoa và sổ tay bìa nâu.',
    area: 'Nam Từ Liêm, Hà Nội',
    timeWindow: '17/08, 17:00 – 21:00',
    handle: 'ducanh.bk',
    initials: 'ĐA',
    likeBase: 12,
    commentLabel: '2 bình luận',
    viewLabel: '336 lượt xem',
    seed: 'lostlink-bag',
  },
  {
    id: 4,
    type: 'found',
    category: 'Chìa khóa & xe cộ',
    timeAgo: '1 ngày trước',
    title: 'Chùm chìa khóa xe Vision kèm móc gấu bông xám',
    desc: 'Nhặt trước cổng chợ Bến Thành, đã gửi tạm ở quầy bảo vệ chợ. Có 3 chìa và một thẻ từ chung cư.',
    area: 'Quận 1, TP.HCM',
    timeWindow: 'Trưa 17/08',
    handle: 'baotran.sg',
    initials: 'BT',
    likeBase: 9,
    commentLabel: '1 bình luận',
    viewLabel: '208 lượt xem',
    seed: 'lostlink-keys',
  },
]

export const galleryFor = (post) =>
  [post.seed, post.seed + '2', post.seed + '3', post.seed + '4'].map((s) => IMG(s, 200))

// Comments shown on the detail page.
export const comments = [
  {
    initials: 'NK',
    handle: 'ngockhanh.dn',
    time: '1 giờ trước',
    text: 'Tối qua em cũng thấy một chiếc ví nâu rơi gần bùng binh, không rõ có phải cái này không ạ.',
  },
  {
    initials: 'TL',
    handle: 'thuylinh.hn',
    time: '2 giờ trước',
    text: 'Cảm ơn anh đã đăng tin. Mong chủ nhân sớm nhận lại được giấy tờ.',
  },
  {
    initials: 'BT',
    handle: 'baotran.sg',
    time: '2 giờ trước',
    text: 'Anh nên gửi tạm ở công an phường cho an toàn nhé, khu đó đông người qua lại lắm.',
  },
]

// The signed-in user's own posts (My page).
export const myPosts = [
  {
    type: 'lost',
    title: 'Túi tote vải xanh navy, bên trong có ví và thẻ sinh viên',
    status: 'Có manh mối',
    tone: 'warn',
    stats: '3 gợi ý ghép cặp · 2 bình luận · 336 lượt xem',
    seed: 'lostlink-bag',
  },
  {
    type: 'found',
    title: 'Kính cận gọng titan trong hộp màu be',
    status: 'Đang tìm',
    tone: 'idle',
    stats: 'Chưa có gợi ý · 1 bình luận · 74 lượt xem',
    seed: 'lostlink-glasses',
  },
  {
    type: 'lost',
    title: 'Chìa khóa xe máy kèm thẻ từ chung cư Sunrise',
    status: 'Đã trao trả',
    tone: 'ok',
    stats: 'Hoàn tất 04/08/2026 · +15 điểm uy tín',
    seed: 'lostlink-keys',
  },
]
