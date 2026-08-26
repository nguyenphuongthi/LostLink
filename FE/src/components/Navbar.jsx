import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { c } from '../theme/tokens'
import Logo from './Logo'

// A top-nav entry. User-only entries route guests to the login modal.
function NavItem({ label, to, badge, active, guarded }) {
  const navigate = useNavigate()
  const { isGuest, openLogin } = useApp()
  const go = () => (guarded && isGuest ? openLogin() : navigate(to))
  return (
    <div
      className="ll-nav"
      onClick={go}
      style={{
        position: 'relative',
        padding: '8px 14px',
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 500,
        color: c.ink2,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      {label}
      {badge != null && (
        <div
          style={{
            minWidth: 20,
            height: 20,
            padding: '0 6px',
            borderRadius: 99,
            background: c.red,
            color: '#fff',
            fontSize: 10.5,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {badge}
        </div>
      )}
      {active && (
        <div
          style={{
            position: 'absolute',
            left: 14,
            right: 14,
            bottom: -1,
            height: 2.5,
            borderRadius: 99,
            background: c.blue,
          }}
        />
      )}
    </div>
  )
}

export default function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { isGuest, openLogin } = useApp()

  const guard = (to) => () => (isGuest ? openLogin() : navigate(to))

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'rgba(255,255,255,0.93)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${c.line}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 28, padding: '0 40px', height: 74 }}>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <Logo />
          <div style={{ fontSize: 18.5, fontWeight: 700, letterSpacing: '-0.025em', color: c.blueDark }}>
            LostLink
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 8 }}>
          <NavItem label="Trang chủ" to="/" active={pathname === '/'} />
          <NavItem label="Gợi ý ghép cặp" to="/matches" badge="3" guarded active={pathname === '/matches'} />
          <NavItem label="Tin nhắn" to="/chat" badge="2" guarded active={pathname === '/chat'} />
          <NavItem label="Trang của tôi" to="/my-posts" guarded active={pathname === '/my-posts'} />
        </div>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', maxWidth: 340, marginLeft: 'auto' }}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              height: 42,
              padding: '0 16px',
              borderRadius: 8,
              background: c.chip,
              border: `1px solid ${c.line}`,
            }}
          >
            <div style={{ width: 13, height: 13, borderRadius: 99, border: `2px solid ${c.muted3}`, flexShrink: 0 }} />
            <div style={{ fontSize: 12.5, color: c.muted3 }}>Tìm theo tên đồ vật, khu vực…</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            className="ll-primary"
            onClick={guard('/compose')}
            style={{
              height: 42,
              padding: '0 20px',
              borderRadius: 8,
              background: c.blue,
              color: '#fff',
              fontSize: 13,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(46,109,180,0.28)',
            }}
          >
            <div style={{ width: 14, height: 14, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 6, left: 0, width: 14, height: 2, background: '#fff', borderRadius: 2 }} />
              <div style={{ position: 'absolute', left: 6, top: 0, height: 14, width: 2, background: '#fff', borderRadius: 2 }} />
            </div>
            Đăng tin
          </div>
          <div
            onClick={guard('/my-posts')}
            style={{
              width: 42,
              height: 42,
              borderRadius: 8,
              background: c.blueSoft,
              border: `1px solid ${c.blueLine}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12.5,
              fontWeight: 700,
              color: c.blue,
              cursor: 'pointer',
            }}
          >
            TL
          </div>
        </div>
      </div>
    </div>
  )
}
