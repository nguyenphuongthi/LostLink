import { useNavigate } from 'react-router-dom'
import { leaders, communityStats } from '../data/catalog'

// Leaderboard + community stats + geofence CTA. Shown as the Home right rail on
// desktop and as the standalone /leaderboard screen on mobile.
export default function RightRail() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col gap-4">
      <div className="card p-5">
        <div className="mb-1 flex items-baseline justify-between">
          <div className="text-[14px] font-bold">Bảng vinh danh</div>
          <div className="text-[10.5px] text-muted2">Quý III/2026</div>
        </div>
        <div className="mb-4 text-[11px] text-muted">Xếp theo điểm uy tín cộng đồng</div>
        <div className="flex flex-col gap-1">
          {leaders.map((l) => (
            <div
              key={l.rank}
              className="ll-row flex cursor-pointer items-center gap-3 rounded-lg px-2 py-[9px]"
              onClick={() => navigate('/profile')}
            >
              <div className={`w-[22px] text-center text-[11.5px] font-bold ${l.rank <= 3 ? 'text-blue' : 'text-[#A8B3C2]'}`}>
                {l.rank}
              </div>
              <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-chip text-[10.5px] font-bold text-ink2">
                {l.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[12px] font-semibold">{l.handle}</div>
                <div className="text-[10.5px] text-muted2">{l.returned}</div>
              </div>
              <div className="text-[12.5px] font-bold text-blue">{l.points}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-blue-dark p-[22px] text-white">
        <div className="mb-[18px] text-[14px] font-bold">Cộng đồng LostLink</div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-5">
          {communityStats.map((s) => (
            <div key={s.label}>
              <div className={`text-[23.5px] font-bold tracking-[-0.025em] ${s.accent ? 'text-[#8FC0F2]' : 'text-white'}`}>
                {s.value}
              </div>
              <div className="mt-0.5 text-[11px] text-[#94A4BC]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-blue-line bg-blue-soft p-5">
        <div className="mb-1.5 text-[13.5px] font-bold text-blue-ink">Nhận cảnh báo khu vực</div>
        <div className="mb-3.5 text-[11.5px] leading-[1.55] text-blue-text">
          Khi có tin mới trong khu vực bạn theo dõi, LostLink sẽ nhắn cho bạn ngay.
        </div>
        <div
          className="ll-primary flex h-10 cursor-pointer items-center justify-center rounded-lg bg-blue text-[12px] font-semibold text-white"
          onClick={() => navigate('/settings')}
        >
          Thiết lập vùng theo dõi
        </div>
      </div>
    </div>
  )
}
