import { a, field } from '../../theme/authTokens'
import { PrimaryButton } from '../../components/auth/AuthControls'

// Step 3 · Enter the 6-digit code emailed after registration. `slots`
// carries per-box value + ref + handlers so focus advances as you type.
export default function VerifyScreen({ emailShown, slots, onSubmit, resendText, canResend, resend, goRegister }) {
  return (
    <>
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: 14,
          background: 'rgba(110,168,255,.16)',
          border: '1px solid rgba(110,168,255,.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 18,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="2.6" y="4.6" width="18.8" height="14.8" rx="3" stroke={a.star} strokeWidth="1.8" />
          <path d="M3.6 7 12 13l8.4-6" stroke={a.star} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700, letterSpacing: '-.3px' }}>Xác thực email</h2>
      <p style={{ margin: '0 0 24px', fontSize: 14, lineHeight: 1.6, color: a.dim2 }}>
        Mã 6 số đã gửi tới <strong style={{ color: a.ink }}>{emailShown}</strong>, hiệu lực 10 phút.
      </p>

      <div style={{ display: 'flex', gap: 9 }}>
        {slots.map((slot, i) => (
          <input
            key={i}
            className="auth-input"
            type="text"
            inputMode="numeric"
            maxLength={1}
            ref={slot.ref}
            value={slot.value}
            onChange={slot.onChange}
            onKeyDown={slot.onKeyDown}
            style={{ ...field, height: 56, padding: 0, textAlign: 'center', fontSize: 21, fontWeight: 600 }}
          />
        ))}
      </div>

      <PrimaryButton style={{ marginTop: 20 }} onClick={onSubmit}>
        Xác nhận
      </PrimaryButton>

      <div style={{ marginTop: 16, fontSize: 13, color: 'rgba(234,241,251,.58)' }}>
        {resendText}{' '}
        <span onClick={resend} style={{ fontWeight: 600, color: canResend ? a.link : 'rgba(234,241,251,.35)', cursor: canResend ? 'pointer' : 'default' }}>
          Gửi lại mã
        </span>
      </div>

      <div style={{ marginTop: 20, padding: '13px 15px', borderRadius: 10, background: 'rgba(255,255,255,.05)', fontSize: 12.5, lineHeight: 1.6, color: a.dim3 }}>
        Không thấy email? Kiểm tra Spam — người gửi <strong style={{ color: 'rgba(234,241,251,.8)' }}>no-reply@lostlink.vn</strong>.
      </div>

      <div style={{ marginTop: 18, fontSize: 13.5, color: a.dim3 }}>
        Sai địa chỉ?{' '}
        <span onClick={goRegister} style={{ fontWeight: 600, color: a.link, cursor: 'pointer' }}>
          Đổi email
        </span>
      </div>
    </>
  )
}
