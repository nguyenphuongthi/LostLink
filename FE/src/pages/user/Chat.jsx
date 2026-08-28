import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { IMG, PHOTO, BADGE_LABEL } from '../../theme/tokens'
import { threads, messages, meetups } from '../../data/chat'

// U7 · Messaging. Opens either an active thread ("open") or a one-shot
// intro request ("request"), depending on how the user arrived.
export default function Chat() {
  const navigate = useNavigate()
  const { state } = useLocation()

  const [thread, setThread] = useState(state?.mode === 'request' ? -1 : 0)
  const [chatMode, setChatMode] = useState(state?.mode || 'open')
  const [peer, setPeer] = useState(state?.peer || null)
  const [peerInitials, setPeerInitials] = useState(state?.peerInitials || null)
  const [requestSent, setRequestSent] = useState(false)
  const [returned, setReturned] = useState(false)
  const [attachedPost, setAttachedPost] = useState(state?.post || null)

  const t = threads[thread] || threads[0]
  const peerName = peer || t.name
  const peerIni = peerInitials || t.initials
  const open = chatMode === 'open'
  const request = chatMode === 'request'

  const selectThread = (i) => {
    setThread(i)
    setChatMode('open')
    setPeer(null)
    setPeerInitials(null)
    setRequestSent(false)
    setAttachedPost(null)
  }
  const sendRequest = () => request && !requestSent && setRequestSent(true)

  const statusLabel = request
    ? requestSent ? 'Đang chờ đồng ý trò chuyện' : 'Chưa kết nối · yêu cầu trò chuyện'
    : 'Đã xác minh · Ví da nâu'
  const inputLabel = request
    ? requestSent ? `Đã hết lượt — chờ ${peerName} đồng ý trò chuyện` : `Viết một lời giới thiệu ngắn cho ${peerName}…`
    : `Nhắn tin cho ${peerName}…`
  const sendDisabled = request && requestSent

  return (
    <div className="px-4 pt-5 sm:px-6 lg:px-10 lg:pt-6">
      <div className="grid grid-cols-1 gap-4 lg:h-[760px] lg:grid-cols-[300px_1fr_300px]">
        {/* ── Thread list ─────────────────────────── */}
        <div className="card flex h-[260px] flex-col overflow-hidden lg:h-auto">
          <div className="px-[18px] pb-3 pt-[18px]">
            <div className="mb-3 text-[15px] font-bold">Tin nhắn</div>
            <div className="flex h-[38px] items-center rounded-lg bg-chip px-3.5 text-[12px] text-muted3">Tìm hội thoại…</div>
          </div>
          <div className="flex-1 overflow-y-auto px-2.5 pb-3 pt-1.5">
            {threads.map((th, i) => {
              const sel = thread === i
              return (
                <div
                  key={i}
                  onClick={() => selectThread(i)}
                  className={`mb-0.5 flex cursor-pointer items-center gap-3 rounded-[9px] px-3 py-[11px] ${sel ? 'bg-blue-soft' : 'bg-transparent'}`}
                >
                  <div
                    className={`flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-lg text-[11.5px] font-bold ${
                      th.system ? 'bg-blue-dark text-white' : 'bg-chip text-ink2'
                    }`}
                  >
                    {th.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[12.5px] font-semibold">{th.name}</div>
                      <div className="flex-shrink-0 text-[10.5px] text-muted2">{th.time}</div>
                    </div>
                    <div className="mt-0.5 overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-muted2">{th.preview}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Conversation ────────────────────────── */}
        <div className="card flex h-[72vh] flex-col overflow-hidden lg:h-auto">
          <div className="flex items-center gap-3 border-b border-line2 px-5 py-3.5">
            <div
              onClick={() => navigate('/profile')}
              className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-lg bg-blue-soft text-[12.5px] font-bold text-blue"
            >
              {peerIni}
            </div>
            <div className="flex-1">
              <div onClick={() => navigate('/profile')} className="cursor-pointer text-[13.5px] font-semibold">{peerName}</div>
              <div className={`flex items-center gap-1.5 text-[11px] ${request ? 'text-amber' : 'text-blue'}`}>
                <div className={`h-[7px] w-[7px] rounded-full ${request ? 'bg-[#D8A22A]' : 'bg-blue'}`} />
                {statusLabel}
              </div>
            </div>
            <div className="flex gap-2">
              {open && (
                <>
                  <div className={`ll-tab-soft hidden sm:flex ${headerBtn}`}>Gọi thoại</div>
                  <div className={`ll-tab-soft hidden sm:flex ${headerBtn}`}>Gọi video</div>
                </>
              )}
              <div className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center gap-[2.5px] rounded-lg bg-chip">
                {[0, 1, 2].map((k) => (
                  <div key={k} className="h-[3px] w-[3px] rounded-full bg-ink2" />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-3.5 overflow-y-auto bg-[#FBFCFE] px-6 py-[22px]">
            {attachedPost && (
              <div
                onClick={() => navigate('/post/' + attachedPost.id)}
                className="flex cursor-pointer items-center gap-3.5 self-stretch rounded-[11px] border border-line bg-white p-3"
              >
                <div style={PHOTO(IMG(attachedPost.seed, 200), 60, 60, 10)} />
                <div className="min-w-0 flex-1">
                  <div className="mb-[5px] flex items-center gap-2">
                    <div className={`badge badge-${attachedPost.type}`}>{BADGE_LABEL[attachedPost.type]}</div>
                    <div className="text-[10.5px] text-muted2">Bài đăng đính kèm</div>
                  </div>
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-semibold">{attachedPost.title}</div>
                  <div className="text-[11px] text-muted2">{attachedPost.category} · {attachedPost.area}</div>
                </div>
                <div className="h-[7px] w-[7px] flex-shrink-0 rotate-45 border-r-[1.5px] border-t-[1.5px] border-[#8494A8]" />
              </div>
            )}
            {open && (
              <>
                <div className="self-center rounded-full bg-blue-soft px-3.5 py-2 text-[11px] font-medium text-blue-ink">
                  Đã xác minh lúc 09:12 · Kênh trò chuyện đã mở
                </div>
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex max-w-[74%] flex-col ${m.me ? 'items-end self-end' : 'items-start self-start'}`}
                  >
                    <div
                      className={`px-4 py-3 text-[13px] leading-[1.5] ${
                        m.me ? 'rounded-[18px_18px_6px_18px] bg-blue text-white' : 'rounded-[18px_18px_18px_6px] bg-chip text-ink'
                      }`}
                    >
                      {m.text}
                    </div>
                    <div className="mt-[5px] px-1 text-[10.5px] text-[#A8B3C2]">{m.time}</div>
                  </div>
                ))}
              </>
            )}

            {request && (
              <>
                <div className="max-w-[460px] self-center rounded-[11px] border border-amber-line bg-amber-soft px-5 py-[18px] text-center">
                  <div className="mb-[5px] text-[12.5px] font-bold text-amber-ink">Yêu cầu trò chuyện</div>
                  <div className="text-[11.5px] leading-[1.6] text-amber-ink">
                    Hai bạn chưa từng trao trả đồ cho nhau, nên bạn gửi được <strong>một tin nhắn giới thiệu</strong> duy nhất. {peerName} đồng ý thì kênh trò chuyện mới mở hẳn.
                  </div>
                </div>
                {requestSent && (
                  <>
                    <div className="max-w-[70%] self-end">
                      <div className="rounded-[12px_12px_3px_12px] bg-blue px-[15px] py-3 text-[12.5px] leading-[1.55] text-white">
                        Chào bạn, mình thấy tin của bạn và muốn hỏi thêm một chút về món đồ.
                      </div>
                      <div className="mt-1 text-right text-[10.5px] text-muted2">Vừa gửi · đang chờ đồng ý</div>
                    </div>
                    <div className="self-center rounded-full bg-chip px-3.5 py-2 text-[11px] font-medium text-muted">
                      Đã hết lượt nhắn — chờ {peerName} phản hồi
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          <div className="border-t border-line2 px-[18px] pb-4 pt-3">
            {open && (
              <div className="mb-2.5 flex flex-wrap items-center gap-2">
                {['Chụp ảnh', 'Gửi ảnh', 'Ghi âm', 'Chia sẻ vị trí'].map((x) => (
                  <div key={x} className={`ll-tab-soft ${toolChip}`}>{x}</div>
                ))}
                <div
                  onClick={() => navigate('/')}
                  className="flex h-8 cursor-pointer items-center rounded-full bg-red-soft px-[13px] text-[11px] font-medium text-red-ink sm:ml-auto"
                >
                  Không phải đồ của tôi
                </div>
              </div>
            )}
            {request && (
              <div className="mb-2.5 flex items-center justify-between gap-3 text-[11px] text-muted2">
                <div>{requestSent ? 'Đã dùng 1/1 tin nhắn giới thiệu' : 'Còn 1/1 tin nhắn giới thiệu'}</div>
                <div>Không gửi số điện thoại hay địa chỉ trong tin đầu tiên</div>
              </div>
            )}
            <div className="flex items-center gap-2.5">
              <div
                className={`flex h-[46px] flex-1 items-center rounded-lg px-[18px] text-[13px] ${
                  sendDisabled ? 'bg-[#F4F6FA] text-[#A8B3C2]' : 'bg-chip text-muted3'
                }`}
              >
                {inputLabel}
              </div>
              <div
                onClick={sendRequest}
                className={`flex h-[46px] w-[46px] items-center justify-center rounded-lg ${
                  sendDisabled ? 'cursor-default bg-[#CDD6E2]' : 'cursor-pointer bg-blue shadow-[0_2px_8px_rgba(46,109,180,0.28)]'
                }`}
              >
                <div className="-ml-[3px] h-[9px] w-[9px] rotate-45 border-r-2 border-t-2 border-white" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Right rail ──────────────────────────── */}
        <div className="flex flex-col gap-3.5">
          {request && (
            <div className="card p-5">
              <div className="mb-1.5 text-[14px] font-bold">Vì sao chỉ được một tin?</div>
              <div className="text-[11.5px] leading-[1.6] text-muted">
                Giới hạn này giúp không ai bị nhắn tin dồn dập. Khi {peerName} trả lời, hai bạn nhắn tin bình thường. Nếu bạn muốn nhận lại một món đồ cụ thể, trả lời câu hỏi xác minh ở bài đăng sẽ mở kênh trò chuyện ngay.
              </div>
            </div>
          )}

          {open && (
            <>
              <div className="card p-5">
                <div className="mb-1 text-[14px] font-bold">Đã nhận được đồ chưa?</div>
                <div className="mb-3.5 text-[11.5px] leading-[1.55] text-muted">Cả hai cùng xác nhận thì bài đăng mới khép lại.</div>
                <div className="mb-3 flex items-center gap-2.5 rounded-lg bg-soft px-3 py-2.5">
                  <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-blue">
                    <div className="-mt-0.5 h-2 w-[5px] rotate-45 border-b-2 border-r-2 border-white" />
                  </div>
                  <div className="text-[11.5px] text-ink2">@hoangnam.q1 đã xác nhận</div>
                </div>
                <div
                  onClick={() => setReturned((v) => !v)}
                  className={`flex h-11 cursor-pointer items-center justify-center rounded-lg text-[12.5px] font-semibold ${
                    returned ? 'border border-blue-line bg-blue-soft text-blue' : 'bg-blue text-white'
                  }`}
                >
                  {returned ? 'Bạn đã xác nhận rồi' : 'Tôi đã nhận được đồ'}
                </div>
              </div>

              <div className="card flex-1 p-5">
                <div className="mb-1 text-[14px] font-bold">Chỗ hẹn an toàn gần đó</div>
                <div className="mb-3.5 text-[11px] text-muted2">Nơi công cộng, có người qua lại</div>
                <div className="flex flex-col gap-2">
                  {meetups.map((s, i) => (
                    <div
                      key={i}
                      className="ll-meetup flex cursor-pointer items-center gap-3 rounded-[9px] border border-line2 bg-soft px-3 py-[11px]"
                    >
                      <div className="h-2 w-2 flex-shrink-0 rounded-full bg-blue" />
                      <div className="min-w-0 flex-1">
                        <div className="text-[12px] font-medium">{s.name}</div>
                        <div className="text-[10.5px] text-muted2">{s.dist}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const headerBtn = 'flex h-[34px] items-center rounded-lg bg-line2 px-3.5 text-[11.5px] font-medium cursor-pointer'
const toolChip = 'flex h-8 items-center rounded-full bg-line2 px-[13px] text-[11px] font-medium cursor-pointer'
