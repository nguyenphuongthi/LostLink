// uploadRoutes.js — Định tuyến upload ảnh: /api/uploads/* (yêu cầu đăng nhập).

const express = require('express')

const ctrl = require('../controllers/uploadController')
const upload = require('../middleware/uploadMiddleware')
const { protect, can } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/image', protect, can('upload:create'), upload.single('image'), ctrl.uploadSingle)
router.post('/images', protect, can('upload:create'), upload.array('images', 9), ctrl.uploadMultiple)

module.exports = router
