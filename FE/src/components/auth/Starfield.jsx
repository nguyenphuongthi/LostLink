import { useMemo } from 'react'

// A self-contained starfield backdrop — stands in for the design's
// assets/galaxy.png so the auth screen needs no bundled image. Stars are
// generated once (deterministic per mount) and twinkle via ll-twinkle.
// Denser along a diagonal "milky way" band to echo the reference art.
function build(count) {
  // A small seeded PRNG keeps the layout stable across re-renders.
  let s = 20240826
  const rnd = () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
  return Array.from({ length: count }, () => {
    const along = rnd()
    // Bias toward a -24° diagonal band running across the canvas.
    const band = rnd() < 0.6
    const x = band ? along * 100 : rnd() * 100
    const y = band ? along * 90 - (x - 50) * 0.45 + (rnd() - 0.5) * 26 : rnd() * 100
    const size = rnd() * 2 + 0.6
    return {
      left: `${x}%`,
      top: `${Math.max(-4, Math.min(104, y))}%`,
      width: size,
      height: size,
      opacity: 0.25 + rnd() * 0.6,
      duration: 2.4 + rnd() * 4.5,
      delay: rnd() * 5,
    }
  })
}

export default function Starfield({ count = 170 }) {
  const stars = useMemo(() => build(count), [count])
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Soft diagonal galaxy band. */}
      <div
        style={{
          position: 'absolute',
          inset: '-20%',
          background:
            'radial-gradient(closest-side at 50% 50%, rgba(150,180,255,.12), rgba(150,180,255,0) 70%)',
          transform: 'rotate(-24deg) scaleY(.42)',
          filter: 'blur(18px)',
        }}
      />
      {stars.map((st, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: st.left,
            top: st.top,
            width: st.width,
            height: st.height,
            borderRadius: '50%',
            background: '#fff',
            opacity: st.opacity,
            boxShadow: '0 0 4px 1px rgba(200,220,255,.5)',
            animation: `ll-twinkle ${st.duration}s ease-in-out ${st.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
