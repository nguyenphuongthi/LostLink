import Home from './Home'

// Tin hot gần đây — giao diện y hệt Trang chủ, chỉ đổi tiêu đề và xếp feed theo
// độ nóng: nhiều lượt xem + nhiều lượt thích (lượt thích nhân trọng số).
const hotScore = (p) => (p.views || 0) + (p.likeBase || 0) * 20

export default function Trending() {
  return <Home heading="Tin hot gần đây" sortPosts={(a, b) => hotScore(b) - hotScore(a)} />
}
