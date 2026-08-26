import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { c, card } from '../../theme/tokens'

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
export default function ReportPage() {
  const navigate = useNavigate()
  const [reason, setReason] = useState(1)
  const [block, setBlock] = useState(true)
  const [sent, setSent] = useState(false)

  return (
    <div style={{ padding: '28px 40px 0', maxWidth: 1060, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, alignItems: 'start' }}>
        <div style={{ ...card, padding: 28 }}>
          <div style={{ fontSize: 22.5, fontWeight: 700, letterSpacing: '-0.025em', marginBottom: 6 }}>Kể cho mình chuyện gì đang xảy ra</div>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: c.muted, marginBottom: 24 }}>
            Bạn không cần chắc chắn tuyệt đối. Cứ nói những gì bạn thấy, người của LostLink sẽ xem giúp bạn.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 12, background: c.soft, border: `1px solid ${c.line2}`, marginBottom: 24 }}>
            <div style={{ width: 40, height: 40, borderRadius: 99, background: c.blueSoft, color: c.blue, fontSize: 11.5, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>HN</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>@hoangnam.q1</div>
              <div style={{ fontSize: 11, color: c.muted2 }}>Tin 'Ví da nâu có giấy tờ tên N.T.H' · trò chuyện từ 09:12 hôm nay</div>
            </div>
          </div>

          <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 12 }}>Chuyện gần nhất với điều bạn gặp</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 26 }}>
            {REASONS.map((r, i) => {
              const on = reason === i
              return (
                <div key={i} onClick={() => setReason(i)} style={{ display: 'flex', gap: 13, padding: '15px 16px', borderRadius: 12, cursor: 'pointer', border: `1px solid ${on ? '#2E6DB4' : '#DFE5EE'}`, background: on ? '#F4F8FD' : '#fff' }}>
                  <div style={{ width: 19, height: 19, borderRadius: 99, flexShrink: 0, marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${on ? '#2E6DB4' : '#CFDAE8'}` }}>
                    <div style={{ width: 9, height: 9, borderRadius: 99, background: on ? c.blue : 'transparent' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{r.label}</div>
                    <div style={{ fontSize: 11.5, lineHeight: 1.5, color: c.muted }}>{r.hint}</div>
                  </div>
                </div>
              )
            })}
          </div>

          <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 10 }}>Kể thêm nếu bạn muốn</div>
          <div style={{ border: `1px solid ${c.line}`, borderRadius: 12, background: c.soft, padding: 16, minHeight: 96, fontSize: 13, lineHeight: 1.6, color: c.muted3, marginBottom: 20 }}>
            Ví dụ: bạn ấy nói phải chuyển 500.000đ trước mới cho gặp…
          </div>

          <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 10 }}>Ảnh chụp màn hình (không bắt buộc)</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
            {EVIDENCE.map((e, i) => (
              <div key={i} className="ll-evidence" style={{ height: 108, borderRadius: 12, border: '1.5px dashed #CFDAE8', background: '#FBFCFE', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }}>
                <div style={{ width: 22, height: 22, borderRadius: 8, border: '2px solid #9AA7B8' }} />
                <div style={{ fontSize: 11, color: c.muted2 }}>{e}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, cursor: 'pointer' }} onClick={() => setBlock((v) => !v)}>
            <div style={{ width: 18, height: 18, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, ...(block ? { background: c.blue } : { background: '#fff', border: '1.5px solid #CFDAE8' }) }}>
              {block && <div style={{ width: 4, height: 8, borderRight: '2px solid #fff', borderBottom: '2px solid #fff', transform: 'rotate(45deg)', marginTop: -2 }} />}
            </div>
            <div style={{ fontSize: 12, color: c.ink2 }}>Chặn @hoangnam.q1 và ẩn tin của họ khỏi trang chủ của bạn</div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <div onClick={() => setSent(true)} style={{ height: 48, padding: '0 26px', borderRadius: 10, fontSize: 13.5, fontWeight: 600, display: 'flex', alignItems: 'center', cursor: 'pointer', ...(sent ? { background: c.blueSoft, color: c.blue, border: '1px solid #C6DCF3' } : { background: c.red, color: '#fff' }) }}>
              {sent ? 'Mình đã nhận được, cảm ơn bạn' : 'Gửi cho LostLink'}
            </div>
            <div className="ll-subtle" onClick={() => navigate('/chat')} style={{ height: 48, padding: '0 22px', borderRadius: 10, border: `1px solid ${c.line}`, fontSize: 13.5, fontWeight: 600, color: c.ink2, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>Quay lại trò chuyện</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ ...card, padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Rồi sẽ thế nào?</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {STEPS.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 12 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 8, background: c.blueSoft, color: c.blue, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ fontSize: 12, lineHeight: 1.55, color: c.ink2 }}>{t}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: '#FBEDEF', border: '1px solid #F0CBD2', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: c.redInk, marginBottom: 6 }}>Nếu bạn đang không an toàn</div>
            <div style={{ fontSize: 11.5, lineHeight: 1.55, color: '#8E3A4B', marginBottom: 12 }}>Đừng đi gặp một mình. Gọi 113 hoặc tới công an phường gần nhất trước, mọi việc khác tính sau.</div>
            <div style={{ height: 40, borderRadius: 10, background: c.red, color: '#fff', fontSize: 12.5, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>Gọi 113</div>
          </div>
          <div style={{ ...card, padding: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Mẹo nhỏ khi hẹn gặp</div>
            <div style={{ fontSize: 11.5, lineHeight: 1.6, color: c.muted }}>Hẹn nơi đông người, ban ngày, và nói cho một người thân biết bạn đi đâu. LostLink không bao giờ yêu cầu bạn trả tiền để nhận lại đồ.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
