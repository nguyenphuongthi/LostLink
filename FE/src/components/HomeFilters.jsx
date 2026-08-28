import { CATEGORY_META, TIME_RANGES } from '../data/catalog'
import CategoryIcon from './CategoryIcon'

// The Home filter panel. Rendered in the desktop sidebar and inside the mobile
// filter drawer. `onApply` lets the mobile drawer close itself on apply.
export default function HomeFilters({ cat, setCat, range, setRange, onApply }) {
  return (
    <>
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
      <div className="mb-[22px] flex flex-col gap-1">
        {CATEGORY_META.map(({ name }) => {
          const on = cat === name
          return (
            <div
              key={name}
              onClick={() => setCat(name)}
              className={`flex cursor-pointer items-center gap-2.5 rounded-lg border-[1.5px] px-2 py-[6px] ${
                on ? 'border-blue-line bg-blue-soft' : 'll-row border-transparent'
              }`}
            >
              <div
                className={`flex h-8 w-8 flex-none items-center justify-center rounded-lg ${
                  on ? 'bg-white text-blue' : 'bg-chip text-muted2'
                }`}
              >
                <CategoryIcon name={name} />
              </div>
              <div className={`text-[12.5px] ${on ? 'font-semibold text-blue' : 'font-medium text-ink'}`}>{name}</div>
            </div>
          )
        })}
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

      <div
        className="ll-dark flex h-11 cursor-pointer items-center justify-center rounded-lg bg-blue-dark text-[13px] font-semibold text-white"
        onClick={onApply}
      >
        Áp dụng bộ lọc
      </div>
    </>
  )
}

const Caret = () => <div className="-mt-1 h-[7px] w-[7px] rotate-45 border-b-[1.5px] border-r-[1.5px] border-[#8494A8]" />

const Slider = ({ pct }) => (
  <div className="relative h-1.5 rounded-full bg-[#E7ECF3]">
    <div className="absolute inset-y-0 left-0 rounded-full bg-blue" style={{ width: pct + '%' }} />
    <div
      className="absolute -top-[5px] -ml-2 h-4 w-4 rounded-full border-[3px] border-blue bg-white"
      style={{ left: pct + '%' }}
    />
  </div>
)
