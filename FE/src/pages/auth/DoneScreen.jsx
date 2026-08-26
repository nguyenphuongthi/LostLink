import { a } from '../../theme/authTokens'
import { PrimaryButton } from '../../components/auth/AuthControls'

// Step 6 · Success — account activated. Entering the app hands off to the
// main experience.
export default function DoneScreen({ emailShown, notifyNote, onEnter }) {
  return (
    <div style={{ textAlign: 'center', padding: '6px 0' }}>
      <div
        style={{
          width: 62,
          height: 62,
          margin: '0 auto 20px',
          borderRadius: '50%',
          background: 'rgba(110,168,255,.16)',
          border: '1px solid rgba(110,168,255,.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(110,168,255,.6)', animation: 'll-pulse 3s ease-out infinite' }} />
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M5 12.8 10 17.6 19.2 7" stroke={a.star} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h2 style={{ margin: '0 0 10px', fontSize: 24, fontWeight: 700, letterSpacing: '-.3px' }}>Tài khoản đã kích hoạt</h2>
      <p style={{ margin: '0 0 10px', fontSize: 14, lineHeight: 1.6, color: a.dim }}>
        Email <strong style={{ color: a.ink }}>{emailShown}</strong> đã được xác thực.
      </p>
      <p style={{ margin: '0 0 24px', fontSize: 12.5, lineHeight: 1.6, color: a.dim4 }}>{notifyNote}</p>

      <PrimaryButton onClick={onEnter}>Vào LostLink</PrimaryButton>
    </div>
  )
}
