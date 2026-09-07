// emailService.js — Gửi email qua SMTP (Gmail) bằng nodemailer.
// Cấu hình lấy từ .env (EMAIL_HOST/PORT/USER/PASS). Trong môi trường dev

const nodemailer = require('nodemailer')
const { email: emailConfig, env } = require('../config/env')

let transporter = null

// Khởi tạo transporter một lần, tái sử dụng cho các lần gửi sau.
const getTransporter = () => {
  if (transporter) return transporter

  if (!emailConfig.host || !emailConfig.user || !emailConfig.pass) {
    console.warn('⚠️  Chưa cấu hình SMTP — email sẽ được in ra console (chế độ dev).')
    return null
  }

  transporter = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    secure: emailConfig.port === 465, // 465 = SSL; 587 = STARTTLS
    auth: { user: emailConfig.user, pass: emailConfig.pass },
    pool: true, // giữ kết nối để các lần gửi sau nhanh hơn (không bắt tay TLS lại)
  })

  return transporter
}

const FROM = `LostLink <${emailConfig.user || 'no-reply@lostlink.vn'}>`

// Gửi email; nếu không có SMTP thì in nội dung ra console để dev vẫn lấy được mã.
const sendMail = async ({ to, subject, html, text }) => {
  const tx = getTransporter()
  if (!tx) {
    console.log('\n──────── EMAIL (DEV) ────────')
    console.log('To:     ', to)
    console.log('Subject:', subject)
    console.log('Text:   ', text || html)
    console.log('─────────────────────────────\n')
    return
  }
  await tx.sendMail({ from: FROM, to, subject, html, text })
}

// Email chứa mã OTP 6 số kích hoạt tài khoản.
const sendVerificationCode = ({ to, code, minutes = 10 }) => {
  // Dev: in mã ra terminal để test nhanh, khỏi mở email (không log ở production).
  if (env !== 'production') console.log(`🔑 [DEV] Mã xác thực cho ${to} = ${code}`)
  return sendMail({
    to,
    subject: 'Mã xác thực LostLink',
    text: `Mã xác thực của bạn là ${code}. Mã có hiệu lực trong ${minutes} phút.`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto">
        <h2>Xác thực email LostLink</h2>
        <p>Nhập mã sau để kích hoạt tài khoản của bạn:</p>
        <p style="font-size:32px;font-weight:bold;letter-spacing:8px">${code}</p>
        <p style="color:#666">Mã có hiệu lực trong ${minutes} phút. Nếu bạn không yêu cầu, hãy bỏ qua email này.</p>
      </div>`,
  })
}

// Email chứa liên kết đặt lại mật khẩu.
const sendResetLink = ({ to, resetUrl, minutes = 30 }) =>
  sendMail({
    to,
    subject: 'Đặt lại mật khẩu LostLink',
    text: `Mở liên kết sau để đặt lại mật khẩu: ${resetUrl} (hiệu lực ${minutes} phút).`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto">
        <h2>Đặt lại mật khẩu LostLink</h2>
        <p>Bấm vào nút bên dưới để chọn mật khẩu mới:</p>
        <p><a href="${resetUrl}" style="display:inline-block;padding:12px 20px;background:#3B76D6;color:#fff;border-radius:8px;text-decoration:none">Đặt lại mật khẩu</a></p>
        <p style="color:#666">Liên kết có hiệu lực trong ${minutes} phút. Nếu bạn không yêu cầu, hãy bỏ qua email này.</p>
      </div>`,
  })

module.exports = { sendMail, sendVerificationCode, sendResetLink }
