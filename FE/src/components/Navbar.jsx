import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Logo from './Logo'
import UserMenu from './UserMenu'

// A top-nav entry. User-only entries route guests to the login modal.
function NavItem({ label, to, badge, active, guarded }) {
  const navigate = useNavigate()
  const { isGuest, openLogin } = useApp()
  const go = () => (guarded && isGuest ? openLogin() : navigate(to))
  return (
    <div
      className="ll-nav relative flex cursor-pointer items-center gap-2 rounded-lg px-3.5 py-2 text-[13px] font-medium text-ink2"
      onClick={go}
    >
      {label}
      {badge != null && (
        <div className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red px-1.5 text-[10.5px] font-bold text-white">
          {badge}
        </div>
      )}
      {active && <div className="absolute inset-x-3.5 -bottom-px h-[2.5px] rounded-full bg-blue" />}
    </div>
  )
}

// The nav destinations, shared between the desktop bar and the mobile drawer.
const LINKS = [
  { label: 'Trang chủ', to: '/home', badge: null, guarded: false },
  { label: 'Gợi ý ghép cặp', to: '/matches', badge: '3', guarded: true },
  { label: 'Tin nhắn', to: '/chat', badge: '2', guarded: true },
  { label: 'Trang của tôi', to: '/profile', badge: null, guarded: true },
  { label: 'Bảng vinh danh', to: '/leaderboard', badge: null, guarded: false },
]

export default function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { isGuest, openLogin, user, logout } = useApp()
  const [open, setOpen] = useState(false)

  const guard = (to) => () => (isGuest ? openLogin() : navigate(to))
  // Drawer row: close the drawer, then route (guests routed to login).
  const drawerGo = (to, guarded) => () => {
    setOpen(false)
    if (guarded && isGuest) openLogin()
    else navigate(to)
  }

  return (
    <div className="sticky top-0 z-40 border-b border-line bg-white/[0.93] backdrop-blur-[10px]">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:h-[74px] lg:gap-7 lg:px-10">
        <div className="flex cursor-pointer items-center gap-2.5" onClick={() => navigate('/home')}>
          <Logo />
          <div className="text-[17px] font-bold tracking-[-0.025em] text-blue-dark lg:text-[18.5px]">LostLink</div>
        </div>

        {/* Desktop nav links */}
        <div className="ml-2 hidden items-center gap-1 lg:flex">
          <NavItem label="Trang chủ" to="/home" active={pathname === '/home'} />
          <NavItem label="Gợi ý ghép cặp" to="/matches" badge="3" guarded active={pathname === '/matches'} />
          <NavItem label="Tin nhắn" to="/chat" badge="2" guarded active={pathname === '/chat'} />
          <NavItem label="Trang của tôi" to="/profile" guarded active={pathname === '/profile'} />
        </div>

        {/* Desktop search */}
        <div className="ml-auto hidden max-w-[340px] flex-1 justify-center lg:flex">
          <div className="flex h-[42px] w-full items-center gap-2.5 rounded-lg border border-line bg-chip px-4">
            <div className="h-[13px] w-[13px] flex-shrink-0 rounded-full border-2 border-muted3" />
            <div className="text-[12.5px] text-muted3">Tìm theo tên đồ vật, khu vực…</div>
          </div>
        </div>

        {/* Right cluster */}
        <div className="ml-auto flex items-center gap-2 lg:ml-0 lg:gap-3.5">
          <div
            className="ll-primary flex h-[38px] cursor-pointer items-center gap-2 rounded-lg bg-blue px-3.5 text-[13px] font-semibold text-white shadow-[0_2px_10px_rgba(46,109,180,0.28)] sm:px-5 lg:h-[42px]"
            onClick={guard('/compose')}
          >
            <div className="relative h-3.5 w-3.5">
              <div className="absolute left-0 top-1.5 h-0.5 w-3.5 rounded-sm bg-white" />
              <div className="absolute left-1.5 top-0 h-3.5 w-0.5 rounded-sm bg-white" />
            </div>
            <span className="hidden sm:inline">Đăng tin</span>
          </div>

          {/* Desktop: avatar + menu tài khoản (đã đăng nhập) hoặc nút đăng nhập (guest) */}
          {user ? (
            <div className="hidden lg:block">
              <UserMenu />
            </div>
          ) : (
            <button
              onClick={() => navigate('/auth?screen=login')}
              className="hidden h-[42px] items-center rounded-lg border border-blue-line bg-blue-soft px-4 text-[13px] font-semibold text-blue lg:flex"
            >
              Đăng nhập
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            aria-label="Mở menu"
            onClick={() => setOpen(true)}
            className="ll-subtle flex h-[38px] w-[38px] items-center justify-center rounded-lg border border-line bg-white lg:hidden"
          >
            <div className="flex flex-col gap-[4px]">
              <span className="h-[2px] w-[18px] rounded bg-ink2" />
              <span className="h-[2px] w-[18px] rounded bg-ink2" />
              <span className="h-[2px] w-[18px] rounded bg-ink2" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile drawer — portaled to <body> so it escapes the navbar's
          backdrop-filter, which would otherwise trap this fixed overlay inside
          the 64px-tall header (a backdrop-filter establishes a containing block
          for fixed descendants). Without the portal the menu — and the only
          mobile route to the leaderboard — renders unusable. */}
      {open &&
        createPortal(
          <div className="fixed inset-0 z-[100] lg:hidden">
            <div className="absolute inset-0 bg-ink/45 backdrop-blur-[2px]" onClick={() => setOpen(false)} />
            <div className="sk-drawer absolute right-0 top-0 flex h-full w-[86%] max-w-[340px] flex-col [animation:sk-slide-in_.28s_cubic-bezier(.22,.7,.25,1)_both]">
              <div className="flex h-16 items-center justify-between border-b border-line/70 px-4">
                <div className="flex items-center gap-2.5">
                  <Logo />
                  <div className="text-[17px] font-bold tracking-[-0.025em] text-blue-dark">LostLink</div>
                </div>
                <button
                  aria-label="Đóng menu"
                  onClick={() => setOpen(false)}
                  className="sk-icon-btn flex h-9 w-9 items-center justify-center rounded-xl text-[18px] text-muted"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-1 flex-col gap-1.5 overflow-y-auto p-4">
                {/* Search */}
                <div className="sk-inset mb-2 flex h-11 items-center gap-2.5 rounded-xl px-4">
                  <div className="h-[13px] w-[13px] flex-shrink-0 rounded-full border-2 border-muted3" />
                  <div className="text-[12.5px] text-muted3">Tìm theo tên đồ vật, khu vực…</div>
                </div>

                {LINKS.map((l) => {
                  const active = pathname === l.to
                  return (
                    <div
                      key={l.to}
                      onClick={drawerGo(l.to, l.guarded)}
                      className={`flex cursor-pointer items-center gap-2 rounded-xl px-3.5 py-3 text-[14px] font-medium ${
                        active ? 'sk-row-active text-blue' : 'sk-row text-ink2'
                      }`}
                    >
                      {l.label}
                      {l.badge != null && (
                        <div className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red px-1.5 text-[10.5px] font-bold text-white">
                          {l.badge}
                        </div>
                      )}
                    </div>
                  )
                })}

                <div
                  onClick={drawerGo('/settings', true)}
                  className="sk-row flex cursor-pointer items-center rounded-xl px-3.5 py-3 text-[14px] font-medium text-ink2"
                >
                  Thiết lập
                </div>
              </div>

              <div className="flex flex-col gap-2 border-t border-line/70 p-4">
                <div
                  onClick={drawerGo('/compose', true)}
                  className="sk-primary flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl text-[13.5px] font-semibold text-white"
                >
                  Đăng tin mới
                </div>
                {user ? (
                  <div
                    onClick={() => {
                      setOpen(false)
                      logout()
                      navigate('/home')
                    }}
                    className="flex h-11 cursor-pointer items-center justify-center rounded-xl border border-line text-[13.5px] font-semibold text-red"
                  >
                    Đăng xuất
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setOpen(false)
                      navigate('/auth?screen=login')
                    }}
                    className="flex h-11 cursor-pointer items-center justify-center rounded-xl border border-blue-line bg-blue-soft text-[13.5px] font-semibold text-blue"
                  >
                    Đăng nhập
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  )
}
