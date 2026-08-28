import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { c } from '../../theme/tokens'
import { NOTIF_TABS, notifGroups, notifPrefs } from '../../data/notifications'

const TONES = {
  blue: [c.blueSoft, c.blue],
  green: [c.greenSoft, c.green],
  warm: [c.amberSoft, c.amber],
}

// U6 · Activity feed + reminder preferences.
export default function Notifications() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('Tất cả')
  const [read, setRead] = useState(false)
  const [pref, setPref] = useState({ a: true, b: true, c: false })

  return (
    <div className="mx-auto max-w-[1120px] px-10 pt-7">
      <div className="mb-1 text-[25px] font-bold tracking-[-0.028em]">Thông báo</div>
      <div className="mb-[22px] text-[13px] text-muted">Mình sẽ nhắn cho bạn khi có tin liên quan tới món đồ bạn đang tìm.</div>

      <div className="grid grid-cols-[1fr_300px] items-start gap-5">
        <div className="card overflow-hidden">
          <div className="flex items-center gap-2 border-b border-line2 px-5 py-4">
            {NOTIF_TABS.map((l) => {
              const on = tab === l
              return (
                <div
                  key={l}
                  onClick={() => setTab(l)}
                  className={`flex h-8 cursor-pointer items-center rounded-full px-3.5 text-[11.5px] font-semibold ${on ? 'bg-blue text-white' : 'bg-chip text-ink2'}`}
                >
                  {l}
                </div>
              )
            })}
            <div className="ml-auto cursor-pointer text-[11.5px] font-medium text-blue" onClick={() => setRead(true)}>Đánh dấu đã đọc hết</div>
          </div>

          {notifGroups.map((g) => (
            <div key={g.label}>
              <div className="bg-[#FBFCFE] px-5 pb-2 pt-3.5 text-[10.5px] font-semibold uppercase tracking-[0.05em] text-muted2">{g.label}</div>
              {g.items.map((n, i) => {
                const [bg, fg] = TONES[n.tone]
                const unread = n.unread && !read
                return (
                  <div
                    key={i}
                    onClick={() => navigate(n.go)}
                    className={`flex cursor-pointer items-start gap-3.5 border-t border-line2 px-5 py-4 ${unread ? 'bg-[#F8FBFF]' : 'bg-white'}`}
                  >
                    <div
                      className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-[10px] text-[14.5px]"
                      style={{ background: bg, color: fg }}
                    >
                      {n.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-[3px] text-[13px] font-semibold">{n.title}</div>
                      <div className="text-[12px] leading-[1.5] text-muted">{n.body}</div>
                      <div className="mt-1.5 text-[11px] text-muted2">{n.time}</div>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${unread ? 'bg-red' : 'bg-transparent'}`} />
                      <div className="ll-tab-soft flex h-[34px] items-center rounded-[10px] bg-chip px-3.5 text-[11.5px] font-semibold text-ink">{n.action}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3.5">
          <div className="card p-5">
            <div className="mb-1 text-[14px] font-bold">Nhắc mình khi nào?</div>
            <div className="mb-3.5 text-[11.5px] text-muted2">Bạn tắt bớt lúc nào cũng được.</div>
            <div className="flex flex-col gap-1.5">
              {notifPrefs.map((p) => {
                const on = pref[p.key]
                return (
                  <div
                    key={p.key}
                    onClick={() => setPref((s) => ({ ...s, [p.key]: !s[p.key] }))}
                    className="flex cursor-pointer items-center gap-3 px-1 py-2.5"
                  >
                    <div className="flex-1 text-[12px] text-ink2">{p.label}</div>
                    <Toggle on={on} />
                  </div>
                )
              })}
            </div>
          </div>

          <div className="rounded-xl border border-blue-line bg-blue-soft p-5">
            <div className="mb-1.5 text-[13.5px] font-bold text-blue-ink">Khu vực bạn đang theo dõi</div>
            <div className="mb-3 text-[11.5px] leading-[1.55] text-blue-text">Quận 1 · Bến xe Mỹ Đình · bán kính 3 km</div>
            <div
              onClick={() => navigate('/settings')}
              className="flex h-[38px] cursor-pointer items-center justify-center rounded-[10px] border border-blue-line bg-white text-[12px] font-semibold text-blue-ink"
            >
              Đổi khu vực
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Toggle({ on }) {
  return (
    <div className={`flex h-[23px] w-10 flex-shrink-0 rounded-full p-[2.5px] transition-colors ${on ? 'bg-blue' : 'bg-[#D3DBE6]'}`}>
      <div className="h-[18px] w-[18px] rounded-full bg-white transition-[margin]" style={{ marginLeft: on ? 17 : 0 }} />
    </div>
  )
}
