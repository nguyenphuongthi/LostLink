import { a } from '../../theme/authTokens'
import { Field, PrimaryButton } from '../../components/auth/AuthControls'

// Step 4 · Request a password-reset link by email.
export default function ForgotScreen({ email, onEmail, emailShown, onSubmit, forgotSent, goLogin }) {
  return (
    <>
      <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700, letterSpacing: '-.3px' }}>Quên mật khẩu</h2>
      <p style={{ margin: '0 0 24px', fontSize: 14, lineHeight: 1.6, color: a.dim2 }}>
        Nhập email đã đăng ký. Liên kết đặt lại có hiệu lực 30 phút.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Field label="EMAIL" type="email" value={email} onChange={onEmail} />
        <PrimaryButton onClick={onSubmit}>Gửi liên kết đặt lại</PrimaryButton>
      </div>

      {forgotSent && (
        <div
          style={{
            marginTop: 18,
            display: 'flex',
            gap: 10,
            padding: '13px 15px',
            borderRadius: 10,
            background: 'rgba(110,168,255,.14)',
            border: '1px solid rgba(110,168,255,.28)',
            fontSize: 13,
            lineHeight: 1.55,
            color: a.linkHover,
          }}
        >
          <span style={{ fontWeight: 700 }}>✓</span>
          <span>
            Đã gửi hướng dẫn tới <strong>{emailShown}</strong>.
          </span>
        </div>
      )}

      <p style={{ margin: '24px 0 0', fontSize: 13.5 }}>
        <span onClick={goLogin} style={{ fontWeight: 600, color: a.link, cursor: 'pointer' }}>
          ← Về trang đăng nhập
        </span>
      </p>
    </>
  )
}
