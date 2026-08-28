import { useNavigate } from 'react-router-dom'
import { PHOTO } from '../../theme/tokens'
import { matches } from '../../data/matches'

// U4 · Suggested pairings for the user's lost item.
export default function Matches() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-[1080px] px-4 pt-5 sm:px-6 lg:px-10 lg:pt-7">
      <div className="mb-1 text-[22px] font-bold tracking-[-0.028em] lg:text-[25px]">Có thể đây là đồ của bạn?</div>
      <div className="mb-6 text-[13px] text-muted">
        Những tin nhặt được gần nơi và gần lúc bạn đánh mất chiếc túi tote xanh navy.
      </div>

      <div className="flex flex-col gap-4">
        {matches.map((m, i) => (
          <div key={i} className="card overflow-hidden">
            <div className="ll-match-row flex cursor-pointer flex-col gap-4 p-5 sm:flex-row sm:gap-5 sm:p-[22px]" onClick={() => navigate('/post/0')}>
              <div className="flex-shrink-0" style={PHOTO(m.photo, 148, 148, 16)} />
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center gap-2.5">
                  <div className="flex h-6 items-center rounded-full bg-blue-soft px-[11px] text-[10.5px] font-bold text-blue">NHẶT ĐƯỢC</div>
                  <div className="text-[11px] text-muted2">{m.category}</div>
                  <div className="h-[3px] w-[3px] rounded-full bg-[#C3CCD8]" />
                  <div className="text-[11px] text-muted2">{m.timeAgo}</div>
                </div>
                <div className="mb-3 text-[16px] font-semibold tracking-[-0.01em]">{m.title}</div>
                <div className="flex flex-wrap gap-2">
                  {m.reasons.map((r, j) => (
                    <div key={j} className="flex h-[30px] items-center gap-[7px] rounded-full border border-line2 bg-soft px-3 text-[11px] text-ink2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue" />
                      {r}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex w-full flex-shrink-0 flex-col items-center justify-center border-t border-line2 pt-4 sm:w-[150px] sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                <div className={`text-[30.5px] font-bold tracking-[-.03em] ${m.strong ? 'text-blue' : 'text-amber'}`}>{m.score}</div>
                <div className="mt-2 text-[11px] text-muted2">Mức giống nhau</div>
                <div className="mt-2.5 text-[11px] font-semibold text-blue">Xem chi tiết →</div>
              </div>
            </div>
            <div className="flex flex-col gap-3 border-t border-line2 bg-soft px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-[22px]">
              <div className="text-[11px] text-muted2">{m.note}</div>
              <div className="flex gap-2.5">
                <div className="ll-notphai flex h-10 cursor-pointer items-center rounded-lg border border-line bg-white px-5 text-[12px] font-medium">Không phải</div>
                <div
                  className="ll-primary flex h-10 cursor-pointer items-center rounded-lg bg-blue px-[22px] text-[12px] font-semibold text-white shadow-[0_2px_8px_rgba(46,109,180,0.24)]"
                  onClick={() => navigate('/verify')}
                >
                  Đúng là đồ của tôi
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
