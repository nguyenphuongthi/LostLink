// authRoutes.js — Định tuyến xác thực: /api/auth/*

const express = require('express')

const ctrl = require('../controllers/authController')
const validate = require('../middleware/validateMiddleware')
const { protect } = require('../middleware/authMiddleware')
const { authLimiter } = require('../middleware/rateLimiter')
const {
  registerRules,
  verifyRules,
  resendRules,
  loginRules,
  googleRules,
  forgotRules,
  resetRules,
} = require('../middleware/validation/authValidation')

const router = express.Router()

router.post('/register', authLimiter, registerRules, validate, ctrl.register)
router.post('/verify-email', authLimiter, verifyRules, validate, ctrl.verifyEmail)
router.post('/resend-code', authLimiter, resendRules, validate, ctrl.resendCode)
router.post('/login', authLimiter, loginRules, validate, ctrl.login)
router.post('/google', authLimiter, googleRules, validate, ctrl.google)
router.post('/forgot-password', authLimiter, forgotRules, validate, ctrl.forgotPassword)
router.post('/reset-password', authLimiter, resetRules, validate, ctrl.resetPassword)
router.post('/refresh', ctrl.refresh)
router.post('/logout', ctrl.logout)
router.get('/me', protect, ctrl.me)

module.exports = router
