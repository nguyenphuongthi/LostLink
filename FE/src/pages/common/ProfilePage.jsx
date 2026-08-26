import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { c, PHOTO, badgeStyle, statusStyle, BADGE_LABEL, card } from '../../theme/tokens'
import { profile, PROFILE_TABS, profilePosts, reviews } from '../../data/people'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { isGuest, openLogin, following, toggleFollow } = useApp()
  const [tab, setTab] = useState('Tất cả')

  const shown = profilePosts.filter(
    (p) => tab === 'Tất cả' || (tab === 'Nhặt được' ? p.type === 'found' : p.type === 'lost'),
  )

  const onFollow = () => (isGuest ? openLogin() : toggleFollow())
  const onMessage = () =>
    isGuest
      ? openLogin()
      : navigate('/chat', { state: { mode: following ? 'open' : 'request', peer: profile.handle, peerInitials: profile.initials } })

  return (
    <div style={{ padding: '24px 40px 0', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: c.muted, marginBottom: 18, cursor: 'pointer', width: 'fit-content' }} onClick={() => navigate(-1)}>
        <div style={{ width: 7, height: 7, borderLeft: '1.5px solid #5A6980', borderBottom: '1.5px solid #5A6980', transform: 'rotate(45deg)' }} />
        Quay lại
      </div>

      {/* ── Header ─────────────────────────────────── */}
      <div style={{ ...card, borderRadius: 14, overflow: 'hidden', marginBottom: 20 }}>
        <div style={{ height: 128, background: 'linear-gradient(120deg, #1B3358 0%, #2E6DB4 100%)' }} />
        <div style={{ padding: '0 28px 24px', display: 'flex', alignItems: 'flex-end', gap: 20, marginTop: -44 }}>
          <div style={{ width: 108, height: 108, borderRadius: 99, background: c.blueSoft, border: '5px solid #fff', color: c.blue, fontSize: 28.5, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {profile.initials}
          </div>
          <div style={{ flex: 1, paddingBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <div style={{ fontSize: 21.5, fontWeight: 700, letterSpacing: '-0.02em' }}>{profile.handle}</div>
              <div style={{ height: 24, padding: '0 10px', borderRadius: 99, background: c.blueSoft, color: c.blue, fontSize: 10.5, fontWeight: 600, display: 'flex', alignItems: 'center' }}>Đã xác thực</div>
            </div>
            <div style={{ fontSize: 12.5, color: c.muted }}>{profile.bio}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, paddingBottom: 6 }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <div
                onClick={onFollow}
                style={{
                  height: 42,
                  padding: '0 20px',
                  borderRadius: 8,
                  fontSize: 12.5,
                  fontWeight: following ? 600 : 500,
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  ...(following
                    ? { background: c.blueSoft, border: '1px solid #C6DCF3', color: c.blue }
                    : { background: '#fff', border: `1px solid ${c.line}`, color: c.ink }),
                }}
              >
                {following ? 'Đang theo dõi' : 'Theo dõi'}
              </div>
              <div className="ll-primary" onClick={onMessage} style={{ height: 42, padding: '0 20px', borderRadius: 8, background: c.blue, color: '#fff', fontSize: 12.5, fontWeight: 600, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                Nhắn tin
              </div>
            </div>
            <div style={{ fontSize: 11, color: c.muted2, whiteSpace: 'nowrap' }}>
              {following ? 'Hai bạn theo dõi nhau · nhắn tin được ngay, không cần chờ đồng ý' : '@hoangnam.q1 đang theo dõi bạn'}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, alignItems: 'start' }}>
        {/* ── Posts ────────────────────────────────── */}
        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {PROFILE_TABS.map((label) => {
              const on = tab === label
              return (
                <div
                  key={label}
                  onClick={() => setTab(label)}
                  style={{
                    height: 38,
                    padding: '0 18px',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    border: `1px solid ${on ? '#2E6DB4' : '#DFE5EE'}`,
                    background: on ? c.blue : '#fff',
                    color: on ? '#fff' : c.ink2,
                  }}
                >
                  {label}
                </div>
              )
            })}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {shown.map((p, i) => (
              <div key={i} className="ll-card-sm" onClick={() => navigate('/post/0')} style={{ ...card, borderRadius: 11, padding: 16, display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer' }}>
                <div style={PHOTO(p.photo, 92, 92, 14)} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <div style={badgeStyle(p.type)}>{BADGE_LABEL[p.type]}</div>
                    <div style={statusStyle(p.tone)}>{p.status}</div>
                    <div style={{ fontSize: 11, color: c.muted2 }}>{p.timeAgo}</div>
                  </div>
                  <div style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 5 }}>{p.title}</div>
                  <div style={{ fontSize: 11.5, color: c.muted2 }}>{p.area}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right rail ───────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ ...card, padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Uy tín cộng đồng</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
              <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-0.03em', color: c.blue }}>{profile.points}</div>
              <div style={{ fontSize: 12, color: c.muted }}>điểm</div>
            </div>
            <div style={{ fontSize: 11.5, color: c.muted2, marginBottom: 18 }}>{profile.rankLabel}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <RepStat value={profile.returned} label="Món đã trao trả" />
              <RepStat value={profile.rating} label="Đánh giá trung bình" />
            </div>
          </div>

          <div style={{ ...card, padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Huy hiệu</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {profile.badges.map((b) => (
                <div key={b.name} style={{ height: 30, padding: '0 12px', borderRadius: 99, background: c.amberSoft, color: c.amber, fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center' }}>{b.name}</div>
              ))}
            </div>
          </div>

          <div style={{ ...card, padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Người khác nói gì</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {reviews.map((r, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{r.handle}</div>
                    <div style={{ fontSize: 11, color: c.star }}>{r.stars}</div>
                  </div>
                  <div style={{ fontSize: 12, lineHeight: 1.55, color: c.muted }}>{r.text}</div>
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
  <div style={{ padding: 12, borderRadius: 8, background: '#F8FAFC', border: '1px solid #EDF1F7' }}>
    <div style={{ fontSize: 16, fontWeight: 700 }}>{value}</div>
    <div style={{ fontSize: 10.5, color: '#8494A8' }}>{label}</div>
  </div>
)
