import { useState } from 'react'

/**
 * Brand mark. Prefers /logo.png (drop your own into public/), and falls
 * back to the bundled /logo.svg so nothing ever renders broken.
 */
export default function Logo({ size = 42 }) {
  const [src, setSrc] = useState('/logo.png')
  return (
    <img
      src={src}
      alt="LostLink"
      width={size}
      height={size}
      style={{ objectFit: 'contain', display: 'block' }}
      onError={() => {
        if (src !== '/logo.svg') setSrc('/logo.svg')
      }}
    />
  )
}
