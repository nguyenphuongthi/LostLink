import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { c, IMG, PHOTO, badgeStyle, BADGE_LABEL } from '../theme/tokens'

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
      className="ll-card"
      onClick={() => navigate('/post/' + post.id)}
      style={{
        background: '#fff',
        border: `1px solid ${c.line}`,
        borderRadius: 12,
        padding: 18,
        display: 'flex',
        gap: 20,
        cursor: 'pointer',
      }}
    >
      <div style={PHOTO(IMG(post.seed, 400), 176, 212, 10)} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div
            className="ll-name"
            onClick={(e) => {
              e.stopPropagation()
              navigate('/profile')
            }}
            style={{ fontSize: 12.5, fontWeight: 600, color: c.ink, cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            {post.handle.replace('@', '')}
          </div>
          <Dot />
          <div style={{ fontSize: 11, color: c.muted2, whiteSpace: 'nowrap' }}>{post.category}</div>
          <Dot />
          <div style={{ fontSize: 11, color: c.muted2, whiteSpace: 'nowrap' }}>{post.timeAgo}</div>
          <div style={{ marginLeft: 'auto', display: 'flex', flexShrink: 0 }}>
            <div style={badgeStyle(post.type)}>{BADGE_LABEL[post.type]}</div>
          </div>
        </div>

        <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.28, marginBottom: 8 }}>
          {post.title}
        </div>
        <div style={{ fontSize: 13.5, lineHeight: 1.55, color: c.muted, marginBottom: 14 }}>{post.desc}</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 30, padding: '0 12px', borderRadius: 99, background: c.chip, fontSize: 11.5, color: c.ink2 }}>
            <div style={{ width: 8, height: 8, borderRadius: 99, border: `2px solid ${c.muted2}` }} />
            {post.area}
          </div>
          <div style={{ height: 30, padding: '0 12px', borderRadius: 99, background: c.chip, fontSize: 11.5, color: c.ink2, display: 'flex', alignItems: 'center' }}>
            {post.timeWindow}
          </div>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, borderTop: `1px solid ${c.line2}`, paddingTop: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <div
              onClick={(e) => {
                e.stopPropagation()
                toggleLike(key)
              }}
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
              <span style={{ fontSize: 12.5, lineHeight: 1 }}>♥</span>
              {likeLabel}
            </div>
            <div style={{ fontSize: 11.5, color: c.muted2, whiteSpace: 'nowrap' }}>
              {post.commentLabel} · {post.viewLabel}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, fontWeight: 600, color: c.blue, whiteSpace: 'nowrap' }}>
            Xem chi tiết
            <div style={{ width: 5, height: 5, borderRight: `1.5px solid ${c.blue}`, borderTop: `1.5px solid ${c.blue}`, transform: 'rotate(45deg)' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

const Dot = () => <div style={{ width: 3, height: 3, borderRadius: 99, background: '#C3CCD8', flexShrink: 0 }} />
