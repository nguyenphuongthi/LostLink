import { Fragment, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import ModIcon from '../../components/moderator/ModIcon'
import ModDialog from '../../components/moderator/ModDialog'
import { MESSAGE_LIMIT, moderatorContactName, filterModeratorThreads, markModeratorThreadUnread, openModeratorThread, sendModeratorMessage, startModeratorThread } from '../../lib/moderatorMessages'
import '../../theme/moderatorMessages.css'

const QUICK_REPLIES = {
  user: ['Chào bạn, mình đã tiếp nhận yêu cầu và đang kiểm tra thông tin.', 'Bạn có thể bổ sung thời gian, địa điểm và các thông tin liên quan giúp mình không?', 'Cảm ơn bạn đã phối hợp. Nếu cần hỗ trợ thêm, bạn cứ nhắn tại đây nhé.'],
  admin: ['Mình đã tiếp nhận thông tin và sẽ kiểm tra lại hồ sơ.', 'Nhờ bạn hỗ trợ xem xét trường hợp này. Mình sẽ bổ sung thông tin liên quan.'],
}
const timeLabel = (value) => new Date(value).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
const dateKey = (value) => new Date(value).toLocaleDateString('vi-VN')
const dayLabel = (value) => dateKey(value) === dateKey(Date.now()) ? 'Hôm nay' : dateKey(value)
const previewTime = (value) => dateKey(value) === dateKey(Date.now()) ? timeLabel(value) : new Date(value).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })

function Avatar({ contact, small = false }) {
  return <span className={`mod-msg-avatar ${contact.color} ${small ? 'small' : ''}`} aria-hidden="true">{contact.role === 'admin' ? 'AD' : contact.initials}</span>
}

function RoleBadge({ role }) {
  return <span className={`mod-msg-role ${role}`}>{role === 'admin' ? 'Admin' : 'Người dùng'}</span>
}

function NewConversation({ contacts, onSelect, onClose }) {
  const [query, setQuery] = useState('')
  const [role, setRole] = useState('user')
  const filtered = contacts.filter((contact) => contact.role === role && `${moderatorContactName(contact)} ${contact.email}`.toLocaleLowerCase('vi').includes(query.trim().toLocaleLowerCase('vi')))
  return <ModDialog title="Cuộc trò chuyện mới" onClose={onClose}>
    <div className="mod-msg-contact-tabs" role="group" aria-label="Loại người nhận">{[['user', 'Người dùng'], ['admin', 'Admin']].map(([value, label]) => <button key={value} className={role === value ? 'active' : ''} aria-pressed={role === value} onClick={() => setRole(value)}>{label}</button>)}</div>
    <label className="mod-msg-search"><ModIcon name="search" size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm theo tên hoặc email…" aria-label="Tìm người nhận" /></label>
    <div className="mod-msg-contact-list">{filtered.map((contact) => <button key={contact.id} onClick={() => onSelect(contact.id)}><Avatar contact={contact} /><span><strong>{moderatorContactName(contact)}</strong><small>{contact.email}</small></span><ModIcon name="next" size={16} /></button>)}{!filtered.length && <p className="mod-msg-empty-note">Không tìm thấy người nhận phù hợp.</p>}</div>
  </ModDialog>
}

export default function Messages({ messageState, setMessageState }) {
  const { user } = useApp()
  const [role, setRole] = useState('')
  const [query, setQuery] = useState('')
  const [unreadOnly, setUnreadOnly] = useState(false)
  const [newConversation, setNewConversation] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [showReplies, setShowReplies] = useState(false)
  const [mobileConversation, setMobileConversation] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const scrollRef = useRef(null)
  const composeRef = useRef(null)
  const { threads, contacts, activeId, drafts } = messageState
  const active = threads.find((thread) => thread.id === activeId)
  const contact = active && contacts.find((entry) => entry.id === active.contactId)
  const filtered = filterModeratorThreads(messageState, { role, query, unreadOnly })
  const draft = drafts[activeId] || ''
  const unreadCount = threads.reduce((count, thread) => count + thread.unread, 0)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [activeId, active?.messages.length, mobileConversation])

  const openThread = (id) => {
    setMessageState((previous) => openModeratorThread(previous, id))
    setShowReplies(false)
    setShowInfo(false)
    setMobileConversation(true)
    setAnnouncement('')
  }
  const startThread = (contactId) => {
    setMessageState((previous) => startModeratorThread(previous, contactId))
    setNewConversation(false)
    setRole(''); setQuery(''); setUnreadOnly(false)
    setShowInfo(false); setShowReplies(false); setMobileConversation(true)
  }
  const updateDraft = (text) => setMessageState((previous) => ({ ...previous, drafts: { ...previous.drafts, [activeId]: text } }))
  const send = (event) => {
    event.preventDefault()
    if (!active || !draft.trim() || draft.trim().length > MESSAGE_LIMIT) return
    setMessageState((previous) => sendModeratorMessage(previous, activeId))
    setAnnouncement(`Đã lưu tin nhắn gửi thử tới ${moderatorContactName(contact)} trong phiên xem thử.`)
    setShowReplies(false)
    composeRef.current?.focus()
  }
  const toggleThread = (field) => setMessageState((previous) => ({ ...previous, threads: previous.threads.map((thread) => thread.id === activeId ? { ...thread, [field]: !thread[field] } : thread) }))
  const markUnread = () => {
    setMessageState((previous) => markModeratorThreadUnread(previous, activeId))
    setAnnouncement(`Đã đánh dấu hội thoại với ${moderatorContactName(contact)} là chưa đọc.`)
    setMobileConversation(false)
  }
  const insertReply = (text) => {
    updateDraft(`${draft}${draft.trim() ? '\n' : ''}${text}`.slice(0, MESSAGE_LIMIT))
    setShowReplies(false)
    composeRef.current?.focus()
  }

  return <div className={`mod-messages ${mobileConversation ? 'conversation-open' : ''}`}>
    <div className="mod-msg-workspace">
      <section className="mod-msg-inbox" aria-label="Danh sách hội thoại">
        <div className="mod-msg-inbox-top"><div><h3>Hội thoại</h3><span>{unreadCount} tin chưa đọc</span><button className="mod-icon-button mod-msg-new-button" title="Soạn tin mới" aria-label="Soạn tin mới" onClick={() => setNewConversation(true)}><ModIcon name="compose" /></button></div><label className="mod-msg-search"><ModIcon name="search" size={16} /><input aria-label="Tìm hội thoại" placeholder="Tìm tên, mã hồ sơ…" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
          <div className="mod-msg-filters" role="group" aria-label="Lọc người trò chuyện">{[['', 'Tất cả'], ['user', 'Người dùng'], ['admin', 'Admin']].map(([value, label]) => <button key={value} className={role === value ? 'active' : ''} aria-pressed={role === value} onClick={() => setRole(value)}>{label}</button>)}</div>
          <div className="mod-msg-list-caption"><span>{filtered.length} cuộc trò chuyện</span><label><input type="checkbox" checked={unreadOnly} onChange={(event) => setUnreadOnly(event.target.checked)} />Chưa đọc</label></div>
        </div>
        <div className="mod-msg-thread-list">{filtered.map((thread) => {
          const peer = contacts.find((entry) => entry.id === thread.contactId)
          const last = thread.messages.at(-1)
          return <button className={`mod-msg-thread ${activeId === thread.id ? 'selected' : ''} ${thread.unread ? 'unread' : ''}`} key={thread.id} aria-current={activeId === thread.id ? 'true' : undefined} onClick={() => openThread(thread.id)}>
            <Avatar contact={peer} /><span className="mod-msg-thread-body"><span className="mod-msg-thread-title"><strong>{moderatorContactName(peer)}</strong><time dateTime={last?.createdAt || thread.createdAt}>{previewTime(last?.createdAt || thread.createdAt)}</time></span><span className="mod-msg-thread-meta"><RoleBadge role={peer.role} />{thread.priority && <span title="Ưu tiên" aria-label="Ưu tiên"><ModIcon name="flag" size={12} /></span>}{thread.resolved && <span className="mod-msg-resolved">Đã xử lý</span>}</span><span className="mod-msg-preview">{drafts[thread.id] ? `Bản nháp: ${drafts[thread.id]}` : last ? `${last.sender === 'me' ? 'Bạn: ' : ''}${last.text}` : 'Bắt đầu cuộc trò chuyện'}</span>{thread.context && <span className="mod-msg-thread-context">{thread.context.code} · {thread.context.label}</span>}</span>{thread.unread > 0 && <span className="mod-msg-unread-count" aria-label={`${thread.unread} tin chưa đọc`}>{thread.unread}</span>}
          </button>
        })}{!filtered.length && <div className="mod-msg-list-empty"><ModIcon name="chat" size={30} /><strong>Không có hội thoại phù hợp</strong><p>Thử đổi bộ lọc hoặc bắt đầu một cuộc trò chuyện mới.</p><button onClick={() => { setRole(''); setQuery(''); setUnreadOnly(false) }}>Xóa bộ lọc</button></div>}</div>
      </section>
      {active && contact ? <section className={`mod-msg-conversation ${contact.role === 'admin' ? 'internal' : ''}`} aria-label={`Trò chuyện với ${moderatorContactName(contact)}`}>
        <header className="mod-msg-conversation-header"><button className="mod-icon-button mod-msg-back" aria-label="Về danh sách hội thoại" onClick={() => setMobileConversation(false)}><ModIcon name="back" /></button><Avatar contact={contact} /><div className="mod-msg-peer"><div><h3>{moderatorContactName(contact)}</h3><RoleBadge role={contact.role} /></div><span>{contact.role === 'admin' ? 'Trao đổi nội bộ · Moderator & Admin' : 'Kênh hỗ trợ · Moderator & Người dùng'}</span></div><div className="mod-msg-header-actions"><button className={`mod-icon-button ${active.priority ? 'is-priority' : ''}`} title={active.priority ? 'Bỏ ưu tiên' : 'Đánh dấu ưu tiên'} aria-label={active.priority ? 'Bỏ ưu tiên' : 'Đánh dấu ưu tiên'} aria-pressed={active.priority} onClick={() => toggleThread('priority')}><ModIcon name="flag" /></button><button className={`mod-icon-button ${showInfo ? 'is-active' : ''}`} title="Thông tin hội thoại" aria-label="Thông tin hội thoại" aria-expanded={showInfo} aria-controls="mod-msg-contact-info" onClick={() => setShowInfo((value) => !value)}><ModIcon name="info" /></button></div></header>
        {showInfo && <div className="mod-msg-contact-info" id="mod-msg-contact-info"><div><span>Liên hệ</span><strong>{contact.email}</strong><small>{contact.description}</small></div><div><span>Cuộc trò chuyện</span><strong>{active.resolved ? 'Đã xử lý' : 'Đang trao đổi'}</strong><small>Bắt đầu {dayLabel(active.createdAt)}</small></div></div>}
        {active.context && <Link to={active.context.path} className="mod-msg-case"><span className="mod-msg-case-icon"><ModIcon name={active.context.icon} size={17} /></span><span><small>{active.context.label} <b>{active.context.code}</b></small><strong>{active.context.title}</strong></span><ModIcon name="next" size={16} /></Link>}
        <div className="mod-msg-messages" ref={scrollRef}>
          {active.messages.map((message, index) => <Fragment key={message.id}>
            {(index === 0 || dateKey(active.messages[index - 1].createdAt) !== dateKey(message.createdAt)) && <div className="mod-msg-date"><span>{dayLabel(message.createdAt)}</span></div>}
            <article className={`mod-msg-message ${message.sender === 'me' ? 'mine' : ''}`}>
              {message.sender === 'me' ? <span className="mod-msg-avatar small moderator" aria-hidden="true">{(user.username || 'M').slice(0, 2).toUpperCase()}</span> : <Avatar contact={contact} small />}
              <div><div className="mod-msg-message-meta"><strong>{message.sender === 'me' ? 'Bạn' : moderatorContactName(contact)}</strong><time dateTime={message.createdAt}>{timeLabel(message.createdAt)}</time></div><p>{message.text}</p></div>
            </article>
          </Fragment>)}
          {!active.messages.length && <div className="mod-msg-welcome"><Avatar contact={contact} /><h3>Bắt đầu trao đổi với {moderatorContactName(contact)}</h3><p>{contact.role === 'admin' ? 'Thảo luận nghiệp vụ hoặc đề nghị hỗ trợ xử lý hồ sơ.' : 'Gửi lời chào và cho người dùng biết bạn có thể hỗ trợ gì.'}</p></div>}
        </div>
        <div className="mod-msg-composer-area"><div className="mod-msg-composer-toolbar"><button aria-expanded={showReplies} aria-controls="mod-msg-quick-replies" onClick={() => setShowReplies((value) => !value)}><ModIcon name="reply" size={15} />Trả lời nhanh</button><button onClick={markUnread} disabled={active.unread > 0}><ModIcon name="mail" size={15} />{active.unread > 0 ? 'Đã đánh dấu chưa đọc' : 'Đánh dấu chưa đọc'}</button><button className={active.resolved ? 'resolved' : ''} onClick={() => toggleThread('resolved')}><ModIcon name={active.resolved ? 'reset' : 'check'} size={15} />{active.resolved ? 'Mở lại hội thoại' : 'Đánh dấu đã xử lý'}</button></div>
          {showReplies && <div className="mod-msg-quick-replies" id="mod-msg-quick-replies">{QUICK_REPLIES[contact.role].map((reply) => <button key={reply} onClick={() => insertReply(reply)}>{reply}<ModIcon name="next" size={13} /></button>)}</div>}
          <form className="mod-msg-composer" onSubmit={send}><label className="sr-only" htmlFor="mod-msg-draft">Tin nhắn cho {moderatorContactName(contact)}</label><textarea id="mod-msg-draft" ref={composeRef} value={draft} onChange={(event) => updateDraft(event.target.value)} maxLength={MESSAGE_LIMIT} rows={3} placeholder={`Viết tin nhắn cho ${moderatorContactName(contact)}…`} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing && event.keyCode !== 229) { event.preventDefault(); send(event) } }} /><div><span>Enter để gửi · Shift + Enter xuống dòng</span><small>{draft.length}/{MESSAGE_LIMIT}</small><button type="submit" disabled={!draft.trim()}><ModIcon name="send" size={16} />Gửi tin</button></div></form>
          <span role="status" className="sr-only">{announcement}</span>
        </div>
      </section> : <div className="mod-msg-welcome"><ModIcon name="chat" size={40} /><h3>Chọn một hội thoại để bắt đầu</h3></div>}
    </div>
    {newConversation && <NewConversation contacts={contacts} onSelect={startThread} onClose={() => setNewConversation(false)} />}
  </div>
}
