import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { c, card } from '../../theme/tokens'

const NAV = ['Trang cá nhân', 'Ai thấy gì về bạn', 'Khu vực để ý', 'Thông báo', 'Tài khoản']
const PRIVACY = [
  { key: 'p1', label: 'Hiện vùng rộng thay vì điểm chính xác', desc: 'Người khác chỉ thấy một vòng khoảng 400 m quanh chỗ bạn chọn.' },
  { key: 'p2', label: 'Cho người khác xem trang cá nhân của tôi', desc: 'Gồm số lần trao trả và lời cảm ơn mọi người gửi cho bạn.' },
  { key: 'p3', label: 'Cho người khác tìm tôi bằng email', desc: 'Tắt nếu bạn không muốn người quen tìm thấy tài khoản này.' },
]
const AREA_OPTIONS = ['Quận 1', 'Bến xe Mỹ Đình', 'Quận 3', 'Đại học Bách khoa']
const ACCOUNT = [
  { label: 'Đổi mật khẩu', desc: 'Lần đổi gần nhất: 3 tháng trước', btn: 'Đổi', danger: false },
  { label: 'Tạm ẩn tài khoản', desc: 'Bài của bạn sẽ ẩn đi, bạn quay lại lúc nào cũng được', btn: 'Tạm ẩn', danger: false },
  { label: 'Xóa tài khoản', desc: 'Mọi bài đăng và tin nhắn sẽ mất, không lấy lại được', btn: 'Xóa', danger: true },
]

// U10 · Account settings & privacy.
export default function SettingsPage() {
  const navigate = useNavigate()
  const [section, setSection] = useState('Trang cá nhân')
  const [priv, setPriv] = useState({ p1: true, p2: true, p3: false })
  const [areas, setAreas] = useState(['Quận 1', 'Bến xe Mỹ Đình'])

  const toggleArea = (l) => setAreas((s) => (s.includes(l) ? s.filter((x) => x !== l) : [...s, l]))

  return (
    <div style={{ padding: '28px 40px 0', maxWidth: 1060, margin: '0 auto' }}>
      <div style={{ fontSize: 25, fontWeight: 700, letterSpacing: '-0.028em', marginBottom: 4 }}>Cài đặt</div>
      <div style={{ fontSize: 13, color: c.muted, marginBottom: 22 }}>Bạn quyết định người khác thấy gì về mình.</div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20, alignItems: 'start' }}>
        <div style={{ ...card, padding: 10, position: 'sticky', top: 20 }}>
          {NAV.map((l) => {
            const on = section === l
            return (
              <div key={l} onClick={() => setSection(l)} style={{ padding: '11px 14px', borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: 'pointer', ...(on ? { background: c.blueSoft, color: c.blueInk } : { color: c.ink2 }) }}>{l}</div>
            )
          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Profile */}
          <div style={{ ...card, padding: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 18 }}>Trang cá nhân</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{ width: 62, height: 62, borderRadius: 99, background: c.blueSoft, color: c.blue, fontSize: 17, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>NT</div>
              <div>
                <div className="ll-tab-soft" style={{ height: 36, padding: '0 16px', borderRadius: 10, background: c.chip, fontSize: 12, fontWeight: 600, display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>Đổi ảnh</div>
                <div style={{ fontSize: 11, color: c.muted2, marginTop: 7 }}>Ảnh rõ mặt giúp người khác yên tâm khi hẹn gặp</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Field label="Tên hiển thị" value="Nguyễn Thu Hà" />
              <Field label="Tên tài khoản" value="@thuha.q1" muted />
            </div>
          </div>

          {/* Privacy */}
          <div style={{ ...card, padding: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Ai thấy gì về bạn</div>
            <div style={{ fontSize: 12, color: c.muted, marginBottom: 20 }}>LostLink luôn hiện vùng rộng thay vì địa chỉ chính xác của bạn.</div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 4 }}>Email xác nhận</div>
              <div style={{ fontSize: 11.5, color: c.muted2, marginBottom: 10 }}>Đăng nhập, đổi mật khẩu và xác nhận đã nhận đồ đều làm qua email này. LostLink không cần số điện thoại của bạn.</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid ${c.line}`, background: c.soft, display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', fontSize: 13 }}>
                  thuha.nguyen@gmail.com
                  <div style={{ height: 24, padding: '0 10px', borderRadius: 99, background: c.greenSoft, color: c.green, fontSize: 10.5, fontWeight: 600, display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>Đã xác nhận</div>
                </div>
                <div className="ll-tab-soft" style={{ height: 44, padding: '0 18px', borderRadius: 10, background: c.chip, fontSize: 12, fontWeight: 600, display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>Đổi email</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {PRIVACY.map((p) => {
                const on = priv[p.key]
                return (
                  <div key={p.key} onClick={() => setPriv((s) => ({ ...s, [p.key]: !s[p.key] }))} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 0', borderTop: `1px solid ${c.line2}`, cursor: 'pointer' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 500, marginBottom: 2 }}>{p.label}</div>
                      <div style={{ fontSize: 11, lineHeight: 1.5, color: c.muted2 }}>{p.desc}</div>
                    </div>
                    <Toggle on={on} />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Areas */}
          <div style={{ ...card, padding: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Khu vực bạn muốn để ý</div>
            <div style={{ fontSize: 12, color: c.muted, marginBottom: 18 }}>Mình chỉ nhắn khi có tin trong những vùng này.</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginBottom: 22 }}>
              {AREA_OPTIONS.map((l) => {
                const on = areas.includes(l)
                return (
                  <div key={l} onClick={() => toggleArea(l)} style={{ height: 32, padding: '0 14px', borderRadius: 99, fontSize: 11.5, fontWeight: 500, display: 'flex', alignItems: 'center', cursor: 'pointer', ...(on ? { background: c.blue, color: '#fff' } : { background: c.chip, color: c.ink2 }) }}>{l}</div>
                )
              })}
              <div className="ll-area-add" style={{ height: 32, padding: '0 14px', borderRadius: 99, border: '1px dashed #CFDAE8', color: c.muted, fontSize: 11.5, fontWeight: 500, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>+ Thêm khu vực</div>
            </div>
            <div style={{ fontSize: 11.5, color: c.muted, marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
              <span>Bán kính nhắc tin</span>
              <span style={{ fontWeight: 600, color: c.ink }}>3 km</span>
            </div>
            <div style={{ height: 6, borderRadius: 99, background: '#E7ECF3', position: 'relative' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '42%', background: c.blue, borderRadius: 99 }} />
              <div style={{ position: 'absolute', left: '42%', top: -5, width: 16, height: 16, borderRadius: 99, background: '#fff', border: '3px solid #2E6DB4', marginLeft: -8 }} />
            </div>
          </div>

          {/* Account */}
          <div style={{ ...card, padding: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Tài khoản</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {ACCOUNT.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderTop: `1px solid ${c.line2}` }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: r.danger ? c.redInk : c.ink }}>{r.label}</div>
                    <div style={{ fontSize: 11, lineHeight: 1.5, color: c.muted2, marginTop: 2 }}>{r.desc}</div>
                  </div>
                  <div style={{ height: 38, padding: '0 18px', borderRadius: 10, fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', cursor: 'pointer', ...(r.danger ? { background: '#FBEDEF', color: c.redInk, border: '1px solid #F0CBD2' } : { background: c.chip, color: c.ink }) }}>{r.btn}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, paddingBottom: 8 }}>
            <div className="ll-primary" style={{ height: 48, padding: '0 26px', borderRadius: 10, background: c.blue, color: '#fff', fontSize: 13.5, fontWeight: 600, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>Lưu thay đổi</div>
            <div className="ll-subtle" onClick={() => navigate('/')} style={{ height: 48, padding: '0 22px', borderRadius: 10, border: `1px solid ${c.line}`, fontSize: 13.5, fontWeight: 600, color: c.ink2, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>Thoát</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Field = ({ label, value, muted }) => (
  <div>
    <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 7 }}>{label}</div>
    <div style={{ height: 44, borderRadius: 10, border: '1px solid #DFE5EE', background: '#F8FAFC', display: 'flex', alignItems: 'center', padding: '0 14px', fontSize: 13, color: muted ? '#5A6980' : '#16233A' }}>{value}</div>
  </div>
)

function Toggle({ on }) {
  return (
    <div style={{ width: 40, height: 23, borderRadius: 99, flexShrink: 0, padding: 2.5, display: 'flex', background: on ? c.blue : '#D3DBE6' }}>
      <div style={{ width: 18, height: 18, borderRadius: 99, background: '#fff', marginLeft: on ? 17 : 0, transition: 'margin-left .15s' }} />
    </div>
  )
}
