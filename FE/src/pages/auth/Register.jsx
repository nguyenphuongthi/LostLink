import { Field, StrengthMeter, PrimaryButton, GoogleButton, Divider } from '../../components/auth/AuthControls'

// Step 2 · Create an account. Submitting sends a 6-digit code and advances
// to the verify screen.
export default function Register({ email, onEmail, password, onPassword, strength, notify, toggleNotify, onSubmit, onGoogle }) {
  return (
    <>
      <p className="mb-[22px] text-[14.5px] leading-[1.6] text-au-dim">
        Đăng ký bằng email — chúng tôi gửi mã xác thực để kích hoạt tài khoản.
      </p>

      <div className="flex flex-col gap-3.5">
        <Field label="TÊN HIỂN THỊ" type="text" />
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

        <PrimaryButton onClick={onSubmit}>Gửi mã xác thực</PrimaryButton>

        <Divider className="my-0.5" />

        <GoogleButton onClick={onGoogle}>Đăng ký với Google</GoogleButton>
      </div>
    </>
  )
}
