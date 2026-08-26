import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { c, chipStyle, eyebrow, card } from '../../theme/tokens'
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
export default function ComposePage() {
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

  const next = () => (cur === maxStep ? navigate('/') : setStep(cur + 1))
  const prev = () => (cur === 1 ? navigate('/') : setStep(cur - 1))

  return (
    <div style={{ padding: '28px 40px 0', maxWidth: 1040, margin: '0 auto' }}>
      <div style={{ fontSize: 25, fontWeight: 700, letterSpacing: '-0.028em', marginBottom: 4 }}>Đăng tin mới</div>
      <div style={{ fontSize: 13, color: c.muted, marginBottom: 24 }}>Kể càng rõ, người còn lại càng dễ nhận ra món đồ.</div>

      {/* Stepper */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24, ...card, borderRadius: 11, padding: '16px 20px' }}>
        {stepLabels.map((label, i) => {
          const n = i + 1
          const done = n < cur
          const active = n === cur
          const last = n === stepLabels.length
          return (
            <div key={label} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => setStep(n)}>
              <div style={{ width: 28, height: 28, borderRadius: 99, fontSize: 11.5, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, ...(active ? { background: c.blue, color: '#fff' } : done ? { background: c.blueSoft, color: c.blue } : { background: c.chip, color: '#A8B3C2' }) }}>{n}</div>
              <div style={{ fontSize: 12, fontWeight: active ? 600 : 500, color: active ? c.ink : done ? c.ink2 : '#A8B3C2', whiteSpace: 'nowrap' }}>{label}</div>
              {!last && <div style={{ flex: 1, height: 2, borderRadius: 99, background: done ? '#C6DCF3' : '#E7ECF3', margin: '0 8px' }} />}
            </div>
          )
        })}
      </div>

      <div style={{ ...card, padding: 30, minHeight: 460 }}>
        {cur === 1 && (
          <Step1 postType={postType} setPostType={setPostType} composeCat={composeCat} setComposeCat={setComposeCat} />
        )}
        {cur === 2 && (
          <Step2 postType={postType} timeDate={timeDate} setTimeDate={setTimeDate} timePreset={timePreset} setTimePreset={setTimePreset} pickPreset={pickPreset} timeSummary={timeSummary} />
        )}
        {cur === 3 && <Step3 postType={postType} locMode={locMode} setLocMode={setLocMode} />}
        {cur === 4 && <Step4 correct={correct} setCorrect={setCorrect} />}
      </div>

      {/* Footer nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18 }}>
        <div className="ll-subtle" onClick={prev} style={{ height: 46, padding: '0 22px', borderRadius: 9, border: `1px solid ${c.line}`, background: '#fff', fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <div style={{ width: 7, height: 7, borderLeft: '1.5px solid #3C4A61', borderBottom: '1.5px solid #3C4A61', transform: 'rotate(45deg)' }} />
          Quay lại
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="ll-subtle" style={{ height: 46, padding: '0 22px', borderRadius: 9, border: `1px solid ${c.line}`, background: '#fff', fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>Lưu nháp</div>
          <div className="ll-primary" onClick={next} style={{ height: 46, padding: '0 26px', borderRadius: 9, background: c.blue, color: '#fff', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', boxShadow: '0 2px 10px rgba(46,109,180,0.28)' }}>
            {cur === maxStep ? 'Xem lại & đăng tin' : 'Tiếp tục'}
            <div style={{ width: 7, height: 7, borderRight: '1.5px solid #fff', borderTop: '1.5px solid #fff', transform: 'rotate(45deg)' }} />
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
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Bạn muốn đăng loại tin nào?</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
        <div onClick={() => setPostType('lost')} style={{ padding: 20, borderRadius: 11, cursor: 'pointer', border: `2px solid ${postType === 'lost' ? '#B5455C' : '#DFE5EE'}`, background: postType === 'lost' ? c.redSoft : '#fff' }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Tôi bị mất đồ</div>
          <div style={{ fontSize: 12, lineHeight: 1.5, color: c.muted }}>Đăng tin để cộng đồng cùng để ý giúp bạn.</div>
        </div>
        <div onClick={() => setPostType('found')} style={{ padding: 20, borderRadius: 11, cursor: 'pointer', border: `2px solid ${postType === 'found' ? '#2E6DB4' : '#DFE5EE'}`, background: postType === 'found' ? c.blueSoft : '#fff' }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Tôi nhặt được đồ</div>
          <div style={{ fontSize: 12, lineHeight: 1.5, color: c.muted }}>Đăng tin để tìm lại đúng chủ nhân của món đồ.</div>
        </div>
      </div>

      <div style={eyebrow}>Đây là món đồ gì?</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
        {CATEGORIES.map((name) => (
          <div key={name} style={chipStyle(composeCat === name)} onClick={() => setComposeCat(name)}>{name}</div>
        ))}
      </div>
      <div style={{ fontSize: 11, color: c.muted2, marginBottom: 28 }}>Cứ gõ tên quen thuộc — 'ipad', 'cà vẹt' — LostLink sẽ tự xếp vào đúng mục.</div>

      <div style={{ height: 1, background: c.line2, marginBottom: 26 }} />

      <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 7 }}>Tiêu đề</div>
      <div style={{ height: 48, borderRadius: 8, border: '1.5px solid #2E6DB4', background: '#fff', display: 'flex', alignItems: 'center', padding: '0 16px', fontSize: 13.5, marginBottom: 18 }}>
        Túi tote vải xanh navy, bên trong có ví và thẻ sinh viên
      </div>
      <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 7 }}>Mô tả chi tiết</div>
      <div style={{ minHeight: 132, borderRadius: 8, border: `1px solid ${c.line}`, background: c.soft, padding: '14px 16px', fontSize: 13, lineHeight: 1.6, color: c.ink2, marginBottom: 6 }}>
        Túi vải bố màu xanh navy, in chữ trắng ở mặt trước, quai đã hơi bạc màu. Bên trong có ví da nhỏ màu be, thẻ sinh viên Bách Khoa và một cuốn sổ tay bìa nâu.
      </div>
      <div style={{ fontSize: 11, color: c.muted2, marginBottom: 22 }}>Một chi tiết riêng — vết xước, hình dán, chữ viết tay — thường là thứ giúp nhận ra nhau nhanh nhất.</div>

      <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 10 }}>Hình ảnh <span style={{ color: c.muted2, fontWeight: 400 }}>· tối đa 9 ảnh</span></div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
        <img src="https://picsum.photos/seed/lostlink-bag/300/300" alt="" style={{ width: 104, height: 104, borderRadius: 9, objectFit: 'cover' }} />
        <img src="https://picsum.photos/seed/lostlink-bag2/300/300" alt="" style={{ width: 104, height: 104, borderRadius: 9, objectFit: 'cover' }} />
        <div style={{ width: 104, height: 104, borderRadius: 9, border: '1.5px dashed #CDD6E2', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer', color: c.muted2 }}>
          <div style={{ width: 18, height: 18, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 8, left: 0, width: 18, height: 2, background: '#A8B3C2', borderRadius: 2 }} />
            <div style={{ position: 'absolute', left: 8, top: 0, height: 18, width: 2, background: '#A8B3C2', borderRadius: 2 }} />
          </div>
          <div style={{ fontSize: 10.5 }}>Thêm ảnh</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 8, background: c.blueSoft, border: '1px solid #C6DCF3', fontSize: 11.5, color: c.blueInk }}>
        Một tấm ảnh thôi cũng giúp người kia nhận ra món đồ nhanh hơn nhiều.
      </div>
    </>
  )
}

/* ── Step 2 · When ───────────────────────────────── */
function Step2({ postType, timeDate, setTimeDate, setTimePreset, timePreset, pickPreset, timeSummary }) {
  return (
    <>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{postType === 'found' ? 'Bạn nhặt được khi nào?' : 'Bạn mất đồ khi nào?'}</div>
      <div style={{ fontSize: 12.5, color: c.muted, marginBottom: 24 }}>Chọn ngày là đủ — nếu nhớ rõ giờ thì bấm thêm một mốc bên dưới.</div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 7 }}>Ngày {postType === 'found' ? 'nhặt được' : 'mất đồ'}</div>
        <input
          type="date"
          value={timeDate}
          onChange={(e) => { setTimeDate(e.target.value); setTimePreset(null) }}
          style={{ width: '100%', height: 48, boxSizing: 'border-box', borderRadius: 8, border: `1px solid ${c.line}`, background: '#fff', padding: '0 16px', fontSize: 13.5, fontFamily: 'inherit', color: c.ink, outline: 'none' }}
        />
      </div>
      <div style={{ fontSize: 12, color: c.muted, marginBottom: 10 }}>Không nhớ chính xác? Chọn một mốc gần đúng:</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        {TIME_PRESETS.map(([name, back]) => {
          const on = timePreset === name
          return (
            <div key={name} onClick={() => pickPreset(name, back)} style={{ height: 34, padding: '0 14px', borderRadius: 99, fontSize: 11.5, fontWeight: 500, display: 'flex', alignItems: 'center', cursor: 'pointer', border: `1px solid ${on ? '#2E6DB4' : '#DFE5EE'}`, background: on ? c.blue : '#fff', color: on ? '#fff' : c.ink2 }}>{name}</div>
          )
        })}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderRadius: 10, background: c.blueSoft, border: '1px solid #C6DCF3', marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: c.blueInk }}>Sẽ hiển thị trên tin:</div>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: c.blueInk }}>{timeSummary}</div>
      </div>
      <div style={{ padding: '18px 20px', borderRadius: 10, background: c.soft, border: `1px solid ${c.line2}`, fontSize: 12, lineHeight: 1.6, color: c.ink2 }}>
        Đồ thường được nhặt sau khi mất vài giờ, nên bạn cứ chọn rộng tay — LostLink đã tính sẵn khoảng chênh lệch đó.
      </div>
    </>
  )
}

/* ── Step 3 · Where ──────────────────────────────── */
function Step3({ postType, locMode, setLocMode }) {
  return (
    <>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{postType === 'found' ? 'Bạn nhặt được ở đâu?' : 'Bạn mất đồ ở đâu?'}</div>
      <div style={{ fontSize: 12.5, color: c.muted, marginBottom: 20 }}>Vị trí chính xác được giữ kín. Người khác chỉ nhìn thấy một vùng rộng quanh đó.</div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
        {LOC_MODES.map((name) => {
          const on = locMode === name
          return (
            <div key={name} onClick={() => setLocMode(name)} style={{ height: 38, padding: '0 16px', borderRadius: 8, fontSize: 12, display: 'flex', alignItems: 'center', cursor: 'pointer', ...(on ? { background: c.blueSoft, border: '1.5px solid #C6DCF3', color: c.blue, fontWeight: 600 } : { background: c.chip, color: c.ink2, fontWeight: 500 }) }}>{name}</div>
          )
        })}
      </div>
      <div style={{ position: 'relative', height: 330, borderRadius: 11, overflow: 'hidden', border: `1px solid ${c.line}`, backgroundColor: '#EEF2F7', backgroundImage: 'linear-gradient(#DFE6F0 1px, transparent 1px), linear-gradient(90deg, #DFE6F0 1px, transparent 1px), linear-gradient(#D3DDEB 2px, transparent 2px), linear-gradient(90deg, #D3DDEB 2px, transparent 2px)', backgroundSize: '30px 30px, 30px 30px, 150px 150px, 150px 150px', marginBottom: 16 }}>
        <div style={{ position: 'absolute', left: '50%', top: '50%', width: 230, height: 230, margin: '-115px 0 0 -115px', borderRadius: 99, background: 'rgba(46,109,180,0.14)', border: '2px dashed rgba(46,109,180,0.45)' }} />
        <div style={{ position: 'absolute', left: '50%', top: '50%', margin: '-34px 0 0 -12px', width: 24, height: 24, borderRadius: '99px 99px 99px 2px', background: c.red, transform: 'rotate(-45deg)', boxShadow: '0 4px 10px rgba(0,0,0,.22)' }} />
        <div style={{ position: 'absolute', left: 16, top: 16, padding: '10px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.96)', fontSize: 11.5, boxShadow: '0 2px 8px rgba(0,0,0,.08)' }}>Bến xe Mỹ Đình, Nam Từ Liêm, Hà Nội</div>
        <div style={{ position: 'absolute', right: 16, bottom: 16, padding: '8px 12px', borderRadius: 8, background: 'rgba(22,35,58,0.82)', color: '#fff', fontSize: 10.5 }}>Kéo ghim để chỉnh vị trí</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderRadius: 10, background: c.blueSoft, border: '1px solid #C6DCF3' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: c.blueInk, marginBottom: 3 }}>Người khác sẽ thấy vùng này</div>
          <div style={{ fontSize: 11, color: c.blueText }}>Rộng khoảng 400 m quanh chỗ bạn chọn</div>
        </div>
        <div style={{ width: 220, height: 6, borderRadius: 99, background: 'rgba(46,109,180,0.2)', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '55%', background: c.blue, borderRadius: 99 }} />
          <div style={{ position: 'absolute', left: '55%', top: -5, width: 16, height: 16, borderRadius: 99, background: '#fff', border: '3px solid #2E6DB4', marginLeft: -8 }} />
        </div>
      </div>
    </>
  )
}

/* ── Step 4 · Verification question (found only) ─── */
function Step4({ correct, setCorrect }) {
  return (
    <>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Một câu hỏi để nhận ra chủ nhân</div>
      <div style={{ fontSize: 12.5, lineHeight: 1.6, color: c.muted, marginBottom: 22 }}>
        Chỉ người thật sự đánh mất món này mới trả lời được. Ai muốn nhận đồ sẽ phải trả lời đúng thì bạn mới nhận được tin nhắn của họ.
      </div>
      <div style={{ border: `1px solid ${c.line}`, borderRadius: 11, padding: 22, background: c.soft, marginBottom: 16 }}>
        <div style={{ fontSize: 11.5, lineHeight: 1.55, color: c.muted2, marginBottom: 14 }}>
          Nên hỏi về thứ chỉ chủ nhân biết — món bên trong, số thẻ, chữ viết tay. Đừng viết những chi tiết đó vào mô tả công khai.
        </div>
        <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 8 }}>Câu hỏi</div>
        <div style={{ height: 48, borderRadius: 8, border: '1.5px solid #2E6DB4', background: '#fff', display: 'flex', alignItems: 'center', padding: '0 16px', fontSize: 13.5, marginBottom: 18 }}>
          Bên trong ví có bao nhiêu thẻ ngân hàng?
        </div>
        <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 10 }}>Các phương án <span style={{ color: c.muted2, fontWeight: 400 }}>· chọn đáp án đúng</span></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ANSWERS.map((text, i) => {
            const on = correct === i
            return (
              <div key={i} onClick={() => setCorrect(i)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 8, cursor: 'pointer', background: '#fff', border: `1.5px solid ${on ? '#2E6DB4' : '#DFE5EE'}` }}>
                <div style={{ width: 16, height: 16, borderRadius: 99, flexShrink: 0, border: `2px solid ${on ? '#2E6DB4' : '#CDD6E2'}`, boxShadow: on ? 'inset 0 0 0 2px #fff, inset 0 0 0 10px #2E6DB4' : 'none' }} />
                <div style={{ fontSize: 13 }}>{text}</div>
                {on && <div style={{ marginLeft: 'auto', height: 24, padding: '0 10px', borderRadius: 99, background: c.blueSoft, color: c.blue, fontSize: 10.5, fontWeight: 600, display: 'flex', alignItems: 'center' }}>Đáp án đúng</div>}
              </div>
            )
          })}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderRadius: 10, background: c.amberSoft, border: '1px solid #F2E4C6' }}>
        <div style={{ fontSize: 12, color: c.amberInk }}>Không muốn đặt câu hỏi? Khi đó ai muốn nhận đồ sẽ gửi lời nhắn xin liên hệ, và bạn tự quyết định đồng ý hay không.</div>
        <div style={{ height: 38, padding: '0 18px', borderRadius: 8, background: '#fff', border: '1px solid #F2E4C6', color: c.amberInk, fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', cursor: 'pointer', flexShrink: 0, marginLeft: 16 }}>Bỏ qua</div>
      </div>
    </>
  )
}
