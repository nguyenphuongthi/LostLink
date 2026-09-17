// Conversation list, an opened thread and safe meet-up suggestions (U7).

export const threads = [
  {
    name: 'hoangnam.q1',
    time: '09:41',
    preview: 'Vâng, 15h chiều nay tại quán cà phê nhé',
    initials: 'HN',
  },
  {
    name: 'baotran.sg',
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
    name: 'minhkhoi.td',
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

// Gợi ý CHUNG cho mọi vị trí: các loại nơi công cộng, đông người, ở đâu cũng
// có — không phải địa điểm cụ thể, không kèm khoảng cách.
export const meetups = [
  { name: 'Quán cà phê đông khách', hint: 'Không gian mở, luôn có người qua lại' },
  { name: 'Quầy bảo vệ chung cư / toà nhà', hint: 'Có người trực và camera an ninh' },
  { name: 'Siêu thị, cửa hàng tiện lợi', hint: 'Sáng đèn, đông người gần như cả ngày' },
  { name: 'Trụ sở công an phường', hint: 'An tâm nhất khi cần người làm chứng' },
]
