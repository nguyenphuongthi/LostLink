import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { c, card } from '../../theme/tokens'
import { threads, messages, meetups } from '../../data/chat'

// U7 · Messaging. Opens either an active thread ("open") or a one-shot
// intro request ("request"), depending on how the user arrived.
export default function ChatPage() {
  const navigate = useNavigate()
  const { state } = useLocation()

  const [thread, setThread] = useState(state?.mode === 'request' ? -1 : 0)
  const [chatMode, setChatMode] = useState(state?.mode || 'open')
  const [peer, setPeer] = useState(state?.peer || null)
  const [peerInitials, setPeerInitials] = useState(state?.peerInitials || null)
  const [requestSent, setRequestSent] = useState(false)
  const [returned, setReturned] = useState(false)

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
    <div style={{ padding: '24px 40px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr 300px', gap: 16, height: 760 }}>
        {/* ── Thread list ─────────────────────────── */}
        <div style={{ ...card, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '18px 18px 12px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Tin nhắn</div>
            <div style={{ height: 38, borderRadius: 8, background: c.chip, display: 'flex', alignItems: 'center', padding: '0 14px', fontSize: 12, color: c.muted3 }}>Tìm hội thoại…</div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '6px 10px 12px' }}>
            {threads.map((th, i) => {
              const sel = thread === i
              return (
                <div key={i} onClick={() => selectThread(i)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 12px', borderRadius: 9, cursor: 'pointer', marginBottom: 2, background: sel ? c.blueSoft : 'transparent' }}>
                  <div style={{ width: 42, height: 42, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11.5, fontWeight: 700, ...(th.system ? { background: c.blueDark, color: '#fff' } : { background: c.chip, color: c.ink2 }) }}>{th.initials}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{th.name}</div>
                      <div style={{ fontSize: 10.5, color: c.muted2, flexShrink: 0 }}>{th.time}</div>
                    </div>
                    <div style={{ fontSize: 11, color: c.muted2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 2 }}>{th.preview}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Conversation ────────────────────────── */}
        <div style={{ ...card, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderBottom: `1px solid ${c.line2}` }}>
            <div onClick={() => navigate('/profile')} style={{ width: 42, height: 42, borderRadius: 8, background: c.blueSoft, color: c.blue, fontSize: 12.5, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>{peerIni}</div>
            <div style={{ flex: 1 }}>
              <div onClick={() => navigate('/profile')} style={{ fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>{peerName}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: request ? c.amber : c.blue }}>
                <div style={{ width: 7, height: 7, borderRadius: 99, background: request ? '#D8A22A' : c.blue }} />
                {statusLabel}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {open && (
                <>
                  <div className="ll-tab-soft" style={headerBtn}>Gọi thoại</div>
                  <div className="ll-tab-soft" style={headerBtn}>Gọi video</div>
                </>
              )}
              <div style={{ width: 34, height: 34, borderRadius: 8, background: c.chip, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2.5, cursor: 'pointer' }}>
                {[0, 1, 2].map((k) => <div key={k} style={{ width: 3, height: 3, borderRadius: 99, background: c.ink2 }} />)}
              </div>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 14, background: '#FBFCFE' }}>
            {open && (
              <>
                <div style={{ alignSelf: 'center', padding: '8px 14px', borderRadius: 99, background: c.blueSoft, color: c.blueInk, fontSize: 11, fontWeight: 500 }}>
                  Đã xác minh lúc 09:12 · Kênh trò chuyện đã mở
                </div>
                {messages.map((m, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', maxWidth: '74%', ...(m.me ? { alignItems: 'flex-end', alignSelf: 'flex-end' } : { alignItems: 'flex-start', alignSelf: 'flex-start' }) }}>
                    <div style={{ padding: '12px 16px', fontSize: 13, lineHeight: 1.5, ...(m.me ? { borderRadius: '18px 18px 6px 18px', background: c.blue, color: '#fff' } : { borderRadius: '18px 18px 18px 6px', background: c.chip, color: c.ink }) }}>{m.text}</div>
                    <div style={{ fontSize: 10.5, color: '#A8B3C2', marginTop: 5, padding: '0 4px' }}>{m.time}</div>
                  </div>
                ))}
              </>
            )}

            {request && (
              <>
                <div style={{ alignSelf: 'center', maxWidth: 460, padding: '18px 20px', borderRadius: 11, background: c.amberSoft, border: '1px solid #F2E4C6', textAlign: 'center' }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: c.amberInk, marginBottom: 5 }}>Yêu cầu trò chuyện</div>
                  <div style={{ fontSize: 11.5, lineHeight: 1.6, color: c.amberInk }}>
                    Hai bạn chưa từng trao trả đồ cho nhau, nên bạn gửi được <strong>một tin nhắn giới thiệu</strong> duy nhất. {peerName} đồng ý thì kênh trò chuyện mới mở hẳn.
                  </div>
                </div>
                {requestSent && (
                  <>
                    <div style={{ alignSelf: 'flex-end', maxWidth: '70%' }}>
                      <div style={{ padding: '12px 15px', borderRadius: '12px 12px 3px 12px', background: c.blue, color: '#fff', fontSize: 12.5, lineHeight: 1.55 }}>
                        Chào bạn, mình thấy tin của bạn và muốn hỏi thêm một chút về món đồ.
                      </div>
                      <div style={{ fontSize: 10.5, color: c.muted2, textAlign: 'right', marginTop: 4 }}>Vừa gửi · đang chờ đồng ý</div>
                    </div>
                    <div style={{ alignSelf: 'center', padding: '8px 14px', borderRadius: 99, background: c.chip, color: c.muted, fontSize: 11, fontWeight: 500 }}>
                      Đã hết lượt nhắn — chờ {peerName} phản hồi
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          <div style={{ borderTop: `1px solid ${c.line2}`, padding: '12px 18px 16px' }}>
            {open && (
              <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                {['Chụp ảnh', 'Gửi ảnh', 'Ghi âm', 'Chia sẻ vị trí'].map((x) => (
                  <div key={x} className="ll-tab-soft" style={toolChip}>{x}</div>
                ))}
                <div onClick={() => navigate('/')} style={{ marginLeft: 'auto', height: 32, padding: '0 13px', borderRadius: 99, background: c.redSoft, color: c.redInk, fontSize: 11, fontWeight: 500, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>Không phải đồ của tôi</div>
              </div>
            )}
            {request && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 10, fontSize: 11, color: c.muted2 }}>
                <div>{requestSent ? 'Đã dùng 1/1 tin nhắn giới thiệu' : 'Còn 1/1 tin nhắn giới thiệu'}</div>
                <div>Không gửi số điện thoại hay địa chỉ trong tin đầu tiên</div>
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1, height: 46, borderRadius: 8, display: 'flex', alignItems: 'center', padding: '0 18px', fontSize: 13, ...(sendDisabled ? { background: '#F4F6FA', color: '#A8B3C2' } : { background: c.chip, color: c.muted3 }) }}>{inputLabel}</div>
              <div onClick={sendRequest} style={{ width: 46, height: 46, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', ...(sendDisabled ? { background: '#CDD6E2', cursor: 'default' } : { background: c.blue, cursor: 'pointer', boxShadow: '0 2px 8px rgba(46,109,180,0.28)' }) }}>
                <div style={{ width: 9, height: 9, borderRight: '2px solid #fff', borderTop: '2px solid #fff', transform: 'rotate(45deg)', marginLeft: -3 }} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Right rail ──────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {request && (
            <div style={{ ...card, padding: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>Vì sao chỉ được một tin?</div>
              <div style={{ fontSize: 11.5, lineHeight: 1.6, color: c.muted }}>
                Giới hạn này giúp không ai bị nhắn tin dồn dập. Khi {peerName} trả lời, hai bạn nhắn tin bình thường. Nếu bạn muốn nhận lại một món đồ cụ thể, trả lời câu hỏi xác minh ở bài đăng sẽ mở kênh trò chuyện ngay.
              </div>
            </div>
          )}

          {open && (
            <>
              <div style={{ ...card, padding: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Đã nhận được đồ chưa?</div>
                <div style={{ fontSize: 11.5, lineHeight: 1.55, color: c.muted, marginBottom: 14 }}>Cả hai cùng xác nhận thì bài đăng mới khép lại.</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, background: c.soft, marginBottom: 12 }}>
                  <div style={{ width: 18, height: 18, borderRadius: 99, background: c.blue, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 5, height: 8, borderRight: '2px solid #fff', borderBottom: '2px solid #fff', transform: 'rotate(45deg)', marginTop: -2 }} />
                  </div>
                  <div style={{ fontSize: 11.5, color: c.ink2 }}>@hoangnam.q1 đã xác nhận</div>
                </div>
                <div
                  onClick={() => setReturned((v) => !v)}
                  style={{ height: 44, borderRadius: 8, fontSize: 12.5, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', ...(returned ? { background: c.blueSoft, color: c.blue, border: '1px solid #C6DCF3' } : { background: c.blue, color: '#fff' }) }}
                >
                  {returned ? 'Bạn đã xác nhận rồi' : 'Tôi đã nhận được đồ'}
                </div>
              </div>

              <div style={{ ...card, padding: 20, flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Chỗ hẹn an toàn gần đó</div>
                <div style={{ fontSize: 11, color: c.muted2, marginBottom: 14 }}>Nơi công cộng, có người qua lại</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {meetups.map((s, i) => (
                    <div key={i} className="ll-meetup" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 12px', borderRadius: 9, background: c.soft, border: `1px solid ${c.line2}`, cursor: 'pointer' }}>
                      <div style={{ width: 8, height: 8, borderRadius: 99, background: c.blue, flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 500 }}>{s.name}</div>
                        <div style={{ fontSize: 10.5, color: c.muted2 }}>{s.dist}</div>
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

const headerBtn = { height: 34, padding: '0 14px', borderRadius: 8, background: '#EDF1F7', fontSize: 11.5, fontWeight: 500, display: 'flex', alignItems: 'center', cursor: 'pointer' }
const toolChip = { height: 32, padding: '0 13px', borderRadius: 99, background: '#EDF1F7', fontSize: 11, fontWeight: 500, display: 'flex', alignItems: 'center', cursor: 'pointer' }
