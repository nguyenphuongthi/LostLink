import { a, field, labelStyle, primaryBtn } from '../../theme/authTokens'

// Small presentational primitives shared by every auth screen. Grouped in
// one file because each is only a handful of lines and they always travel
// together across the login / register / verify / reset forms.

// Labeled text field. Any <input> prop (type, value, onChange, placeholder…)
// passes straight through.
export function Field({ label, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <label style={labelStyle}>{label}</label>
      <input className="auth-input" style={field} {...props} />
    </div>
  )
}

// Password-strength bar shown under the register password field.
export function StrengthMeter({ width, color, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 3 }}>
      <div style={{ flex: 1, height: 4, borderRadius: 4, background: 'rgba(255,255,255,.12)', overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: 4, transition: 'width .3s, background .3s', width, background: color }} />
      </div>
      <span style={{ whiteSpace: 'nowrap', fontSize: 11.5, fontWeight: 600, color: a.dim2 }}>{label}</span>
    </div>
  )
}

// Primary gradient action button.
export function PrimaryButton({ children, style, ...props }) {
  return (
    <button className="auth-primary" style={{ ...primaryBtn, ...style }} {...props}>
      {children}
    </button>
  )
}

// "Continue with Google" button (label passed as children).
export function GoogleButton({ children, ...props }) {
  return (
    <button
      className="auth-google"
      style={{
        height: 48,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        border: '1px solid rgba(255,255,255,.2)',
        borderRadius: 10,
        background: 'rgba(255,255,255,.96)',
        color: '#1F2A44',
        fontFamily: 'inherit',
        fontSize: 14.5,
        fontWeight: 600,
        cursor: 'pointer',
      }}
      {...props}
    >
      <svg width="18" height="18" viewBox="0 0 48 48" style={{ flex: 'none' }} aria-hidden="true">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
      </svg>
      {children}
    </button>
  )
}

// "HOẶC" rule between the primary action and the Google button.
export function Divider({ style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, ...style }}>
      <div style={{ flex: 1, height: 1, background: a.hair }} />
      <span style={{ fontSize: 11.5, letterSpacing: '.1em', color: a.faint }}>HOẶC</span>
      <div style={{ flex: 1, height: 1, background: a.hair }} />
    </div>
  )
}
