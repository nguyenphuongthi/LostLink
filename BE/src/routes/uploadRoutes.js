// uploadRoutes.js — Định tuyến upload ảnh: /api/uploads/* (yêu cầu đăng nhập).

const express = require('express')

const ctrl = require('../controllers/uploadController')
const upload = require('../middleware/uploadMiddleware')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/image', protect, upload.single('image'), ctrl.uploadSingle)
router.post('/images', protect, upload.array('images', 9), ctrl.uploadMultiple)

module.exports = router
