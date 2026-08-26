import { useNavigate } from 'react-router-dom'
import { c, PHOTO, card } from '../../theme/tokens'
import { matches } from '../../data/matches'

// U4 · Suggested pairings for the user's lost item.
export default function MatchesPage() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: '28px 40px 0', maxWidth: 1080, margin: '0 auto' }}>
      <div style={{ fontSize: 25, fontWeight: 700, letterSpacing: '-0.028em', marginBottom: 4 }}>Có thể đây là đồ của bạn?</div>
      <div style={{ fontSize: 13, color: c.muted, marginBottom: 24 }}>
        Những tin nhặt được gần nơi và gần lúc bạn đánh mất chiếc túi tote xanh navy.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {matches.map((m, i) => (
          <div key={i} style={{ ...card, overflow: 'hidden' }}>
            <div className="ll-match-row" style={{ display: 'flex', gap: 20, padding: 22, cursor: 'pointer' }} onClick={() => navigate('/post/0')}>
              <div style={PHOTO(m.photo, 148, 148, 16)} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={{ height: 24, padding: '0 11px', borderRadius: 99, background: c.blueSoft, color: c.blue, fontSize: 10.5, fontWeight: 700, display: 'flex', alignItems: 'center' }}>NHẶT ĐƯỢC</div>
                  <div style={{ fontSize: 11, color: c.muted2 }}>{m.category}</div>
                  <div style={{ width: 3, height: 3, borderRadius: 99, background: '#C3CCD8' }} />
                  <div style={{ fontSize: 11, color: c.muted2 }}>{m.timeAgo}</div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 12 }}>{m.title}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {m.reasons.map((r, j) => (
                    <div key={j} style={{ height: 30, padding: '0 12px', borderRadius: 99, background: c.soft, border: `1px solid ${c.line2}`, fontSize: 11, color: c.ink2, display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 6, height: 6, borderRadius: 99, background: c.blue }} />
                      {r}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ width: 150, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingLeft: 20, borderLeft: `1px solid ${c.line2}` }}>
                <div style={{ fontSize: 30.5, fontWeight: 700, letterSpacing: '-.03em', color: m.strong ? c.blue : c.amber }}>{m.score}</div>
                <div style={{ fontSize: 11, color: c.muted2, marginTop: 8 }}>Mức giống nhau</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: c.blue, marginTop: 10 }}>Xem chi tiết →</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 22px', background: c.soft, borderTop: `1px solid ${c.line2}` }}>
              <div style={{ fontSize: 11, color: c.muted2 }}>{m.note}</div>
              <div style={{ display: 'flex', gap: 10 }}>
                <div className="ll-notphai" style={{ height: 40, padding: '0 20px', borderRadius: 8, border: `1px solid ${c.line}`, background: '#fff', fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>Không phải</div>
                <div className="ll-primary" onClick={() => navigate('/verify')} style={{ height: 40, padding: '0 22px', borderRadius: 8, background: c.blue, color: '#fff', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(46,109,180,0.24)' }}>Đúng là đồ của tôi</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
