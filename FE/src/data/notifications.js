// Notification feed (U6). `go` là route mỗi dòng dẫn tới, `kind` để lọc theo tab.
// Các loại: match (gợi ý ghép cặp), like (lượt thích), comment (bình luận),
// system (bài được duyệt / nhắc nhở hệ thống).

export const NOTIF_TABS = ['Tất cả', 'Gợi ý khớp', 'Lượt thích', 'Bình luận', 'Hệ thống']

// Map từ nhãn tab → nhóm kind được hiển thị.
export const TAB_KINDS = {
  'Tất cả': null,
  'Gợi ý khớp': ['match'],
  'Lượt thích': ['like'],
  'Bình luận': ['comment'],
  'Hệ thống': ['system'],
}

export const notifGroups = [
  {
    label: 'Hôm nay',
    items: [
      {
        kind: 'match',
        icon: '🔍',
        tone: 'blue',
        title: 'Có 3 tin nhặt được giống chiếc túi của bạn',
        body: 'Gần nhất là túi vải xanh ở bến xe Mỹ Đình.',
        // Các lý do khớp — hiển thị chung trong MỘT thẻ, tự xuống dòng,
        // không tách thành nhiều chip nhỏ.
        reasons: ['Cách bạn ~800 m', 'Lệch 1 ngày', 'Cùng có ví và thẻ sinh viên'],
        time: '12 phút trước',
        action: 'Xem gợi ý',
        unread: true,
        go: '/matches',
      },
      {
        kind: 'like',
        icon: '♥',
        tone: 'rose',
        title: 'ducanh.bk và 4 người khác đã thích bài của bạn',
        body: 'Bài “Ví da nâu có giấy tờ tùy thân, nhặt tại phố đi bộ Nguyễn Huệ”.',
        time: '40 phút trước',
        action: 'Xem bài',
        unread: true,
        go: '/post/0',
      },
      {
        kind: 'comment',
        icon: '💬',
        tone: 'warm',
        title: 'ngockhanh.dn đã bình luận bài viết của bạn',
        body: '“Tối qua em cũng thấy một chiếc ví nâu rơi gần bùng binh, không rõ có phải cái này không ạ.”',
        time: '1 giờ trước',
        action: 'Trả lời',
        unread: true,
        go: '/post/0',
      },
      {
        kind: 'system',
        icon: '✓',
        tone: 'green',
        title: 'Bài đăng của bạn đã được duyệt',
        body: 'Tin “Túi tote vải xanh navy, bên trong có ví và thẻ sinh viên” đã hiển thị công khai.',
        time: '3 giờ trước',
        action: 'Xem bài',
        unread: false,
        go: '/post/3',
      },
    ],
  },
  {
    label: 'Tuần này',
    items: [
      {
        kind: 'like',
        icon: '♥',
        tone: 'rose',
        title: 'hoangnam.q1 đã thích bình luận của bạn',
        body: 'Trong bài “Chùm chìa khóa xe Vision kèm móc gấu bông xám”.',
        time: 'Hôm qua',
        action: 'Xem',
        unread: false,
        go: '/post/4',
      },
      {
        kind: 'match',
        icon: '🔍',
        tone: 'blue',
        title: 'Thêm 1 tin có thể là chiếc túi của bạn',
        body: 'Một túi tote sẫm màu nhặt tại sảnh nhà xe Bến xe Mỹ Đình.',
        reasons: ['Cách bạn ~1,2 km', 'Lệch 2 ngày', 'Cùng là túi xách'],
        time: '2 ngày trước',
        action: 'Xem gợi ý',
        unread: false,
        go: '/matches',
      },
      {
        kind: 'system',
        icon: '⏰',
        tone: 'warm',
        title: 'Đừng quên kể kết quả nhé',
        body: 'Bạn đã hẹn gặp baotran.sg hôm qua. Nếu nhận được đồ rồi, xác nhận giúp mình một câu.',
        time: '2 ngày trước',
        action: 'Xác nhận',
        unread: false,
        go: '/thanks',
      },
    ],
  },
]

export const notifPrefs = [
  { key: 'a', label: 'Có gợi ý khớp với đồ của tôi' },
  { key: 'b', label: 'Có người thích hoặc bình luận bài của tôi' },
  { key: 'c', label: 'Bài đăng được duyệt & bản tin khu vực' },
]
