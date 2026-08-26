import { a } from '../../theme/authTokens'
import { Field, PrimaryButton, GoogleButton, Divider } from '../../components/auth/AuthControls'

// Step 1 (default) · Sign in with email + password.
export default function LoginScreen({ email, onEmail, onSubmit, onGoogle, goForgot, goRegister }) {
  return (
    <>
      <p style={{ margin: '0 0 24px', fontSize: 14.5, lineHeight: 1.6, color: a.dim }}>
        Chào mừng bạn trở lại. Đăng nhập để xem gợi ý ghép cặp của bạn.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Field label="EMAIL" type="email" value={email} onChange={onEmail} />
        <Field label="MẬT KHẨU" type="password" />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 9, whiteSpace: 'nowrap', fontSize: 13, color: 'rgba(234,241,251,.7)', cursor: 'pointer' }}>
            <input type="checkbox" style={{ width: 15, height: 15, accentColor: '#3B76D6', cursor: 'pointer' }} />
            Ghi nhớ đăng nhập
          </label>
          <span onClick={goForgot} className="auth-link" style={{ whiteSpace: 'nowrap', fontSize: 13, fontWeight: 600, color: a.link }}>
            Quên mật khẩu?
          </span>
        </div>

        <PrimaryButton style={{ marginTop: 6 }} onClick={onSubmit}>
          Đăng nhập
        </PrimaryButton>

        <Divider style={{ margin: '6px 0 2px' }} />

        <GoogleButton onClick={onGoogle}>Tiếp tục với Google</GoogleButton>
      </div>

      <p style={{ margin: '22px 0 0', fontSize: 13.5, color: a.dim3 }}>
        Chưa có tài khoản?{' '}
        <span onClick={goRegister} style={{ fontWeight: 600, color: a.link, cursor: 'pointer' }}>
          Đăng ký
        </span>
      </p>
    </>
  )
}
