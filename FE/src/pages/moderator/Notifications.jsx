import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ModIcon from '../../components/moderator/ModIcon'
import ModDateRange from '../../components/moderator/ModDateRange'
import { NOTIFICATION_FILTER_TYPES, NOTIFICATION_TYPES, filterModeratorNotifications, markAllNotificationsRead, markNotificationRead, toggleNotificationPin, toggleNotificationRead, unreadNotificationCount } from '../../lib/moderatorNotifications'
import '../../theme/moderatorNotifications.css'

const formatTime = (value) => new Intl.DateTimeFormat('vi-VN', { hour: '2-digit', minute: '2-digit' }).format(new Date(value))
const dayLabel = (value) => {
  const date = new Date(value)
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)
  if (date.toDateString() === today.toDateString()) return 'Hôm nay'
  if (date.toDateString() === yesterday.toDateString()) return 'Hôm qua'
  return new Intl.DateTimeFormat('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric' }).format(date)
}

export default function Notifications({ notificationState, setNotificationState }) {
  const [filter, setFilter] = useState('all')
  const [type, setType] = useState('all')
  const [query, setQuery] = useState('')
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  const unreadCount = unreadNotificationCount(notificationState.notifications)
  const filtered = useMemo(() => filterModeratorNotifications(notificationState.notifications, { filter, type, query, ...dateRange }), [filter, type, query, dateRange, notificationState.notifications])
  const grouped = useMemo(() => filtered.reduce((groups, notification) => {
    const label = dayLabel(notification.createdAt)
    if (!groups[label]) groups[label] = []
    groups[label].push(notification)
    return groups
  }, {}), [filtered])

  const update = (updater) => setNotificationState((state) => updater(state))

  return <div className="mod-content mod-notifications">
    <section className="mod-notification-toolbar" aria-label="Bộ lọc thông báo">
      <div className="mod-notification-tabs" role="tablist" aria-label="Trạng thái thông báo">
        {[['all', 'Tất cả'], ['unread', 'Chưa đọc'], ['pinned', 'Đã ghim']].map(([value, label]) => <button key={value} type="button" role="tab" aria-selected={filter === value} className={filter === value ? 'active' : ''} onClick={() => setFilter(value)}>{label}{value === 'unread' && <span>{unreadCount}</span>}</button>)}
      </div>
      <label className="mod-notification-search"><span className="sr-only">Tìm thông báo</span><ModIcon name="search" size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm trong thông báo" /></label>
      <select aria-label="Lọc theo loại thông báo" value={type} onChange={(event) => setType(event.target.value)}><option value="all">Tất cả loại</option>{Object.entries(NOTIFICATION_FILTER_TYPES).map(([value, metadata]) => <option key={value} value={value}>{metadata.label}</option>)}</select>
      <button type="button" className="mod-button secondary mod-mark-all" disabled={!unreadCount} onClick={() => update(markAllNotificationsRead)}><ModIcon name="check" size={15} />Đánh dấu tất cả đã đọc</button>
      <ModDateRange filters={dateRange} onChange={(key, value) => setDateRange((previous) => ({ ...previous, [key]: value }))}>
        <button type="button" className="mod-button mod-reset-button mod-notification-reset" aria-label="Đặt lại bộ lọc thông báo" title="Đặt lại bộ lọc thông báo" onClick={() => { setFilter('all'); setType('all'); setQuery(''); setDateRange({ from: '', to: '' }) }}><ModIcon name="reset" /></button>
      </ModDateRange>
    </section>

    <div className="mod-notification-summary" aria-live="polite"><span><strong>{filtered.length}</strong> thông báo {filter === 'unread' ? 'chưa đọc' : filter === 'pinned' ? 'đã ghim' : ''}</span><span>{unreadCount} chưa đọc</span></div>
    {Object.entries(grouped).map(([label, notifications]) => <section className="mod-notification-group" key={label}><h3>{label}</h3><div className="mod-notification-list">{notifications.map((notification) => {
      const metadata = NOTIFICATION_TYPES[notification.type] || NOTIFICATION_TYPES.system
      return <article className={`mod-notification-item ${notification.unread ? 'unread' : ''} ${notification.pinned ? 'pinned' : ''}`} key={notification.id}>
        <div className={`mod-notification-icon ${notification.type}`}><ModIcon name={metadata.icon} size={18} /></div>
        <div className="mod-notification-main">
          <div className="mod-notification-meta"><span className="mod-notification-type">{metadata.label}</span><time dateTime={notification.createdAt}>{formatTime(notification.createdAt)}</time>{notification.unread && <span className="mod-unread-dot" aria-label="Chưa đọc" />}</div>
          <h4>{notification.title}</h4><p>{notification.body}</p>
          <Link className="mod-notification-action" to={notification.href} onClick={() => update((state) => markNotificationRead(state, notification.id))}>{notification.actionLabel}<ModIcon name="next" size={14} /></Link>
        </div>
        <div className="mod-notification-controls">
          <button type="button" className={`mod-notification-control ${notification.pinned ? 'selected' : ''}`} aria-label={notification.pinned ? 'Bỏ ghim thông báo' : 'Ghim thông báo'} title={notification.pinned ? 'Bỏ ghim' : 'Ghim'} onClick={() => update((state) => toggleNotificationPin(state, notification.id))}><ModIcon name="pin" size={16} /></button>
          <button type="button" className="mod-notification-control" aria-label={notification.unread ? 'Đánh dấu đã đọc' : 'Đánh dấu chưa đọc'} title={notification.unread ? 'Đánh dấu đã đọc' : 'Đánh dấu chưa đọc'} onClick={() => update((state) => toggleNotificationRead(state, notification.id))}><ModIcon name={notification.unread ? 'check' : 'mail'} size={16} /></button>
        </div>
      </article>
    })}</div></section>)}
    {!filtered.length && <div className="mod-notification-empty"><ModIcon name="bell" size={28} /><strong>Không có thông báo phù hợp</strong><span>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.</span></div>}
  </div>
}
