// app.js — Dựng Express app (middleware + route + xử lý lỗi) và export ra ngoài.
// Không tự lắng nghe cổng hay kết nối DB — việc đó do server.js đảm nhiệm,
// nhờ vậy có thể import app vào test (supertest) mà không cần mở cổng.

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')

const config = require('./config/env')
const configViewEngine = require('./config/viewEngine')
const routes = require('./routes')
const { apiLimiter } = require('./middleware/rateLimiter')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

const app = express()

app.use(helmet())
app.use(cors({ origin: config.clientUrl, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
if (config.env !== 'production') app.use(morgan('dev'))

configViewEngine(app)

app.use('/api', apiLimiter, routes)

app.use(notFound)
app.use(errorHandler)

module.exports = app
