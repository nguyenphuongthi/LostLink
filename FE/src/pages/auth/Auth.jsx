import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { a } from '../../theme/authTokens'
import '../../theme/auth.css'
import * as authApi from '../../api/auth'

import Starfield from '../../components/auth/Starfield'
import BrandMark from '../../components/auth/BrandMark'
import AuthArt from '../../components/auth/AuthArt'
import ScreenTabs from '../../components/auth/ScreenTabs'

import Login from './Login'
import Register from './Register'
import Verify from './Verify'
import Forgot from './Forgot'
import Reset from './Reset'
import Done from './Done'

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
// walks through login → register → verify → forgot → reset → done. Every step
// talks to the backend API; the shared email / password / code state lives here.
export default function Auth() {
  const navigate = useNavigate()
  const { applyAuth } = useApp()

  // Deep-link support: /auth?screen=register lands straight on that step;
  // the reset link carries ?token=…&email=… for the reset screen.
  const [params] = useSearchParams()
  const initial = SCREENS.includes(params.get('screen')) ? params.get('screen') : 'login'
  const resetToken = params.get('token') || ''

  const [screen, setScreen] = useState(initial)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState(params.get('email') || '')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [notify, setNotify] = useState(true)
  const [code, setCode] = useState(EMPTY_CODE)
  const [seconds, setSeconds] = useState(0)
  const [forgotSent, setForgotSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const timer = useRef(null)
  const refs6 = useRef(Array.from({ length: 6 }, () => ({ current: null })))
  useEffect(() => () => clearInterval(timer.current), [])

  const go = (next) => {
    setError('')
    setScreen(next)
  }
  const onEmail = (e) => setEmail(e.target.value)
  const onPassword = (e) => setPassword(e.target.value)
  const onUsername = (e) => setUsername(e.target.value)
  const onConfirmPassword = (e) => setConfirmPassword(e.target.value)
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

  // ── Handlers gọi API ────────────────────────────────────────────────────

  const submitRegister = async () => {
    setError('')
    setLoading(true)
    try {
      await authApi.register({ username, email, password, emailOptIn: notify })
      setCode(EMPTY_CODE)
      setScreen('verify')
      startTimer()
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const submitVerify = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await authApi.verifyEmail({ email, code: code.join('') })
      applyAuth(res.data)
      setScreen('done')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const resendOtp = async () => {
    if (seconds > 0) return
    setError('')
    try {
      await authApi.resendCode(email)
      startTimer()
    } catch (e) {
      setError(e.message)
    }
  }

  const submitLogin = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await authApi.login({ email, password })
      applyAuth(res.data)
      navigate('/')
    } catch (e) {
      // Tài khoản chưa xác thực: backend đã gửi lại mã → chuyển sang bước verify.
      if (e.data?.errors?.code === 'EMAIL_NOT_VERIFIED') {
        setCode(EMPTY_CODE)
        setScreen('verify')
        startTimer()
        setError('Tài khoản chưa xác thực. Mã mới đã được gửi tới email của bạn.')
      } else {
        setError(e.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const submitForgot = async () => {
    setError('')
    setLoading(true)
    try {
      await authApi.forgotPassword(email)
      setForgotSent(true)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const submitReset = async () => {
    setError('')
    if (password !== confirmPassword) {
      setError('Mật khẩu nhập lại không khớp.')
      return
    }
    if (!resetToken) {
      setError('Liên kết đặt lại không hợp lệ. Vui lòng mở lại từ email.')
      return
    }
    setLoading(true)
    try {
      await authApi.resetPassword({ email, token: resetToken, password })
      setPassword('')
      setConfirmPassword('')
      setScreen('login')
      setError('Đặt mật khẩu mới thành công. Vui lòng đăng nhập.')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  // Google: GIS trả về ID token → gửi lên backend để đăng nhập/đăng ký.
  const onGoogleCredential = async (idToken) => {
    setError('')
    setLoading(true)
    try {
      const res = await authApi.googleLogin(idToken)
      applyAuth(res.data)
      navigate('/')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }
  const onGoogleError = (msg) => setError(msg)

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
    login: (
      <Login
        email={email}
        onEmail={onEmail}
        password={password}
        onPassword={onPassword}
        onSubmit={submitLogin}
        onGoogleCredential={onGoogleCredential}
        onGoogleError={onGoogleError}
        goForgot={() => go('forgot')}
        goRegister={() => go('register')}
        loading={loading}
      />
    ),
    register: (
      <Register
        username={username}
        onUsername={onUsername}
        email={email}
        onEmail={onEmail}
        password={password}
        onPassword={onPassword}
        strength={strength}
        notify={notify}
        toggleNotify={toggleNotify}
        onSubmit={submitRegister}
        onGoogleCredential={onGoogleCredential}
        onGoogleError={onGoogleError}
        loading={loading}
      />
    ),
    verify: (
      <Verify
        emailShown={emailShown}
        slots={slots}
        onSubmit={submitVerify}
        resendText={resendText}
        canResend={seconds === 0}
        resend={resendOtp}
        goRegister={() => go('register')}
        loading={loading}
      />
    ),
    forgot: (
      <Forgot
        email={email}
        onEmail={onEmail}
        emailShown={emailShown}
        onSubmit={submitForgot}
        forgotSent={forgotSent}
        goLogin={() => go('login')}
        loading={loading}
      />
    ),
    reset: (
      <Reset
        emailShown={emailShown}
        password={password}
        onPassword={onPassword}
        confirmPassword={confirmPassword}
        onConfirmPassword={onConfirmPassword}
        onSubmit={submitReset}
        loading={loading}
      />
    ),
    done: <Done emailShown={emailShown} notifyNote={notifyNote} onEnter={() => navigate('/')} />,
  }

  return (
    <div
      className="relative min-h-screen overflow-hidden text-au-ink [font-family:'Be_Vietnam_Pro',Helvetica,sans-serif]"
      style={{ backgroundColor: a.bgTop, backgroundImage: `linear-gradient(160deg, ${a.bgDeep} 0%, ${a.bgTop} 100%)` }}
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
      <div className="absolute inset-x-0 top-0 z-[3]">
        <div className="mx-auto max-w-[920px] px-[clamp(20px,4vw,40px)] pt-[30px]">
          <BrandMark />
        </div>
      </div>

      <div className="relative z-[2] mx-auto flex min-h-screen max-w-[920px] flex-col items-center justify-center gap-3 px-[clamp(20px,4vw,40px)] pb-12 pt-24 lg:flex-row lg:justify-between lg:gap-[clamp(24px,3vw,56px)] lg:pt-10">
        {/* Radar illustration — shown on every width; scaled down on mobile
            (with negative margins trimming the transform's leftover box) so it
            sits balanced above the form instead of being hidden. */}
        <div className="flex justify-center lg:flex-[0_1_350px]">
          <div className="-my-8 origin-center scale-[0.72] sm:-my-4 sm:scale-90 lg:my-0 lg:scale-100">
            <AuthArt />
          </div>
        </div>

        <div
          className="w-[min(404px,100%)] flex-[0_1_404px] rounded-[22px] px-6 pb-[30px] pt-7 backdrop-blur-[20px] sm:px-[30px]"
          style={{
            background: a.panel,
            border: `1px solid ${a.panelLine}`,
            boxShadow: '0 30px 80px -24px rgba(4,12,24,.7), inset 0 1px 0 rgba(255,255,255,.14)',
          }}
        >
          {showTabs && <ScreenTabs screen={screen} go={go} />}

          {error && (
            <div
              className="mb-4 rounded-[10px] px-[15px] py-[11px] text-[13px] leading-[1.5]"
              style={{
                background: 'rgba(233,96,96,.12)',
                border: '1px solid rgba(233,96,96,.34)',
                color: '#ffbcbc',
              }}
            >
              {error}
            </div>
          )}

          <div key={screen} className="[animation:ll-fade_.35s_ease_both]">
            {screens[screen]}
          </div>
        </div>
      </div>
    </div>
  )
}
