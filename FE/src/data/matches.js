import { IMG } from '../theme/tokens'

// Suggested pairings (U4) for the user's lost navy tote.
export const matches = [
  {
    category: 'Túi & balo',
    timeAgo: '6 giờ trước',
    title: 'Túi vải xanh để quên ở ghế chờ bến xe Mỹ Đình',
    score: '89%',
    note: 'LostLink tìm thấy lúc 08:12 sáng nay',
    strong: true,
    photo: IMG('lostlink-bag3', 400),
    reasons: [
      'Cách chỗ bạn ~800 m',
      'Lệch 1 ngày',
      'Cùng có ví và thẻ sinh viên',
      'Mô tả rất giống',
    ],
  },
  {
    category: 'Túi & balo',
    timeAgo: '2 ngày trước',
    title: 'Túi tote sẫm màu nhặt tại sảnh nhà xe Bến xe Mỹ Đình',
    score: '71%',
    note: 'Tin này chưa có ảnh nên khó chắc chắn hơn',
    strong: false,
    photo: IMG('lostlink-bag4', 400),
    reasons: ['Cách ~1,2 km', 'Lệch 2 ngày', 'Cùng là túi xách'],
  },
  {
    category: 'Ví & tiền',
    timeAgo: '3 ngày trước',
    title: 'Ví da be có thẻ sinh viên trường kỹ thuật',
    score: '63%',
    note: 'Chỉ trùng một phần đồ bên trong',
    strong: false,
    photo: IMG('lostlink-wallet5', 400),
    reasons: ['Cách ~2,4 km', 'Món đồ gần giống', 'Cùng có thẻ sinh viên'],
  },
]
