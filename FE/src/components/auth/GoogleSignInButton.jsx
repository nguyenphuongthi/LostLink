import { useEffect, useRef } from 'react'
import { loadGoogleScript, GOOGLE_CLIENT_ID } from '../../lib/google'

// Nút "Đăng nhập với Google" chính chủ do GIS render. Khi người dùng chọn tài
// khoản, GIS trả về một ID token (credential) — đẩy lên backend qua onCredential.
export default function GoogleSignInButton({ onCredential, onError, text = 'continue_with' }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
      onError?.('Thiếu cấu hình VITE_GOOGLE_CLIENT_ID.')
      return
    }

    let cancelled = false
    loadGoogleScript()
      .then(() => {
        if (cancelled || !ref.current) return
        const g = window.google
        g.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (res) => onCredential?.(res.credential),
        })
        ref.current.innerHTML = '' // tránh render trùng (StrictMode gọi effect 2 lần)
        g.accounts.id.renderButton(ref.current, {
          theme: 'filled_black',
          size: 'large',
          shape: 'pill',
          text,
          logo_alignment: 'center',
          width: 320,
        })
      })
      .catch((e) => onError?.(e.message))

    return () => {
      cancelled = true
    }
  }, [onCredential, onError, text])

  return <div ref={ref} className="flex justify-center" />
}
