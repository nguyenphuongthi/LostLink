require('dotenv').config()

const REQUIRED = ['MONGO_URI', 'JWT_SECRET', 'JWT_REFRESH_SECRET']
const missing = REQUIRED.filter((key) => !process.env[key])
if (missing.length) {
  console.error(`❌ Thiếu biến môi trường bắt buộc: ${missing.join(', ')}`)
  process.exit(1)
}

const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:8080',
  mongoUri: process.env.MONGO_URI,

  jwt: {
    secret: process.env.JWT_SECRET,
    expire: process.env.JWT_EXPIRE || '30d',
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpire: process.env.JWT_REFRESH_EXPIRE || '7d',
  },

  email: {
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
}

module.exports = config
