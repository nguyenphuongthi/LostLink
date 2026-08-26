import { a } from '../../theme/authTokens'

// Login / Register tab strip shown at the top of the card on those two
// screens. `go` switches the active screen.
export default function ScreenTabs({ screen, go }) {
  const tab = (active) => ({
    paddingBottom: 12,
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    color: active ? '#fff' : a.dim4,
    borderBottom: `2px solid ${active ? a.accent : 'transparent'}`,
    marginBottom: -1,
  })
  return (
    <div style={{ display: 'flex', gap: 26, marginBottom: 26, borderBottom: '1px solid rgba(255,255,255,.12)' }}>
      <div onClick={() => go('login')} style={tab(screen === 'login')}>
        Đăng nhập
      </div>
      <div onClick={() => go('register')} style={tab(screen === 'register')}>
        Đăng ký
      </div>
    </div>
  )
}
