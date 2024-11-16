interface Props {
  userCount: number;
  raceCount: number;
  reviewCount: number;
  pendingReviews: number;
}

export default function AdminStats({
  userCount,
  raceCount,
  reviewCount,
  pendingReviews,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">用户总数</h3>
        <p className="text-2xl font-semibold">{userCount}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">赛事总数</h3>
        <p className="text-2xl font-semibold">{raceCount}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">评论总数</h3>
        <p className="text-2xl font-semibold">{reviewCount}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">待审核评论</h3>
        <p className="text-2xl font-semibold text-orange-500">
          {pendingReviews}
        </p>
      </div>
    </div>
  );
}
