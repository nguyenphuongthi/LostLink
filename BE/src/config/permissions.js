// permissions.js — RBAC: quyền của từng role. Hậu tố :own = chỉ trên tài nguyên của mình.

const USER = [
  'post:create',
  'post:update:own',
  'post:delete:own',
  'comment:create',
  'comment:update:own',
  'comment:delete:own',
  'claim:create',
  'report:create',
  'review:create',
  'upload:create',
]

const MODERATOR = [
  ...USER,
  'post:update:any',
  'post:delete:any',
  'comment:delete:any',
  'claim:review',
  'report:review',
  'escalation:handle',
  'user:restrict',
]

const ROLE_PERMISSIONS = {
  user: USER,
  moderator: MODERATOR,
  admin: ['*'],
}

const hasPermission = (role, permission) => {
  const perms = ROLE_PERMISSIONS[role] || []
  return perms.includes('*') || perms.includes(permission)
}

// ABAC: được thao tác nếu có quyền :any, hoặc có quyền :own và là chủ tài nguyên.
const canActOn = (user, action, ownerId) =>
  hasPermission(user.role, `${action}:any`) ||
  (hasPermission(user.role, `${action}:own`) && String(ownerId) === String(user._id))

module.exports = { ROLE_PERMISSIONS, hasPermission, canActOn }
