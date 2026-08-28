// Small presentational primitives shared by every auth screen. Grouped in
// one file because each is only a handful of lines and they always travel
// together across the login / register / verify / reset forms. Base styling
// for the field / button lives in src/theme/auth.css.

// Labeled text field. Any <input> prop (type, value, onChange, placeholder…)
// passes straight through.
export function Field({ label, ...props }) {
  return (
    <div className="flex flex-col gap-[7px]">
      <label className="auth-label">{label}</label>
      <input className="auth-input" {...props} />
    </div>
  )
}

// Password-strength bar shown under the register password field.
export function StrengthMeter({ width, color, label }) {
  return (
    <div className="mt-[3px] flex items-center gap-2.5">
      <div className="h-1 flex-1 overflow-hidden rounded bg-white/[0.12]">
        <div className="h-full rounded transition-[width,background] duration-300" style={{ width, background: color }} />
      </div>
      <span className="whitespace-nowrap text-[11.5px] font-semibold text-au-dim2">{label}</span>
    </div>
  )
}

// Primary gradient action button.
export function PrimaryButton({ children, className = '', ...props }) {
  return (
    <button className={`auth-primary ${className}`} {...props}>
      {children}
    </button>
  )
}

// "Continue with Google" button (label passed as children).
export function GoogleButton({ children, ...props }) {
  return (
    <button className="auth-google" {...props}>
      <svg width="18" height="18" viewBox="0 0 48 48" className="flex-none" aria-hidden="true">
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
export function Divider({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="h-px flex-1 bg-white/[0.14]" />
      <span className="text-[11.5px] tracking-[.1em] text-au-faint">HOẶC</span>
      <div className="h-px flex-1 bg-white/[0.14]" />
    </div>
  )
}
