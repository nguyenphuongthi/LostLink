import { createContext, useContext, useState, useCallback, useMemo } from 'react'

/**
 * App-wide state that must survive across screens:
 *  - the active role (guest | user) — drives what a visitor may do
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
  const [role, setRole] = useState('user') // 'guest' | 'user'
  const [showLogin, setShowLogin] = useState(false)
  const [liked, setLiked] = useState({})
  const [following, setFollowing] = useState(false)

  const openLogin = useCallback(() => setShowLogin(true), [])
  const closeLogin = useCallback(() => setShowLogin(false), [])
  const doLogin = useCallback(() => {
    setShowLogin(false)
    setRole('user')
  }, [])
  const toggleRole = useCallback(
    () => setRole((r) => (r === 'guest' ? 'user' : 'guest')),
    [],
  )
  const toggleLike = useCallback(
    (key) => setLiked((m) => ({ ...m, [key]: !m[key] })),
    [],
  )
  const toggleFollow = useCallback(() => setFollowing((f) => !f), [])

  const value = useMemo(
    () => ({
      role,
      isGuest: role === 'guest',
      setRole,
      toggleRole,
      showLogin,
      openLogin,
      closeLogin,
      doLogin,
      liked,
      toggleLike,
      following,
      toggleFollow,
    }),
    [role, showLogin, liked, following, openLogin, closeLogin, doLogin, toggleRole, toggleLike, toggleFollow],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
