import { a } from '../../theme/authTokens'
import { Field, StrengthMeter, PrimaryButton, GoogleButton, Divider } from '../../components/auth/AuthControls'

// Step 2 · Create an account. Submitting sends a 6-digit code and advances
// to the verify screen.
export default function RegisterScreen({ email, onEmail, password, onPassword, strength, notify, toggleNotify, onSubmit, onGoogle }) {
  return (
    <>
      <p style={{ margin: '0 0 22px', fontSize: 14.5, lineHeight: 1.6, color: a.dim }}>
        Đăng ký bằng email — chúng tôi gửi mã xác thực để kích hoạt tài khoản.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Field label="TÊN HIỂN THỊ" type="text" />
        <Field label="EMAIL" type="email" value={email} onChange={onEmail} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <Field label="MẬT KHẨU" type="password" value={password} onChange={onPassword} />
          <StrengthMeter width={strength.width} color={strength.color} label={strength.label} />
        </div>

        <div
          onClick={toggleNotify}
          style={{
            display: 'flex',
            gap: 11,
            padding: '14px 15px',
            borderRadius: 12,
            border: `1px solid ${notify ? 'rgba(110,168,255,.34)' : 'rgba(255,255,255,.14)'}`,
            background: notify ? 'rgba(110,168,255,.1)' : 'rgba(255,255,255,.04)',
            cursor: 'pointer',
            transition: 'border-color .15s, background .15s',
          }}
        >
          <input
            type="checkbox"
            checked={notify}
            onChange={toggleNotify}
            style={{ width: 16, height: 16, marginTop: 2, flex: 'none', accentColor: '#3B76D6', cursor: 'pointer' }}
          />
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.45 }}>
              Nhận thông báo qua email khi hệ thống có thông tin liên quan đến món đồ của bạn
            </div>
            <div style={{ marginTop: 4, fontSize: 12.5, lineHeight: 1.55, color: 'rgba(234,241,251,.58)', textWrap: 'pretty' }}>
              Khi engine ghép cặp tìm được tin phù hợp mà bạn chưa truy cập hệ thống, LostLink sẽ gửi email để bạn vào kiểm tra và phản hồi kịp thời.
            </div>
          </div>
        </div>

        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 12.5, lineHeight: 1.5, color: 'rgba(234,241,251,.58)', cursor: 'pointer' }}>
          <input type="checkbox" style={{ width: 15, height: 15, marginTop: 1, flex: 'none', accentColor: '#3B76D6', cursor: 'pointer' }} />
          <span>
            Tôi đồng ý với <a href="#dieu-khoan" onClick={(e) => e.preventDefault()}>điều khoản sử dụng</a> và{' '}
            <a href="#quyen-rieng-tu" onClick={(e) => e.preventDefault()}>Chính sách quyền riêng tư</a>.
          </span>
        </label>

        <PrimaryButton onClick={onSubmit}>Gửi mã xác thực</PrimaryButton>

        <Divider style={{ margin: '2px 0' }} />

        <GoogleButton onClick={onGoogle}>Đăng ký với Google</GoogleButton>
      </div>
    </>
  )
}
