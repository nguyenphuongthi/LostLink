import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { a } from '../../theme/authTokens'
import '../../theme/auth.css'

import Starfield from '../../components/auth/Starfield'
import BrandMark from '../../components/auth/BrandMark'
import AuthArt from '../../components/auth/AuthArt'
import ScreenTabs from '../../components/auth/ScreenTabs'

import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'
import VerifyScreen from './VerifyScreen'
import ForgotScreen from './ForgotScreen'
import ResetScreen from './ResetScreen'
import DoneScreen from './DoneScreen'

const RESEND_SECONDS = 45
const EMPTY_CODE = ['', '', '', '', '', '']
const SCREENS = ['login', 'register', 'verify', 'forgot', 'reset', 'done']

// Scores a password on length + character-class variety, mirroring the
// design component's meter (0–4 → bar width / colour / label).
function scorePassword(p) {
  if (!p) return { width: '0%', color: 'rgba(255,255,255,.2)', label: '' }
  let s = 0
  if (p.length >= 8) s++
  if (/[A-Z]/.test(p)) s++
  if (/[0-9]/.test(p)) s++
  if (/[^A-Za-z0-9]/.test(p)) s++
  if (s <= 1) return { width: '28%', color: '#E0894F', label: 'Yếu' }
  if (s === 2) return { width: '55%', color: '#E5C15A', label: 'Trung bình' }
  if (s === 3) return { width: '78%', color: '#63C79A', label: 'Tốt' }
  return { width: '100%', color: '#4CBE8B', label: 'Mạnh' }
}

// The whole authentication flow — a single full-bleed dark surface that
// walks through login → register → verify → forgot → reset → done, holding
// the email / password / code state each step shares.
export default function AuthPage() {
  const navigate = useNavigate()
  const { doLogin } = useApp()

  // Deep-link support: /auth?screen=register lands straight on that step.
  const [params] = useSearchParams()
  const initial = SCREENS.includes(params.get('screen')) ? params.get('screen') : 'login'

  const [screen, setScreen] = useState(initial)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [notify, setNotify] = useState(true)
  const [code, setCode] = useState(EMPTY_CODE)
  const [seconds, setSeconds] = useState(0)
  const [forgotSent, setForgotSent] = useState(false)

  const timer = useRef(null)
  const refs6 = useRef(Array.from({ length: 6 }, () => ({ current: null })))
  useEffect(() => () => clearInterval(timer.current), [])

  const go = (next) => setScreen(next)
  const onEmail = (e) => setEmail(e.target.value)
  const onPassword = (e) => setPassword(e.target.value)
  const toggleNotify = () => setNotify((v) => !v)

  const startTimer = () => {
    clearInterval(timer.current)
    setSeconds(RESEND_SECONDS)
    timer.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(timer.current)
          return 0
        }
        return s - 1
      })
    }, 1000)
  }

  const setDigit = (i, value) => {
    const digit = value.replace(/[^0-9]/g, '').slice(-1)
    setCode((prev) => {
      const next = prev.slice()
      next[i] = digit
      return next
    })
    if (digit && i < 5) refs6.current[i + 1].current?.focus()
  }

  const onSlotKeyDown = (i) => (e) => {
    if (e.key === 'Backspace' && !code[i] && i > 0) refs6.current[i - 1].current?.focus()
  }

  // Login / Google both drop the visitor into the app as a signed-in user.
  const enterApp = () => {
    doLogin()
    navigate('/')
  }

  const submitRegister = () => {
    setCode(EMPTY_CODE)
    setScreen('verify')
    startTimer()
  }

  const strength = scorePassword(password)
  const emailShown = email || 'ban@email.com'
  const notifyNote = notify
    ? 'Đã bật email thông báo khi có thông tin liên quan — bạn có thể tắt trong Cài đặt.'
    : 'Email thông báo đang tắt — bật lại bất cứ lúc nào trong Cài đặt.'

  const slots = code.map((value, i) => ({
    value,
    ref: refs6.current[i],
    onChange: (e) => setDigit(i, e.target.value),
    onKeyDown: onSlotKeyDown(i),
  }))

  const resendText = seconds > 0 ? `Chưa nhận được mã? Gửi lại sau ${seconds}s.` : 'Chưa nhận được mã?'

  const showTabs = screen === 'login' || screen === 'register'

  const screens = {
    login: <LoginScreen email={email} onEmail={onEmail} onSubmit={enterApp} onGoogle={enterApp} goForgot={() => go('forgot')} goRegister={() => go('register')} />,
    register: <RegisterScreen email={email} onEmail={onEmail} password={password} onPassword={onPassword} strength={strength} notify={notify} toggleNotify={toggleNotify} onSubmit={submitRegister} onGoogle={enterApp} />,
    verify: <VerifyScreen emailShown={emailShown} slots={slots} onSubmit={() => go('done')} resendText={resendText} canResend={seconds === 0} resend={() => seconds === 0 && startTimer()} goRegister={() => go('register')} />,
    forgot: <ForgotScreen email={email} onEmail={onEmail} emailShown={emailShown} onSubmit={() => setForgotSent(true)} forgotSent={forgotSent} goLogin={() => go('login')} />,
    reset: <ResetScreen emailShown={emailShown} password={password} onPassword={onPassword} onSubmit={() => go('login')} />,
    done: <DoneScreen emailShown={emailShown} notifyNote={notifyNote} onEnter={enterApp} />,
  }

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        fontFamily: "'Be Vietnam Pro', Helvetica, sans-serif",
        color: a.ink,
        backgroundColor: a.bgTop,
        backgroundImage: `linear-gradient(160deg, ${a.bgDeep} 0%, ${a.bgTop} 100%)`,
      }}
    >
      <Starfield />

      {/* Ambient overlays ported from the design component. */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(70% 60% at 26% 44%, rgba(78,139,224,.28), rgba(5,11,22,0) 70%)', animation: 'll-glow 9s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(5,11,22,.35) 0%, rgba(5,11,22,.62) 100%)' }} />
      <div style={{ position: 'absolute', width: 720, height: 720, borderRadius: '50%', border: '1px solid rgba(255,255,255,.05)', top: -220, left: -160, animation: 'll-drift 24s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', width: 480, height: 480, borderRadius: '50%', border: '1px solid rgba(255,255,255,.04)', bottom: -180, left: 180 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(5,11,22,0) 38%, rgba(5,11,22,.6) 100%)' }} />

      {/* Brand bar — shares the content's centered max-width so the logo
          lines up with the illustration column instead of floating far left. */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 3 }}>
        <div style={{ maxWidth: 920, margin: '0 auto', padding: '30px clamp(20px, 4vw, 40px) 0' }}>
          <BrandMark />
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          maxWidth: 920,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'clamp(24px, 3vw, 56px)',
          padding: '40px clamp(20px, 4vw, 40px) 48px',
        }}
      >
        <AuthArt />

        <div
          style={{
            width: 'min(404px, 100%)',
            flex: '0 1 404px',
            padding: '28px 30px 30px',
            borderRadius: 22,
            background: a.panel,
            border: `1px solid ${a.panelLine}`,
            boxShadow: '0 30px 80px -24px rgba(4,12,24,.7), inset 0 1px 0 rgba(255,255,255,.14)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {showTabs && <ScreenTabs screen={screen} go={go} />}
          <div key={screen} style={{ animation: 'll-fade .35s ease both' }}>
            {screens[screen]}
          </div>
        </div>
      </div>
    </div>
  )
}
