import { a } from '../../theme/authTokens'
import { Field, PrimaryButton } from '../../components/auth/AuthControls'

// Step 5 · Choose a new password (reached from the emailed reset link).
export default function ResetScreen({ emailShown, password, onPassword, onSubmit }) {
  return (
    <>
      <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700, letterSpacing: '-.3px' }}>Đặt mật khẩu mới</h2>
      <p style={{ margin: '0 0 24px', fontSize: 14, color: a.dim2 }}>
        Cho tài khoản <strong style={{ color: a.ink }}>{emailShown}</strong>.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Field label="MẬT KHẨU MỚI" type="password" value={password} onChange={onPassword} />
        <Field label="NHẬP LẠI MẬT KHẨU" type="password" />
        <PrimaryButton onClick={onSubmit}>Lưu mật khẩu mới</PrimaryButton>
      </div>
    </>
  )
}
