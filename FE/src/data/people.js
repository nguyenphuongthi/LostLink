import { IMG } from '../theme/tokens'

// A public community profile (U11). One demo profile stands in for everyone.
export const profile = {
  handle: '@hoangnam.q1',
  initials: 'HN',
  points: '248',
  returned: '24',
  rating: '4,9 / 5',
  rankLabel: 'Hạng 2 bảng vinh danh quý III/2026 · tham gia từ 03/2025',
  bio: 'Nhân viên văn phòng ở Quận 1. Hay nhặt được đồ quanh phố đi bộ Nguyễn Huệ.',
  badges: [
    { name: 'Người tốt bụng' },
    { name: 'Trả 20+ món' },
    { name: 'Phản hồi nhanh' },
    { name: 'Đã xác thực email' },
  ],
}

export const PROFILE_TABS = ['Tất cả', 'Nhặt được', 'Mất đồ']

export const profilePosts = [
  {
    type: 'found',
    title: 'Ví da nâu có giấy tờ tùy thân, nhặt tại phố đi bộ Nguyễn Huệ',
    status: 'Đang tìm chủ',
    tone: 'warn',
    timeAgo: '2 giờ trước',
    area: 'Quận 1, TP.HCM',
    photo: IMG('lostlink-wallet', 300),
  },
  {
    type: 'found',
    title: 'Điện thoại Samsung màn hình nứt, nhặt ở công viên 23/9',
    status: 'Đã trao trả',
    tone: 'ok',
    timeAgo: '3 tuần trước',
    area: 'Quận 1, TP.HCM',
    photo: IMG('lostlink-phone2', 300),
  },
  {
    type: 'found',
    title: 'Thẻ sinh viên và một xấp giấy tờ rơi trước cổng trường',
    status: 'Đã trao trả',
    tone: 'ok',
    timeAgo: '2 tháng trước',
    area: 'Quận 3, TP.HCM',
    photo: IMG('lostlink-docs', 300),
  },
  {
    type: 'lost',
    title: 'Mũ bảo hiểm màu xám để quên ở quán ăn',
    status: 'Đã đóng',
    tone: 'idle',
    timeAgo: '4 tháng trước',
    area: 'Quận 1, TP.HCM',
    photo: IMG('lostlink-helmet', 300),
  },
]

export const reviews = [
  {
    handle: '@thuylinh.hn',
    stars: '★★★★★',
    text: 'Anh giữ ví cẩn thận, hẹn gặp đúng giờ và không nhận đồng nào cảm ơn. Rất quý người như vậy.',
  },
  {
    handle: '@ducanh.bk',
    stars: '★★★★★',
    text: 'Nhắn tin lịch sự, chủ động đề nghị gặp ở chỗ đông người cho an tâm.',
  },
]
