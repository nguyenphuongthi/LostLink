import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NAV = ['Trang cá nhân', 'Ai thấy gì về bạn', 'Khu vực để ý', 'Thông báo', 'Tài khoản']
const PRIVACY = [
  { key: 'p1', label: 'Hiện vùng rộng thay vì điểm chính xác', desc: 'Người khác chỉ thấy một vòng khoảng 400 m quanh chỗ bạn chọn.' },
  { key: 'p2', label: 'Cho người khác xem trang cá nhân của tôi', desc: 'Gồm số lần trao trả và lời cảm ơn mọi người gửi cho bạn.' },
  { key: 'p3', label: 'Cho người khác tìm tôi bằng email', desc: 'Tắt nếu bạn không muốn người quen tìm thấy tài khoản này.' },
]
const AREA_OPTIONS = ['Quận 1', 'Bến xe Mỹ Đình', 'Quận 3', 'Đại học Bách khoa']
const ACCOUNT = [
  { label: 'Đổi mật khẩu', desc: 'Lần đổi gần nhất: 3 tháng trước', btn: 'Đổi', danger: false },
  { label: 'Tạm ẩn tài khoản', desc: 'Bài của bạn sẽ ẩn đi, bạn quay lại lúc nào cũng được', btn: 'Tạm ẩn', danger: false },
  { label: 'Xóa tài khoản', desc: 'Mọi bài đăng và tin nhắn sẽ mất, không lấy lại được', btn: 'Xóa', danger: true },
]

// U10 · Account settings & privacy.
export default function Settings() {
  const navigate = useNavigate()
  const [section, setSection] = useState('Trang cá nhân')
  const [priv, setPriv] = useState({ p1: true, p2: true, p3: false })
  const [areas, setAreas] = useState(['Quận 1', 'Bến xe Mỹ Đình'])

  const toggleArea = (l) => setAreas((s) => (s.includes(l) ? s.filter((x) => x !== l) : [...s, l]))

  return (
    <div className="mx-auto max-w-[1060px] px-4 pt-5 sm:px-6 lg:px-10 lg:pt-7">
      <div className="mb-1 text-[22px] font-bold tracking-[-0.028em] lg:text-[25px]">Cài đặt</div>
      <div className="mb-[22px] text-[13px] text-muted">Bạn quyết định người khác thấy gì về mình.</div>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[220px_1fr]">
        <div className="card flex gap-1 overflow-x-auto p-2.5 lg:sticky lg:top-5 lg:block">
          {NAV.map((l) => {
            const on = section === l
            return (
              <div
                key={l}
                onClick={() => setSection(l)}
                className={`flex-shrink-0 cursor-pointer whitespace-nowrap rounded-[10px] px-3.5 py-[11px] text-[12px] font-semibold ${on ? 'bg-blue-soft text-blue-ink' : 'text-ink2'}`}
              >
                {l}
              </div>
            )
          })}
        </div>

        <div className="flex flex-col gap-4">
          {/* Profile */}
          <div className="card p-5 lg:p-6">
            <div className="mb-[18px] text-[15px] font-bold">Trang cá nhân</div>
            <div className="mb-5 flex items-center gap-4">
              <div className="flex h-[62px] w-[62px] items-center justify-center rounded-full bg-blue-soft text-[17px] font-bold text-blue">NT</div>
              <div>
                <div className="ll-tab-soft inline-flex h-9 cursor-pointer items-center rounded-[10px] bg-chip px-4 text-[12px] font-semibold">Đổi ảnh</div>
                <div className="mt-[7px] text-[11px] text-muted2">Ảnh rõ mặt giúp người khác yên tâm khi hẹn gặp</div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Tên hiển thị" value="Nguyễn Thu Hà" />
              <Field label="Tên tài khoản" value="thuha.q1" muted />
            </div>
          </div>

          {/* Privacy */}
          <div className="card p-5 lg:p-6">
            <div className="mb-1 text-[15px] font-bold">Ai thấy gì về bạn</div>
            <div className="mb-5 text-[12px] text-muted">LostLink luôn hiện vùng rộng thay vì địa chỉ chính xác của bạn.</div>
            <div className="mb-5">
              <div className="mb-1 text-[12.5px] font-semibold">Email xác nhận</div>
              <div className="mb-2.5 text-[11.5px] text-muted2">Đăng nhập, đổi mật khẩu và xác nhận đã nhận đồ đều làm qua email này. LostLink không cần số điện thoại của bạn.</div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex h-11 flex-1 items-center gap-2.5 rounded-[10px] border border-line bg-soft px-3.5 text-[13px]">
                  <span className="truncate">thuha.nguyen@gmail.com</span>
                  <div className="ml-auto flex h-6 flex-shrink-0 items-center rounded-full bg-green-soft px-2.5 text-[10.5px] font-semibold text-green">Đã xác nhận</div>
                </div>
                <div className="ll-tab-soft inline-flex h-11 cursor-pointer items-center justify-center rounded-[10px] bg-chip px-[18px] text-[12px] font-semibold">Đổi email</div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              {PRIVACY.map((p) => {
                const on = priv[p.key]
                return (
                  <div
                    key={p.key}
                    onClick={() => setPriv((s) => ({ ...s, [p.key]: !s[p.key] }))}
                    className="flex cursor-pointer items-center gap-3.5 border-t border-line2 py-3"
                  >
                    <div className="flex-1">
                      <div className="mb-0.5 text-[12.5px] font-medium">{p.label}</div>
                      <div className="text-[11px] leading-[1.5] text-muted2">{p.desc}</div>
                    </div>
                    <Toggle on={on} />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Areas */}
          <div className="card p-5 lg:p-6">
            <div className="mb-1 text-[15px] font-bold">Khu vực bạn muốn để ý</div>
            <div className="mb-[18px] text-[12px] text-muted">Mình chỉ nhắn khi có tin trong những vùng này.</div>
            <div className="mb-[22px] flex flex-wrap gap-2.5">
              {AREA_OPTIONS.map((l) => {
                const on = areas.includes(l)
                return (
                  <div
                    key={l}
                    onClick={() => toggleArea(l)}
                    className={`flex h-8 cursor-pointer items-center rounded-full px-3.5 text-[11.5px] font-medium ${on ? 'bg-blue text-white' : 'bg-chip text-ink2'}`}
                  >
                    {l}
                  </div>
                )
              })}
              <div className="ll-area-add flex h-8 cursor-pointer items-center rounded-full border border-dashed border-[#CFDAE8] px-3.5 text-[11.5px] font-medium text-muted">+ Thêm khu vực</div>
            </div>
            <div className="mb-2 flex justify-between text-[11.5px] text-muted">
              <span>Bán kính nhắc tin</span>
              <span className="font-semibold text-ink">3 km</span>
            </div>
            <div className="relative h-1.5 rounded-full bg-[#E7ECF3]">
              <div className="absolute inset-y-0 left-0 w-[42%] rounded-full bg-blue" />
              <div className="absolute -top-[5px] left-[42%] -ml-2 h-4 w-4 rounded-full border-[3px] border-blue bg-white" />
            </div>
          </div>

          {/* Account */}
          <div className="card p-5 lg:p-6">
            <div className="mb-3.5 text-[15px] font-bold">Tài khoản</div>
            <div className="flex flex-col">
              {ACCOUNT.map((r, i) => (
                <div key={i} className="flex items-center gap-3.5 border-t border-line2 py-3.5">
                  <div className="flex-1">
                    <div className={`text-[12.5px] font-semibold ${r.danger ? 'text-red-ink' : 'text-ink'}`}>{r.label}</div>
                    <div className="mt-0.5 text-[11px] leading-[1.5] text-muted2">{r.desc}</div>
                  </div>
                  <div
                    className={`flex h-[38px] cursor-pointer items-center rounded-[10px] px-[18px] text-[12px] font-semibold ${
                      r.danger ? 'border border-red-line bg-[#FBEDEF] text-red-ink' : 'bg-chip text-ink'
                    }`}
                  >
                    {r.btn}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pb-2">
            <div className="ll-primary flex h-12 cursor-pointer items-center rounded-[10px] bg-blue px-[26px] text-[13.5px] font-semibold text-white">Lưu thay đổi</div>
            <div
              className="ll-subtle flex h-12 cursor-pointer items-center rounded-[10px] border border-line px-[22px] text-[13.5px] font-semibold text-ink2"
              onClick={() => navigate('/home')}
            >
              Thoát
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Field = ({ label, value, muted }) => (
  <div>
    <div className="mb-[7px] text-[12px] font-medium">{label}</div>
    <div className={`flex h-11 items-center rounded-[10px] border border-line bg-soft px-3.5 text-[13px] ${muted ? 'text-muted' : 'text-ink'}`}>
      {value}
    </div>
  </div>
)

function Toggle({ on }) {
  return (
    <div className={`flex h-[23px] w-10 flex-shrink-0 rounded-full p-[2.5px] ${on ? 'bg-blue' : 'bg-[#D3DBE6]'}`}>
      <div className="h-[18px] w-[18px] rounded-full bg-white transition-[margin]" style={{ marginLeft: on ? 17 : 0 }} />
    </div>
  )
}
