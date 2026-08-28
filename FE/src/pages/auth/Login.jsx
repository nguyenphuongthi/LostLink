import { Field, PrimaryButton, GoogleButton, Divider } from '../../components/auth/AuthControls'

// Step 1 (default) · Sign in with email + password.
export default function Login({ email, onEmail, onSubmit, onGoogle, goForgot, goRegister }) {
  return (
    <>
      <p className="mb-6 text-[14.5px] leading-[1.6] text-au-dim">Chào mừng bạn trở lại.</p>

      <div className="flex flex-col gap-4">
        <Field label="EMAIL" type="email" value={email} onChange={onEmail} />
        <Field label="MẬT KHẨU" type="password" />

        <div className="flex items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-2.5 whitespace-nowrap text-[13px] text-[rgba(234,241,251,.7)]">
            <input type="checkbox" className="h-[15px] w-[15px] cursor-pointer accent-[#3B76D6]" />
            Ghi nhớ đăng nhập
          </label>
          <span onClick={goForgot} className="auth-link whitespace-nowrap text-[13px] font-semibold text-au-link">
            Quên mật khẩu?
          </span>
        </div>

        <PrimaryButton className="mt-1.5" onClick={onSubmit}>Đăng nhập</PrimaryButton>

        <Divider className="mb-0.5 mt-1.5" />

        <GoogleButton onClick={onGoogle}>Tiếp tục với Google</GoogleButton>
      </div>

      <p className="mt-[22px] text-[13.5px] text-au-dim3">
        Chưa có tài khoản?{' '}
        <span onClick={goRegister} className="cursor-pointer font-semibold text-au-link">Đăng ký</span>
      </p>
    </>
  )
}
