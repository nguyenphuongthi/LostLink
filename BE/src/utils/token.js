// token.js — Ký & xác minh JWT access / refresh token.

const jwt = require('jsonwebtoken')
const { jwt: jwtConfig } = require('../config/env')

const signAccessToken = (user) =>
  jwt.sign(
    { sub: user._id.toString(), role: user.role, ver: user.tokenVersion },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expire }
  )

const signRefreshToken = (user) =>
  jwt.sign({ sub: user._id.toString(), ver: user.tokenVersion }, jwtConfig.refreshSecret, {
    expiresIn: jwtConfig.refreshExpire,
  })

const verifyAccessToken = (token) => jwt.verify(token, jwtConfig.secret)

const verifyRefreshToken = (token) => jwt.verify(token, jwtConfig.refreshSecret)

// Token đã bị thu hồi nếu version không khớp với user hiện tại.
const isRevoked = (payload, user) => (payload.ver ?? 0) !== (user.tokenVersion ?? 0)

// Cặp token trả về client sau khi đăng nhập / xác thực thành công.
const issueTokens = (user) => ({
  token: signAccessToken(user),
  refreshToken: signRefreshToken(user),
})

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  isRevoked,
  issueTokens,
}
