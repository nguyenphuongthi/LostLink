import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CATEGORIES } from '../../data/catalog'

const ANSWERS = ['Không có thẻ nào', 'Một thẻ', 'Hai thẻ', 'Ba thẻ trở lên']
const LOC_MODES = ['Dùng vị trí hiện tại', 'Kéo ghim trên bản đồ', 'Gõ địa chỉ', 'Chọn đoạn đường']
const TIME_PRESETS = [
  ['Vừa mới đây', 0], ['Sáng nay', 0], ['Chiều nay', 0], ['Tối nay', 0],
  ['Sáng hôm qua', 1], ['Chiều hôm qua', 1], ['Tối hôm qua', 1],
  ['Hôm kia', 2], ['Khoảng 3 ngày trước', 3], ['Khoảng một tuần trước', 7],
  ['Hai tuần trước', 14], ['Một tháng trước', 30],
]

// U1 · Post a lost/found item — a 4-step wizard (the question step is
// shown only for "found" posts).
export default function Compose() {
  const navigate = useNavigate()
  const [postType, setPostType] = useState('lost')
  const [composeCat, setComposeCat] = useState('Ví & tiền')
  const [step, setStep] = useState(1)
  const [timeDate, setTimeDate] = useState('2026-08-10')
  const [timePreset, setTimePreset] = useState(null)
  const [locMode, setLocMode] = useState('Kéo ghim trên bản đồ')
  const [correct, setCorrect] = useState(1)

  const maxStep = postType === 'found' ? 4 : 3
  const cur = Math.min(step, maxStep)
  const stepLabels = postType === 'found'
    ? ['Món đồ', 'Thời gian', 'Vị trí', 'Câu hỏi']
    : ['Món đồ', 'Thời gian', 'Vị trí']

  const timeSummary = timePreset
    ? timePreset
    : timeDate
      ? timeDate.split('-').reverse().join('/')
      : 'Chưa chọn thời gian'

  const pickPreset = (name, back) => {
    const d = new Date('2026-08-13T12:00:00')
    d.setDate(d.getDate() - back)
    setTimePreset(name)
    setTimeDate(d.toISOString().slice(0, 10))
  }

  const next = () => (cur === maxStep ? navigate('/home') : setStep(cur + 1))
  const prev = () => (cur === 1 ? navigate('/home') : setStep(cur - 1))

  return (
    <div className="mx-auto max-w-[1040px] px-4 pt-5 sm:px-6 lg:px-10 lg:pt-7">
      <div className="mb-1 text-[22px] font-bold tracking-[-0.028em] lg:text-[25px]">Đăng tin mới</div>
      <div className="mb-6 text-[13px] text-muted">Kể càng rõ, người còn lại càng dễ nhận ra món đồ.</div>

      {/* Stepper */}
      <div className="card mb-6 flex items-center rounded-[11px] px-5 py-4">
        {stepLabels.map((label, i) => {
          const n = i + 1
          const done = n < cur
          const active = n === cur
          const last = n === stepLabels.length
          return (
            <div key={label} className="flex flex-1 cursor-pointer items-center gap-2.5" onClick={() => setStep(n)}>
              <div
                className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[11.5px] font-bold ${
                  active ? 'bg-blue text-white' : done ? 'bg-blue-soft text-blue' : 'bg-chip text-[#A8B3C2]'
                }`}
              >
                {n}
              </div>
              <div className={`hidden whitespace-nowrap text-[12px] sm:block ${active ? 'font-semibold text-ink' : done ? 'font-medium text-ink2' : 'font-medium text-[#A8B3C2]'}`}>
                {label}
              </div>
              {!last && <div className={`mx-2 h-0.5 flex-1 rounded-full ${done ? 'bg-blue-line' : 'bg-[#E7ECF3]'}`} />}
            </div>
          )
        })}
      </div>

      <div className="card min-h-[460px] p-5 lg:p-[30px]">
        {cur === 1 && <Step1 postType={postType} setPostType={setPostType} composeCat={composeCat} setComposeCat={setComposeCat} />}
        {cur === 2 && <Step2 postType={postType} timeDate={timeDate} setTimeDate={setTimeDate} timePreset={timePreset} setTimePreset={setTimePreset} pickPreset={pickPreset} timeSummary={timeSummary} />}
        {cur === 3 && <Step3 postType={postType} locMode={locMode} setLocMode={setLocMode} />}
        {cur === 4 && <Step4 correct={correct} setCorrect={setCorrect} />}
      </div>

      {/* Footer nav */}
      <div className="mt-[18px] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="ll-subtle flex h-[46px] cursor-pointer items-center justify-center gap-2.5 rounded-[9px] border border-line bg-white px-[22px] text-[13px] font-medium sm:justify-start" onClick={prev}>
          <div className="h-[7px] w-[7px] rotate-45 border-b-[1.5px] border-l-[1.5px] border-ink2" />
          Quay lại
        </div>
        <div className="flex items-center gap-3">
          <div className="ll-subtle flex h-[46px] flex-1 cursor-pointer items-center justify-center rounded-[9px] border border-line bg-white px-[22px] text-[13px] font-medium sm:flex-none">Lưu nháp</div>
          <div
            className="ll-primary flex h-[46px] flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-[9px] bg-blue px-[26px] text-[13px] font-semibold text-white shadow-[0_2px_10px_rgba(46,109,180,0.28)] sm:flex-none"
            onClick={next}
          >
            {cur === maxStep ? 'Xem lại & đăng tin' : 'Tiếp tục'}
            <div className="h-[7px] w-[7px] rotate-45 border-r-[1.5px] border-t-[1.5px] border-white" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Step 1 · What ───────────────────────────────── */
function Step1({ postType, setPostType, composeCat, setComposeCat }) {
  return (
    <>
      <div className="mb-5 text-[18px] font-bold">Bạn muốn đăng loại tin nào?</div>
      <div className="mb-7 grid grid-cols-2 gap-3 sm:gap-3.5">
        <TypeCard
          tone="lost"
          active={postType === 'lost'}
          onClick={() => setPostType('lost')}
          icon={<LostIcon />}
          label="Tôi bị mất đồ"
        />
        <TypeCard
          tone="found"
          active={postType === 'found'}
          onClick={() => setPostType('found')}
          icon={<FoundIcon />}
          label="Tôi nhặt được đồ"
        />
      </div>

      <div className="eyebrow">Đây là món đồ gì?</div>
      <div className="mb-3 flex flex-wrap gap-2">
        {CATEGORIES.map((name) => (
          <div key={name} className={`chip ${composeCat === name ? 'chip-on' : ''}`} onClick={() => setComposeCat(name)}>{name}</div>
        ))}
      </div>
      <div className="mb-7 text-[11px] text-muted2">Cứ gõ tên quen thuộc — 'ipad', 'cà vẹt' — LostLink sẽ tự xếp vào đúng mục.</div>

      <div className="mb-[26px] h-px bg-line2" />

      <div className="mb-[7px] text-[12px] font-medium">Tiêu đề</div>
      <div className="mb-[18px] flex h-12 items-center rounded-lg border-[1.5px] border-blue bg-white px-4 text-[13.5px]">
        Túi tote vải xanh navy, bên trong có ví và thẻ sinh viên
      </div>
      <div className="mb-[7px] text-[12px] font-medium">Mô tả chi tiết</div>
      <div className="mb-1.5 min-h-[132px] rounded-lg border border-line bg-soft px-4 py-3.5 text-[13px] leading-[1.6] text-ink2">
        Túi vải bố màu xanh navy, in chữ trắng ở mặt trước, quai đã hơi bạc màu. Bên trong có ví da nhỏ màu be, thẻ sinh viên Bách Khoa và một cuốn sổ tay bìa nâu.
      </div>
      <div className="mb-[22px] text-[11px] text-muted2">Một chi tiết riêng — vết xước, hình dán, chữ viết tay — thường là thứ giúp nhận ra nhau nhanh nhất.</div>

      <div className="mb-2.5 text-[12px] font-medium">Hình ảnh <span className="font-normal text-muted2">· tối đa 9 ảnh</span></div>
      <div className="mb-3.5 flex flex-wrap gap-3">
        <img src="https://picsum.photos/seed/lostlink-bag/300/300" alt="" className="h-[104px] w-[104px] rounded-[9px] object-cover" />
        <img src="https://picsum.photos/seed/lostlink-bag2/300/300" alt="" className="h-[104px] w-[104px] rounded-[9px] object-cover" />
        <div className="flex h-[104px] w-[104px] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[9px] border-[1.5px] border-dashed border-[#CDD6E2] text-muted2">
          <div className="relative h-[18px] w-[18px]">
            <div className="absolute left-0 top-2 h-0.5 w-[18px] rounded-sm bg-[#A8B3C2]" />
            <div className="absolute left-2 top-0 h-[18px] w-0.5 rounded-sm bg-[#A8B3C2]" />
          </div>
          <div className="text-[10.5px]">Thêm ảnh</div>
        </div>
      </div>
      <div className="flex items-center gap-2.5 rounded-lg border border-blue-line bg-blue-soft px-4 py-3 text-[11.5px] text-blue-ink">
        Một tấm ảnh thôi cũng giúp người kia nhận ra món đồ nhanh hơn nhiều.
      </div>
    </>
  )
}

/* Tactile lost/found selector card — icon + label only, no sub-copy. Tone
   ('lost' | 'found') drives the accent; the raised → pressed states give it a
   physical, skeuomorphic feel that reads the same on desktop and mobile. */
function TypeCard({ tone, active, onClick, icon, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`sk-type ${active ? `sk-type--${tone}` : ''} flex min-h-[88px] cursor-pointer flex-col items-center justify-center gap-2.5 rounded-2xl px-3 py-4 text-center sm:min-h-[100px] sm:flex-row sm:gap-3.5 sm:px-5`}
    >
      <span className={`sk-type__icon sk-type__icon--${tone} ${active ? 'is-on' : ''} flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl`}>
        {icon}
      </span>
      <span className="text-[14px] font-bold leading-tight text-ink sm:text-[15px]">{label}</span>
    </button>
  )
}

const LostIcon = () => (
  <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="6.5" />
    <path d="M20 20l-3.8-3.8" />
  </svg>
)

const FoundIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M8.4 12.3l2.4 2.4 4.7-5.1" />
  </svg>
)

/* ── Step 2 · When ───────────────────────────────── */
function Step2({ postType, timeDate, setTimeDate, setTimePreset, timePreset, pickPreset, timeSummary }) {
  return (
    <>
      <div className="mb-1.5 text-[18px] font-bold">{postType === 'found' ? 'Bạn nhặt được khi nào?' : 'Bạn mất đồ khi nào?'}</div>
      <div className="mb-6 text-[12.5px] text-muted">Chọn ngày là đủ — nếu nhớ rõ giờ thì bấm thêm một mốc bên dưới.</div>
      <div className="mb-5">
        <div className="mb-[7px] text-[12px] font-medium">Ngày {postType === 'found' ? 'nhặt được' : 'mất đồ'}</div>
        <input
          type="date"
          value={timeDate}
          onChange={(e) => { setTimeDate(e.target.value); setTimePreset(null) }}
          className="h-12 w-full rounded-lg border border-line bg-white px-4 text-[13.5px] text-ink outline-none"
        />
      </div>
      <div className="mb-2.5 text-[12px] text-muted">Không nhớ chính xác? Chọn một mốc gần đúng:</div>
      <div className="mb-5 flex flex-wrap gap-2">
        {TIME_PRESETS.map(([name, back]) => {
          const on = timePreset === name
          return (
            <div
              key={name}
              onClick={() => pickPreset(name, back)}
              className={`flex h-[34px] cursor-pointer items-center rounded-full border px-3.5 text-[11.5px] font-medium ${
                on ? 'border-blue bg-blue text-white' : 'border-line bg-white text-ink2'
              }`}
            >
              {name}
            </div>
          )
        })}
      </div>
      <div className="mb-5 flex items-center gap-3 rounded-[10px] border border-blue-line bg-blue-soft px-[18px] py-3.5">
        <div className="text-[12px] text-blue-ink">Sẽ hiển thị trên tin:</div>
        <div className="text-[12.5px] font-semibold text-blue-ink">{timeSummary}</div>
      </div>
      <div className="rounded-[10px] border border-line2 bg-soft px-5 py-[18px] text-[12px] leading-[1.6] text-ink2">
        Đồ thường được nhặt sau khi mất vài giờ, nên bạn cứ chọn rộng tay — LostLink đã tính sẵn khoảng chênh lệch đó.
      </div>
    </>
  )
}

/* ── Step 3 · Where ──────────────────────────────── */
function Step3({ postType, locMode, setLocMode }) {
  return (
    <>
      <div className="mb-1.5 text-[18px] font-bold">{postType === 'found' ? 'Bạn nhặt được ở đâu?' : 'Bạn mất đồ ở đâu?'}</div>
      <div className="mb-5 text-[12.5px] text-muted">Vị trí chính xác được giữ kín. Người khác chỉ nhìn thấy một vùng rộng quanh đó.</div>
      <div className="mb-[18px] flex flex-wrap gap-2">
        {LOC_MODES.map((name) => {
          const on = locMode === name
          return (
            <div
              key={name}
              onClick={() => setLocMode(name)}
              className={`flex h-[38px] cursor-pointer items-center rounded-lg px-4 text-[12px] ${
                on ? 'border-[1.5px] border-blue-line bg-blue-soft font-semibold text-blue' : 'bg-chip font-medium text-ink2'
              }`}
            >
              {name}
            </div>
          )
        })}
      </div>
      <div
        className="relative mb-4 h-[240px] overflow-hidden rounded-[11px] border border-line sm:h-[330px]"
        style={{
          backgroundColor: '#EEF2F7',
          backgroundImage: 'linear-gradient(#DFE6F0 1px, transparent 1px), linear-gradient(90deg, #DFE6F0 1px, transparent 1px), linear-gradient(#D3DDEB 2px, transparent 2px), linear-gradient(90deg, #D3DDEB 2px, transparent 2px)',
          backgroundSize: '30px 30px, 30px 30px, 150px 150px, 150px 150px',
        }}
      >
        <div className="absolute left-1/2 top-1/2 -ml-[115px] -mt-[115px] h-[230px] w-[230px] rounded-full border-2 border-dashed border-[rgba(46,109,180,0.45)] bg-[rgba(46,109,180,0.14)]" />
        <div className="absolute left-1/2 top-1/2 -ml-3 -mt-[34px] h-6 w-6 rotate-[-45deg] rounded-[99px_99px_99px_2px] bg-red shadow-[0_4px_10px_rgba(0,0,0,.22)]" />
        <div className="absolute left-4 top-4 rounded-lg bg-white/[0.96] px-3.5 py-2.5 text-[11.5px] shadow-[0_2px_8px_rgba(0,0,0,.08)]">Bến xe Mỹ Đình, Nam Từ Liêm, Hà Nội</div>
        <div className="absolute bottom-4 right-4 rounded-lg bg-[rgba(22,35,58,0.82)] px-3 py-2 text-[10.5px] text-white">Kéo ghim để chỉnh vị trí</div>
      </div>
      <div className="flex flex-col gap-3 rounded-[10px] border border-blue-line bg-blue-soft px-5 py-4 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex-1">
          <div className="mb-[3px] text-[12px] font-semibold text-blue-ink">Người khác sẽ thấy vùng này</div>
          <div className="text-[11px] text-blue-text">Rộng khoảng 400 m quanh chỗ bạn chọn</div>
        </div>
        <div className="relative h-1.5 w-full rounded-full bg-[rgba(46,109,180,0.2)] sm:w-[220px]">
          <div className="absolute inset-y-0 left-0 w-[55%] rounded-full bg-blue" />
          <div className="absolute -top-[5px] left-[55%] -ml-2 h-4 w-4 rounded-full border-[3px] border-blue bg-white" />
        </div>
      </div>
    </>
  )
}

/* ── Step 4 · Verification question (found only) ─── */
function Step4({ correct, setCorrect }) {
  return (
    <>
      <div className="mb-1.5 text-[18px] font-bold">Một câu hỏi để nhận ra chủ nhân</div>
      <div className="mb-[22px] text-[12.5px] leading-[1.6] text-muted">
        Chỉ người thật sự đánh mất món này mới trả lời được. Ai muốn nhận đồ sẽ phải trả lời đúng thì bạn mới nhận được tin nhắn của họ.
      </div>
      <div className="mb-4 rounded-[11px] border border-line bg-soft p-[22px]">
        <div className="mb-3.5 text-[11.5px] leading-[1.55] text-muted2">
          Nên hỏi về thứ chỉ chủ nhân biết — món bên trong, số thẻ, chữ viết tay. Đừng viết những chi tiết đó vào mô tả công khai.
        </div>
        <div className="mb-2 text-[12px] font-medium">Câu hỏi</div>
        <div className="mb-[18px] flex h-12 items-center rounded-lg border-[1.5px] border-blue bg-white px-4 text-[13.5px]">
          Bên trong ví có bao nhiêu thẻ ngân hàng?
        </div>
        <div className="mb-2.5 text-[12px] font-medium">Các phương án <span className="font-normal text-muted2">· chọn đáp án đúng</span></div>
        <div className="flex flex-col gap-2">
          {ANSWERS.map((text, i) => {
            const on = correct === i
            return (
              <div
                key={i}
                onClick={() => setCorrect(i)}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border-[1.5px] bg-white px-3.5 py-3 ${on ? 'border-blue' : 'border-line'}`}
              >
                <div
                  className="h-4 w-4 flex-shrink-0 rounded-full border-2"
                  style={{
                    borderColor: on ? '#2E6DB4' : '#CDD6E2',
                    boxShadow: on ? 'inset 0 0 0 2px #fff, inset 0 0 0 10px #2E6DB4' : 'none',
                  }}
                />
                <div className="text-[13px]">{text}</div>
                {on && <div className="ml-auto flex h-6 items-center rounded-full bg-blue-soft px-2.5 text-[10.5px] font-semibold text-blue">Đáp án đúng</div>}
              </div>
            )
          })}
        </div>
      </div>
      <div className="flex flex-col gap-3 rounded-[10px] border border-amber-line bg-amber-soft px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-[12px] text-amber-ink">Không muốn đặt câu hỏi? Khi đó ai muốn nhận đồ sẽ gửi lời nhắn xin liên hệ, và bạn tự quyết định đồng ý hay không.</div>
        <div className="flex h-[38px] flex-shrink-0 cursor-pointer items-center justify-center rounded-lg border border-amber-line bg-white px-[18px] text-[12px] font-semibold text-amber-ink sm:ml-4">Bỏ qua</div>
      </div>
    </>
  )
}
