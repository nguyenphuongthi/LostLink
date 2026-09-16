import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import ModIcon from '../../components/moderator/ModIcon'
import ModDialog from '../../components/moderator/ModDialog'
import EscalationActionDialog from '../../components/moderator/EscalationActionDialog'
import { QueuePagination, QueueSummary } from '../../components/moderator/QueueControls'
import { ESCALATION_ACTIONS, elapsedDays, escalationGroup, actionUnavailable, filterEscalations, applyEscalationAction } from '../../lib/escalations'
import '../../theme/escalations.css'

const EMPTY_FILTERS = { group: '', state: 'open', chat: '', query: '' }
const PAGE_SIZE = 6
const GROUP_LABELS = { stale: 'Match STALE >3 ngày', overdue: 'Giao dịch >30 ngày' }
const formatDate = (date) => date ? new Date(date).toLocaleString('vi-VN') : 'Chưa có'

function TicketStatus({ ticket }) {
  const status = ticket.resolution === 'returned' ? 'completed' : ticket.resolution === 'incorrect' ? 'rejected' : ticket.state === 'reminded' ? 'contacted' : 'pending'
  const label = ticket.resolution === 'returned' ? 'Đã trao trả' : ticket.resolution === 'incorrect' ? 'Không chính xác' : ticket.state === 'reminded' ? 'Đã nhắc' : 'Chờ xử lý'
  return <div className="mod-escalation-status"><span className={`mod-status ${status}`}>{label}</span>{ticket.verified && <span className="mod-escalation-verified"><ModIcon name="shield" size={13} />Đã xác minh</span>}{(ticket.lost.hidden || ticket.found.hidden) && <span className="mod-escalation-hidden">Có bài đã ẩn</span>}</div>
}

function Party({ ticket, side, detailed = false }) {
  const party = ticket[side]
  return <div className={`mod-escalation-party ${side}`}>
    <span className="mod-escalation-side">{side === 'lost' ? 'BÊN MẤT' : 'BÊN NHẶT'}</span>
    <strong>{party.name}</strong>
    <span>{party.email}</span>
    {detailed && <><p><strong>{party.postId}</strong> · {party.title}</p><span>Trạng thái bài: {party.postStatus === 'returned' ? 'Đã trao trả' : party.postStatus === 'contacted' ? 'Đã liên hệ' : 'Đang tìm'}{party.hidden ? ' · Đã ẩn' : ''}</span></>}
    <small className={party.confirmed ? 'confirmed' : ''}>{party.confirmed ? 'Đã xác nhận trao trả' : 'Chưa xác nhận trao trả'}</small>
  </div>
}

function TicketActions({ ticket, onAction, now, compact = false }) {
  return <div className="mod-row-actions">{Object.entries(ESCALATION_ACTIONS).map(([action, settings]) => {
    const disabledReason = actionUnavailable(ticket, action, now)
    return <button key={action} className={`${compact ? 'mod-icon-button' : 'mod-button'} ${settings.tone}`} disabled={Boolean(disabledReason)} title={disabledReason || settings.label} aria-label={`${settings.label} · hồ sơ #${ticket.id}`} onClick={() => onAction(action)}><ModIcon name={settings.icon} size={17} />{!compact && settings.label}</button>
  })}</div>
}

function AuditRows({ logs, onView }) {
  return <div className="mod-table-container"><table className="mod-table mod-escalation-log-table">
    <caption className="sr-only">Nhật ký thao tác Escalation</caption>
    <colgroup><col style={{ width: '18%' }} /><col style={{ width: '16%' }} /><col style={{ width: '18%' }} /><col style={{ width: '18%' }} /><col style={{ width: '30%' }} /></colgroup>
    <thead><tr>{['Thời gian', 'Người thực hiện', 'Hồ sơ', 'Thao tác', 'Lý do / căn cứ'].map((label) => <th key={label} scope="col">{label}</th>)}</tr></thead>
    <tbody>{logs.map((log) => <tr key={log.id}><td>{formatDate(log.createdAt)}</td><td>{log.actor}</td><td><button className="mod-post-title" onClick={() => onView(log.id)}>#{log.entityId} · {log.matchId}</button></td><td>{ESCALATION_ACTIONS[log.action].label}{log.action === 'remind' && <small className="mod-escalation-log-note">Email mô phỏng</small>}</td><td><button className="mod-escalation-log-detail" onClick={() => onView(log.id)}>{log.detail.reason}<span>Xem chi tiết <ModIcon name="next" size={12} /></span></button></td></tr>)}</tbody>
  </table>{!logs.length && <div className="mod-empty"><ModIcon name="history" size={32} /><h3>Chưa có thao tác được ghi nhận</h3><p>Nhật ký sẽ xuất hiện sau khi moderator xác nhận một thao tác.</p></div>}</div>
}

export default function Escalations({ escalationState, setEscalationState }) {
  const { user } = useApp()
  const [tab, setTab] = useState('queue')
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [page, setPage] = useState(1)
  const [logPage, setLogPage] = useState(1)
  const [modal, setModal] = useState(null)
  const [notice, setNotice] = useState('')
  const { tickets, logs } = escalationState
  const now = Date.now()
  const filtered = filterEscalations(tickets, filters, now)
  const currentPage = Math.min(page, Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)))
  const currentLogPage = Math.min(logPage, Math.max(1, Math.ceil(logs.length / PAGE_SIZE)))
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const selected = modal?.ticketId && tickets.find((ticket) => ticket.id === modal.ticketId)
  const selectedLog = modal?.logId && logs.find((log) => log.id === modal.logId)
  const pending = tickets.filter((ticket) => !ticket.resolution)
  const setFilter = (key, value) => { setFilters((previous) => ({ ...previous, [key]: value })); setPage(1) }
  const onAction = (ticket, action) => setModal({ kind: 'action', ticketId: ticket.id, action })
  const onViewLog = (id) => setModal({ kind: 'log', logId: id })
  const handleAction = (payload) => {
    const next = applyEscalationAction(escalationState, { ...payload, actor: user.username || user.email, now: Date.now() })
    setEscalationState(next)
    setModal(null)
    setNotice(payload.action === 'remind' ? `Đã ghi nhận email nhắc mô phỏng cho hồ sơ #${payload.id}. Xem nội dung trong nhật ký.` : `Đã ghi nhận “${ESCALATION_ACTIONS[payload.action].label}” cho hồ sơ #${payload.id} và lưu nhật ký trong phiên xem thử.`)
  }

  return <div className="mod-content">
    <div className="mod-escalation-stats">
      {[['stale', 'Match STALE', '>3 ngày chưa có tiến triển', 'warning'], ['overdue', 'Chờ xác nhận trao trả', '>30 ngày chưa đủ xác nhận', 'calendar'], ['resolved', 'Đã xử lý', 'Đã trao trả hoặc không chính xác', 'check']].map(([group, label, description, icon]) => <button key={group} className={`mod-escalation-stat ${group}`} onClick={() => { setTab('queue'); setPage(1); setFilters({ ...EMPTY_FILTERS, group: group === 'resolved' ? '' : group, state: group === 'resolved' ? 'resolved' : 'open' }) }}>
        <span className="mod-escalation-stat-icon"><ModIcon name={icon} size={20} /></span><span><span>{label}</span><strong>{group === 'resolved' ? tickets.filter((ticket) => ticket.resolution).length : pending.filter((ticket) => escalationGroup(ticket, now) === group).length}</strong><small>{description}</small></span>
      </button>)}
    </div>
    <div className="mod-escalation-tabs" role="group" aria-label="Nội dung Escalation">
      <button className={tab === 'queue' ? 'active' : ''} aria-pressed={tab === 'queue'} onClick={() => setTab('queue')}><ModIcon name="list" />Hàng đợi xử lý <span>{pending.length}</span></button>
      <button className={tab === 'logs' ? 'active' : ''} aria-pressed={tab === 'logs'} onClick={() => setTab('logs')}><ModIcon name="history" />Nhật ký thao tác <span>{logs.length}</span></button>
    </div>
    {notice && <p className="mod-queue-notice" role="status">{notice}</p>}
    {tab === 'queue' ? <>
      <section className="mod-filters" aria-label="Bộ lọc Escalation"><div className="mod-escalation-filter-grid">
        <label>Tìm kiếm<input type="search" value={filters.query} placeholder="Mã match, đồ vật, tên hai bên…" onChange={(event) => setFilter('query', event.target.value)} /></label>
        <label>Nhóm hồ sơ<select value={filters.group} onChange={(event) => setFilter('group', event.target.value)}><option value="">Tất cả nhóm</option><option value="stale">Match STALE &gt;3 ngày</option><option value="overdue">Giao dịch &gt;30 ngày</option></select></label>
        <label>Trạng thái chat<select value={filters.chat} onChange={(event) => setFilter('chat', event.target.value)}><option value="">Tất cả</option><option value="opened">Đã mở chat</option><option value="unopened">Chưa mở chat</option></select></label>
        <label>Xử lý<select value={filters.state} onChange={(event) => setFilter('state', event.target.value)}><option value="open">Chưa xử lý xong</option><option value="resolved">Đã xử lý</option><option value="">Tất cả trạng thái</option></select></label>
        <button className="mod-icon-button" title="Đặt lại bộ lọc" aria-label="Đặt lại bộ lọc" onClick={() => { setFilters(EMPTY_FILTERS); setPage(1) }}><ModIcon name="reset" /></button>
      </div></section>
      <QueueSummary count={filtered.length} noun="hồ sơ" />
      <div className="mod-table-container"><table className="mod-table mod-escalation-table">
        <caption className="sr-only">Match treo và giao dịch chưa xác nhận</caption>
        <colgroup><col style={{ width: '22%' }} /><col style={{ width: '24%' }} /><col style={{ width: '16%' }} /><col style={{ width: '11%' }} /><col style={{ width: '14%' }} /><col style={{ width: '13%' }} /></colgroup>
        <thead><tr>{['Hồ sơ / Cặp ghép', 'Thông tin hai bên', 'Chat & Hẹn gặp', 'Thời gian chờ', 'Trạng thái', 'Thao tác'].map((label) => <th key={label} scope="col">{label}</th>)}</tr></thead>
        <tbody>{visible.map((ticket) => {
          const group = ticket.queueGroup || escalationGroup(ticket, now)
          return <tr key={ticket.id}>
            <td><button className="mod-escalation-id" onClick={() => setModal({ kind: 'detail', ticketId: ticket.id })}>#{ticket.id} · {ticket.matchId}</button><button className="mod-post-title" onClick={() => setModal({ kind: 'detail', ticketId: ticket.id })}>{ticket.item}</button><span className={`mod-escalation-group ${group}`}>{GROUP_LABELS[group]}</span><span className="mod-category">{ticket.category}</span></td>
            <td><Party ticket={ticket} side="lost" /><Party ticket={ticket} side="found" /></td>
            <td><span className={`mod-escalation-chat ${ticket.chatOpenedAt ? 'opened' : ''}`}><ModIcon name="chat" size={14} />{ticket.chatOpenedAt ? 'Đã mở chat' : 'Chưa mở chat'}</span><p className="mod-escalation-meeting">{ticket.meetingPoint ? `Đã hẹn: ${ticket.meetingPoint}` : 'Chưa ghi nhận hẹn gặp'}</p></td>
            <td><strong className="mod-escalation-age">{elapsedDays(group === 'overdue' ? ticket.transactionStartedAt : ticket.lastActivityAt, now)} ngày</strong><small className="mod-escalation-log-note">{group === 'overdue' ? 'Từ khi giao dịch mở' : 'Từ hoạt động cuối'}</small>{ticket.reminderCount > 0 && <small className="mod-escalation-log-note">Đã nhắc {ticket.reminderCount} lần</small>}</td>
            <td><TicketStatus ticket={ticket} /></td>
            <td><div className="mod-escalation-actions"><button className="mod-icon-button view" title="Chi tiết hồ sơ" aria-label={`Xem hồ sơ #${ticket.id}`} onClick={() => setModal({ kind: 'detail', ticketId: ticket.id })}><ModIcon name="eye" size={17} /></button><TicketActions compact ticket={ticket} now={now} onAction={(action) => onAction(ticket, action)} /></div></td>
          </tr>
        })}</tbody>
      </table>{!visible.length && <div className="mod-empty"><ModIcon name="check" size={32} /><h3>Không có hồ sơ phù hợp</h3><p>Thay đổi bộ lọc hoặc xem mục Đã xử lý.</p></div>}</div>
      <QueuePagination page={currentPage} total={filtered.length} pageSize={PAGE_SIZE} onChange={setPage} noun="hồ sơ" />
      <div className="mod-escalation-guide"><ModIcon name="shield" size={18} /><p><strong>Ca A:</strong> Hai bên đã trao trả offline nhưng quên xác nhận. Với giao dịch quá 30 ngày và đã mở chat/hẹn gặp, moderator kiểm tra căn cứ trước khi xác nhận hộ “Đã trao trả”.</p></div>
    </> : <><QueueSummary count={logs.length} noun="thao tác" /><AuditRows logs={logs.slice((currentLogPage - 1) * PAGE_SIZE, currentLogPage * PAGE_SIZE)} onView={onViewLog} /><QueuePagination page={currentLogPage} total={logs.length} pageSize={PAGE_SIZE} onChange={setLogPage} noun="thao tác" /></>}
    {selected && modal.kind === 'detail' && <ModDialog title={`Hồ sơ #${selected.id} · ${selected.matchId}`} onClose={() => setModal(null)} footer={<TicketActions ticket={selected} now={now} onAction={(action) => onAction(selected, action)} />}>
      <h3 className="mod-detail-title">{selected.item}</h3><TicketStatus ticket={selected} />
      <div className="mod-escalation-parties"><Party detailed ticket={selected} side="lost" /><Party detailed ticket={selected} side="found" /></div>
      <dl className="mod-detail-list"><div><dt>Nhóm hồ sơ</dt><dd>{GROUP_LABELS[selected.queueGroup || escalationGroup(selected, now)]}</dd></div><div><dt>Hoạt động cuối</dt><dd>{formatDate(selected.lastActivityAt)}</dd></div><div><dt>Bắt đầu giao dịch</dt><dd>{formatDate(selected.transactionStartedAt)}</dd></div><div><dt>Mở chat</dt><dd>{selected.chatOpenedAt ? formatDate(selected.chatOpenedAt) : 'Chưa mở chat'}</dd></div><div><dt>Hẹn gặp</dt><dd>{selected.meetingPoint || 'Chưa ghi nhận'}</dd></div><div><dt>Email nhắc</dt><dd>{selected.reminderCount} lần{selected.lastRemindedAt ? ` · Gần nhất ${formatDate(selected.lastRemindedAt)}` : ''}</dd></div></dl>
      {actionUnavailable(selected, 'returned', now) && <p className="mod-filter-hint">{actionUnavailable(selected, 'returned', now)}</p>}
      <h4>Nhật ký hồ sơ</h4><div className="mod-escalation-timeline">{logs.filter((log) => log.entityId === selected.id).map((log) => <button key={log.id} onClick={() => onViewLog(log.id)}><strong>{ESCALATION_ACTIONS[log.action].label}</strong><span>{log.actor} · {formatDate(log.createdAt)}</span><p>{log.detail.reason}</p></button>)}{!logs.some((log) => log.entityId === selected.id) && <p className="mod-filter-hint">Chưa có thao tác.</p>}</div>
    </ModDialog>}
    {selected && modal.kind === 'action' && <EscalationActionDialog key={`${selected.id}-${modal.action}`} ticket={selected} action={modal.action} onClose={() => setModal(null)} onSubmit={handleAction} />}
    {selectedLog && <ModDialog title={`Nhật ký · Hồ sơ #${selectedLog.entityId}`} onClose={() => setModal(null)}>
      <dl className="mod-detail-list"><div><dt>Thao tác</dt><dd>{ESCALATION_ACTIONS[selectedLog.action].label}</dd></div><div><dt>Người thực hiện</dt><dd>{selectedLog.actor}</dd></div><div><dt>Thời gian</dt><dd>{formatDate(selectedLog.createdAt)}</dd></div><div><dt>Cặp ghép</dt><dd>{selectedLog.matchId}</dd></div><div><dt>Trước thao tác</dt><dd><TicketStatus ticket={selectedLog.before} /></dd></div><div><dt>Sau thao tác</dt><dd><TicketStatus ticket={selectedLog.after} /></dd></div></dl>
      <h4>Lý do / căn cứ</h4><p className="mod-description">{selectedLog.detail.reason}</p>
      {selectedLog.detail.offlineConfirmed && <p className="mod-filter-hint">Moderator đã xác nhận kiểm tra việc trao trả offline (Ca A).</p>}
      {selectedLog.action === 'hide' && <p className="mod-filter-hint">Bài đã ẩn: {selectedLog.detail.targets.map((side) => `${selectedLog.before[side].postId} (${side === 'lost' ? 'bên mất' : 'bên nhặt'})`).join(', ')}</p>}
      {selectedLog.action === 'remind' && <><h4>Email nhắc · Mô phỏng</h4><p className="mod-filter-hint">Người nhận: {selectedLog.detail.recipients.join(', ')}</p><h4>{selectedLog.detail.subject}</h4><p className="mod-description mod-escalation-email">{selectedLog.detail.message}</p></>}
    </ModDialog>}
  </div>
}
