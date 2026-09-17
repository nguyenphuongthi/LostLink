export const STATUS_LABELS = { pending: 'Chờ xét duyệt', searching: 'Đang tìm', contacted: 'Đã liên hệ', completed: 'Đã trao trả', rejected: 'Đã từ chối' }
export const EMPTY_FILTERS = { status: '', category: '', type: '', district: '', from: '', to: '', query: '' }

// The reference uses dd/MM/yyyy HH:mm. Compare calendar dates without UTC conversion.
export function postDateKey(dateTime) {
  const [day, month, year] = dateTime.split(' ')[0].split('/')
  return `${year}-${month}-${day}`
}

export function hasInvalidRange({ from, to }) {
  return Boolean(from && to && from > to)
}

export function isWithinDateRange(dateTime, filters) {
  if (hasInvalidRange(filters)) return false
  const date = postDateKey(dateTime)
  return (!filters.from || date >= filters.from) && (!filters.to || date <= filters.to)
}

export function filterModeratorPosts(posts, filters) {
  if (hasInvalidRange(filters)) return []
  const query = (filters.query || '').trim().toLocaleLowerCase()
  return posts.filter((post) => {
    return ['status', 'category', 'type', 'district'].every((key) => !filters[key] || post[key] === filters[key])
      && (!query || `${post.id} ${post.title} ${post.author} ${post.category} ${post.location}`.toLocaleLowerCase().includes(query))
      && isWithinDateRange(post.dateTime, filters)
  })
}

export function postsToCsv(posts) {
  const cell = (value) => {
    const text = String(value ?? '')
    const safe = /^[=+@\-\t\r\n]/.test(text) ? `'${text}` : text
    return `"${safe.replaceAll('"', '""')}"`
  }
  const rows = [['ID', 'Tiêu đề', 'Người đăng', 'Danh mục', 'Loại tin', 'Vị trí', 'Thời gian', 'Lượt xem', 'Bình luận', 'Ghép nối', 'Trạng thái'],
    ...posts.map((p) => [p.id, p.title, p.author, p.category, p.type === 'lost' ? 'Mất đồ' : 'Nhặt được', p.location, p.dateTime, p.views, p.comments, p.matches, STATUS_LABELS[p.status]])]
  return '\uFEFF' + rows.map((row) => row.map(cell).join(',')).join('\r\n')
}
