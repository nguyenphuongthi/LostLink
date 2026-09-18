import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react'
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

  const toggleLike = useCallback((key) => setLiked((m) => ({ ...m, [key]: !m[key] })), [])
  const toggleFollow = useCallback(() => setFollowing((f) => !f), [])

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
    ]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
