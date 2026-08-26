import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { c, card } from '../../theme/tokens'
import { NOTIF_TABS, notifGroups, notifPrefs } from '../../data/notifications'

const TONES = {
  blue: [c.blueSoft, c.blue],
  green: [c.greenSoft, c.green],
  warm: [c.amberSoft, c.amber],
}

// U6 · Activity feed + reminder preferences.
export default function NotificationsPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('Tất cả')
  const [read, setRead] = useState(false)
  const [pref, setPref] = useState({ a: true, b: true, c: false })

  return (
    <div style={{ padding: '28px 40px 0', maxWidth: 1120, margin: '0 auto' }}>
      <div style={{ fontSize: 25, fontWeight: 700, letterSpacing: '-0.028em', marginBottom: 4 }}>Thông báo</div>
      <div style={{ fontSize: 13, color: c.muted, marginBottom: 22 }}>Mình sẽ nhắn cho bạn khi có tin liên quan tới món đồ bạn đang tìm.</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, alignItems: 'start' }}>
        <div style={{ ...card, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '16px 20px', borderBottom: `1px solid ${c.line2}` }}>
            {NOTIF_TABS.map((l) => {
              const on = tab === l
              return (
                <div key={l} onClick={() => setTab(l)} style={{ height: 32, padding: '0 14px', borderRadius: 99, fontSize: 11.5, fontWeight: 600, display: 'flex', alignItems: 'center', cursor: 'pointer', ...(on ? { background: c.blue, color: '#fff' } : { background: c.chip, color: c.ink2 }) }}>{l}</div>
              )
            })}
            <div style={{ marginLeft: 'auto', fontSize: 11.5, fontWeight: 500, color: c.blue, cursor: 'pointer' }} onClick={() => setRead(true)}>Đánh dấu đã đọc hết</div>
          </div>

          {notifGroups.map((g) => (
            <div key={g.label}>
              <div style={{ padding: '14px 20px 8px', fontSize: 10.5, fontWeight: 600, color: c.muted2, letterSpacing: '0.05em', textTransform: 'uppercase', background: '#FBFCFE' }}>{g.label}</div>
              {g.items.map((n, i) => {
                const [bg, fg] = TONES[n.tone]
                const unread = n.unread && !read
                return (
                  <div key={i} onClick={() => navigate(n.go)} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '16px 20px', borderTop: `1px solid ${c.line2}`, cursor: 'pointer', background: unread ? '#F8FBFF' : '#fff' }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14.5, background: bg, color: fg }}>{n.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{n.title}</div>
                      <div style={{ fontSize: 12, lineHeight: 1.5, color: c.muted }}>{n.body}</div>
                      <div style={{ fontSize: 11, color: c.muted2, marginTop: 6 }}>{n.time}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 99, background: unread ? c.red : 'transparent' }} />
                      <div className="ll-tab-soft" style={{ height: 34, padding: '0 14px', borderRadius: 10, background: c.chip, color: c.ink, fontSize: 11.5, fontWeight: 600, display: 'flex', alignItems: 'center' }}>{n.action}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ ...card, padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Nhắc mình khi nào?</div>
            <div style={{ fontSize: 11.5, color: c.muted2, marginBottom: 14 }}>Bạn tắt bớt lúc nào cũng được.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {notifPrefs.map((p) => {
                const on = pref[p.key]
                return (
                  <div key={p.key} onClick={() => setPref((s) => ({ ...s, [p.key]: !s[p.key] }))} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 4px', cursor: 'pointer' }}>
                    <div style={{ flex: 1, fontSize: 12, color: c.ink2 }}>{p.label}</div>
                    <Toggle on={on} />
                  </div>
                )
              })}
            </div>
          </div>

          <div style={{ background: c.blueSoft, border: '1px solid #C6DCF3', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: c.blueInk, marginBottom: 6 }}>Khu vực bạn đang theo dõi</div>
            <div style={{ fontSize: 11.5, lineHeight: 1.55, color: c.blueText, marginBottom: 12 }}>Quận 1 · Bến xe Mỹ Đình · bán kính 3 km</div>
            <div onClick={() => navigate('/settings')} style={{ height: 38, borderRadius: 10, background: '#fff', border: '1px solid #C6DCF3', color: c.blueInk, fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>Đổi khu vực</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Toggle({ on }) {
  return (
    <div style={{ width: 40, height: 23, borderRadius: 99, flexShrink: 0, padding: 2.5, display: 'flex', transition: 'background .15s', background: on ? c.blue : '#D3DBE6' }}>
      <div style={{ width: 18, height: 18, borderRadius: 99, background: '#fff', transition: 'margin-left .15s', marginLeft: on ? 17 : 0 }} />
    </div>
  )
}
