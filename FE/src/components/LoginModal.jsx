import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

// Raised whenever a guest attempts a User-only action. Logging in flips
// the app role to 'user'; "Đăng ký ngay" hands off to the full auth flow.
export default function LoginModal() {
  const navigate = useNavigate()
  const { showLogin, closeLogin, doLogin } = useApp()
  if (!showLogin) return null

  const goRegister = (e) => {
    e.preventDefault()
    closeLogin()
    navigate('/auth?screen=register')
  }

  return (
    <div
      onClick={closeLogin}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(22,35,58,0.45)]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[440px] rounded-[14px] bg-white p-8 shadow-[0_24px_60px_rgba(0,0,0,.25)]"
      >
        <div className="mb-1.5 text-[19.5px] font-bold tracking-[-0.02em]">Đăng nhập để tiếp tục</div>
        <div className="mb-6 text-[12.5px] leading-[1.55] text-muted">
          Đăng nhập rồi bạn có thể bình luận, nhận lại đồ và nhắn tin với người nhặt được.
        </div>

        <div className="mb-[7px] text-[12px] font-medium">Email</div>
        <div className={inputBox}>ten@email.com</div>

        <div className="mb-[7px] mt-3.5 text-[12px] font-medium">Mật khẩu</div>
        <div className={inputBox}>••••••••</div>

        <div className="my-4 mb-5 flex items-center gap-2.5">
          <div className="flex h-[18px] w-[18px] items-center justify-center rounded-[5px] bg-blue">
            <div className="-mt-0.5 h-2 w-1 rotate-45 border-b-2 border-r-2 border-white" />
          </div>
          <div className="text-[11.5px] text-ink2">Nhận email khi có người cần liên hệ hoặc có gợi ý mới</div>
        </div>

        <div
          className="ll-primary flex h-12 cursor-pointer items-center justify-center rounded-[9px] bg-blue text-[13.5px] font-semibold text-white"
          onClick={doLogin}
        >
          Đăng nhập
        </div>
        <div className="mt-3.5 text-center text-[12px] text-muted">
          Chưa có tài khoản? <a href="/auth?screen=register" onClick={goRegister}>Đăng ký ngay</a>
        </div>
      </div>
    </div>
  )
}

const inputBox =
  'flex h-[46px] items-center rounded-lg border border-line bg-soft px-3.5 text-[13px] text-muted3'
