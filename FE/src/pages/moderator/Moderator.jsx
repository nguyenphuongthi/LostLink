import { useState } from 'react'
import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Logo from '../../components/Logo'
import ModIcon from '../../components/moderator/ModIcon'
import Posts from './Posts'
import Review from './Review'
import Reports from './Reports'
import Escalations from './Escalations'
import Messages from './Messages'
import Notifications from './Notifications'
import { createModeratorMessages } from '../../data/moderatorMessages'
import { createModeratorNotifications } from '../../data/moderatorNotifications'
import { createEscalationState } from '../../data/escalations'
import { reviewPosts } from '../../data/reviewPosts'
import { moderatorReports } from '../../data/moderatorReports'
import { moderatorPosts } from '../../data/moderatorPosts'
import { STATUS_LABELS } from '../../lib/moderatorPosts'
import '../../theme/moderator.css'

const navigation = [
  { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { path: '', label: 'Tất cả bài đăng', icon: 'list' },
  { path: '/review', label: 'Kiểm duyệt bài', icon: 'check' },
  { path: '/reports', label: 'Hàng đợi report', icon: 'flag' },
  { path: '/escalations', label: 'Escalation', icon: 'shield' },
  { path: '/messages', label: 'Tin nhắn', icon: 'chat' },
  { path: '/notifications', label: 'Thông báo', icon: 'bell' },
]

function Dashboard({ posts }) {
  return <div className="mod-content"><div className="mod-dashboard-grid">{Object.entries(STATUS_LABELS).map(([status, label]) => <section className="mod-dashboard-stat" key={status}><span className={`mod-status ${status}`}>{label}</span><strong>{posts.filter((post) => post.status === status).length}</strong><span>bài đăng</span></section>)}</div><NavLink className="mod-button primary" to="/moderator/review">Đến danh sách chờ xét duyệt<ModIcon name="next" size={16} /></NavLink></div>
}

export default function Moderator() {
  const { user, authReady, logout } = useApp()
  const { pathname } = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [posts, setPosts] = useState(() => [...moderatorPosts, ...reviewPosts.map((post) => ({ ...post, status: 'pending', views: 0, comments: 0, matches: 0 }))])
  const [reports, setReports] = useState(moderatorReports)
  const [escalationState, setEscalationState] = useState(createEscalationState)
  const [messageState, setMessageState] = useState(createModeratorMessages)
  const [notificationState, setNotificationState] = useState(createModeratorNotifications)
  const unreadMessageCount = messageState.threads.reduce((total, thread) => total + thread.unread, 0)
  const active = navigation.find((item) => pathname === `/moderator${item.path}`) || navigation[0]

  if (!authReady) return <div className="mod-loading" role="status">Đang tải phiên làm việc…</div>
  if (!user) return <Navigate to="/auth?screen=login" replace />
  if (!['moderator', 'admin'].includes(user.role)) return <Navigate to="/home" replace />

  return (
    <div className="mod-app">
      {sidebarOpen && <button className="mod-sidebar-overlay" aria-label="Đóng menu điều hướng" onClick={() => setSidebarOpen(false)} />}
      <aside id="moderator-sidebar" className={`mod-sidebar ${sidebarOpen ? 'open' : ''} ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="mod-sidebar-header">
          <NavLink to="/moderator/dashboard" className="mod-brand" aria-label="LostLink - Dashboard" onClick={() => setSidebarOpen(false)}><span><Logo size={36} /></span><div className="mod-brand-text">LostLink</div></NavLink>
          <button className="mod-icon-button mod-collapse-toggle" aria-label={sidebarCollapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'} title={sidebarCollapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'} aria-expanded={!sidebarCollapsed} aria-controls="moderator-sidebar" onClick={() => setSidebarCollapsed((collapsed) => !collapsed)}><ModIcon name={sidebarCollapsed ? 'next' : 'back'} /></button>
        </div>
        <nav className="mod-nav" aria-label="Điều hướng moderator">{navigation.map((item) => <NavLink key={item.path} to={`/moderator${item.path}`} end aria-label={item.label} title={item.label} className={({ isActive }) => `mod-nav-item ${isActive ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}><ModIcon name={item.icon} /><span className="mod-nav-text">{item.label}</span>{item.path === '/review' && posts.some((p) => p.status === 'pending') && <span className="mod-nav-badge">{posts.filter((p) => p.status === 'pending').length}</span>}{item.path === '/messages' && unreadMessageCount > 0 && <span className="mod-nav-badge" aria-label={`${unreadMessageCount} tin nhắn chưa đọc`}>{unreadMessageCount}</span>}{item.path === '/notifications' && notificationState.notifications.some((notification) => notification.unread) && <span className="mod-nav-badge">{notificationState.notifications.filter((notification) => notification.unread).length}</span>}</NavLink>)}</nav>
        <div className="mod-user"><div className="mod-avatar">{(user.username || 'M').slice(0, 2).toUpperCase()}</div><div className="mod-user-info"><strong>{user.username || 'Moderator'}</strong><span><i />Trực tuyến</span></div><button className="mod-logout" aria-label="Đăng xuất" title="Đăng xuất" onClick={logout}><ModIcon name="logout" size={20} /></button></div>
      </aside>
      <div className="mod-main">
        <header className="mod-header">
          <button className="mod-icon-button mod-menu-toggle" aria-label={sidebarOpen ? 'Đóng menu' : 'Mở menu'} aria-expanded={sidebarOpen} aria-controls="moderator-sidebar" onClick={() => setSidebarOpen((open) => !open)}><ModIcon name="menu" /></button>
          <div className="mod-header-title"><span><ModIcon name={active.icon} size={20} /></span><h1>{active.label}</h1></div>
          <div className="mod-header-date"><ModIcon name="calendar" size={16} /><time dateTime={new Date().toLocaleDateString('en-CA')}>{new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</time></div>
        </header>
        <main className="mod-main-content"><Routes><Route index element={<Posts key="all" posts={posts} setPosts={setPosts} />} /><Route path="dashboard" element={<Dashboard posts={posts} />} /><Route path="review" element={<Review posts={posts} setPosts={setPosts} />} /><Route path="reports" element={<Reports reports={reports} setReports={setReports} />} /><Route path="escalations" element={<Escalations escalationState={escalationState} setEscalationState={setEscalationState} />} /><Route path="messages" element={<Messages messageState={messageState} setMessageState={setMessageState} />} /><Route path="notifications" element={<Notifications notificationState={notificationState} setNotificationState={setNotificationState} />} /><Route path="*" element={<Navigate to="/moderator" replace />} /></Routes></main>
      </div>
    </div>
  )
}
