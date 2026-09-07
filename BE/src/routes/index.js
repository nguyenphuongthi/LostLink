// index.js — Gom toàn bộ route con dưới tiền tố /api.

const express = require('express')

const authRoutes = require('./authRoutes')

const router = express.Router()

router.get('/health', (req, res) => res.json({ success: true, status: 'ok', ts: Date.now() }))
router.use('/auth', authRoutes)

module.exports = router
