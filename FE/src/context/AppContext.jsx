import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchMe, logout as logoutApi } from '../api/auth'
import { getToken, saveTokens, clearTokens } from '../lib/api'

/**
 * App-wide state that must survive across screens:
 *  - the authenticated user (null = guest) + JWT persisted in localStorage
 *  - the login modal, which any gated action can raise
 *  - lightweight "engagement" state (likes, follow) shared by Home/Detail/Profile
 *
 * Page-local interaction state (wizard steps, quiz answers, chat mode…)
 * stays inside each page — only genuinely cross-cutting state lives here.
 */
const AppContext = createContext(null)

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}

export function AppProvider({ children }) {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [authReady, setAuthReady] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [liked, setLiked] = useState({})
  const [following, setFollowing] = useState(false)

  // Khôi phục phiên khi tải trang: nếu có token thì hỏi /me để lấy lại user.
  useEffect(() => {
    if (!getToken()) {
      setAuthReady(true)
      return
    }
    fetchMe()
      .then((u) => setUser(u))
      .catch(clearTokens)
      .finally(() => setAuthReady(true))
  }, [])

  // Refresh token hết hạn / bị thu hồi → về trạng thái khách.
  useEffect(() => {
    const onExpired = () => setUser(null)
    window.addEventListener('auth:expired', onExpired)
    return () => window.removeEventListener('auth:expired', onExpired)
  }, [])

  const openLogin = useCallback(() => setShowLogin(true), [])
  const closeLogin = useCallback(() => setShowLogin(false), [])

  // Ghi nhận đăng nhập thành công: lưu token + set user, đóng modal.
  const applyAuth = useCallback(({ user: u, token, refreshToken }) => {
    saveTokens({ token, refreshToken })
    setUser(u)
    setShowLogin(false)
  }, [])

  const logout = useCallback(() => {
    logoutApi()
      .catch(() => {})
      .finally(clearTokens)
    setUser(null)
  }, [])

  // Thao tác tương tác (thả tim, theo dõi) cần đăng nhập — Guest chỉ được xem,
  // nên chặn ngay tại đây để mọi nơi gọi đều được bảo vệ.
  const toggleLike = useCallback(
    (key) => (user ? setLiked((m) => ({ ...m, [key]: !m[key] })) : setShowLogin(true)),
    [user]
  )
  const toggleFollow = useCallback(() => (user ? setFollowing((f) => !f) : setShowLogin(true)), [user])

  // Điều hướng tới trang chỉ dành cho User: Guest thấy popup đăng nhập và ở lại trang hiện tại.
  const goAuthed = useCallback(
    (to, options) => (user ? navigate(to, options) : setShowLogin(true)),
    [user, navigate]
  )

  const value = useMemo(
    () => ({
      user,
      role: user ? user.role : 'guest',
      isGuest: !user,
      authReady,
      applyAuth,
      logout,
      showLogin,
      openLogin,
      closeLogin,
      liked,
      toggleLike,
      following,
      toggleFollow,
      goAuthed,
    }),
    [
      user,
      authReady,
      applyAuth,
      logout,
      showLogin,
      openLogin,
      closeLogin,
      liked,
      toggleLike,
      following,
      toggleFollow,
      goAuthed,
    ]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
