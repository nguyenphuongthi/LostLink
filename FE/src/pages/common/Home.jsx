import { useState } from 'react'
import { posts } from '../../data/posts'
import PostCard from '../../components/PostCard'
import HomeFilters from '../../components/HomeFilters'
import RightRail from '../../components/RightRail'

export default function Home() {
  const [cat, setCat] = useState('Tất cả')
  const [range, setRange] = useState('7 ngày qua')
  const [filterOpen, setFilterOpen] = useState(false)

  const shown = posts.filter((p) => cat === 'Tất cả' || p.category === cat)

  return (
    <div className="px-4 pt-5 sm:px-6 lg:px-10 lg:pt-7">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[268px_1fr_316px]">
        {/* ── Filters (desktop sidebar) ─────────────── */}
        <div className="card sticky top-[90px] hidden self-start p-5 shadow-[0_1px_2px_rgba(22,35,58,0.04)] lg:block">
          <HomeFilters cat={cat} setCat={setCat} range={range} setRange={setRange} />
        </div>

        {/* ── Feed ──────────────────────────────────── */}
        <div>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[20px] font-bold tracking-[-0.025em] lg:text-[24px]">Tin mới quanh bạn</div>
              <div className="mt-1 text-[12.5px] text-muted">
                {shown.length} tin trong bán kính 3 km · cập nhật 2 phút trước
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterOpen(true)}
                className="ll-subtle flex h-9 items-center gap-2 rounded-lg border border-line bg-white px-3.5 text-[12px] font-medium text-ink lg:hidden"
              >
                <FilterIcon />
                Bộ lọc
              </button>
              <div className="flex items-center gap-2 text-[12px] text-muted">
                <span className="hidden sm:inline">Sắp xếp</span>
                <div className="flex h-9 cursor-pointer items-center gap-2.5 rounded-lg border border-line bg-white px-3.5 font-medium text-ink">
                  Mới nhất
                  <Caret />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {shown.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </div>

        {/* ── Right rail (desktop only) ─────────────── */}
        <div className="sticky top-[90px] hidden self-start lg:block">
          <RightRail />
        </div>
      </div>

      {/* ── Mobile filter drawer ──────────────────── */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]" onClick={() => setFilterOpen(false)} />
          <div className="absolute left-0 top-0 flex h-full w-[86%] max-w-[340px] flex-col bg-white shadow-[0_0_40px_rgba(22,35,58,0.25)]">
            <div className="flex justify-end px-3 pt-3">
              <button
                aria-label="Đóng"
                onClick={() => setFilterOpen(false)}
                className="ll-subtle flex h-9 w-9 items-center justify-center rounded-lg text-[18px] text-muted"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 pb-5 pt-1">
              <HomeFilters
                cat={cat}
                setCat={setCat}
                range={range}
                setRange={setRange}
                onApply={() => setFilterOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const Caret = () => <div className="-mt-1 h-[7px] w-[7px] rotate-45 border-b-[1.5px] border-r-[1.5px] border-[#8494A8]" />

const FilterIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M4 6h16M7 12h10M10 18h4" />
  </svg>
)
