// A public community profile (U11). One demo profile stands in for everyone.
export const profile = {
  handle: 'hoangnam.q1',
  initials: 'HN',
  points: '248',
  returned: '24',
  rating: '4,9 / 5',
  rankLabel: 'Hạng 2 bảng vinh danh quý III/2026 · tham gia từ 03/2025',
  bio: 'Nhân viên văn phòng ở Quận 1. Hay nhặt được đồ quanh phố đi bộ Nguyễn Huệ.',
  // Huy hiệu hiển thị ngay dưới tên. `tone` quyết định màu:
  //   good  → tích cực (người tốt bụng, trả nhiều món…)
  //   love  → được cộng đồng yêu thích
  //   bad   → cảnh báo (bị báo cáo lừa đảo)
  badges: [
    { name: 'Người tốt bụng', tone: 'good' },
    { name: 'Được yêu thích', tone: 'love' },
    { name: 'Trả 20+ món', tone: 'good' },
    { name: 'Đã xác thực email', tone: 'good' },
  ],
}

export const PROFILE_TABS = ['Tất cả', 'Nhặt được', 'Mất đồ']

// Bài đăng trên trang cá nhân — cùng shape với feed trang chủ (PostCard).
// `returned` = đã trao trả: sẽ được làm mờ và đẩy xuống cuối danh sách.
// `order` càng lớn càng mới, dùng để sắp xếp theo mốc thời gian.
export const profilePosts = [
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
    views: 412,
    commentLabel: '3 bình luận',
    viewLabel: '412 lượt xem',
    seed: 'lostlink-wallet',
    status: 'Đang tìm chủ',
    tone: 'warn',
    returned: false,
    order: 100,
  },
  {
    id: 4,
    type: 'lost',
    category: 'Khác',
    timeAgo: '4 tháng trước',
    title: 'Mũ bảo hiểm màu xám để quên ở quán ăn',
    desc: 'Mũ bảo hiểm 3/4 màu xám, kính chắn gió trong, quai cài còn mới.',
    area: 'Quận 1, TP.HCM',
    timeWindow: 'Trưa 12/05',
    handle: 'hoangnam.q1',
    initials: 'HN',
    likeBase: 3,
    views: 88,
    commentLabel: '0 bình luận',
    viewLabel: '88 lượt xem',
    seed: 'lostlink-helmet',
    status: 'Đã đóng',
    tone: 'idle',
    returned: false,
    order: 10,
  },
  {
    id: 1,
    type: 'found',
    category: 'Thiết bị điện tử',
    timeAgo: '3 tuần trước',
    title: 'Điện thoại Samsung màn hình nứt, nhặt ở công viên 23/9',
    desc: 'Máy màu đen, màn hình nứt góc dưới, đã bàn giao lại cho chủ nhân.',
    area: 'Quận 1, TP.HCM',
    timeWindow: 'Chiều 25/08',
    handle: 'hoangnam.q1',
    initials: 'HN',
    likeBase: 18,
    views: 640,
    commentLabel: '4 bình luận',
    viewLabel: '640 lượt xem',
    seed: 'lostlink-phone2',
    status: 'Đã trao trả',
    tone: 'ok',
    returned: true,
    order: 60,
  },
  {
    id: 2,
    type: 'found',
    category: 'Giấy tờ & thẻ',
    timeAgo: '2 tháng trước',
    title: 'Thẻ sinh viên và một xấp giấy tờ rơi trước cổng trường',
    desc: 'Thẻ sinh viên cùng vài giấy tờ tùy thân, đã trao lại cho đúng chủ.',
    area: 'Quận 3, TP.HCM',
    timeWindow: 'Sáng 10/07',
    handle: 'hoangnam.q1',
    initials: 'HN',
    likeBase: 11,
    views: 305,
    commentLabel: '2 bình luận',
    viewLabel: '305 lượt xem',
    seed: 'lostlink-docs',
    status: 'Đã trao trả',
    tone: 'ok',
    returned: true,
    order: 30,
  },
]

export const reviews = [
  {
    handle: 'thuylinh.hn',
    stars: '★★★★★',
    text: 'Anh giữ ví cẩn thận, hẹn gặp đúng giờ và không nhận đồng nào cảm ơn. Rất quý người như vậy.',
  },
  {
    handle: 'ducanh.bk',
    stars: '★★★★★',
    text: 'Nhắn tin lịch sự, chủ động đề nghị gặp ở chỗ đông người cho an tâm.',
  },
]
