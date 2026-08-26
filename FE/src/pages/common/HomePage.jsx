import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { c, chipStyle, eyebrow, card } from '../../theme/tokens'
import { posts } from '../../data/posts'
import { FILTER_CATEGORIES, leaders, communityStats, TIME_RANGES } from '../../data/catalog'
import PostCard from '../../components/PostCard'

export default function HomePage() {
  const navigate = useNavigate()
  const [cat, setCat] = useState('Tất cả')
  const [range, setRange] = useState('7 ngày qua')

  const shown = posts.filter((p) => cat === 'Tất cả' || p.category === cat)

  return (
    <div style={{ padding: '28px 40px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '268px 1fr 316px', gap: 24, alignItems: 'start' }}>
        {/* ── Filters ───────────────────────────────── */}
        <div style={{ ...stickyCol, ...card, padding: 20, boxShadow: '0 1px 2px rgba(22,35,58,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Bộ lọc</div>
            <div style={{ fontSize: 11.5, color: c.blue, fontWeight: 500, cursor: 'pointer' }} onClick={() => { setCat('Tất cả'); setRange('7 ngày qua') }}>
              Xóa lọc
            </div>
          </div>

          <div style={eyebrow}>Loại tin</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 22 }}>
            <div style={{ height: 38, borderRadius: 8, background: c.redSoft, border: '1.5px solid #F0CBD2', color: c.red, fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              Mất đồ
            </div>
            <div style={{ height: 38, borderRadius: 8, background: c.blueSoft, border: '1.5px solid #C6DCF3', color: c.blue, fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              Nhặt được
            </div>
          </div>

          <div style={eyebrow}>Danh mục</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 22 }}>
            {FILTER_CATEGORIES.map((name) => (
              <div key={name} style={chipStyle(cat === name)} onClick={() => setCat(name)}>
                {name}
              </div>
            ))}
          </div>

          <div style={eyebrow}>Khu vực</div>
          <div style={{ height: 40, borderRadius: 8, border: `1px solid ${c.line}`, background: c.soft, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', fontSize: 12.5, marginBottom: 10, cursor: 'pointer' }}>
            <div>TP. Hồ Chí Minh</div>
            <Caret />
          </div>
          <div style={{ fontSize: 11.5, color: c.muted, marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
            <span>Bán kính</span>
            <span style={{ fontWeight: 600, color: c.ink }}>3 km</span>
          </div>
          <Slider pct={42} />

          <div style={{ ...eyebrow, marginTop: 22 }}>Khoảng thời gian</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 }}>
            {TIME_RANGES.map((t) => {
              const on = range === t
              return (
                <div
                  key={t}
                  className={on ? undefined : 'll-chip-soft'}
                  onClick={() => setRange(t)}
                  style={{
                    height: 36,
                    borderRadius: 8,
                    fontSize: 12,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 12px',
                    cursor: 'pointer',
                    ...(on
                      ? { background: c.blueSoft, border: '1.5px solid #C6DCF3', color: c.blue, fontWeight: 600 }
                      : { background: c.chip }),
                  }}
                >
                  {t}
                </div>
              )
            })}
          </div>

          <div className="ll-dark" style={{ height: 44, borderRadius: 8, background: c.blueDark, color: '#fff', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            Áp dụng bộ lọc
          </div>
        </div>

        {/* ── Feed ──────────────────────────────────── */}
        <div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.025em' }}>Tin mới quanh bạn</div>
              <div style={{ fontSize: 12.5, color: c.muted, marginTop: 4 }}>
                {shown.length} tin trong bán kính 3 km · cập nhật 2 phút trước
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: c.muted }}>
              Sắp xếp
              <div style={{ height: 36, padding: '0 14px', borderRadius: 8, background: '#fff', border: `1px solid ${c.line}`, display: 'flex', alignItems: 'center', gap: 10, fontWeight: 500, color: c.ink, cursor: 'pointer' }}>
                Mới nhất
                <Caret />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {shown.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </div>

        {/* ── Right rail ────────────────────────────── */}
        <div style={{ ...stickyCol, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ ...card, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Bảng vinh danh</div>
              <div style={{ fontSize: 10.5, color: c.muted2 }}>Quý III/2026</div>
            </div>
            <div style={{ fontSize: 11, color: c.muted, marginBottom: 16 }}>Xếp theo điểm uy tín cộng đồng</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {leaders.map((l) => (
                <div key={l.rank} className="ll-row" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 8px', borderRadius: 8, cursor: 'pointer' }} onClick={() => navigate('/profile')}>
                  <div style={{ width: 22, textAlign: 'center', fontSize: 11.5, fontWeight: 700, color: l.rank <= 3 ? c.blue : '#A8B3C2' }}>{l.rank}</div>
                  <div style={{ width: 30, height: 30, borderRadius: 99, background: c.chip, color: c.ink2, fontSize: 10.5, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{l.initials}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{l.handle}</div>
                    <div style={{ fontSize: 10.5, color: c.muted2 }}>{l.returned}</div>
                  </div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: c.blue }}>{l.points}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: c.blueDark, borderRadius: 12, padding: 22, color: '#fff' }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 18 }}>Cộng đồng LostLink</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 12px' }}>
              {communityStats.map((s) => (
                <div key={s.label}>
                  <div style={{ fontSize: 23.5, fontWeight: 700, letterSpacing: '-0.025em', color: s.accent ? '#8FC0F2' : '#fff' }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: '#94A4BC', marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: c.blueSoft, border: '1px solid #C6DCF3', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: c.blueInk, marginBottom: 6 }}>Nhận cảnh báo khu vực</div>
            <div style={{ fontSize: 11.5, lineHeight: 1.55, color: c.blueText, marginBottom: 14 }}>
              Khi có tin mới trong khu vực bạn theo dõi, LostLink sẽ nhắn cho bạn ngay.
            </div>
            <div className="ll-primary" onClick={() => navigate('/settings')} style={{ height: 40, borderRadius: 8, background: c.blue, color: '#fff', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              Thiết lập vùng theo dõi
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Both side rails lock in place while the feed scrolls: they pin 98px below
// the top (just under the sticky navbar) instead of scrolling away.
const stickyCol = {
  position: 'sticky',
  top: 98,
  alignSelf: 'start',
}

const Caret = () => (
  <div style={{ width: 7, height: 7, borderRight: '1.5px solid #8494A8', borderBottom: '1.5px solid #8494A8', transform: 'rotate(45deg)', marginTop: -4 }} />
)

const Slider = ({ pct }) => (
  <div style={{ height: 6, borderRadius: 99, background: '#E7ECF3', position: 'relative' }}>
    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: pct + '%', background: '#2E6DB4', borderRadius: 99 }} />
    <div style={{ position: 'absolute', left: pct + '%', top: -5, width: 16, height: 16, borderRadius: 99, background: '#fff', border: '3px solid #2E6DB4', marginLeft: -8 }} />
  </div>
)
