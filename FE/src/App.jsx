import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { c } from './theme/tokens'

import Navbar from './components/Navbar'
import LoginModal from './components/LoginModal'
import AuthPage from './pages/auth/AuthPage'

// Public / shared screens — a Guest may view these; a User gets the full set.
import HomePage from './pages/common/HomePage'
import DetailPage from './pages/common/DetailPage'
import ProfilePage from './pages/common/ProfilePage'

// User-only screens (see src/pages/user).
import ComposePage from './pages/user/ComposePage'
import MyPostsPage from './pages/user/MyPostsPage'
import MatchesPage from './pages/user/MatchesPage'
import VerifyPage from './pages/user/VerifyPage'
import ChatPage from './pages/user/ChatPage'
import NotificationsPage from './pages/user/NotificationsPage'
import ThanksPage from './pages/user/ThanksPage'
import ReportPage from './pages/user/ReportPage'
import SettingsPage from './pages/user/SettingsPage'

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
  if (pathname === '/auth') return <AuthPage />

  return (
    <>
      {/* zoom shrinks real layout size (unlike transform), so no h-overflow */}
      <div
        style={{
          zoom: scale,
          width: DESIGN_WIDTH,
          margin: '0 auto',
          background: c.bg,
          color: c.ink,
          minHeight: '100vh',
          paddingBottom: 96,
        }}
      >
        <Navbar />

        <Routes>
          {/* Guest + User */}
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<DetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* User only */}
          <Route path="/compose" element={<ComposePage />} />
          <Route path="/my-posts" element={<MyPostsPage />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/thanks" element={<ThanksPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/settings" element={<SettingsPage />} />

          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>

      {/* Kept outside the zoomed canvas so fixed positioning stays exact */}
      <LoginModal />
    </>
  )
}
