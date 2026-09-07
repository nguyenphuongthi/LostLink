import { Field, PrimaryButton } from '../../components/auth/AuthControls'

// Step 5 · Choose a new password (reached from the emailed reset link).
export default function Reset({ emailShown, password, onPassword, confirmPassword, onConfirmPassword, onSubmit, loading }) {
  return (
    <>
      <h2 className="mb-2 text-[24px] font-bold tracking-[-.3px]">Đặt mật khẩu mới</h2>
      <p className="mb-6 text-[14px] text-au-dim2">
        Cho tài khoản <strong className="text-au-ink">{emailShown}</strong>.
      </p>

      <div className="flex flex-col gap-4">
        <Field label="MẬT KHẨU MỚI" type="password" value={password} onChange={onPassword} />
        <Field label="NHẬP LẠI MẬT KHẨU" type="password" value={confirmPassword} onChange={onConfirmPassword} />
        <PrimaryButton onClick={onSubmit} disabled={loading}>
          {loading ? 'Đang lưu…' : 'Lưu mật khẩu mới'}
        </PrimaryButton>
      </div>
    </>
  )
}
