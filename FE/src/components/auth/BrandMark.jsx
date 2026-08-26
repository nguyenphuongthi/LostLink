// The LOSTLINK wordmark + magnifier logo. Positioning is handled by the
// centered top bar in AuthPage so the logo lines up with the content block.
export default function BrandMark() {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="llHeadG" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8FBBFF" />
            <stop offset="1" stopColor="#3B76D6" />
          </linearGradient>
        </defs>
        <circle cx="21" cy="21" r="16" stroke="url(#llHeadG)" strokeWidth="5" strokeLinecap="round" strokeDasharray="70 100.5" transform="rotate(-52 21 21)" />
        <circle cx="21" cy="21" r="16" stroke="rgba(255,255,255,.32)" strokeWidth="5" strokeLinecap="round" strokeDasharray="15 100.5" strokeDashoffset="-79" transform="rotate(-52 21 21)" />
        <path d="M32.6 32.6 L42 42" stroke="url(#llHeadG)" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M21 28.4c0 0 5.1-5.4 5.1-8.9a5.1 5.1 0 1 0-10.2 0c0 3.5 5.1 8.9 5.1 8.9Z" fill="#fff" />
        <circle cx="21" cy="19.2" r="1.9" fill="#122740" />
      </svg>
      <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '.14em' }}>LOSTLINK</span>
    </div>
  )
}
