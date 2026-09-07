import { a } from '../../theme/authTokens'
import { PrimaryButton } from '../../components/auth/AuthControls'

// Step 3 · Enter the 6-digit code emailed after registration. `slots`
// carries per-box value + ref + handlers so focus advances as you type.
export default function Verify({ emailShown, slots, onSubmit, resendText, canResend, resend, goRegister, loading }) {
  return (
    <>
      <div className="mb-[18px] flex h-[50px] w-[50px] items-center justify-center rounded-[14px] border border-[rgba(110,168,255,.3)] bg-[rgba(110,168,255,.16)]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="2.6" y="4.6" width="18.8" height="14.8" rx="3" stroke={a.star} strokeWidth="1.8" />
          <path d="M3.6 7 12 13l8.4-6" stroke={a.star} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h2 className="mb-2 text-[24px] font-bold tracking-[-.3px]">Xác thực email</h2>
      <p className="mb-6 text-[14px] leading-[1.6] text-au-dim2">
        Mã 6 số đã gửi tới <strong className="text-au-ink">{emailShown}</strong>, hiệu lực 10 phút.
      </p>

      <div className="flex gap-2.5">
        {slots.map((slot, i) => (
          <input
            key={i}
            className="auth-input"
            type="text"
            inputMode="numeric"
            maxLength={1}
            ref={slot.ref}
            value={slot.value}
            onChange={slot.onChange}
            onKeyDown={slot.onKeyDown}
            style={{ height: 56, padding: 0, textAlign: 'center', fontSize: 21, fontWeight: 600 }}
          />
        ))}
      </div>

      <PrimaryButton className="mt-5" onClick={onSubmit} disabled={loading}>
        {loading ? 'Đang xác nhận…' : 'Xác nhận'}
      </PrimaryButton>

      <div className="mt-4 text-[13px] text-[rgba(234,241,251,.58)]">
        {resendText}{' '}
        <span
          onClick={resend}
          className={`font-semibold ${canResend ? 'cursor-pointer text-au-link' : 'cursor-default text-[rgba(234,241,251,.35)]'}`}
        >
          Gửi lại mã
        </span>
      </div>

      <div className="mt-5 rounded-[10px] bg-white/[0.05] px-[15px] py-[13px] text-[12.5px] leading-[1.6] text-au-dim3">
        Không thấy email? Kiểm tra Spam — người gửi <strong className="text-[rgba(234,241,251,.8)]">no-reply@lostlink.vn</strong>.
      </div>

      <div className="mt-[18px] text-[13.5px] text-au-dim3">
        Sai địa chỉ?{' '}
        <span onClick={goRegister} className="cursor-pointer font-semibold text-au-link">Đổi email</span>
      </div>
    </>
  )
}
