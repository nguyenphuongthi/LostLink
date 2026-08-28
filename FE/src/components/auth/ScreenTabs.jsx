// Login / Register tab strip shown at the top of the card on those two
// screens. `go` switches the active screen.
export default function ScreenTabs({ screen, go }) {
  const tab = (active) =>
    `-mb-px cursor-pointer pb-3 text-[16px] font-semibold ${
      active ? 'border-b-2 border-au-accent text-white' : 'border-b-2 border-transparent text-au-dim4'
    }`
  return (
    <div className="mb-[26px] flex gap-[26px] border-b border-white/[0.12]">
      <div onClick={() => go('login')} className={tab(screen === 'login')}>
        Đăng nhập
      </div>
      <div onClick={() => go('register')} className={tab(screen === 'register')}>
        Đăng ký
      </div>
    </div>
  )
}
