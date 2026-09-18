// api.js — Lớp gọi HTTP mỏng tới backend. Tự đính kèm JWT (nếu có) và ném lỗi
// mang message từ server để UI hiển thị.

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const TOKEN_KEY = 'll_token'
const REFRESH_KEY = 'll_refresh'

const read = (key) => {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

export const getToken = () => read(TOKEN_KEY)

export const saveTokens = ({ token, refreshToken }) => {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken)
  } catch {
    /* ignore */
  }
}

export const clearTokens = () => {
  try {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_KEY)
  } catch {
    /* ignore */
  }
}

// Dùng chung một lần refresh cho các request 401 đồng thời.
let refreshing = null

const refreshTokens = () => {
  if (!refreshing) {
    refreshing = fetch(BASE + '/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: read(REFRESH_KEY) }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('refresh failed')
        saveTokens((await res.json()).data)
      })
      .finally(() => {
        refreshing = null
      })
  }
  return refreshing
}

async function request(path, { method = 'GET', body, auth = true, retry = true } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(BASE + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (res.status === 401 && auth && retry && read(REFRESH_KEY)) {
    try {
      await refreshTokens()
    } catch {
      clearTokens()
      window.dispatchEvent(new Event('auth:expired'))
    }
    if (getToken()) return request(path, { method, body, auth, retry: false })
  }

  let data = null
  try {
    data = await res.json()
  } catch {
    // Phản hồi không phải JSON (vd 204) — bỏ qua.
  }

  if (!res.ok) {
    // Ưu tiên thông báo cụ thể theo từng field (từ express-validator) nếu có,
    // thay vì message tổng "Dữ liệu không hợp lệ.".
    let message = data?.message || 'Có lỗi xảy ra, vui lòng thử lại.'
    if (Array.isArray(data?.errors) && data.errors.length) {
      message = data.errors.map((e) => e.message).join(' ')
    }
    const err = new Error(message)
    err.status = res.status
    err.data = data
    throw err
  }
  return data
}

export const api = {
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
}
