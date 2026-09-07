import { Field, StrengthMeter, PrimaryButton, Divider } from '../../components/auth/AuthControls'
import GoogleSignInButton from '../../components/auth/GoogleSignInButton'

// Step 2 · Create an account. Submitting sends a 6-digit code and advances
// to the verify screen.
export default function Register({ username, onUsername, email, onEmail, password, onPassword, strength, notify, toggleNotify, onSubmit, onGoogleCredential, onGoogleError, loading }) {
  return (
    <>
      <div className="flex flex-col gap-3.5">
        <div className="flex flex-col gap-[7px]">
          <Field label="TÊN NGƯỜI DÙNG" type="text" value={username} onChange={onUsername} placeholder="vd: hoangnam123" />
          <span className="text-[11.5px] leading-[1.45] text-au-dim3">
            3–30 ký tự, chỉ gồm chữ, số, dấu chấm (.) và gạch dưới (_) không dấu, không ký tự đặc biệt.
          </span>
        </div>
        <Field label="EMAIL" type="email" value={email} onChange={onEmail} />

        <div className="flex flex-col gap-[7px]">
          <Field label="MẬT KHẨU" type="password" value={password} onChange={onPassword} />
          <StrengthMeter width={strength.width} color={strength.color} label={strength.label} />
        </div>

        <div
          onClick={toggleNotify}
          className={`flex cursor-pointer gap-[11px] rounded-xl border px-[15px] py-3.5 transition-colors ${
            notify ? 'border-[rgba(110,168,255,.34)] bg-[rgba(110,168,255,.1)]' : 'border-white/[0.14] bg-white/[0.04]'
          }`}
        >
          <input
            type="checkbox"
            checked={notify}
            onChange={toggleNotify}
            className="mt-0.5 h-4 w-4 flex-none cursor-pointer accent-[#3B76D6]"
          />
          <div className="self-center text-[13px] font-medium leading-[1.5]">
            Nhận thông báo qua email khi hệ thống có thông tin liên quan đến món đồ của bạn
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-2.5 text-[12.5px] leading-[1.5] text-[rgba(234,241,251,.58)]">
          <input type="checkbox" className="mt-px h-[15px] w-[15px] flex-none cursor-pointer accent-[#3B76D6]" />
          <span>
            Tôi đồng ý với <a href="#dieu-khoan" onClick={(e) => e.preventDefault()}>điều khoản sử dụng</a> và{' '}
            <a href="#quyen-rieng-tu" onClick={(e) => e.preventDefault()}>Chính sách quyền riêng tư</a>.
          </span>
        </label>

        <PrimaryButton onClick={onSubmit} disabled={loading}>
          {loading ? 'Đang gửi…' : 'Gửi mã xác thực'}
        </PrimaryButton>

        <Divider className="my-0.5" />

        <GoogleSignInButton onCredential={onGoogleCredential} onError={onGoogleError} text="signup_with" />
      </div>
    </>
  )
}
