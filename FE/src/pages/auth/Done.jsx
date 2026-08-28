import { a } from '../../theme/authTokens'
import { PrimaryButton } from '../../components/auth/AuthControls'

// Step 6 · Success — account activated. Entering the app hands off to the
// main experience.
export default function Done({ emailShown, notifyNote, onEnter }) {
  return (
    <div className="py-1.5 text-center">
      <div className="relative mx-auto mb-5 flex h-[62px] w-[62px] items-center justify-center rounded-full border border-[rgba(110,168,255,.3)] bg-[rgba(110,168,255,.16)]">
        <div className="absolute inset-0 rounded-full border border-[rgba(110,168,255,.6)] [animation:ll-pulse_3s_ease-out_infinite]" />
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M5 12.8 10 17.6 19.2 7" stroke={a.star} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h2 className="mb-2.5 text-[24px] font-bold tracking-[-.3px]">Tài khoản đã kích hoạt</h2>
      <p className="mb-2.5 text-[14px] leading-[1.6] text-au-dim">
        Email <strong className="text-au-ink">{emailShown}</strong> đã được xác thực.
      </p>
      <p className="mb-6 text-[12.5px] leading-[1.6] text-au-dim4">{notifyNote}</p>

      <PrimaryButton onClick={onEnter}>Vào LostLink</PrimaryButton>
    </div>
  )
}
