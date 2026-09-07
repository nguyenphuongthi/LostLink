// google.js — Nạp Google Identity Services (GIS) một lần và export client ID.

const SRC = 'https://accounts.google.com/gsi/client'

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

let promise = null

// Trả về Promise hoàn tất khi window.google.accounts.id sẵn sàng.
export const loadGoogleScript = () => {
  if (window.google?.accounts?.id) return Promise.resolve()
  if (promise) return promise

  promise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = SRC
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Không tải được Google Sign-In.'))
    document.head.appendChild(script)
  })
  return promise
}
