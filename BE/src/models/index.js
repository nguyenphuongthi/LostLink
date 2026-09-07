// index.js — Điểm gom toàn bộ Mongoose model của LostLink.
// Dùng: const { User, Post, ... } = require('./models')

module.exports = {
  // Người dùng & uy tín
  User: require('./User'),
  Badge: require('./Badge'),
  EmailToken: require('./EmailToken'),

  // Danh mục
  Category: require('./Category'),

  // Bài đăng
  Post: require('./Post'),
  VerificationChallenge: require('./VerificationChallenge'),

  // Ghép cặp & giao dịch
  MatchSuggestion: require('./MatchSuggestion'),
  Claim: require('./Claim'),
  VerificationAttempt: require('./VerificationAttempt'),
  Conversation: require('./Conversation'),
  Message: require('./Message'),
  Review: require('./Review'),

  // Cộng đồng & vận hành
  Comment: require('./Comment'),
  Notification: require('./Notification'),
  GeofenceSubscription: require('./GeofenceSubscription'),
  Report: require('./Report'),
  EscalationTicket: require('./EscalationTicket'),
  AuditLog: require('./AuditLog'),
  SystemConfig: require('./SystemConfig'),
}
