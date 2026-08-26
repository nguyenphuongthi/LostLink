import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { c, IMG, PHOTO, card } from '../../theme/tokens'

const RATING_LABELS = ['', 'Chưa ổn lắm', 'Tạm được', 'Bình thường', 'Tốt', 'Rất dễ chịu']
const TAGS = ['Đúng hẹn', 'Nhắn tin rõ ràng', 'Giữ đồ cẩn thận', 'Không đòi tiền', 'Chọn chỗ gặp an toàn']
const AFTER = [
  "Bài đăng của bạn chuyển sang 'Đã tìm thấy' và không hiện trên trang chủ nữa.",
  '@hoangnam.q1 được cộng một lần trao trả thành công vào trang cá nhân.',
  'Ảnh và mô tả món đồ sẽ tự ẩn sau 7 ngày cho riêng tư của bạn.',
]

// U8 · Confirm hand-over and thank the finder.
export default function ThanksPage() {
  const navigate = useNavigate()
  const [rating, setRating] = useState(5)
  const [tags, setTags] = useState(['Đúng hẹn', 'Nhắn tin rõ ràng'])
  const [publicThanks, setPublicThanks] = useState(true)
  const [sent, setSent] = useState(false)

  const toggleTag = (l) => setTags((s) => (s.includes(l) ? s.filter((x) => x !== l) : [...s, l]))

  return (
    <div style={{ padding: '28px 40px 0', maxWidth: 1060, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, alignItems: 'start' }}>
        <div style={{ ...card, padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ height: 26, padding: '0 12px', borderRadius: 99, background: c.blueSoft, color: c.blue, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center' }}>ĐÃ TRAO TRẢ</div>
            <div style={{ fontSize: 11.5, color: c.muted2 }}>Cả hai đã xác nhận lúc 15:24 hôm nay</div>
          </div>
          <div style={{ fontSize: 22.5, fontWeight: 700, letterSpacing: '-0.025em', marginBottom: 6 }}>Mừng quá, đồ đã về với bạn!</div>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: c.muted, marginBottom: 24 }}>
            Người nhặt được đã dành thời gian giữ và hẹn gặp bạn. Một lời cảm ơn nhỏ sẽ giúp họ được tin tưởng hơn trong lần sau.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16, borderRadius: 12, background: c.soft, border: `1px solid ${c.line2}`, marginBottom: 26 }}>
            <div style={PHOTO(IMG('lostlink-wallet', 200), 72, 72, 10)} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Ví da nâu có giấy tờ tên N.T.H</div>
              <div style={{ fontSize: 11.5, color: c.muted2 }}>Nhận lại tại Cà phê Nhà Nhỏ, Quận 1 · @hoangnam.q1 trao lại</div>
            </div>
          </div>

          <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 12 }}>Bạn thấy buổi gặp thế nào?</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 26 }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} onClick={() => setRating(n)} style={{ fontSize: 27, lineHeight: 1, cursor: 'pointer', color: n <= rating ? c.star : c.line }}>★</div>
            ))}
            <div style={{ fontSize: 12.5, color: c.muted, marginLeft: 8 }}>{RATING_LABELS[rating]}</div>
          </div>

          <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 4 }}>Điều gì khiến bạn thấy dễ chịu?</div>
          <div style={{ fontSize: 12, color: c.muted, marginBottom: 14 }}>Chọn bao nhiêu cũng được, hoặc bỏ qua.</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginBottom: 26 }}>
            {TAGS.map((l) => {
              const on = tags.includes(l)
              return (
                <div key={l} onClick={() => toggleTag(l)} style={{ height: 36, padding: '0 15px', borderRadius: 99, fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', cursor: 'pointer', border: `1px solid ${on ? '#2E6DB4' : '#DFE5EE'}`, background: on ? c.blueSoft : '#fff', color: on ? c.blueInk : c.ink2 }}>{l}</div>
              )
            })}
          </div>

          <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 10 }}>Gửi họ vài dòng</div>
          <div style={{ border: `1px solid ${c.line}`, borderRadius: 12, background: c.soft, padding: 16, minHeight: 104, fontSize: 13, lineHeight: 1.6, color: c.muted3, marginBottom: 16 }}>
            Cảm ơn bạn đã giữ ví giúp mình, giấy tờ còn nguyên. Mình mang được xe ra khỏi bãi rồi…
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, cursor: 'pointer' }} onClick={() => setPublicThanks((v) => !v)}>
            <Check on={publicThanks} />
            <div style={{ fontSize: 12, color: c.ink2 }}>Cho lời cảm ơn này hiện ở trang của @hoangnam.q1</div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <div onClick={() => setSent(true)} style={{ height: 48, padding: '0 26px', borderRadius: 10, fontSize: 13.5, fontWeight: 600, display: 'flex', alignItems: 'center', cursor: 'pointer', ...(sent ? { background: c.blueSoft, color: c.blue, border: '1px solid #C6DCF3' } : { background: c.blue, color: '#fff' }) }}>
              {sent ? 'Đã gửi, cảm ơn bạn nhiều' : 'Gửi lời cảm ơn'}
            </div>
            <div className="ll-subtle" onClick={() => navigate('/')} style={{ height: 48, padding: '0 22px', borderRadius: 10, border: `1px solid ${c.line}`, fontSize: 13.5, fontWeight: 600, color: c.ink2, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>Để sau</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ ...card, padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Sau khi bạn gửi</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {AFTER.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 11 }}>
                  <div style={{ width: 6, height: 6, borderRadius: 99, background: c.blue, marginTop: 7, flexShrink: 0 }} />
                  <div style={{ fontSize: 12, lineHeight: 1.55, color: c.ink2 }}>{t}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: c.amberSoft, border: '1px solid #F2E4C6', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: c.amberInk, marginBottom: 6 }}>Có gì chưa ổn?</div>
            <div style={{ fontSize: 11.5, lineHeight: 1.55, color: c.amberInk, marginBottom: 12 }}>Nếu buổi gặp làm bạn không thoải mái, kể riêng cho mình nghe. Người kia sẽ không thấy nội dung này.</div>
            <div onClick={() => navigate('/report')} style={{ height: 38, borderRadius: 10, background: '#fff', border: '1px solid #F2E4C6', color: c.amberInk, fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>Nhắn riêng cho LostLink</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Check({ on }) {
  return (
    <div style={{ width: 18, height: 18, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, ...(on ? { background: '#2E6DB4' } : { background: '#fff', border: '1.5px solid #CFDAE8' }) }}>
      {on && <div style={{ width: 4, height: 8, borderRight: '2px solid #fff', borderBottom: '2px solid #fff', transform: 'rotate(45deg)', marginTop: -2 }} />}
    </div>
  )
}
