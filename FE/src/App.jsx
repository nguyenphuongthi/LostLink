import { Routes, Route, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar'
import LoginModal from './components/LoginModal'
import Auth from './pages/auth/Auth'

// Public / shared screens — a Guest may view these; a User gets the full set.
import Home from './pages/common/Home'
import Detail from './pages/common/Detail'
import Profile from './pages/common/Profile'
import Leaderboard from './pages/common/Leaderboard'

// User-only screens (see src/pages/user).
import Compose from './pages/user/Compose'
import Matches from './pages/user/Matches'
import Verify from './pages/user/Verify'
import Chat from './pages/user/Chat'
import Notifications from './pages/user/Notifications'
import Thanks from './pages/user/Thanks'
import Report from './pages/user/Report'
import Settings from './pages/user/Settings'

export default function App() {
  const { pathname } = useLocation()

  // The auth flow is a full-bleed, self-contained dark experience — it renders
  // on its own, without the app chrome (navbar / modal).
  if (pathname === '/auth') return <Auth />

  return (
    <>
      {/* Fluid canvas: reflows at every width, capped at the desktop design width. */}
      <div className="mx-auto min-h-screen w-full max-w-[1440px] bg-bg pb-24 text-ink">
        <Navbar />

        <Routes>
          {/* Guest + User */}
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Detail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />

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

      <LoginModal />
    </>
  )
}
