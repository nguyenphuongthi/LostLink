// Category taxonomy, the leaderboard and the community counters.

export const CATEGORIES = [
  'Giấy tờ & thẻ',
  'Ví & tiền',
  'Túi & balo',
  'Thiết bị điện tử',
  'Chìa khóa & xe cộ',
  'Trang sức & phụ kiện',
  'Thú cưng',
  'Khác',
]

// Home filter list also has an "all" entry.
export const FILTER_CATEGORIES = ['Tất cả', ...CATEGORIES]

export const leaders = [
  { rank: 1, handle: '@minhkhoi.td', returned: '31 món đã trao trả', points: '312', initials: 'MK' },
  { rank: 2, handle: '@hoangnam.q1', returned: '24 món đã trao trả', points: '248', initials: 'HN' },
  { rank: 3, handle: '@baotran.sg', returned: '19 món đã trao trả', points: '174', initials: 'BT' },
  { rank: 4, handle: '@ngockhanh.dn', returned: '14 món đã trao trả', points: '141', initials: 'NK' },
  { rank: 5, handle: '@thuylinh.hn', returned: '9 món đã trao trả', points: '96', initials: 'TL' },
]

export const communityStats = [
  { value: '12.480', label: 'Tin đã đăng' },
  { value: '4.037', label: 'Đồ đã trao trả', accent: true },
  { value: '32,3%', label: 'Tỷ lệ ghép cặp thành công' },
  { value: '2,1 ngày', label: 'Thời gian trao trả trung bình' },
]

// Time-range presets used on Home and Settings.
export const TIME_RANGES = ['24 giờ qua', '7 ngày qua', '30 ngày qua']
