import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

// Popup nhỏ hiện khi Guest thao tác vào chức năng cần đăng nhập. Không đăng
// nhập trực tiếp tại đây — chỉ nhắc và chuyển hướng sang trang /auth.
export default function LoginModal() {
  const navigate = useNavigate()
  const { showLogin, closeLogin } = useApp()
  if (!showLogin) return null

  const goLogin = () => {
    closeLogin()
    navigate('/auth?screen=login')
  }

  const goRegister = (e) => {
    e.preventDefault()
    closeLogin()
    navigate('/auth?screen=register')
  }

  return (
    <div
      onClick={closeLogin}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(22,35,58,0.45)] px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[380px] rounded-[14px] bg-white p-7 text-center shadow-[0_24px_60px_rgba(0,0,0,.25)]"
      >
        <button
          aria-label="Đóng"
          onClick={closeLogin}
          className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-lg text-[16px] text-muted3 hover:bg-chip"
        >
          ✕
        </button>

        {/* Icon khoá */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-soft text-blue">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="4" y="10.5" width="16" height="10" rx="2.4" stroke="currentColor" strokeWidth="1.8" />
            <path d="M7.5 10.5V7.5a4.5 4.5 0 0 1 9 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>

        <div className="mb-1.5 text-[19px] font-bold tracking-[-0.02em]">Đăng nhập để tiếp tục</div>
        <div className="mb-6 text-[12.5px] leading-[1.55] text-muted">
          Bạn cần đăng nhập để bình luận, nhận lại đồ và nhắn tin với người nhặt được.
        </div>

        <button
          onClick={goLogin}
          className="ll-primary flex h-12 w-full cursor-pointer items-center justify-center rounded-[9px] bg-blue text-[13.5px] font-semibold text-white"
        >
          Đến trang đăng nhập
        </button>

        <div className="mt-3.5 text-[12px] text-muted">
          Chưa có tài khoản?{' '}
          <a href="/auth?screen=register" onClick={goRegister} className="font-semibold text-blue">
            Đăng ký ngay
          </a>
        </div>
      </div>
    </div>
  )
}
