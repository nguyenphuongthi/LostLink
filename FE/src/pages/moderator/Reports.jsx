import { useState } from 'react'
import ModIcon from '../../components/moderator/ModIcon'
import ModDialog from '../../components/moderator/ModDialog'
import { QueueToolbar, QueueSummary, QueuePagination, QueueEmpty } from '../../components/moderator/QueueControls'
import { REPORT_ACTIONS, SEVERITY_LABELS, violationHistory, resolveReport, downloadCsv, filterModeratorReports } from '../../lib/moderation'

const PAGE_SIZE = 6
const EMPTY_FILTERS = { targetType: '', severity: '', from: '', to: '', query: '' }

function ReportActions({ report, onAction, compact = false }) {
  return <div className="mod-row-actions">{Object.entries(REPORT_ACTIONS).map(([action, settings]) => <button key={action}
    className={`${compact ? 'mod-icon-button' : 'mod-button'} ${compact && action === 'hide' ? 'danger' : settings.tone}`}
    title={action === 'hide' && report.targetType !== 'post' ? 'Chỉ áp dụng cho report bài đăng' : settings.label}
    aria-label={`${settings.label} · report #${report.id}`}
    disabled={action === 'hide' && report.targetType !== 'post'}
    onClick={() => onAction(action)}><ModIcon name={settings.icon} />{!compact && settings.label}</button>)}</div>
}

function History({ report, expanded = false }) {
  const history = violationHistory(report)
  if (expanded && history.length) return <ul className="mod-history-list">{history.map((entry, index) => <li key={index}>{entry}</li>)}</ul>
  return <span className={`mod-reputation ${history.length ? 'danger' : 'success'}`}><ModIcon name={history.length ? 'warning' : 'check'} size={14} />{history.length ? `${history.length} cảnh báo cũ` : 'Chưa có vi phạm'}</span>
}

export default function Reports({ reports, setReports }) {
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState(null)
  const [notice, setNotice] = useState('')
  const filtered = filterModeratorReports(reports, filters)
  const currentPage = Math.min(page, Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)))
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const selected = modal && reports.find((report) => report.id === modal.id && !report.resolution)
  const action = modal?.action && REPORT_ACTIONS[modal.action]
  const changeFilter = (key, value) => { setFilters((previous) => ({ ...previous, [key]: value })); setPage(1) }
  const confirmAction = (id, action) => setModal({ id, kind: 'confirm', action })
  const executeAction = () => {
    if (!selected || !action || (modal.action === 'hide' && selected.targetType !== 'post')) return
    setReports((previous) => resolveReport(previous, selected.id, modal.action))
    setNotice(`Đã ghi nhận “${action.label}” cho report #${selected.id} và đưa report khỏi hàng đợi trong phiên xem thử.`)
    setModal(null)
  }
  const exportCsv = () => {
    downloadCsv('LostLink_Hang_doi_report.csv', [
      ['ID', 'Thời gian', 'Loại đối tượng', 'Đối tượng', 'Người bị report', 'Mức độ', 'Lý do', 'Người gửi'],
      ...filtered.map((report) => [report.id, report.time, report.targetType === 'post' ? 'Bài đăng' : 'Tài khoản', report.targetTitle, report.reportedUser, SEVERITY_LABELS[report.severity], report.reason, report.reporter]),
    ])
    setNotice(`Đã xuất ${filtered.length} report ra CSV.`)
  }

  return <div className="mod-content">
    <QueueToolbar onReset={() => { setFilters(EMPTY_FILTERS); setPage(1) }} onExport={exportCsv} empty={!filtered.length} dateFilters={filters} onDateChange={changeFilter}>
      <label className="mod-search-filter">Tìm kiếm<input type="search" value={filters.query} onChange={(e) => changeFilter('query', e.target.value)} placeholder="Report, bài đăng, tài khoản…" /></label>
      <label>Loại Report<select value={filters.targetType} onChange={(e) => changeFilter('targetType', e.target.value)}><option value="">Tất cả đối tượng</option><option value="post">Bài viết bị báo cáo</option><option value="account">Tài khoản bị báo cáo</option></select></label>
      <label>Mức độ nghiêm trọng<select value={filters.severity} onChange={(e) => changeFilter('severity', e.target.value)}><option value="">Tất cả mức độ</option>{Object.entries(SEVERITY_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
    </QueueToolbar>
    <QueueSummary count={filtered.length} noun="report" notice={notice} />
    <div className="mod-table-container">
      <table className="mod-table mod-report-table">
        <caption className="sr-only">Hàng đợi report cần xử lý</caption>
        <colgroup><col style={{ width: '16%' }} /><col style={{ width: '23%' }} /><col style={{ width: '20%' }} /><col style={{ width: '24%' }} /><col style={{ width: '17%' }} /></colgroup>
        <thead><tr>{['Thời gian', 'Đối tượng', 'Tài khoản', 'Lý do & Mức độ', 'Thao tác'].map((label) => <th key={label} scope="col">{label}</th>)}</tr></thead>
        <tbody>{visible.map((report) => <tr key={report.id}>
          <td><strong>#{report.id}</strong><div className="mod-post-location"><ModIcon name="calendar" size={13} />{report.time}</div></td>
          <td><button className="mod-post-title" onClick={() => setModal({ id: report.id, kind: 'detail' })}>{report.targetTitle}</button><span className={`mod-type mod-cell-badge ${report.targetType}`}>{report.targetType === 'post' ? 'BÀI ĐĂNG' : 'TÀI KHOẢN'}</span></td>
          <td><strong className="mod-author">@{report.reportedUser}</strong><History report={report} /></td>
          <td><p className="mod-report-reason">{report.reason}</p><span className={`mod-severity ${report.severity}`}>{SEVERITY_LABELS[report.severity]}</span></td>
          <td><div className="mod-report-actions"><button className="mod-icon-button view" aria-label={`Xem report #${report.id}`} title="Xem chi tiết" onClick={() => setModal({ id: report.id, kind: 'detail' })}><ModIcon name="eye" /></button><ReportActions compact report={report} onAction={(action) => confirmAction(report.id, action)} /></div></td>
        </tr>)}</tbody>
      </table>
      {!visible.length && <QueueEmpty>Không có report nào cần xử lý trong danh sách này.</QueueEmpty>}
    </div>
    <QueuePagination page={currentPage} total={filtered.length} pageSize={PAGE_SIZE} onChange={setPage} noun="report" />
    {selected && modal.kind === 'detail' && <ModDialog key="detail" title="Chi tiết Report" onClose={() => setModal(null)} footer={<><button className="mod-button" onClick={() => setModal(null)}>Đóng</button><ReportActions report={selected} onAction={(action) => confirmAction(selected.id, action)} /></>}>
      <dl className="mod-detail-list"><div><dt>Mã Report</dt><dd>#{selected.id}</dd></div><div><dt>Thời gian</dt><dd>{selected.time}</dd></div><div><dt>Đối tượng</dt><dd>{selected.targetTitle}</dd></div><div><dt>Người bị Report</dt><dd>@{selected.reportedUser}</dd></div><div><dt>Lịch sử vi phạm</dt><dd><History report={selected} expanded /></dd></div><div><dt>Lý do Report</dt><dd>{selected.reason}</dd></div><div><dt>Mức độ</dt><dd><span className={`mod-severity ${selected.severity}`}>{SEVERITY_LABELS[selected.severity]}</span></dd></div><div><dt>Người gửi</dt><dd>@{selected.reporter}</dd></div></dl>
      <h4>Nội dung giải trình / bằng chứng từ người Report</h4><p className="mod-description mod-report-evidence">{selected.content}</p>
    </ModDialog>}
    {selected && modal.kind === 'confirm' && <ModDialog key="confirm" title="Xác nhận thao tác" onClose={() => setModal(null)} footer={<><button className="mod-button" onClick={() => setModal(null)}>Hủy</button><button className={`mod-button ${action.tone}`} onClick={executeAction}>Xác nhận {action.label.toLowerCase()}</button></>}>
      <p className="mod-edit-title">{action.description}</p><dl className="mod-detail-list"><div><dt>Report</dt><dd>#{selected.id} · {selected.targetTitle}</dd></div><div><dt>Tài khoản</dt><dd>@{selected.reportedUser}</dd></div></dl>
      <p className="mod-filter-hint">Bản xem thử chỉ ghi nhận lựa chọn và đóng report trong dữ liệu mẫu. Thao tác chưa áp dụng lên tài khoản, bài đăng hay gửi thông báo thực tế.</p>
    </ModDialog>}
  </div>
}
