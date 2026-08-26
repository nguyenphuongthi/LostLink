// The animated "lost item found" illustration on the left of the auth
// screen: an orbiting radar sweep, expanding pings, a magnifier that
// snaps onto a dropped pin, and tether lines that reel in. Purely
// decorative — ported from the design component. Keyframes live in
// src/theme/auth.css (ll-* names).
export default function AuthArt() {
  return (
    <div style={{ flex: '0 1 350px', minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'scale(1.02)' }}>
        <div style={{ position: 'absolute', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(78,139,224,.24), rgba(78,139,224,0) 68%)', animation: 'll-glow 5s ease-in-out infinite' }} />
        <div style={{ position: 'relative', width: 200, height: 200 }}>
          <div style={{ position: 'absolute', inset: 24, borderRadius: '50%', border: '1px solid rgba(110,168,255,.55)', animation: 'll-burst 6s cubic-bezier(.2,.7,.3,1) infinite' }} />
          <div style={{ position: 'absolute', inset: 24, borderRadius: '50%', border: '1px solid rgba(255,255,255,.28)', animation: 'll-burst 6s cubic-bezier(.2,.7,.3,1) infinite .35s' }} />
          <div style={{ position: 'absolute', inset: -14, animation: 'll-sweep 14s linear infinite' }}>
            <div style={{ position: 'absolute', top: 0, left: '50%', width: 6, height: 6, marginLeft: -3, borderRadius: '50%', background: 'rgba(255,255,255,.7)', boxShadow: '0 0 10px 3px rgba(110,168,255,.45)' }} />
          </div>
          <div style={{ position: 'absolute', left: 86, top: 85, width: 126, height: 2, transformOrigin: 'left center', '--a': '-22.3deg', background: 'linear-gradient(90deg, rgba(169,204,255,.9), rgba(169,204,255,0))', animation: 'll-tether 6s cubic-bezier(.16,.84,.28,1) infinite' }} />
          <div style={{ position: 'absolute', left: 86, top: 85, width: 108, height: 2, transformOrigin: 'left center', '--a': '160.5deg', background: 'linear-gradient(90deg, rgba(255,255,255,.7), rgba(255,255,255,0))', animation: 'll-tether 6s cubic-bezier(.16,.84,.28,1) infinite' }} />
          <div style={{ position: 'absolute', left: 70, top: 70, width: 32, height: 32, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,.95), rgba(169,204,255,0) 70%)', animation: 'll-snap 6s ease-out infinite' }} />
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" style={{ position: 'absolute', inset: 0, animation: 'll-lens-in 6s cubic-bezier(.16,.84,.28,1) infinite' }}>
            <defs>
              <linearGradient id="llLensG" x1="20" y1="14" x2="176" y2="182" gradientUnits="userSpaceOnUse">
                <stop stopColor="#A9CCFF" />
                <stop offset="1" stopColor="#3B76D6" />
              </linearGradient>
            </defs>
            <circle cx="86" cy="86" r="62" stroke="rgba(255,255,255,.13)" strokeWidth="11" strokeLinecap="round" strokeDasharray="58 390" strokeDashoffset="-306" transform="rotate(-52 86 86)" />
            <circle cx="86" cy="86" r="62" stroke="url(#llLensG)" strokeWidth="11" strokeLinecap="round" strokeDasharray="292 390" transform="rotate(-52 86 86)" style={{ animation: 'll-trace 6s cubic-bezier(.16,.84,.28,1) infinite' }} />
            <path d="M131.5 131.5 L174 174" stroke="url(#llLensG)" strokeWidth="12" strokeLinecap="round" />
          </svg>
          <div style={{ position: 'absolute', left: 86, top: 86, animation: 'll-pin-in 6s cubic-bezier(.16,.84,.28,1) infinite' }}>
            <svg width="76" height="76" viewBox="0 0 24 24" fill="none" style={{ display: 'block', margin: '-42px 0 0 -38px' }}>
              <path d="M12 22.2c0 0 7.5-7.6 7.5-12.7A7.5 7.5 0 0 0 4.5 9.5c0 5.1 7.5 12.7 7.5 12.7Z" fill="#fff" />
              <circle cx="12" cy="9.5" r="3.4" fill="none" stroke="#2B5FAE" strokeWidth="1.9" />
              <circle cx="12" cy="9.5" r="1" fill="#2B5FAE" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
