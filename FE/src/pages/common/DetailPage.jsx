import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { c, IMG, PHOTO, card } from '../../theme/tokens'
import { posts, galleryFor, comments } from '../../data/posts'

export default function DetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isGuest, openLogin, liked, toggleLike } = useApp()

  const post = posts[Number(id)] || posts[0]
  const lost = post.type === 'lost'
  const gallery = galleryFor(post)

  const on = !!liked.detail
  const likeLabel = String(37 + (on ? 1 : 0))

  const claim = () => {
    if (isGuest) return openLogin()
    if (lost) {
      navigate('/chat', { state: { mode: 'request', peer: post.handle, peerInitials: post.initials } })
    } else {
      navigate('/verify')
    }
  }
  const report = () => (isGuest ? openLogin() : navigate('/report'))

  return (
    <div style={{ padding: '24px 40px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: c.muted, marginBottom: 18, cursor: 'pointer', width: 'fit-content' }} onClick={() => navigate('/')}>
        <div style={{ width: 7, height: 7, borderLeft: '1.5px solid #5A6980', borderBottom: '1.5px solid #5A6980', transform: 'rotate(45deg)' }} />
        Quay lại danh sách
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 372px', gap: 24, alignItems: 'start' }}>
        {/* ── Left column ─────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ ...card, overflow: 'hidden' }}>
            <div style={{ position: 'relative', height: 400, background: c.chip }}>
              <div style={{ width: '100%', height: '100%', background: `#EDF1F7 url(${IMG(post.seed, 900)}) center/cover no-repeat` }} />
              <ArrowBtn side="left" />
              <ArrowBtn side="right" />
              <div style={{ position: 'absolute', right: 18, bottom: 18, height: 28, padding: '0 12px', borderRadius: 99, background: 'rgba(22,35,58,0.72)', color: '#fff', fontSize: 10.5, display: 'flex', alignItems: 'center' }}>1 / 4</div>
            </div>
            <div style={{ display: 'flex', gap: 10, padding: '14px 18px' }}>
              {gallery.map((url, i) => (
                <div key={i} style={{ ...PHOTO(url, 74, 62, 10), cursor: 'pointer', ...(i === 0 ? { outline: '2px solid #2E6DB4', outlineOffset: -2 } : {}) }} />
              ))}
            </div>
          </div>

          <div style={{ ...card, padding: 26 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ height: 26, padding: '0 12px', borderRadius: 99, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', letterSpacing: '.02em', background: lost ? c.redSoft : c.blueSoft, color: lost ? c.red : c.blue }}>
                {lost ? 'MẤT ĐỒ' : 'NHẶT ĐƯỢC'}
              </div>
              <div style={{ height: 26, padding: '0 12px', borderRadius: 99, background: c.chip, color: c.ink2, fontSize: 11, display: 'flex', alignItems: 'center' }}>{post.category}</div>
              <div style={{ fontSize: 11.5, color: c.muted2 }}>Đăng {post.timeAgo}</div>
            </div>
            <div style={{ fontSize: 25, fontWeight: 700, letterSpacing: '-0.028em', marginBottom: 8 }}>{post.title}</div>
            <div style={{ fontSize: 14, lineHeight: 1.65, color: c.ink2, marginBottom: 24 }}>{post.desc}</div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: c.line, border: `1px solid ${c.line}`, borderRadius: 10, overflow: 'hidden', marginBottom: 22 }}>
              <Fact label={lost ? 'Thời điểm mất' : 'Thời điểm nhặt'} value={post.timeWindow} />
              <Fact label="Khu vực" value={post.area} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 18, borderTop: `1px solid ${c.line2}` }}>
              <div
                onClick={() => toggleLike('detail')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  height: 32,
                  padding: '0 13px',
                  borderRadius: 99,
                  border: `1px solid ${on ? '#F3C4CE' : c.line}`,
                  background: on ? '#FDECEF' : '#fff',
                  color: on ? '#D93A5B' : c.muted,
                  fontSize: 11.5,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: 14.5, lineHeight: 1 }}>♥</span>
                {likeLabel}
              </div>
              <div style={{ fontSize: 11.5, color: c.muted2 }}>
                {on ? 'Bạn và 37 người khác quan tâm tin này' : 'Thích để nhận thông báo khi tin có cập nhật'}
              </div>
              <div style={{ marginLeft: 'auto', fontSize: 11.5, color: c.muted2 }}>3 bình luận · 248 lượt xem</div>
            </div>
          </div>

          {/* Comments */}
          <div style={{ ...card, padding: 26 }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 18 }}>Bình luận · 3</div>

            {isGuest ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '16px 18px', borderRadius: 10, background: c.amberSoft, border: '1px solid #F2E4C6', marginBottom: 20 }}>
                <div style={{ fontSize: 12.5, color: c.amberInk }}>Bạn cần đăng nhập để bình luận hoặc nhận lại đồ.</div>
                <div className="ll-dark" onClick={openLogin} style={{ height: 38, padding: '0 18px', borderRadius: 8, background: c.blueDark, color: '#fff', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', cursor: 'pointer', flexShrink: 0 }}>Đăng nhập</div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 12, marginBottom: 22 }}>
                <div style={{ width: 38, height: 38, borderRadius: 8, background: c.blueSoft, color: c.blue, fontSize: 11.5, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>TL</div>
                <div style={{ flex: 1, border: `1px solid ${c.line}`, borderRadius: 10, padding: '14px 16px', background: c.soft }}>
                  <div style={{ fontSize: 12.5, color: c.muted3 }}>Bạn nhìn thấy món này ở đâu chưa? Kể giúp nhé…</div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                    <div style={{ height: 34, padding: '0 16px', borderRadius: 8, background: c.blue, color: '#fff', fontSize: 11.5, fontWeight: 600, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>Gửi bình luận</div>
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {comments.map((cm, i) => (
                <div key={i} style={{ display: 'flex', gap: 12 }}>
                  <div onClick={() => navigate('/profile')} style={{ width: 38, height: 38, borderRadius: 8, background: c.chip, color: c.ink2, fontSize: 11.5, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}>{cm.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <div onClick={() => navigate('/profile')} style={{ fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>{cm.handle}</div>
                      <div style={{ fontSize: 10.5, color: c.muted2 }}>{cm.time}</div>
                    </div>
                    <div style={{ fontSize: 13, lineHeight: 1.55, color: c.ink2 }}>{cm.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right rail ──────────────────────────── */}
        <div style={{ position: 'sticky', top: 98, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ ...card, padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, cursor: 'pointer' }} onClick={() => navigate('/profile')}>
              <div style={{ width: 46, height: 46, borderRadius: 8, background: c.blueSoft, color: c.blue, fontSize: 13.5, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{post.initials}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>{post.handle}</div>
                <div style={{ fontSize: 11, color: c.muted2 }}>Tham gia từ 03/2025</div>
              </div>
              <div style={{ width: 7, height: 7, borderRight: '1.5px solid #8494A8', borderTop: '1.5px solid #8494A8', transform: 'rotate(45deg)' }} />
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
              <MiniStat value="248" label="Điểm uy tín" accent />
              <MiniStat value="24" label="Đã trao trả" />
            </div>
            <div className="ll-subtle" onClick={() => navigate('/profile')} style={{ height: 40, borderRadius: 8, border: `1px solid ${c.line}`, fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>Xem trang cá nhân</div>
          </div>

          <div style={{ ...card, padding: 22 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{lost ? 'Bạn nhặt được món này?' : 'Đây là đồ của bạn?'}</div>
            <div style={{ fontSize: 12, lineHeight: 1.55, color: c.muted, marginBottom: 16 }}>
              {lost
                ? 'Bạn gửi một yêu cầu trò chuyện cho người mất. Khi họ đồng ý, hai bên nhắn tin thoải mái để hẹn trao trả.'
                : 'Người đăng sẽ hỏi vài chi tiết về món đồ. Trả lời đúng là hai bên nhắn tin được ngay.'}
            </div>
            <div className="ll-primary" onClick={claim} style={{ height: 46, borderRadius: 9, background: c.blue, color: '#fff', fontSize: 13.5, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 10px rgba(46,109,180,0.28)' }}>
              {lost ? 'Tôi đang giữ món này' : 'Đây là đồ của tôi'}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <div className="ll-subtle" onClick={claim} style={softBtn}>Lưu bài</div>
              <div className="ll-subtle" onClick={claim} style={softBtn}>Theo dõi</div>
            </div>
          </div>

          <div style={{ ...card, padding: '20px 22px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 5 }}>Thấy tin này có vấn đề?</div>
            <div style={{ fontSize: 11.5, lineHeight: 1.55, color: c.muted, marginBottom: 14 }}>
              Tin rác, đòi tiền mới trả đồ, hay ảnh không phải của người đăng — bạn báo cho LostLink, mình xem trong 24 giờ.
            </div>
            <div className="ll-report" onClick={report} style={{ height: 40, borderRadius: 8, border: '1px solid #F0CBD2', background: '#FDF6F7', color: c.red, fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              Báo cáo bài đăng này
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const softBtn = { flex: 1, height: 40, borderRadius: 8, border: '1px solid #DFE5EE', fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }

const Fact = ({ label, value }) => (
  <div style={{ background: '#F8FAFC', padding: '14px 16px' }}>
    <div style={{ fontSize: 10.5, color: '#8494A8', marginBottom: 3 }}>{label}</div>
    <div style={{ fontSize: 13, fontWeight: 600 }}>{value}</div>
  </div>
)

const MiniStat = ({ value, label, accent }) => (
  <div style={{ flex: 1, padding: '10px 12px', borderRadius: 8, background: '#F8FAFC', border: '1px solid #EDF1F7' }}>
    <div style={{ fontSize: 15, fontWeight: 700, color: accent ? '#2E6DB4' : '#16233A' }}>{value}</div>
    <div style={{ fontSize: 10.5, color: '#8494A8' }}>{label}</div>
  </div>
)

const ArrowBtn = ({ side }) => (
  <div style={{ position: 'absolute', [side]: 18, top: '50%', width: 40, height: 40, borderRadius: 8, background: 'rgba(255,255,255,0.94)', boxShadow: '0 2px 10px rgba(0,0,0,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginTop: -20 }}>
    <div style={side === 'left'
      ? { width: 8, height: 8, borderLeft: '2px solid #16233A', borderBottom: '2px solid #16233A', transform: 'rotate(45deg)', marginLeft: 3 }
      : { width: 8, height: 8, borderRight: '2px solid #16233A', borderTop: '2px solid #16233A', transform: 'rotate(45deg)', marginRight: 3 }} />
  </div>
)
