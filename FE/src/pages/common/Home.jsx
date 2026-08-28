import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { posts } from '../../data/posts'
import { FILTER_CATEGORIES, leaders, communityStats, TIME_RANGES } from '../../data/catalog'
import PostCard from '../../components/PostCard'

export default function Home() {
  const navigate = useNavigate()
  const [cat, setCat] = useState('Tất cả')
  const [range, setRange] = useState('7 ngày qua')

  const shown = posts.filter((p) => cat === 'Tất cả' || p.category === cat)

  return (
    <div className="px-10 pt-7">
      <div className="grid grid-cols-[268px_1fr_316px] items-start gap-6">
        {/* ── Filters ───────────────────────────────── */}
        <div className="card sticky top-[98px] self-start p-5 shadow-[0_1px_2px_rgba(22,35,58,0.04)]">
          <div className="mb-[18px] flex items-center justify-between">
            <div className="text-[14px] font-bold">Bộ lọc</div>
            <div
              className="cursor-pointer text-[11.5px] font-medium text-blue"
              onClick={() => {
                setCat('Tất cả')
                setRange('7 ngày qua')
              }}
            >
              Xóa lọc
            </div>
          </div>

          <div className="eyebrow">Loại tin</div>
          <div className="mb-[22px] grid grid-cols-2 gap-2">
            <div className="flex h-[38px] cursor-pointer items-center justify-center rounded-lg border-[1.5px] border-red-line bg-red-soft text-[12px] font-semibold text-red">
              Mất đồ
            </div>
            <div className="flex h-[38px] cursor-pointer items-center justify-center rounded-lg border-[1.5px] border-blue-line bg-blue-soft text-[12px] font-semibold text-blue">
              Nhặt được
            </div>
          </div>

          <div className="eyebrow">Danh mục</div>
          <div className="mb-[22px] flex flex-wrap gap-2">
            {FILTER_CATEGORIES.map((name) => (
              <div key={name} className={`chip ${cat === name ? 'chip-on' : ''}`} onClick={() => setCat(name)}>
                {name}
              </div>
            ))}
          </div>

          <div className="eyebrow">Khu vực</div>
          <div className="mb-2.5 flex h-10 cursor-pointer items-center justify-between rounded-lg border border-line bg-soft px-3.5 text-[12.5px]">
            <div>TP. Hồ Chí Minh</div>
            <Caret />
          </div>
          <div className="mb-2 flex justify-between text-[11.5px] text-muted">
            <span>Bán kính</span>
            <span className="font-semibold text-ink">3 km</span>
          </div>
          <Slider pct={42} />

          <div className="eyebrow mt-[22px]">Khoảng thời gian</div>
          <div className="mb-[22px] flex flex-col gap-2">
            {TIME_RANGES.map((t) => {
              const on = range === t
              return (
                <div
                  key={t}
                  className={`flex h-9 cursor-pointer items-center rounded-lg px-3 text-[12px] ${
                    on ? 'border-[1.5px] border-blue-line bg-blue-soft font-semibold text-blue' : 'll-chip-soft bg-chip'
                  }`}
                  onClick={() => setRange(t)}
                >
                  {t}
                </div>
              )
            })}
          </div>

          <div className="ll-dark flex h-11 cursor-pointer items-center justify-center rounded-lg bg-blue-dark text-[13px] font-semibold text-white">
            Áp dụng bộ lọc
          </div>
        </div>

        {/* ── Feed ──────────────────────────────────── */}
        <div>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <div className="text-[24px] font-bold tracking-[-0.025em]">Tin mới quanh bạn</div>
              <div className="mt-1 text-[12.5px] text-muted">
                {shown.length} tin trong bán kính 3 km · cập nhật 2 phút trước
              </div>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-muted">
              Sắp xếp
              <div className="flex h-9 cursor-pointer items-center gap-2.5 rounded-lg border border-line bg-white px-3.5 font-medium text-ink">
                Mới nhất
                <Caret />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {shown.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </div>

        {/* ── Right rail ────────────────────────────── */}
        <div className="sticky top-[98px] flex flex-col gap-4 self-start">
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
      </div>
    </div>
  )
}

const Caret = () => (
  <div className="-mt-1 h-[7px] w-[7px] rotate-45 border-b-[1.5px] border-r-[1.5px] border-[#8494A8]" />
)

const Slider = ({ pct }) => (
  <div className="relative h-1.5 rounded-full bg-[#E7ECF3]">
    <div className="absolute inset-y-0 left-0 rounded-full bg-blue" style={{ width: pct + '%' }} />
    <div
      className="absolute -top-[5px] -ml-2 h-4 w-4 rounded-full border-[3px] border-blue bg-white"
      style={{ left: pct + '%' }}
    />
  </div>
)
