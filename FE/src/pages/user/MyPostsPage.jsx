import { useNavigate } from 'react-router-dom'
import { c, IMG, PHOTO, badgeStyle, statusStyle, BADGE_LABEL, card } from '../../theme/tokens'
import { myPosts } from '../../data/posts'

// U2 · The signed-in user's own posts.
export default function MyPostsPage() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: '28px 40px 0', maxWidth: 1080, margin: '0 auto' }}>
      <div style={{ fontSize: 25, fontWeight: 700, letterSpacing: '-0.028em', marginBottom: 20 }}>Trang của tôi</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {myPosts.map((p, i) => (
          <div key={i} style={{ ...card, padding: 20, display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={PHOTO(IMG(p.seed, 200), 84, 84, 14)} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <div style={badgeStyle(p.type)}>{BADGE_LABEL[p.type]}</div>
                <div style={statusStyle(p.tone)}>{p.status}</div>
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{p.title}</div>
              <div style={{ fontSize: 11.5, color: c.muted2 }}>{p.stats}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div className="ll-subtle" style={{ height: 38, padding: '0 16px', borderRadius: 8, border: `1px solid ${c.line}`, fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>Sửa</div>
              <div className="ll-tab-soft" onClick={() => navigate('/post/' + (p.type === 'lost' ? 3 : 0))} style={{ height: 38, padding: '0 16px', borderRadius: 8, background: c.chip, fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>Xem</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
