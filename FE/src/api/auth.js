// auth.js — Các lời gọi API xác thực, ánh xạ 1-1 với route /api/auth/* của backend.

import { api } from '../lib/api'

export const register = (payload) => api.post('/auth/register', payload, { auth: false })

export const verifyEmail = (payload) => api.post('/auth/verify-email', payload, { auth: false })

export const resendCode = (email) => api.post('/auth/resend-code', { email }, { auth: false })

export const login = (payload) => api.post('/auth/login', payload, { auth: false })

export const googleLogin = (idToken) => api.post('/auth/google', { idToken }, { auth: false })

export const forgotPassword = (email) => api.post('/auth/forgot-password', { email }, { auth: false })

export const resetPassword = (payload) => api.post('/auth/reset-password', payload, { auth: false })

// Khôi phục phiên: trả về object user hiện tại (yêu cầu token hợp lệ).
export const fetchMe = () => api.get('/auth/me').then((res) => res.data.user)
