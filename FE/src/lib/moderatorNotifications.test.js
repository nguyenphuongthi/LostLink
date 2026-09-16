import test from 'node:test'
import assert from 'node:assert/strict'
import { filterModeratorNotifications, markAllNotificationsRead, markNotificationRead, toggleNotificationPin, unreadNotificationCount } from './moderatorNotifications.js'

const notifications = [
  { id: 'a', type: 'review', title: 'Duyệt bài', body: 'Có bài mới', createdAt: '2026-09-16T10:00:00Z', unread: true, pinned: false },
  { id: 'b', type: 'admin', title: 'Tin nhắn admin', body: 'Rà soát escalation', createdAt: '2026-09-16T09:00:00Z', unread: false, pinned: true },
]

test('notification filters combine unread, type and search without mutating source', () => {
  const result = filterModeratorNotifications(notifications, { filter: 'unread', type: 'review', query: 'bài' })
  assert.deepEqual(result.map((notification) => notification.id), ['a'])
  assert.equal(notifications[0].pinned, false)
})

test('notification filters support an inclusive date range', () => {
  assert.deepEqual(filterModeratorNotifications(notifications, { from: '2026-09-16', to: '2026-09-16' }).map((notification) => notification.id), ['b', 'a'])
  assert.deepEqual(filterModeratorNotifications(notifications, { from: '2026-09-17' }), [])
})

test('notification read and pin actions update only the selected item', () => {
  const state = { notifications }
  const readState = markNotificationRead(state, 'a')
  const pinnedState = toggleNotificationPin(readState, 'a')
  assert.equal(unreadNotificationCount(readState.notifications), 0)
  assert.equal(pinnedState.notifications[0].pinned, true)
  assert.equal(pinnedState.notifications[1].pinned, true)
})

test('mark all notifications read clears the unread count', () => {
  assert.equal(unreadNotificationCount(markAllNotificationsRead({ notifications }).notifications), 0)
})
