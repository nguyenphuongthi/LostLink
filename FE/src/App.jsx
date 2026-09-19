import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

import { useApp } from './context/AppContext'
import Navbar from './components/Navbar'
import LoginModal from './components/LoginModal'
import Auth from './pages/auth/Auth'
import Moderator from './pages/moderator/Moderator'

// Shared screens. Guest xem được Home / Trending / Detail; Profile và
// Leaderboard cần đăng nhập (xem RequireAuth).
import Home from './pages/common/Home'
import Trending from './pages/common/Trending'
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

// Root gate: `/` yêu cầu đăng nhập. Chưa đăng nhập → trang /auth; đã đăng nhập
// → feed /home. Chờ authReady để không "nháy" chuyển hướng khi đang khôi phục phiên.
function RootGate() {
  const { user, authReady } = useApp()
  if (!authReady) return null
  return <Navigate to={user ? (['moderator', 'admin'].includes(user.role) ? '/moderator' : '/home') : '/auth'} replace />
}

// Chặn trang chỉ dành cho User khi truy cập bằng URL trực tiếp: Guest bị đưa về
// /home và thấy popup đăng nhập (giống khi bấm nút bị chặn trên Navbar).
function RequireAuth({ children }) {
  const { user, authReady, openLogin } = useApp()
  useEffect(() => {
    if (authReady && !user) openLogin()
  }, [authReady, user, openLogin])
  if (!authReady) return null
  return user ? children : <Navigate to="/home" replace />
}

const authed = (el) => <RequireAuth>{el}</RequireAuth>

export default function App() {
  const { pathname } = useLocation()

  // The auth flow is a full-bleed, self-contained dark experience — it renders
  // on its own, without the app chrome (navbar / modal).
  if (pathname === '/auth') return <Auth />
  if (pathname === '/moderator' || pathname.startsWith('/moderator/')) {
    return <Routes><Route path="/moderator/*" element={<Moderator />} /></Routes>
  }

  // Feed (Trang chủ / Tin hot) kết thúc ngay dưới bài cuối, không chừa khoảng trống.
  const isFeed = pathname === '/home' || pathname === '/trending'

  return (
    <>
      {/* Fluid canvas: reflows at every width, capped at the desktop design width. */}
      <div className={`mx-auto min-h-(--screen-h) w-full max-w-[1440px] bg-bg text-ink ${isFeed ? 'pb-6' : 'pb-24'}`}>
        <Navbar />

        <Routes>
          {/* Cổng: `/` yêu cầu đăng nhập, chuyển hướng phù hợp */}
          <Route path="/" element={<RootGate />} />

          {/* Guest + User — Guest chỉ xem, thao tác tương tác bị chặn trong trang */}
          <Route path="/home" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/post/:id" element={<Detail />} />

          {/* User only */}
          <Route path="/profile" element={authed(<Profile />)} />
          <Route path="/leaderboard" element={authed(<Leaderboard />)} />
          <Route path="/compose" element={authed(<Compose />)} />
          <Route path="/matches" element={authed(<Matches />)} />
          <Route path="/verify" element={authed(<Verify />)} />
          <Route path="/chat" element={authed(<Chat />)} />
          <Route path="/notifications" element={authed(<Notifications />)} />
          <Route path="/thanks" element={authed(<Thanks />)} />
          <Route path="/report" element={authed(<Report />)} />
          <Route path="/settings" element={authed(<Settings />)} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <LoginModal />
    </>
  )
}
