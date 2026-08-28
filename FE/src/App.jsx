import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar'
import LoginModal from './components/LoginModal'
import Auth from './pages/auth/Auth'

// Public / shared screens — a Guest may view these; a User gets the full set.
import Home from './pages/common/Home'
import Detail from './pages/common/Detail'
import Profile from './pages/common/Profile'

// User-only screens (see src/pages/user).
import Compose from './pages/user/Compose'
import Matches from './pages/user/Matches'
import Verify from './pages/user/Verify'
import Chat from './pages/user/Chat'
import Notifications from './pages/user/Notifications'
import Thanks from './pages/user/Thanks'
import Report from './pages/user/Report'
import Settings from './pages/user/Settings'

const DESIGN_WIDTH = 1440

// Scale the fixed-width canvas down to fit the window (never up past 1:1), so
// the layout never overflows horizontally at 100% browser zoom.
function useFitScale(gutter = 16) {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const update = () => {
      const avail = document.documentElement.clientWidth - gutter
      setScale(Math.min(1, avail / DESIGN_WIDTH))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [gutter])
  return scale
}

export default function App() {
  const scale = useFitScale()
  const { pathname } = useLocation()

  // The auth flow is a full-bleed, self-contained dark experience — it renders
  // on its own, without the app chrome (navbar / fixed-width canvas / modal).
  if (pathname === '/auth') return <Auth />

  return (
    <>
      {/* zoom shrinks real layout size (unlike transform), so no h-overflow */}
      <div
        className="mx-auto min-h-screen bg-bg pb-24 text-ink"
        style={{ zoom: scale, width: DESIGN_WIDTH }}
      >
        <Navbar />

        <Routes>
          {/* Guest + User */}
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Detail />} />
          <Route path="/profile" element={<Profile />} />

          {/* User only */}
          <Route path="/compose" element={<Compose />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/report" element={<Report />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="*" element={<Home />} />
        </Routes>
      </div>

      {/* Kept outside the zoomed canvas so fixed positioning stays exact */}
      <LoginModal />
    </>
  )
}
