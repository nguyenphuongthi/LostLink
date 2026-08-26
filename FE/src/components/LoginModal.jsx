import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { c } from '../theme/tokens'

// Raised whenever a guest attempts a User-only action. Logging in flips
// the app role to 'user'; "Đăng ký ngay" hands off to the full auth flow.
export default function LoginModal() {
  const navigate = useNavigate()
  const { showLogin, closeLogin, doLogin } = useApp()
  if (!showLogin) return null

  const goRegister = (e) => {
    e.preventDefault()
    closeLogin()
    navigate('/auth?screen=register')
  }

  return (
    <div
      onClick={closeLogin}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 90,
        background: 'rgba(22,35,58,0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: 440, background: '#fff', borderRadius: 14, padding: 32, boxShadow: '0 24px 60px rgba(0,0,0,.25)' }}
      >
        <div style={{ fontSize: 19.5, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6 }}>
          Đăng nhập để tiếp tục
        </div>
        <div style={{ fontSize: 12.5, lineHeight: 1.55, color: c.muted, marginBottom: 24 }}>
          Đăng nhập rồi bạn có thể bình luận, nhận lại đồ và nhắn tin với người nhặt được.
        </div>

        <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 7 }}>Email</div>
        <div style={inputBox}>ten@email.com</div>

        <div style={{ fontSize: 12, fontWeight: 500, margin: '14px 0 7px' }}>Mật khẩu</div>
        <div style={inputBox}>••••••••</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 9, margin: '16px 0 20px' }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 5,
              background: c.blue,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ width: 4, height: 8, borderRight: '2px solid #fff', borderBottom: '2px solid #fff', transform: 'rotate(45deg)', marginTop: -2 }} />
          </div>
          <div style={{ fontSize: 11.5, color: c.ink2 }}>Nhận email khi có người cần liên hệ hoặc có gợi ý mới</div>
        </div>

        <div
          className="ll-primary"
          onClick={doLogin}
          style={{
            height: 48,
            borderRadius: 9,
            background: c.blue,
            color: '#fff',
            fontSize: 13.5,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          Đăng nhập
        </div>
        <div style={{ textAlign: 'center', fontSize: 12, color: c.muted, marginTop: 14 }}>
          Chưa có tài khoản? <a href="/auth?screen=register" onClick={goRegister}>Đăng ký ngay</a>
        </div>
      </div>
    </div>
  )
}

const inputBox = {
  height: 46,
  borderRadius: 8,
  border: '1px solid #DFE5EE',
  background: '#F8FAFC',
  display: 'flex',
  alignItems: 'center',
  padding: '0 14px',
  fontSize: 13,
  color: '#9AA7B8',
}
