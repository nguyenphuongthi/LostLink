import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

// Nhãn role hiển thị cho người dùng.
const ROLE_LABEL = { admin: 'Quản trị viên', moderator: 'Kiểm duyệt viên', user: 'Thành viên' }

// Một dòng trong menu.
function MenuRow({ icon, children, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] font-medium transition-colors ${
        danger ? 'text-red hover:bg-red/[0.08]' : 'text-ink2 hover:bg-chip'
      }`}
    >
      <span className="flex h-4 w-4 flex-none items-center justify-center">{icon}</span>
      {children}
    </button>
  )
}

// Icon nét mảnh 16px, đồng bộ phong cách tối giản của app.
const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }
const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...stroke}><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.3 3.1-5.5 7-5.5s7 2.2 7 5.5" /></svg>
)
const IconGear = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...stroke}><circle cx="12" cy="12" r="3" /><path d="M12 3v2M12 19v2M4.2 7l1.7 1M18.1 16l1.7 1M3 12h2M19 12h2M4.2 17l1.7-1M18.1 8l1.7-1" /></svg>
)
const IconKey = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...stroke}><circle cx="8" cy="12" r="3.5" /><path d="M11.5 12H21M18 12v3M15 12v2" /></svg>
)
const IconLogout = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...stroke}><path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" /><path d="M10 12H3M3 12l3-3M3 12l3 3" /></svg>
)

// Avatar ở header + dropdown thông tin/điều hướng tài khoản (chỉ khi đã đăng nhập).
export default function UserMenu() {
  const navigate = useNavigate()
  const { user, logout } = useApp()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  if (!user) return null

  const initials = (user.username || 'U').slice(0, 2).toUpperCase()
  const go = (to) => () => {
    setOpen(false)
    navigate(to)
  }
  const onLogout = () => {
    setOpen(false)
    logout()
    navigate('/home')
  }

  return (
    <div ref={ref} className="relative">
      <button
        aria-label="Menu tài khoản"
        onClick={() => setOpen((o) => !o)}
        className="flex h-[42px] w-[42px] items-center justify-center rounded-lg border border-blue-line bg-blue-soft text-[12.5px] font-bold text-blue transition-shadow hover:shadow-[0_2px_10px_rgba(46,109,180,0.22)]"
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border border-line bg-white p-1.5 shadow-[0_16px_40px_rgba(22,35,58,0.18)]">
          {/* Thông tin người dùng */}
          <div className="flex items-center gap-3 px-2.5 py-3">
            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-blue-line bg-blue-soft text-[14px] font-bold text-blue">
              {initials}
            </div>
            <div className="min-w-0">
              <div className="truncate text-[13.5px] font-semibold text-ink">{user.username}</div>
              <div className="truncate text-[11.5px] text-muted">{user.email}</div>
              <span className="mt-1 inline-block rounded-full bg-chip px-2 py-0.5 text-[10.5px] font-semibold text-ink2">
                {ROLE_LABEL[user.role] || 'Thành viên'}
              </span>
            </div>
          </div>

          <div className="my-1 h-px bg-line" />

          <MenuRow icon={<IconUser />} onClick={go('/profile')}>Trang cá nhân</MenuRow>
          <MenuRow icon={<IconGear />} onClick={go('/settings')}>Cài đặt tài khoản</MenuRow>
          <MenuRow icon={<IconKey />} onClick={go('/settings')}>Đổi mật khẩu</MenuRow>

          <div className="my-1 h-px bg-line" />

          <MenuRow icon={<IconLogout />} onClick={onLogout} danger>
            Đăng xuất
          </MenuRow>
        </div>
      )}
    </div>
  )
}
