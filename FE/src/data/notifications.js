// Notification feed (U6). `go` is the route key each row links to.

export const NOTIF_TABS = ['Tất cả', 'Gợi ý khớp', 'Tin nhắn', 'Nhắc nhở']

export const notifGroups = [
  {
    label: 'Hôm nay',
    items: [
      {
        icon: '🔔',
        tone: 'blue',
        title: 'Có 3 tin nhặt được giống chiếc túi của bạn',
        body: 'Gần nhất là túi vải xanh ở bến xe Mỹ Đình, cách chỗ bạn khoảng 800 m.',
        time: '12 phút trước',
        action: 'Xem gợi ý',
        unread: true,
        go: '/matches',
      },
      {
        icon: '💬',
        tone: 'warm',
        title: '@ducanh.bk xin trò chuyện về chiếc ví',
        body: '"Em nghĩ đây là ví của em, trong ví có thẻ sinh viên Bách Khoa." Bạn đồng ý thì hai bên nhắn tin bình thường.',
        time: '1 giờ trước',
        action: 'Xem yêu cầu',
        unread: true,
        go: '/chat',
      },
      {
        icon: '✓',
        tone: 'green',
        title: 'Bạn đã trả lời đúng câu hỏi xác minh',
        body: 'Kênh trò chuyện với người nhặt được ví đã mở.',
        time: '3 giờ trước',
        action: 'Xem',
        unread: false,
        go: '/chat',
      },
    ],
  },
  {
    label: 'Tuần này',
    items: [
      {
        icon: '⏰',
        tone: 'warm',
        title: 'Đừng quên kể kết quả nhé',
        body: 'Bạn đã hẹn gặp @baotran.sg hôm qua. Nếu nhận được đồ rồi, xác nhận giúp mình một câu.',
        time: 'Hôm qua',
        action: 'Xác nhận',
        unread: false,
        go: '/thanks',
      },
      {
        icon: '🔔',
        tone: 'blue',
        title: 'Tin mới trong khu vực bạn theo dõi',
        body: '5 tin nhặt được quanh Quận 1 trong 24 giờ qua.',
        time: '2 ngày trước',
        action: 'Xem trang chủ',
        unread: false,
        go: '/',
      },
    ],
  },
]

export const notifPrefs = [
  { key: 'a', label: 'Có gợi ý khớp với đồ của tôi' },
  { key: 'b', label: 'Có người xin trò chuyện' },
  { key: 'c', label: 'Bản tin tuần trong khu vực' },
]
