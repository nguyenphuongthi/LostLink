import test from 'node:test'
import assert from 'node:assert/strict'
import { createEscalationState } from '../data/escalations.js'
import { DAY, escalationGroup, actionUnavailable, filterEscalations, applyEscalationAction } from './escalations.js'

const now = Date.parse('2026-09-16T10:00:00Z')
const actor = 'moderator'
const reason = 'Checked the information from both parties.'
const act = (state, id, action, fields = {}) => applyEscalationAction(state, { id, action, actor, reason, now, ...fields })

test('queues use strict 3-day and 30-day thresholds', () => {
  const { tickets } = createEscalationState(now)
  const stale = tickets.find((ticket) => ticket.id === 402)
  const transaction = tickets.find((ticket) => ticket.id === 401)
  assert.equal(escalationGroup({ ...stale, lastActivityAt: new Date(now - 3 * DAY).toISOString() }, now), null)
  assert.equal(escalationGroup({ ...stale, lastActivityAt: new Date(now - 3 * DAY - 1).toISOString() }, now), 'stale')
  assert.equal(escalationGroup({ ...transaction, transactionStartedAt: new Date(now - 30 * DAY).toISOString() }, now), null)
  assert.equal(escalationGroup({ ...transaction, transactionStartedAt: new Date(now - 30 * DAY - 1).toISOString() }, now), 'overdue')
  assert.equal(escalationGroup({ ...transaction, lost: { ...transaction.lost, confirmed: true }, found: { ...transaction.found, confirmed: true } }, now), null)
})

test('queue filters combine group, chat, resolution and search', () => {
  const { tickets } = createEscalationState(now)
  assert.equal(filterEscalations(tickets, { state: 'open', group: 'stale' }, now).length, 4)
  assert.equal(filterEscalations(tickets, { state: 'open', group: 'overdue', chat: 'unopened' }, now)[0].id, 405)
  assert.equal(filterEscalations(tickets, { query: 'm-1201', chat: 'opened' }, now)[0].id, 401)
  assert.equal(filterEscalations(tickets, { query: 'no match' }, now).length, 0)
})

test('case A requires the time threshold, prior contact and offline evidence', () => {
  const state = createEscalationState(now)
  assert.throws(() => act(state, 401, 'returned'))
  assert.throws(() => act(state, 402, 'returned', { offlineConfirmed: true }))
  assert.throws(() => act(state, 405, 'returned', { offlineConfirmed: true }))
  assert.throws(() => act(state, 401, 'returned', { offlineConfirmed: true, reason: ' ' }))
  const returned = act(state, 401, 'returned', { offlineConfirmed: true })
  const ticket = returned.tickets.find((entry) => entry.id === 401)
  assert.equal(ticket.caseType, 'A')
  assert.equal(ticket.resolution, 'returned')
  assert.equal(ticket.lost.postStatus, 'returned')
  assert.equal(ticket.found.postStatus, 'returned')
  assert.ok(ticket.lost.confirmed && ticket.found.confirmed)
  assert.equal(filterEscalations(returned.tickets, { state: 'resolved', group: 'overdue' }, now).length, 1)
  assert.equal(filterEscalations(returned.tickets, { state: 'open' }, now).length, 7)
  assert.throws(() => act(returned, 401, 'incorrect'))
})

test('email reminder validates recipients and content and logs the simulation', () => {
  const state = createEscalationState(now)
  assert.throws(() => act(state, 402, 'remind', { subject: 'Reminder', message: 'Please confirm.' }))
  assert.throws(() => act(state, 402, 'remind', { targets: ['lost'], subject: '', message: 'Please confirm.' }))
  const result = act(state, 402, 'remind', { targets: ['lost', 'found'], subject: 'Reminder', message: 'Please confirm.' })
  assert.equal(result.tickets.find((ticket) => ticket.id === 402).reminderCount, 1)
  assert.equal(result.logs[0].detail.delivery, 'simulation')
  assert.equal(result.logs[0].detail.recipients.length, 2)
  assert.equal(result.logs[0].detail.subject, 'Reminder')
  assert.equal(result.logs[0].detail.message, 'Please confirm.')
})

test('verification, selected-post hiding and rejection each append an immutable audit entry', () => {
  const original = createEscalationState(now)
  const verified = act(original, 401, 'verify')
  assert.throws(() => act(verified, 401, 'verify'))
  assert.throws(() => act(verified, 401, 'hide', { targets: [] }))
  const hidden = act(verified, 401, 'hide', { targets: ['found'] })
  const hiddenTicket = hidden.tickets.find((ticket) => ticket.id === 401)
  assert.equal(hiddenTicket.lost.hidden, false)
  assert.equal(hiddenTicket.found.hidden, true)
  assert.ok(actionUnavailable(hiddenTicket, 'returned', now))
  assert.throws(() => act(hidden, 401, 'hide', { targets: ['found'] }))
  const rejected = act(hidden, 401, 'incorrect')
  const ticket = rejected.tickets.find((entry) => entry.id === 401)
  assert.equal(ticket.matchState, 'rejected')
  assert.equal(ticket.resolution, 'incorrect')
  assert.equal(ticket.lost.postStatus, 'searching')
  assert.equal(ticket.found.postStatus, 'searching')
  assert.equal(ticket.found.hidden, true)
  assert.equal(ticket.lost.confirmed, false)
  assert.equal(ticket.found.confirmed, false)
  assert.equal(rejected.logs.length, 3)
  assert.equal(new Set(rejected.logs.map((log) => log.id)).size, 3)
  for (const log of rejected.logs) {
    assert.equal(log.actor, actor)
    assert.equal(log.entityId, 401)
    assert.equal(log.createdAt, new Date(now).toISOString())
    assert.equal(log.detail.reason, reason)
    assert.notDeepEqual(log.before, log.after)
  }
  assert.equal(verified.logs[0].before.verified, false)
  assert.equal(verified.logs[0].after.found.hidden, false)
  assert.equal(original.logs.length, 0)
  assert.equal(original.tickets[0].verified, false)
})
