import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { c, card } from '../../theme/tokens'

const QUIZ = ['Không có thẻ nào', 'Một thẻ', 'Hai thẻ', 'Ba thẻ trở lên']
const CORRECT = 2 // "Hai thẻ"

// U5 · Answer the finder's verification question. Right answer opens chat.
export default function VerifyPage() {
  const navigate = useNavigate()
  const [quiz, setQuiz] = useState(null)
  const [verify, setVerify] = useState(null) // null | 'ok' | 'wrong'

  const submit = () => {
    if (verify === 'ok') return navigate('/chat')
    if (quiz === null || verify === 'wrong') return
    setVerify(quiz === CORRECT ? 'ok' : 'wrong')
  }

  const disabled = quiz === null || verify === 'wrong'
  const submitLabel = verify === 'ok' ? 'Mở kênh trò chuyện' : verify === 'wrong' ? 'Xác minh không thành công' : 'Gửi câu trả lời'

  return (
    <div style={{ padding: '40px 40px 0', maxWidth: 720, margin: '0 auto' }}>
      <div style={{ ...card, borderRadius: 14, padding: 34, boxShadow: '0 8px 30px rgba(22,35,58,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ height: 26, padding: '0 12px', borderRadius: 99, background: c.amberSoft, color: c.amber, fontSize: 10.5, fontWeight: 700, display: 'flex', alignItems: 'center' }}>CÂU HỎI CỦA NGƯỜI NHẶT</div>
          <div style={{ fontSize: 11.5, color: c.muted2 }}>Chỉ trả lời được một lần</div>
        </div>
        <div style={{ fontSize: 21.5, fontWeight: 700, letterSpacing: '-0.025em', marginBottom: 8 }}>
          Trả lời một câu để mình chắc chiếc ví này là của bạn
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.6, color: c.muted, marginBottom: 28 }}>
          Người nhặt để lại một câu hỏi mà chỉ chủ nhân mới biết. Trả lời đúng là hai bên nhắn tin được ngay.
        </div>

        <div style={{ padding: 22, borderRadius: 11, background: c.soft, border: `1px solid ${c.line2}`, marginBottom: 22 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 18 }}>Bên trong ví có bao nhiêu thẻ ngân hàng?</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {QUIZ.map((text, i) => {
              const on = quiz === i
              return (
                <div
                  key={i}
                  onClick={() => {
                    if (verify) return
                    setQuiz(i)
                    setVerify(null)
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '14px 16px',
                    borderRadius: 9,
                    cursor: 'pointer',
                    background: on ? c.blueSoft : '#fff',
                    border: `1.5px solid ${on ? '#2E6DB4' : '#DFE5EE'}`,
                  }}
                >
                  <div style={{ width: 18, height: 18, borderRadius: 99, flexShrink: 0, border: `2px solid ${on ? '#2E6DB4' : '#CDD6E2'}`, boxShadow: on ? 'inset 0 0 0 3px #fff, inset 0 0 0 12px #2E6DB4' : 'none' }} />
                  <div style={{ fontSize: 13.5 }}>{text}</div>
                </div>
              )
            })}
          </div>
        </div>

        {verify === 'wrong' && (
          <div style={{ padding: '16px 18px', borderRadius: 9, background: c.redSoft, border: '1px solid #F0CBD2', marginBottom: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: c.redInk, marginBottom: 4 }}>Xác minh không thành công</div>
            <div style={{ fontSize: 12.5, lineHeight: 1.6, color: c.redInk }}>
              Đáp án không khớp với món đồ này — có lẽ đây không phải đồ của bạn. Nếu bạn vẫn tin là của mình, hãy tìm lại tin đúng hơn hoặc đăng tin mất đồ để người nhặt tự tìm đến bạn.
            </div>
          </div>
        )}
        {verify === 'ok' && (
          <div style={{ padding: 18, borderRadius: 9, background: c.blueSoft, border: '1px solid #C6DCF3', marginBottom: 18 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: c.blueInk, marginBottom: 4 }}>Chính xác rồi</div>
            <div style={{ fontSize: 12, color: c.blueText }}>Kênh trò chuyện đã mở, bạn hẹn gặp người nhặt được ngay bây giờ.</div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 12 }}>
          <div className="ll-subtle" onClick={() => navigate('/matches')} style={{ height: 50, padding: '0 24px', borderRadius: 9, border: `1px solid ${c.line}`, fontSize: 13.5, fontWeight: 500, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>Để sau</div>
          <div
            onClick={submit}
            style={{
              flex: 1,
              height: 50,
              borderRadius: 9,
              fontSize: 13.5,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ...(disabled
                ? { background: '#CDD6E2', color: '#fff', cursor: 'default' }
                : { background: c.blue, color: '#fff', cursor: 'pointer', boxShadow: '0 2px 10px rgba(46,109,180,.28)' }),
            }}
          >
            {submitLabel}
          </div>
        </div>

        <div style={{ marginTop: 24, paddingTop: 20, borderTop: `1px solid ${c.line2}`, fontSize: 11.5, lineHeight: 1.6, color: c.muted2 }}>
          Nếu người nhặt không để lại câu hỏi, bạn sẽ thấy nút <b style={{ color: c.ink2 }}>Xin liên hệ</b> thay cho màn hình này — người nhặt đồng ý thì hai bên mới nhắn tin được.
        </div>
      </div>
    </div>
  )
}
