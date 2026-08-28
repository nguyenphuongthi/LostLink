import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IMG, PHOTO } from '../../theme/tokens'

const RATING_LABELS = ['', 'Chưa ổn lắm', 'Tạm được', 'Bình thường', 'Tốt', 'Rất dễ chịu']
const TAGS = ['Đúng hẹn', 'Nhắn tin rõ ràng', 'Giữ đồ cẩn thận', 'Không đòi tiền', 'Chọn chỗ gặp an toàn']
const AFTER = [
  "Bài đăng của bạn chuyển sang 'Đã tìm thấy' và không hiện trên trang chủ nữa.",
  '@hoangnam.q1 được cộng một lần trao trả thành công vào trang cá nhân.',
  'Ảnh và mô tả món đồ sẽ tự ẩn sau 7 ngày cho riêng tư của bạn.',
]

// U8 · Confirm hand-over and thank the finder.
export default function Thanks() {
  const navigate = useNavigate()
  const [rating, setRating] = useState(5)
  const [tags, setTags] = useState(['Đúng hẹn', 'Nhắn tin rõ ràng'])
  const [publicThanks, setPublicThanks] = useState(true)
  const [sent, setSent] = useState(false)

  const toggleTag = (l) => setTags((s) => (s.includes(l) ? s.filter((x) => x !== l) : [...s, l]))

  return (
    <div className="mx-auto max-w-[1060px] px-4 pt-5 sm:px-6 lg:px-10 lg:pt-7">
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1fr_320px]">
        <div className="card p-5 lg:p-7">
          <div className="mb-3.5 flex items-center gap-2.5">
            <div className="flex h-[26px] items-center rounded-full bg-blue-soft px-3 text-[11px] font-bold text-blue">ĐÃ TRAO TRẢ</div>
            <div className="text-[11.5px] text-muted2">Cả hai đã xác nhận lúc 15:24 hôm nay</div>
          </div>
          <div className="mb-1.5 text-[19px] font-bold tracking-[-0.025em] lg:text-[22.5px]">Mừng quá, đồ đã về với bạn!</div>
          <div className="mb-6 text-[13px] leading-[1.6] text-muted">
            Người nhặt được đã dành thời gian giữ và hẹn gặp bạn. Một lời cảm ơn nhỏ sẽ giúp họ được tin tưởng hơn trong lần sau.
          </div>

          <div className="mb-[26px] flex items-center gap-4 rounded-xl border border-line2 bg-soft p-4">
            <div style={PHOTO(IMG('lostlink-wallet', 200), 72, 72, 10)} />
            <div className="min-w-0 flex-1">
              <div className="mb-1 text-[14px] font-semibold">Ví da nâu có giấy tờ tên N.T.H</div>
              <div className="text-[11.5px] text-muted2">Nhận lại tại Cà phê Nhà Nhỏ, Quận 1 · @hoangnam.q1 trao lại</div>
            </div>
          </div>

          <div className="mb-3 text-[14.5px] font-bold">Bạn thấy buổi gặp thế nào?</div>
          <div className="mb-[26px] flex items-center gap-2.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} onClick={() => setRating(n)} className={`cursor-pointer text-[27px] leading-none ${n <= rating ? 'text-star' : 'text-line'}`}>★</div>
            ))}
            <div className="ml-2 text-[12.5px] text-muted">{RATING_LABELS[rating]}</div>
          </div>

          <div className="mb-1 text-[14.5px] font-bold">Điều gì khiến bạn thấy dễ chịu?</div>
          <div className="mb-3.5 text-[12px] text-muted">Chọn bao nhiêu cũng được, hoặc bỏ qua.</div>
          <div className="mb-[26px] flex flex-wrap gap-2.5">
            {TAGS.map((l) => {
              const on = tags.includes(l)
              return (
                <div
                  key={l}
                  onClick={() => toggleTag(l)}
                  className={`flex h-9 cursor-pointer items-center rounded-full border px-[15px] text-[12px] font-medium ${
                    on ? 'border-blue bg-blue-soft text-blue-ink' : 'border-line bg-white text-ink2'
                  }`}
                >
                  {l}
                </div>
              )
            })}
          </div>

          <div className="mb-2.5 text-[14.5px] font-bold">Gửi họ vài dòng</div>
          <div className="mb-4 min-h-[104px] rounded-xl border border-line bg-soft p-4 text-[13px] leading-[1.6] text-muted3">
            Cảm ơn bạn đã giữ ví giúp mình, giấy tờ còn nguyên. Mình mang được xe ra khỏi bãi rồi…
          </div>

          <div className="mb-6 flex cursor-pointer items-center gap-2.5" onClick={() => setPublicThanks((v) => !v)}>
            <Check on={publicThanks} />
            <div className="text-[12px] text-ink2">Cho lời cảm ơn này hiện ở trang của @hoangnam.q1</div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div
              onClick={() => setSent(true)}
              className={`flex h-12 cursor-pointer items-center justify-center rounded-[10px] px-[26px] text-[13.5px] font-semibold ${
                sent ? 'border border-blue-line bg-blue-soft text-blue' : 'bg-blue text-white'
              }`}
            >
              {sent ? 'Đã gửi, cảm ơn bạn nhiều' : 'Gửi lời cảm ơn'}
            </div>
            <div
              className="ll-subtle flex h-12 cursor-pointer items-center justify-center rounded-[10px] border border-line px-[22px] text-[13.5px] font-semibold text-ink2"
              onClick={() => navigate('/')}
            >
              Để sau
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3.5">
          <div className="card p-5">
            <div className="mb-3 text-[14px] font-bold">Sau khi bạn gửi</div>
            <div className="flex flex-col gap-3">
              {AFTER.map((t, i) => (
                <div key={i} className="flex gap-[11px]">
                  <div className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue" />
                  <div className="text-[12px] leading-[1.55] text-ink2">{t}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-amber-line bg-amber-soft p-5">
            <div className="mb-1.5 text-[13.5px] font-bold text-amber-ink">Có gì chưa ổn?</div>
            <div className="mb-3 text-[11.5px] leading-[1.55] text-amber-ink">Nếu buổi gặp làm bạn không thoải mái, kể riêng cho mình nghe. Người kia sẽ không thấy nội dung này.</div>
            <div
              onClick={() => navigate('/report')}
              className="flex h-[38px] cursor-pointer items-center justify-center rounded-[10px] border border-amber-line bg-white text-[12px] font-semibold text-amber-ink"
            >
              Nhắn riêng cho LostLink
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Check({ on }) {
  return (
    <div
      className={`flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-[5px] ${on ? 'bg-blue' : 'border-[1.5px] border-[#CFDAE8] bg-white'}`}
    >
      {on && <div className="-mt-0.5 h-2 w-1 rotate-45 border-b-2 border-r-2 border-white" />}
    </div>
  )
}
