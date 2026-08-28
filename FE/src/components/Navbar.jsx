import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Logo from './Logo'

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

export default function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { isGuest, openLogin } = useApp()

  const guard = (to) => () => (isGuest ? openLogin() : navigate(to))

  return (
    <div className="sticky top-0 z-40 border-b border-line bg-white/[0.93] backdrop-blur-[10px]">
      <div className="flex h-[74px] items-center gap-7 px-10">
        <div className="flex cursor-pointer items-center gap-2.5" onClick={() => navigate('/')}>
          <Logo />
          <div className="text-[18.5px] font-bold tracking-[-0.025em] text-blue-dark">LostLink</div>
        </div>

        <div className="ml-2 flex items-center gap-1">
          <NavItem label="Trang chủ" to="/" active={pathname === '/'} />
          <NavItem label="Gợi ý ghép cặp" to="/matches" badge="3" guarded active={pathname === '/matches'} />
          <NavItem label="Tin nhắn" to="/chat" badge="2" guarded active={pathname === '/chat'} />
          <NavItem label="Trang của tôi" to="/profile" guarded active={pathname === '/profile'} />
        </div>

        <div className="ml-auto flex max-w-[340px] flex-1 justify-center">
          <div className="flex h-[42px] w-full items-center gap-2.5 rounded-lg border border-line bg-chip px-4">
            <div className="h-[13px] w-[13px] flex-shrink-0 rounded-full border-2 border-muted3" />
            <div className="text-[12.5px] text-muted3">Tìm theo tên đồ vật, khu vực…</div>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <div
            className="ll-primary flex h-[42px] cursor-pointer items-center gap-2 rounded-lg bg-blue px-5 text-[13px] font-semibold text-white shadow-[0_2px_10px_rgba(46,109,180,0.28)]"
            onClick={guard('/compose')}
          >
            <div className="relative h-3.5 w-3.5">
              <div className="absolute left-0 top-1.5 h-0.5 w-3.5 rounded-sm bg-white" />
              <div className="absolute left-1.5 top-0 h-3.5 w-0.5 rounded-sm bg-white" />
            </div>
            Đăng tin
          </div>
          <div
            onClick={guard('/profile')}
            className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-lg border border-blue-line bg-blue-soft text-[12.5px] font-bold text-blue"
          >
            TL
          </div>
        </div>
      </div>
    </div>
  )
}
