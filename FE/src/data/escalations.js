const DAY = 24 * 60 * 60 * 1000

// Local UI fixtures. No emails or account/post changes are sent to the backend.
export function createEscalationState(now = Date.now()) {
  const ago = (days) => new Date(now - days * DAY).toISOString()
  const examples = [
    { id: 401, matchId: 'M-1201', item: 'Ví da nam màu nâu', category: 'Ví / Giấy tờ', age: 36, transaction: true, chat: true, meeting: 'Cổng chính Đại học Bách Khoa', lostConfirmed: true, foundConfirmed: false, lostName: 'Minh Anh', foundName: 'Hoàng Nam' },
    { id: 402, matchId: 'M-1202', item: 'Điện thoại iPhone 13 màu xanh', category: 'Đồ điện tử', age: 7, chat: false, lostName: 'Thu Linh', foundName: 'Minh Khôi' },
    { id: 403, matchId: 'M-1203', item: 'Chùm chìa khóa có móc gấu', category: 'Chìa khóa', age: 43, transaction: true, chat: true, meeting: 'Quầy bảo vệ Crescent Mall', lostName: 'Bảo Trân', foundName: 'Đức Anh' },
    { id: 404, matchId: 'M-1204', item: 'Mèo tam thể đeo vòng cổ vàng', category: 'Thú cưng', age: 5, chat: true, lostName: 'Ngọc Khánh', foundName: 'Thảo My' },
    { id: 405, matchId: 'M-1205', item: 'Tai nghe AirPods Pro', category: 'Đồ điện tử', age: 32, transaction: true, chat: false, lostName: 'Quốc Huy', foundName: 'Thanh Thanh' },
    { id: 406, matchId: 'M-1206', item: 'Túi xách đen kèm giấy tờ', category: 'Ví / Giấy tờ', age: 9, chat: false, lostName: 'Phương Anh', foundName: 'Gia Bảo' },
    { id: 407, matchId: 'M-1207', item: 'Máy tính bảng iPad Air', category: 'Đồ điện tử', age: 31, transaction: true, chat: true, foundConfirmed: true, lostName: 'Tuấn Minh', foundName: 'Hải Yến' },
    { id: 408, matchId: 'M-1208', item: 'Ví nữ màu hồng nhạt', category: 'Ví / Giấy tờ', age: 4, chat: true, meeting: 'Sảnh thư viện', lostName: 'Mai Chi', foundName: 'Hữu Long' },
  ]
  return {
    tickets: examples.map((entry) => ({
      id: entry.id,
      matchId: entry.matchId,
      item: entry.item,
      category: entry.category,
      matchState: entry.transaction ? 'confirmed_both' : 'stale',
      createdAt: ago(entry.age + 2),
      lastActivityAt: ago(entry.age),
      transactionStartedAt: entry.transaction ? ago(entry.age) : null,
      chatOpenedAt: entry.chat ? ago(entry.age + 1) : null,
      meetingPoint: entry.meeting || '',
      state: 'open',
      verified: false,
      resolution: null,
      reminderCount: 0,
      lastRemindedAt: null,
      lost: { name: entry.lostName, email: `lost.${entry.id}@example.com`, postId: `L-${entry.id}`, title: `Tìm ${entry.item.toLowerCase()}`, confirmed: Boolean(entry.lostConfirmed), hidden: false, postStatus: entry.chat ? 'contacted' : 'searching' },
      found: { name: entry.foundName, email: `found.${entry.id}@example.com`, postId: `F-${entry.id}`, title: `Nhặt được ${entry.item.toLowerCase()}`, confirmed: Boolean(entry.foundConfirmed), hidden: false, postStatus: entry.chat ? 'contacted' : 'searching' },
    })),
    logs: [],
  }
}
