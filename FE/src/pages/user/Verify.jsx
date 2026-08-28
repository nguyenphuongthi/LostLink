import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const QUIZ = ['Không có thẻ nào', 'Một thẻ', 'Hai thẻ', 'Ba thẻ trở lên']
const CORRECT = 2 // "Hai thẻ"

// U5 · Answer the finder's verification question. Right answer opens chat,
// carrying the claimed post so it's attached to the new conversation.
export default function Verify() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [quiz, setQuiz] = useState(null)
  const [verify, setVerify] = useState(null) // null | 'ok' | 'wrong'

  const openChat = () =>
    navigate('/chat', {
      state: { mode: 'open', peer: state?.peer, peerInitials: state?.peerInitials, post: state?.post },
    })

  const submit = () => {
    if (verify === 'ok') return openChat()
    if (quiz === null || verify === 'wrong') return
    setVerify(quiz === CORRECT ? 'ok' : 'wrong')
  }

  const disabled = quiz === null || verify === 'wrong'
  const submitLabel = verify === 'ok' ? 'Mở kênh trò chuyện' : verify === 'wrong' ? 'Xác minh không thành công' : 'Gửi câu trả lời'

  return (
    <div className="mx-auto max-w-[720px] px-10 pt-10">
      <div className="card rounded-[14px] p-[34px] shadow-[0_8px_30px_rgba(22,35,58,0.07)]">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-[26px] items-center rounded-full bg-amber-soft px-3 text-[10.5px] font-bold text-amber">
            CÂU HỎI CỦA NGƯỜI NHẶT
          </div>
          <div className="text-[11.5px] text-muted2">Chỉ trả lời được một lần</div>
        </div>
        <div className="mb-2 text-[21.5px] font-bold tracking-[-0.025em]">
          Trả lời một câu để mình chắc chiếc ví này là của bạn
        </div>
        <div className="mb-7 text-[13px] leading-[1.6] text-muted">
          Người nhặt để lại một câu hỏi mà chỉ chủ nhân mới biết. Trả lời đúng là hai bên nhắn tin được ngay.
        </div>

        <div className="mb-[22px] rounded-[11px] border border-line2 bg-soft p-[22px]">
          <div className="mb-[18px] text-[15px] font-semibold">Bên trong ví có bao nhiêu thẻ ngân hàng?</div>
          <div className="flex flex-col gap-2.5">
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
                  className={`flex cursor-pointer items-center gap-3 rounded-[9px] border-[1.5px] px-4 py-3.5 ${
                    on ? 'border-blue bg-blue-soft' : 'border-line bg-white'
                  }`}
                >
                  <div
                    className="h-[18px] w-[18px] flex-shrink-0 rounded-full border-2"
                    style={{
                      borderColor: on ? '#2E6DB4' : '#CDD6E2',
                      boxShadow: on ? 'inset 0 0 0 3px #fff, inset 0 0 0 12px #2E6DB4' : 'none',
                    }}
                  />
                  <div className="text-[13.5px]">{text}</div>
                </div>
              )
            })}
          </div>
        </div>

        {verify === 'wrong' && (
          <div className="mb-[18px] rounded-[9px] border border-red-line bg-red-soft px-[18px] py-4">
            <div className="mb-1 text-[13px] font-bold text-red-ink">Xác minh không thành công</div>
            <div className="text-[12.5px] leading-[1.6] text-red-ink">
              Đáp án không khớp với món đồ này — có lẽ đây không phải đồ của bạn. Nếu bạn vẫn tin là của mình, hãy tìm lại tin đúng hơn hoặc đăng tin mất đồ để người nhặt tự tìm đến bạn.
            </div>
          </div>
        )}
        {verify === 'ok' && (
          <div className="mb-[18px] rounded-[9px] border border-blue-line bg-blue-soft p-[18px]">
            <div className="mb-1 text-[13.5px] font-bold text-blue-ink">Chính xác rồi</div>
            <div className="text-[12px] text-blue-text">Kênh trò chuyện đã mở, bạn hẹn gặp người nhặt được ngay bây giờ.</div>
          </div>
        )}

        <div className="flex gap-3">
          <div
            className="ll-subtle flex h-[50px] cursor-pointer items-center rounded-[9px] border border-line px-6 text-[13.5px] font-medium"
            onClick={() => navigate('/matches')}
          >
            Để sau
          </div>
          <div
            onClick={submit}
            className={`flex h-[50px] flex-1 items-center justify-center rounded-[9px] text-[13.5px] font-semibold ${
              disabled
                ? 'cursor-default bg-[#CDD6E2] text-white'
                : 'cursor-pointer bg-blue text-white shadow-[0_2px_10px_rgba(46,109,180,.28)]'
            }`}
          >
            {submitLabel}
          </div>
        </div>

        <div className="mt-6 border-t border-line2 pt-5 text-[11.5px] leading-[1.6] text-muted2">
          Nếu người nhặt không để lại câu hỏi, bạn sẽ thấy nút <b className="text-ink2">Xin liên hệ</b> thay cho màn hình này — người nhặt đồng ý thì hai bên mới nhắn tin được.
        </div>
      </div>
    </div>
  )
}
