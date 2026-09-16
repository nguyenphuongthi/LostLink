import { useState } from 'react'
import ModDialog from './ModDialog'
import { ESCALATION_ACTIONS } from '../../lib/escalations'

export default function EscalationActionDialog({ ticket, action, onClose, onSubmit }) {
  const [reason, setReason] = useState('')
  const [targets, setTargets] = useState(action === 'remind' ? ['lost', 'found'] : [])
  const [offlineConfirmed, setOfflineConfirmed] = useState(false)
  const [subject, setSubject] = useState(`LostLink · Nhắc xác nhận kết quả ghép ${ticket.matchId}`)
  const [message, setMessage] = useState(`Chào bạn,\n\nLostLink đang theo dõi cặp ghép ${ticket.matchId} – ${ticket.item}. Bạn vui lòng kiểm tra và xác nhận “Đã trao trả” nếu đã nhận/giao lại đồ, hoặc “Không chính xác” nếu hai bài đăng không khớp.\n\nCảm ơn bạn đã hỗ trợ cộng đồng LostLink.`)
  const [error, setError] = useState('')
  const settings = ESCALATION_ACTIONS[action]
  const toggleTarget = (side) => setTargets((previous) => previous.includes(side) ? previous.filter((entry) => entry !== side) : [...previous, side])
  const submit = (event) => {
    event.preventDefault()
    try { onSubmit({ id: ticket.id, action, reason, targets, offlineConfirmed, subject, message }) }
    catch (error) { setError(error.message) }
  }

  return <ModDialog title={settings.label} onClose={onClose} footer={<>
    <button className="mod-button" onClick={onClose}>Hủy</button>
    <button form="escalation-action" type="submit" className={`mod-button ${settings.tone === 'view' ? 'primary' : settings.tone}`}>{action === 'remind' ? 'Mô phỏng gửi email' : 'Xác nhận'}</button>
  </>}>
    <p className="mod-edit-title">#{ticket.id} · {ticket.matchId} · {ticket.item}</p>
    <form id="escalation-action" className="mod-action-form" onSubmit={submit}>
      {action === 'returned' && <div className="mod-escalation-explanation">
        <strong>Ca A · Đã trao trả offline, quên xác nhận</strong>
        <p>Xác nhận hộ cả hai bên và chuyển hai bài đăng sang “Đã trao trả”. Hồ sơ sẽ được đóng.</p>
        <label className="mod-escalation-checkbox"><input type="checkbox" checked={offlineConfirmed} onChange={(event) => setOfflineConfirmed(event.target.checked)} />Tôi đã kiểm tra căn cứ cho thấy hai bên thực sự trao trả đồ offline.</label>
      </div>}
      {action === 'incorrect' && <p className="mod-description">Xác nhận hai bài đăng không khớp, bác bỏ cặp ghép và đưa hai bài về “Đang tìm”. Những bài đã ẩn vẫn giữ trạng thái ẩn.</p>}
      {action === 'verify' && <p className="mod-description">Gắn nhãn “Đã xác minh” cho hồ sơ này sau khi kiểm tra thông tin hai bên. Nhãn này không tự xác nhận việc trao trả.</p>}
      {['remind', 'hide'].includes(action) && <fieldset className="mod-escalation-targets">
        <legend>{action === 'remind' ? 'Người nhận email' : 'Chọn bài đăng cần ẩn'}</legend>
        {['lost', 'found'].map((side) => <label className="mod-escalation-checkbox" key={side}>
          <input type="checkbox" checked={targets.includes(side)} disabled={action === 'hide' && ticket[side].hidden} onChange={() => toggleTarget(side)} />
          <span><strong>{side === 'lost' ? 'Bên mất' : 'Bên nhặt'} · {ticket[side].name}</strong><small>{action === 'remind' ? ticket[side].email : `${ticket[side].postId} · ${ticket[side].title}${ticket[side].hidden ? ' (Đã ẩn)' : ''}`}</small></span>
        </label>)}
      </fieldset>}
      {action === 'remind' && <>
        <label>Tiêu đề email<input value={subject} maxLength={200} onChange={(event) => setSubject(event.target.value)} /></label>
        <label>Nội dung email<textarea rows={7} value={message} maxLength={5000} onChange={(event) => setMessage(event.target.value)} /></label>
        <p className="mod-filter-hint">Chế độ xem thử: ghi nhận nội dung và người nhận vào nhật ký; email chưa được gửi thực tế.</p>
      </>}
      <label>Lý do / căn cứ xử lý <textarea value={reason} maxLength={1500} onChange={(event) => { setReason(event.target.value); setError('') }} placeholder={action === 'returned' ? 'Ví dụ: hai bên xác nhận đã giao nhận qua cuộc gọi ngày…' : 'Ghi rõ thông tin đã kiểm tra và lý do thực hiện…'} aria-describedby={error ? 'escalation-action-error' : undefined} /></label>
      {error && <p className="mod-error" id="escalation-action-error" role="alert">{error}</p>}
      <p className="mod-filter-hint">Thao tác và căn cứ xử lý sẽ được ghi vào nhật ký cùng tài khoản moderator và thời gian thực hiện.</p>
    </form>
  </ModDialog>
}
