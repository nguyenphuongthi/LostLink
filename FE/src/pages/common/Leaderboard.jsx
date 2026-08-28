import RightRail from '../../components/RightRail'

// Standalone leaderboard screen — the Home right rail promoted to its own route,
// used mainly on mobile where the rail is hidden.
export default function Leaderboard() {
  return (
    <div className="mx-auto max-w-[560px] px-4 pt-6 sm:px-6">
      <div className="mb-4">
        <div className="text-[22px] font-bold tracking-[-0.025em]">Bảng vinh danh</div>
        <div className="mt-1 text-[12.5px] text-muted">Người tốt bụng của cộng đồng LostLink</div>
      </div>
      <RightRail />
    </div>
  )
}
