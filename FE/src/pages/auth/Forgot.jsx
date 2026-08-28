import { Field, PrimaryButton } from '../../components/auth/AuthControls'

// Step 4 · Request a password-reset link by email.
export default function Forgot({ email, onEmail, emailShown, onSubmit, forgotSent, goLogin }) {
  return (
    <>
      <h2 className="mb-2 text-[24px] font-bold tracking-[-.3px]">Quên mật khẩu</h2>
      <p className="mb-6 text-[14px] leading-[1.6] text-au-dim2">Vui lòng nhập email bạn đã đăng ký.</p>

      <div className="flex flex-col gap-4">
        <Field label="EMAIL" type="email" value={email} onChange={onEmail} />
        <PrimaryButton onClick={onSubmit}>Gửi liên kết đặt lại</PrimaryButton>
      </div>

      {forgotSent && (
        <div className="mt-[18px] flex gap-2.5 rounded-[10px] border border-[rgba(110,168,255,.28)] bg-[rgba(110,168,255,.14)] px-[15px] py-[13px] text-[13px] leading-[1.55] text-au-link-hover">
          <span className="font-bold">✓</span>
          <span>
            Đã gửi hướng dẫn tới <strong>{emailShown}</strong>.
          </span>
        </div>
      )}

      <p className="mt-6 text-[13.5px]">
        <span onClick={goLogin} className="cursor-pointer font-semibold text-au-link">← Về trang đăng nhập</span>
      </p>
    </>
  )
}
