export const MESSAGE_LIMIT = 2000

export function moderatorContactName(contact) {
  return contact.role === 'admin' ? 'Admin' : contact.name
}

export function openModeratorThread(state, threadId) {
  if (!state.threads.some((thread) => thread.id === threadId)) return state
  return { ...state, activeId: threadId, threads: state.threads.map((thread) => thread.id === threadId ? { ...thread, unread: 0 } : thread) }
}

export function markModeratorThreadUnread(state, threadId) {
  if (!state.threads.some((thread) => thread.id === threadId)) return state
  return { ...state, threads: state.threads.map((thread) => thread.id === threadId ? { ...thread, unread: Math.max(1, thread.unread) } : thread) }
}

export function startModeratorThread(state, contactId, now = Date.now()) {
  if (!state.contacts.some((contact) => contact.id === contactId && ['user', 'admin'].includes(contact.role))) return state
  const existing = state.threads.find((thread) => thread.contactId === contactId)
  if (existing) return openModeratorThread(state, existing.id)
  const thread = { id: `thread-${contactId}`, contactId, unread: 0, priority: false, resolved: false, createdAt: new Date(now).toISOString(), context: null, messages: [] }
  return { ...state, threads: [thread, ...state.threads], activeId: thread.id }
}

export function sendModeratorMessage(state, threadId, now = Date.now()) {
  const text = (state.drafts[threadId] || '').trim()
  if (!text || text.length > MESSAGE_LIMIT || !state.threads.some((thread) => thread.id === threadId)) return state
  return {
    ...state,
    drafts: { ...state.drafts, [threadId]: '' },
    threads: state.threads.map((thread) => thread.id === threadId ? {
      ...thread, unread: 0, resolved: false,
      messages: [...thread.messages, { id: `${threadId}-${now}-${thread.messages.length}`, sender: 'me', text, createdAt: new Date(now).toISOString(), local: true }],
    } : thread),
  }
}

export function filterModeratorThreads(state, { role = '', query = '', unreadOnly = false }) {
  const needle = query.trim().toLocaleLowerCase('vi')
  return state.threads.filter((thread) => {
    const contact = state.contacts.find((entry) => entry.id === thread.contactId)
    if (!contact || (role && contact.role !== role) || (unreadOnly && !thread.unread)) return false
    return !needle || `${moderatorContactName(contact)} ${contact.email} ${thread.context?.code || ''} ${thread.context?.title || ''}`.toLocaleLowerCase('vi').includes(needle)
  }).sort((left, right) => {
    if (left.priority !== right.priority) return Number(right.priority) - Number(left.priority)
    return Date.parse(right.messages.at(-1)?.createdAt || right.createdAt) - Date.parse(left.messages.at(-1)?.createdAt || left.createdAt)
  })
}
