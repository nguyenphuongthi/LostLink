// googleService.js — Xác minh Google ID token (từ nút "Tiếp tục với Google").

const { OAuth2Client } = require('google-auth-library')
const ApiError = require('../utils/ApiError')
const { google } = require('../config/env')

const client = new OAuth2Client(google.clientId)

// Trả về hồ sơ Google đã xác minh { googleId, email, emailVerified, name, picture }.
const verifyGoogleIdToken = async (idToken) => {
  if (!idToken) throw ApiError.badRequest('Thiếu Google ID token.')

  let ticket
  try {
    ticket = await client.verifyIdToken({ idToken, audience: google.clientId })
  } catch {
    throw ApiError.unauthorized('Google ID token không hợp lệ.')
  }

  const payload = ticket.getPayload()
  if (!payload?.email) throw ApiError.unauthorized('Không lấy được email từ Google.')

  return {
    googleId: payload.sub,
    email: payload.email.toLowerCase(),
    emailVerified: Boolean(payload.email_verified),
    name: payload.name,
    picture: payload.picture,
  }
}

module.exports = { verifyGoogleIdToken }
