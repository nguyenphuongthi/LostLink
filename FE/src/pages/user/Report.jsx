import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const REASONS = [
  { label: 'Người này đòi tiền mới trả đồ', hint: 'Nhận lại đồ trên LostLink luôn miễn phí.' },
  { label: 'Tin rác, quảng cáo hoặc spam', hint: 'Bài đăng bán hàng, chèn link lạ, đăng lại nhiều lần.' },
  { label: 'Tin có vẻ không thật', hint: 'Ảnh lấy từ nơi khác, mô tả chung chung, không trả lời gì cụ thể.' },
  { label: 'Họ nhắn tin làm tôi thấy không thoải mái', hint: 'Nói năng thô, hỏi chuyện riêng tư, nhắn liên tục.' },
  { label: 'Không phải chủ nhân mà vẫn nhận đồ', hint: 'Trả lời sai nhưng vẫn khăng khăng là của mình.' },
  { label: 'Chuyện khác', hint: 'Bạn kể ở phần dưới, mình đọc hết.' },
]
const STEPS = [
  'Người của LostLink đọc trong vòng 12 giờ, không dùng máy tự động quyết định.',
  'Nếu cần, mình nhắn riêng hỏi bạn thêm — không hỏi mật khẩu hay tiền bao giờ.',
  'Bạn nhận được kết quả xử lý, và người bị báo không biết ai đã báo.',
]
const EVIDENCE = ['Ảnh chụp màn hình', 'Thêm ảnh', 'Thêm ảnh']

// U9 · Report a user / listing and safety guidance.
export default function Report() {
  const navigate = useNavigate()
  const [reason, setReason] = useState(1)
  const [block, setBlock] = useState(true)
  const [sent, setSent] = useState(false)

  return (
    <div className="mx-auto max-w-[1060px] px-10 pt-7">
      <div className="grid grid-cols-[1fr_320px] items-start gap-5">
        <div className="card p-7">
          <div className="mb-1.5 text-[22.5px] font-bold tracking-[-0.025em]">Kể cho mình chuyện gì đang xảy ra</div>
          <div className="mb-6 text-[13px] leading-[1.6] text-muted">
            Bạn không cần chắc chắn tuyệt đối. Cứ nói những gì bạn thấy, người của LostLink sẽ xem giúp bạn.
          </div>

          <div className="mb-6 flex items-center gap-3.5 rounded-xl border border-line2 bg-soft px-4 py-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-soft text-[11.5px] font-bold text-blue">HN</div>
            <div className="flex-1">
              <div className="text-[13px] font-semibold">@hoangnam.q1</div>
              <div className="text-[11px] text-muted2">Tin 'Ví da nâu có giấy tờ tên N.T.H' · trò chuyện từ 09:12 hôm nay</div>
            </div>
          </div>

          <div className="mb-3 text-[14.5px] font-bold">Chuyện gần nhất với điều bạn gặp</div>
          <div className="mb-[26px] flex flex-col gap-2.5">
            {REASONS.map((r, i) => {
              const on = reason === i
              return (
                <div
                  key={i}
                  onClick={() => setReason(i)}
                  className={`flex cursor-pointer gap-3 rounded-xl border px-4 py-3.5 ${on ? 'border-blue bg-[#F4F8FD]' : 'border-line bg-white'}`}
                >
                  <div className={`mt-0.5 flex h-[19px] w-[19px] flex-shrink-0 items-center justify-center rounded-full border-2 ${on ? 'border-blue' : 'border-[#CFDAE8]'}`}>
                    <div className={`h-[9px] w-[9px] rounded-full ${on ? 'bg-blue' : 'bg-transparent'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="mb-0.5 text-[13px] font-semibold">{r.label}</div>
                    <div className="text-[11.5px] leading-[1.5] text-muted">{r.hint}</div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mb-2.5 text-[14.5px] font-bold">Kể thêm nếu bạn muốn</div>
          <div className="mb-5 min-h-[96px] rounded-xl border border-line bg-soft p-4 text-[13px] leading-[1.6] text-muted3">
            Ví dụ: bạn ấy nói phải chuyển 500.000đ trước mới cho gặp…
          </div>

          <div className="mb-2.5 text-[14.5px] font-bold">Ảnh chụp màn hình (không bắt buộc)</div>
          <div className="mb-6 grid grid-cols-3 gap-3">
            {EVIDENCE.map((e, i) => (
              <div
                key={i}
                className="ll-evidence flex h-[108px] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-[1.5px] border-dashed border-[#CFDAE8] bg-[#FBFCFE]"
              >
                <div className="h-[22px] w-[22px] rounded-lg border-2 border-muted3" />
                <div className="text-[11px] text-muted2">{e}</div>
              </div>
            ))}
          </div>

          <div className="mb-6 flex cursor-pointer items-center gap-2.5" onClick={() => setBlock((v) => !v)}>
            <div className={`flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-[5px] ${block ? 'bg-blue' : 'border-[1.5px] border-[#CFDAE8] bg-white'}`}>
              {block && <div className="-mt-0.5 h-2 w-1 rotate-45 border-b-2 border-r-2 border-white" />}
            </div>
            <div className="text-[12px] text-ink2">Chặn @hoangnam.q1 và ẩn tin của họ khỏi trang chủ của bạn</div>
          </div>

          <div className="flex gap-3">
            <div
              onClick={() => setSent(true)}
              className={`flex h-12 cursor-pointer items-center rounded-[10px] px-[26px] text-[13.5px] font-semibold ${
                sent ? 'border border-blue-line bg-blue-soft text-blue' : 'bg-red text-white'
              }`}
            >
              {sent ? 'Mình đã nhận được, cảm ơn bạn' : 'Gửi cho LostLink'}
            </div>
            <div
              className="ll-subtle flex h-12 cursor-pointer items-center rounded-[10px] border border-line px-[22px] text-[13.5px] font-semibold text-ink2"
              onClick={() => navigate('/chat')}
            >
              Quay lại trò chuyện
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3.5">
          <div className="card p-5">
            <div className="mb-3 text-[14px] font-bold">Rồi sẽ thế nào?</div>
            <div className="flex flex-col gap-3.5">
              {STEPS.map((t, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-blue-soft text-[11px] font-bold text-blue">{i + 1}</div>
                  <div className="text-[12px] leading-[1.55] text-ink2">{t}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-red-line bg-[#FBEDEF] p-5">
            <div className="mb-1.5 text-[13.5px] font-bold text-red-ink">Nếu bạn đang không an toàn</div>
            <div className="mb-3 text-[11.5px] leading-[1.55] text-[#8E3A4B]">Đừng đi gặp một mình. Gọi 113 hoặc tới công an phường gần nhất trước, mọi việc khác tính sau.</div>
            <div className="flex h-10 cursor-pointer items-center justify-center rounded-[10px] bg-red text-[12.5px] font-bold text-white">Gọi 113</div>
          </div>
          <div className="card p-5">
            <div className="mb-1.5 text-[13px] font-bold">Mẹo nhỏ khi hẹn gặp</div>
            <div className="text-[11.5px] leading-[1.6] text-muted">Hẹn nơi đông người, ban ngày, và nói cho một người thân biết bạn đi đâu. LostLink không bao giờ yêu cầu bạn trả tiền để nhận lại đồ.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
