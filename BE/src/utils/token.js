// token.js — Ký & xác minh JWT access / refresh token.

const jwt = require('jsonwebtoken')
const { jwt: jwtConfig } = require('../config/env')

const signAccessToken = (user) =>
  jwt.sign({ sub: user._id.toString(), role: user.role }, jwtConfig.secret, {
    expiresIn: jwtConfig.expire,
  })

const signRefreshToken = (user) =>
  jwt.sign({ sub: user._id.toString() }, jwtConfig.refreshSecret, {
    expiresIn: jwtConfig.refreshExpire,
  })

const verifyAccessToken = (token) => jwt.verify(token, jwtConfig.secret)

const verifyRefreshToken = (token) => jwt.verify(token, jwtConfig.refreshSecret)

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
  issueTokens,
}
