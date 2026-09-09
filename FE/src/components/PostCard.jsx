import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { IMG, BADGE_LABEL } from '../theme/tokens'

// A feed row on Home. Whole card opens the post; the like pill and the
// author name are independent click targets.
export default function PostCard({ post }) {
  const navigate = useNavigate()
  const { liked, toggleLike } = useApp()

  const key = 'p' + post.id
  const on = !!liked[key]
  const likeLabel = String(post.likeBase + (on ? 1 : 0))

  return (
    <div
      className="ll-card flex cursor-pointer gap-3.5 rounded-xl border border-line bg-white p-3.5 sm:gap-5 sm:p-[18px]"
      onClick={() => navigate('/post/' + post.id)}
    >
      <div
        className="h-[112px] w-[100px] flex-shrink-0 rounded-[10px] bg-cover bg-center bg-no-repeat sm:h-[212px] sm:w-[176px]"
        style={{ backgroundColor: '#EDF1F7', backgroundImage: `url(${IMG(post.seed, 400)})` }}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="mb-2 flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <div
            className="ll-name cursor-pointer whitespace-nowrap text-[12.5px] font-semibold text-ink"
            onClick={(e) => {
              e.stopPropagation()
              navigate('/profile')
            }}
          >
            {post.handle}
          </div>
          <Dot />
          <div className="whitespace-nowrap text-[11px] text-muted2">{post.category}</div>
          <Dot />
          <div className="whitespace-nowrap text-[11px] text-muted2">{post.timeAgo}</div>
          <div className="ml-auto flex flex-shrink-0">
            <div className={`badge badge-${post.type}`}>{BADGE_LABEL[post.type]}</div>
          </div>
        </div>

        <div className="mb-2 text-[16px] font-bold leading-[1.28] tracking-[-0.02em] sm:text-[19px]">
          {post.title}
        </div>
        <div className="mb-3.5 text-[13px] leading-[1.55] text-muted sm:text-[13.5px]">{post.desc}</div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <div className="flex h-[30px] items-center gap-1.5 rounded-full bg-chip px-3 text-[11.5px] text-ink2">
            <div className="h-2 w-2 rounded-full border-2 border-muted2" />
            {post.area}
          </div>
          <div className="flex h-[30px] items-center rounded-full bg-chip px-3 text-[11.5px] text-ink2">
            {post.timeWindow}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-line2 pt-3">
          <div className="flex min-w-0 items-center gap-3">
            <div
              onClick={(e) => {
                e.stopPropagation()
                toggleLike(key)
              }}
              className={`flex h-8 flex-shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-[13px] text-[11.5px] font-semibold ${
                on ? 'border-[#F3C4CE] bg-[#FDECEF] text-[#D93A5B]' : 'border-line bg-white text-muted'
              }`}
            >
              <span className="text-[12.5px] leading-none">♥</span>
              {likeLabel}
            </div>
            <div className="truncate text-[11.5px] text-muted2">
              {post.commentLabel} · {post.viewLabel}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Dot = () => <div className="h-[3px] w-[3px] flex-shrink-0 rounded-full bg-[#C3CCD8]" />
