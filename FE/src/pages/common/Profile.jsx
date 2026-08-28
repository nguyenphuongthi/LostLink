import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { PHOTO, BADGE_LABEL } from '../../theme/tokens'
import { profile, PROFILE_TABS, profilePosts, reviews } from '../../data/people'

export default function Profile() {
  const navigate = useNavigate()
  const { isGuest, openLogin, following, toggleFollow } = useApp()
  const [tab, setTab] = useState('Tất cả')

  const shown = profilePosts.filter(
    (p) => tab === 'Tất cả' || (tab === 'Nhặt được' ? p.type === 'found' : p.type === 'lost'),
  )

  const onFollow = () => (isGuest ? openLogin() : toggleFollow())

  return (
    <div className="mx-auto max-w-[1100px] px-4 pt-5 sm:px-6 lg:px-10 lg:pt-6">
      <div
        className="mb-[18px] flex w-fit cursor-pointer items-center gap-2.5 text-[12px] text-muted"
        onClick={() => navigate(-1)}
      >
        <div className="h-[7px] w-[7px] rotate-45 border-b-[1.5px] border-l-[1.5px] border-[#5A6980]" />
        Quay lại
      </div>

      {/* ── Header ─────────────────────────────────── */}
      <div className="card mb-5 overflow-hidden rounded-[14px]">
        <div className="flex flex-col gap-4 px-5 pb-6 pt-6 sm:flex-row sm:items-end sm:gap-5 sm:px-7">
          <div className="flex h-[88px] w-[88px] flex-shrink-0 items-center justify-center rounded-full border-[5px] border-white bg-blue-soft text-[24px] font-bold text-blue sm:h-[108px] sm:w-[108px] sm:text-[28.5px]">
            {profile.initials}
          </div>
          <div className="flex-1 pb-1.5">
            <div className="mb-1 flex flex-wrap items-center gap-2.5">
              <div className="text-[19px] font-bold tracking-[-0.02em] lg:text-[21.5px]">{profile.handle}</div>
              <div className="flex h-6 items-center rounded-full bg-blue-soft px-2.5 text-[10.5px] font-semibold text-blue">
                Đã xác thực
              </div>
            </div>
            <div className="text-[12.5px] text-muted">{profile.bio}</div>
          </div>
          <div className="flex flex-col items-start gap-2 pb-1.5 sm:items-end">
            <div className="flex gap-2.5">
              <div
                onClick={onFollow}
                className={`flex h-[42px] cursor-pointer items-center rounded-lg px-6 text-[12.5px] ${
                  following
                    ? 'border border-blue-line bg-blue-soft font-semibold text-blue'
                    : 'border border-blue bg-blue font-medium text-white'
                }`}
              >
                {following ? 'Đang theo dõi' : 'Theo dõi'}
              </div>
            </div>
            <div className="text-[11px] text-muted2 sm:max-w-[220px] sm:text-right lg:whitespace-nowrap">
              Muốn nhận lại đồ? Trả lời câu hỏi xác minh ở bài đăng để mở trò chuyện.
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1fr_320px]">
        {/* ── Posts ────────────────────────────────── */}
        <div>
          <div className="mb-4 flex gap-2">
            {PROFILE_TABS.map((label) => {
              const on = tab === label
              return (
                <div
                  key={label}
                  onClick={() => setTab(label)}
                  className={`flex h-[38px] cursor-pointer items-center rounded-lg border px-[18px] text-[12px] font-semibold ${
                    on ? 'border-blue bg-blue text-white' : 'border-line bg-white text-ink2'
                  }`}
                >
                  {label}
                </div>
              )
            })}
          </div>
          <div className="flex flex-col gap-3">
            {shown.map((p, i) => (
              <div
                key={i}
                className="ll-card-sm card flex cursor-pointer items-center gap-4 rounded-[11px] p-4"
                onClick={() => navigate('/post/0')}
              >
                <div style={PHOTO(p.photo, 92, 92, 14)} />
                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex items-center gap-2">
                    <div className={`badge badge-${p.type}`}>{BADGE_LABEL[p.type]}</div>
                    <div className={`status status-${p.tone}`}>{p.status}</div>
                    <div className="text-[11px] text-muted2">{p.timeAgo}</div>
                  </div>
                  <div className="mb-[5px] text-[14.5px] font-semibold">{p.title}</div>
                  <div className="text-[11.5px] text-muted2">{p.area}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right rail ───────────────────────────── */}
        <div className="flex flex-col gap-4">
          <div className="card p-5">
            <div className="mb-4 text-[14px] font-bold">Uy tín cộng đồng</div>
            <div className="mb-1 flex items-baseline gap-2">
              <div className="text-[34px] font-bold tracking-[-0.03em] text-blue">{profile.points}</div>
              <div className="text-[12px] text-muted">điểm</div>
            </div>
            <div className="mb-[18px] text-[11.5px] text-muted2">{profile.rankLabel}</div>
            <div className="grid grid-cols-2 gap-2.5">
              <RepStat value={profile.returned} label="Món đã trao trả" />
              <RepStat value={profile.rating} label="Đánh giá trung bình" />
            </div>
          </div>

          <div className="card p-5">
            <div className="mb-3.5 text-[14px] font-bold">Huy hiệu</div>
            <div className="flex flex-wrap gap-2">
              {profile.badges.map((b) => (
                <div
                  key={b.name}
                  className="flex h-[30px] items-center rounded-full bg-amber-soft px-3 text-[11px] font-semibold text-amber"
                >
                  {b.name}
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <div className="mb-3.5 text-[14px] font-bold">Người khác nói gì</div>
            <div className="flex flex-col gap-4">
              {reviews.map((r, i) => (
                <div key={i}>
                  <div className="mb-[5px] flex items-center gap-2">
                    <div className="text-[12px] font-semibold">{r.handle}</div>
                    <div className="text-[11px] text-star">{r.stars}</div>
                  </div>
                  <div className="text-[12px] leading-[1.55] text-muted">{r.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const RepStat = ({ value, label }) => (
  <div className="rounded-lg border border-line2 bg-soft p-3">
    <div className="text-[16px] font-bold">{value}</div>
    <div className="text-[10.5px] text-muted2">{label}</div>
  </div>
)
