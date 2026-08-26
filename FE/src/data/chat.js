// Conversation list, an opened thread and safe meet-up suggestions (U7).

export const threads = [
  {
    name: '@hoangnam.q1',
    time: '09:41',
    preview: 'Vâng, 15h chiều nay tại quán cà phê nhé',
    initials: 'HN',
  },
  {
    name: '@baotran.sg',
    time: 'Hôm qua',
    preview: 'Chìa khóa đang gửi ở quầy bảo vệ chợ',
    initials: 'BT',
  },
  {
    name: 'Trợ lý LostLink',
    time: 'Hôm qua',
    preview: 'Bạn nhận được đồ chưa? Nhớ kể mình nghe nha',
    initials: 'LL',
    system: true,
  },
  {
    name: '@minhkhoi.td',
    time: '08/08',
    preview: 'Đã trao trả · cảm ơn bạn nhiều',
    initials: 'MK',
  },
]

export const messages = [
  { me: true, text: 'Chào anh, em vừa trả lời đúng câu hỏi. Chiếc ví đúng là của em ạ.', time: '09:14' },
  { me: false, text: 'Vâng, câu trả lời của bạn khớp. Mình đang giữ ví ở nhà, bạn tiện lúc nào?', time: '09:16' },
  { me: true, text: 'Chiều nay em rảnh từ 15h. Mình gặp ở chỗ nào đông người cho yên tâm anh nhé.', time: '09:22' },
  { me: false, text: 'Vậy quán cà phê ở tầng trệt toà nhà đối diện chợ nhé, có bảo vệ.', time: '09:38' },
  { me: true, text: 'Vâng, 15h chiều nay tại quán cà phê nhé. Em cảm ơn anh nhiều ạ.', time: '09:41' },
]

export const meetups = [
  { name: 'Công an phường Bến Nghé', dist: 'Cách điểm hẹn 400 m' },
  { name: 'Quầy bảo vệ trung tâm thương mại Đồng Khởi', dist: 'Cách 650 m' },
  { name: 'Quán cà phê tầng trệt toà nhà Bitexco', dist: 'Cách 900 m' },
  { name: 'Siêu thị trên đường Nguyễn Đình Chiểu', dist: 'Cách 1,4 km' },
]
