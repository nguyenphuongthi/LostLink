// api.js — Lớp gọi HTTP mỏng tới backend. Tự đính kèm JWT (nếu có) và ném lỗi
// mang message từ server để UI hiển thị.

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const TOKEN_KEY = 'll_token'

export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

async function request(path, { method = 'GET', body, auth = true } = {}) {
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
