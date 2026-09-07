import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { IMG, PHOTO } from '../../theme/tokens'
import { posts, galleryFor, comments } from '../../data/posts'

export default function Detail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isGuest, openLogin, liked, toggleLike } = useApp()

  const post = posts[Number(id)] || posts[0]
  const lost = post.type === 'lost'
  const gallery = galleryFor(post)

  const on = !!liked.detail
  const likeLabel = String(37 + (on ? 1 : 0))

  // The post being claimed — carried through verification and attached to the
  // conversation that opens once ownership is confirmed.
  const attachedPost = {
    id: post.id,
    title: post.title,
    seed: post.seed,
    type: post.type,
    category: post.category,
    area: post.area,
    handle: post.handle,
    initials: post.initials,
  }

  const claim = () => {
    if (isGuest) return openLogin()
    navigate('/verify', {
      state: { post: attachedPost, peer: post.handle, peerInitials: post.initials },
    })
  }
  const report = () => (isGuest ? openLogin() : navigate('/report'))

  return (
    <div className="px-4 pt-5 sm:px-6 lg:px-10 lg:pt-6">
      <div
        className="mb-[18px] flex w-fit cursor-pointer items-center gap-2.5 text-[12px] text-muted"
        onClick={() => navigate('/home')}
      >
        <div className="h-[7px] w-[7px] rotate-45 border-b-[1.5px] border-l-[1.5px] border-[#5A6980]" />
        Quay lại danh sách
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_372px]">
        {/* ── Left column ─────────────────────────── */}
        <div className="flex flex-col gap-4">
          <div className="card overflow-hidden">
            <div className="relative h-[240px] bg-chip sm:h-[320px] lg:h-[400px]">
              <div
                className="h-full w-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundColor: '#EDF1F7', backgroundImage: `url(${IMG(post.seed, 900)})` }}
              />
              <ArrowBtn side="left" />
              <ArrowBtn side="right" />
              <div className="absolute bottom-[18px] right-[18px] flex h-7 items-center rounded-full bg-[rgba(22,35,58,0.72)] px-3 text-[10.5px] text-white">
                1 / 4
              </div>
            </div>
            <div className="flex gap-2.5 overflow-x-auto px-[18px] py-3.5">
              {gallery.map((url, i) => (
                <div
                  key={i}
                  className="cursor-pointer"
                  style={{ ...PHOTO(url, 74, 62, 10), ...(i === 0 ? { outline: '2px solid #2E6DB4', outlineOffset: -2 } : {}) }}
                />
              ))}
            </div>
          </div>

          <div className="card p-5 lg:p-[26px]">
            <div className="mb-3 flex flex-wrap items-center gap-2.5">
              <div
                className={`flex h-[26px] items-center rounded-full px-3 text-[11px] font-bold tracking-[.02em] ${
                  lost ? 'bg-red-soft text-red' : 'bg-blue-soft text-blue'
                }`}
              >
                {lost ? 'MẤT ĐỒ' : 'NHẶT ĐƯỢC'}
              </div>
              <div className="flex h-[26px] items-center rounded-full bg-chip px-3 text-[11px] text-ink2">{post.category}</div>
              <div className="text-[11.5px] text-muted2">Đăng {post.timeAgo}</div>
            </div>
            <div className="mb-2 text-[20px] font-bold tracking-[-0.028em] lg:text-[25px]">{post.title}</div>
            <div className="mb-6 text-[14px] leading-[1.65] text-ink2">{post.desc}</div>

            <div className="mb-[22px] grid grid-cols-2 gap-px overflow-hidden rounded-[10px] border border-line bg-line">
              <Fact label={lost ? 'Thời điểm mất' : 'Thời điểm nhặt'} value={post.timeWindow} />
              <Fact label="Khu vực" value={post.area} />
            </div>

            <div className="flex flex-wrap items-center gap-3.5 border-t border-line2 pt-[18px]">
              <div
                onClick={() => toggleLike('detail')}
                className={`flex h-8 cursor-pointer items-center gap-1.5 rounded-full border px-[13px] text-[11.5px] font-semibold ${
                  on ? 'border-[#F3C4CE] bg-[#FDECEF] text-[#D93A5B]' : 'border-line bg-white text-muted'
                }`}
              >
                <span className="text-[14.5px] leading-none">♥</span>
                {likeLabel}
              </div>
              <div className="text-[11.5px] text-muted2">
                {on ? 'Bạn và 37 người khác quan tâm tin này' : 'Thích để đưa bài viết tiếp cận đến nhiều người dùng hơn'}
              </div>
              <div className="ml-auto text-[11.5px] text-muted2">3 bình luận · 248 lượt xem</div>
            </div>
          </div>

          {/* Comments */}
          <div className="card p-5 lg:p-[26px]">
            <div className="mb-[18px] text-[15px] font-bold">Bình luận · 3</div>

            {isGuest ? (
              <div className="mb-5 flex flex-col gap-3 rounded-[10px] border border-amber-line bg-amber-soft px-[18px] py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="text-[12.5px] text-amber-ink">Bạn cần đăng nhập để bình luận hoặc nhận lại đồ.</div>
                <div
                  className="ll-dark flex h-[38px] flex-shrink-0 cursor-pointer items-center rounded-lg bg-blue-dark px-[18px] text-[12px] font-semibold text-white"
                  onClick={openLogin}
                >
                  Đăng nhập
                </div>
              </div>
            ) : (
              <div className="mb-[22px] flex gap-3">
                <div className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-lg bg-blue-soft text-[11.5px] font-bold text-blue">
                  TL
                </div>
                <div className="flex-1 rounded-[10px] border border-line bg-soft px-4 py-3.5">
                  <div className="text-[12.5px] text-muted3">Bạn nhìn thấy món này ở đâu chưa? Kể giúp nhé…</div>
                  <div className="mt-3 flex justify-end">
                    <div className="flex h-[34px] cursor-pointer items-center rounded-lg bg-blue px-4 text-[11.5px] font-semibold text-white">
                      Gửi bình luận
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-5">
              {comments.map((cm, i) => (
                <div key={i} className="flex gap-3">
                  <div
                    onClick={() => navigate('/profile')}
                    className="flex h-[38px] w-[38px] flex-shrink-0 cursor-pointer items-center justify-center rounded-lg bg-chip text-[11.5px] font-bold text-ink2"
                  >
                    {cm.initials}
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <div onClick={() => navigate('/profile')} className="cursor-pointer text-[12.5px] font-semibold">
                        {cm.handle}
                      </div>
                      <div className="text-[10.5px] text-muted2">{cm.time}</div>
                    </div>
                    <div className="text-[13px] leading-[1.55] text-ink2">{cm.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right rail ──────────────────────────── */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-[90px]">
          <div className="card p-[22px]">
            <div className="mb-4 flex cursor-pointer items-center gap-3" onClick={() => navigate('/profile')}>
              <div className="flex h-[46px] w-[46px] items-center justify-center rounded-lg bg-blue-soft text-[13.5px] font-bold text-blue">
                {post.initials}
              </div>
              <div className="flex-1">
                <div className="text-[13.5px] font-semibold">{post.handle}</div>
                <div className="text-[11px] text-muted2">Tham gia từ 03/2025</div>
              </div>
              <div className="h-[7px] w-[7px] rotate-45 border-r-[1.5px] border-t-[1.5px] border-[#8494A8]" />
            </div>
            <div className="mb-[18px] flex gap-2">
              <MiniStat value="248" label="Điểm uy tín" accent />
              <MiniStat value="24" label="Đã trao trả" />
            </div>
            <div
              className="ll-subtle flex h-10 cursor-pointer items-center justify-center rounded-lg border border-line text-[12px] font-semibold"
              onClick={() => navigate('/profile')}
            >
              Xem trang cá nhân
            </div>
          </div>

          <div className="card p-[22px]">
            <div className="mb-1.5 text-[14px] font-bold">{lost ? 'Bạn nhặt được món này?' : 'Đây là đồ của bạn?'}</div>
            <div className="mb-4 text-[12px] leading-[1.55] text-muted">
              {lost
                ? 'Bạn gửi một yêu cầu trò chuyện cho người mất. Khi họ đồng ý, hai bên nhắn tin thoải mái để hẹn trao trả.'
                : 'Người đăng sẽ hỏi vài chi tiết về món đồ. Trả lời đúng là hai bên nhắn tin được ngay.'}
            </div>
            <div
              className="ll-primary flex h-[46px] cursor-pointer items-center justify-center rounded-[9px] bg-blue text-[13.5px] font-semibold text-white shadow-[0_2px_10px_rgba(46,109,180,0.28)]"
              onClick={claim}
            >
              {lost ? 'Tôi đang giữ món này' : 'Đây là đồ của tôi'}
            </div>
            <div className="mt-2.5 flex gap-2">
              <div className={`ll-subtle ${softBtn}`} onClick={claim}>Lưu bài</div>
              <div className={`ll-subtle ${softBtn}`} onClick={claim}>Theo dõi</div>
            </div>
          </div>

          <div className="card px-[22px] py-5">
            <div className="mb-[5px] text-[13px] font-bold">Thấy tin này có vấn đề?</div>
            <div className="mb-3.5 text-[11.5px] leading-[1.55] text-muted">
              Tin rác, đòi tiền mới trả đồ, hay ảnh không phải của người đăng — bạn báo cho LostLink, mình xem trong 24 giờ.
            </div>
            <div
              className="ll-report flex h-10 cursor-pointer items-center justify-center rounded-lg border border-red-line bg-[#FDF6F7] text-[12px] font-semibold text-red"
              onClick={report}
            >
              Báo cáo bài đăng này
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const softBtn =
  'flex h-10 flex-1 cursor-pointer items-center justify-center rounded-lg border border-line text-[12px] font-medium'

const Fact = ({ label, value }) => (
  <div className="bg-soft px-4 py-3.5">
    <div className="mb-[3px] text-[10.5px] text-muted2">{label}</div>
    <div className="text-[13px] font-semibold">{value}</div>
  </div>
)

const MiniStat = ({ value, label, accent }) => (
  <div className="flex-1 rounded-lg border border-line2 bg-soft px-3 py-2.5">
    <div className={`text-[15px] font-bold ${accent ? 'text-blue' : 'text-ink'}`}>{value}</div>
    <div className="text-[10.5px] text-muted2">{label}</div>
  </div>
)

const ArrowBtn = ({ side }) => (
  <div
    className="absolute top-1/2 -mt-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-white/95 shadow-[0_2px_10px_rgba(0,0,0,.12)]"
    style={{ [side]: 18 }}
  >
    <div
      className={
        side === 'left'
          ? 'ml-[3px] h-2 w-2 rotate-45 border-b-2 border-l-2 border-ink'
          : 'mr-[3px] h-2 w-2 rotate-45 border-r-2 border-t-2 border-ink'
      }
    />
  </div>
)
