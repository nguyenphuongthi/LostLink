import test from 'node:test'
import assert from 'node:assert/strict'
import { createModeratorMessages } from '../data/moderatorMessages.js'
import { MESSAGE_LIMIT, filterModeratorThreads, markModeratorThreadUnread, openModeratorThread, sendModeratorMessage, startModeratorThread } from './moderatorMessages.js'

const now = Date.parse('2026-09-16T10:00:00Z')

test('opening a conversation clears only its unread count and preserves separate drafts', () => {
  const state = createModeratorMessages(now)
  state.drafts = { 'thread-panda': 'Draft to a user', 'thread-lan': 'Draft to an admin' }
  const opened = openModeratorThread(state, 'thread-lan')
  assert.equal(opened.activeId, 'thread-lan')
  assert.equal(opened.threads.find((thread) => thread.id === 'thread-lan').unread, 0)
  assert.equal(opened.threads.find((thread) => thread.id === 'thread-minh').unread, 1)
  assert.equal(opened.drafts['thread-panda'], 'Draft to a user')
  assert.equal(opened.drafts['thread-lan'], 'Draft to an admin')
  assert.equal(state.threads.find((thread) => thread.id === 'thread-lan').unread, 2)
})

test('sending appends a local message only to the chosen thread and reopens it', () => {
  const state = createModeratorMessages(now)
  state.drafts = { 'thread-long': '  Follow-up\nSecond line  ', 'thread-lan': 'Private admin draft' }
  const sent = sendModeratorMessage(state, 'thread-long', now)
  const thread = sent.threads.find((entry) => entry.id === 'thread-long')
  assert.equal(thread.messages.at(-1).text, 'Follow-up\nSecond line')
  assert.equal(thread.messages.at(-1).sender, 'me')
  assert.equal(thread.messages.at(-1).local, true)
  assert.equal(thread.resolved, false)
  assert.equal(sent.drafts['thread-long'], '')
  assert.equal(sent.drafts['thread-lan'], 'Private admin draft')
  assert.equal(sent.threads.find((entry) => entry.id === 'thread-lan'), state.threads.find((entry) => entry.id === 'thread-lan'))
  assert.equal(state.threads.find((entry) => entry.id === 'thread-long').messages.length, 2)
})

test('blank, oversized and missing-recipient messages are not added', () => {
  const state = createModeratorMessages(now)
  state.drafts['thread-panda'] = ' \n '
  assert.equal(sendModeratorMessage(state, 'thread-panda', now), state)
  state.drafts['thread-panda'] = 'x'.repeat(MESSAGE_LIMIT + 1)
  assert.equal(sendModeratorMessage(state, 'thread-panda', now), state)
  state.drafts.missing = 'Valid text'
  assert.equal(sendModeratorMessage(state, 'missing', now), state)
})

test('new user conversations and the single admin reuse existing threads without losing history', () => {
  const initial = createModeratorMessages(now)
  const userThread = startModeratorThread(initial, 'user-nam', now)
  assert.equal(userThread.threads.length, initial.threads.length + 1)
  assert.equal(userThread.threads[0].contactId, 'user-nam')
  assert.equal(initial.contacts.filter((contact) => contact.role === 'admin').length, 1)
  const reopened = startModeratorThread(userThread, 'admin-lan', now)
  assert.equal(reopened.activeId, 'thread-lan')
  assert.equal(reopened.threads.length, userThread.threads.length)
  assert.equal(reopened.threads.filter((thread) => thread.contactId === 'admin-lan').length, 1)
  assert.equal(reopened.threads.find((thread) => thread.id === 'thread-lan').messages.length, 3)
  assert.equal(startModeratorThread(initial, 'unknown', now), initial)
})

test('role, unread and context search filters combine without mutating the inbox', () => {
  const state = createModeratorMessages(now)
  const originalOrder = state.threads.map((thread) => thread.id)
  assert.equal(filterModeratorThreads(state, { role: 'admin' }).length, 1)
  assert.equal(filterModeratorThreads(state, { role: 'user' }).length, 4)
  assert.deepEqual(filterModeratorThreads(state, { role: 'admin', unreadOnly: true }).map((thread) => thread.id), ['thread-lan'])
  assert.equal(filterModeratorThreads(state, { query: '#401' })[0].id, 'thread-minh')
  assert.equal(filterModeratorThreads(state, { role: 'admin', query: '#401' }).length, 0)
  assert.equal(filterModeratorThreads(state, {})[0].id, 'thread-panda')
  assert.deepEqual(state.threads.map((thread) => thread.id), originalOrder)
})

test('mark unread adds a read thread to the unread filter without clearing drafts or changing other threads', () => {
  const state = createModeratorMessages(now)
  state.drafts['thread-panda'] = 'Keep this draft'
  const marked = markModeratorThreadUnread(state, 'thread-panda')
  assert.equal(marked.threads.find((thread) => thread.id === 'thread-panda').unread, 1)
  assert.equal(marked.activeId, state.activeId)
  assert.equal(marked.drafts['thread-panda'], 'Keep this draft')
  assert.ok(filterModeratorThreads(marked, { unreadOnly: true }).some((thread) => thread.id === 'thread-panda'))
  assert.equal(state.threads.find((thread) => thread.id === 'thread-panda').unread, 0)
  assert.equal(markModeratorThreadUnread(marked, 'thread-panda').threads.find((thread) => thread.id === 'thread-panda').unread, 1)
  assert.equal(markModeratorThreadUnread(marked, 'thread-lan').threads.find((thread) => thread.id === 'thread-lan').unread, 2)
  assert.equal(openModeratorThread(marked, 'thread-panda').threads.find((thread) => thread.id === 'thread-panda').unread, 0)
  assert.equal(markModeratorThreadUnread(state, 'missing'), state)
})
