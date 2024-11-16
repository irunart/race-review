"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "../ui/Badge";

interface Review {
  id: string;
  content: string;
  createdAt: Date;
  userBadges: string[];
  isVerified: boolean;
  user: {
    name: string | null;
    image: string | null;
  };
}

interface Props {
  reviews: Review[];
  raceId: string;
}

export default function ReviewList({ reviews, raceId }: Props) {
  const [sortBy, setSortBy] = useState<"latest" | "verified">("latest");

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "verified" && a.isVerified !== b.isVerified) {
      return a.isVerified ? -1 : 1;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">参赛评价</h2>
        <div className="flex gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "latest" | "verified")}
            className="px-3 py-1 border rounded"
          >
            <option value="latest">最新</option>
            <option value="verified">已验证</option>
          </select>
          <Link
            href={`/reviews/create?raceId=${raceId}`}
            className="px-4 py-1 bg-primary text-white rounded hover:bg-primary-dark"
          >
            写评价
          </Link>
        </div>
      </div>

      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex items-center gap-3 mb-3">
              {review.user.image && (
                <img
                  src={review.user.image}
                  alt={review.user.name || "用户"}
                  className="w-10 h-10 rounded-full"
                />
              )}
              <div>
                <div className="font-medium">
                  {review.user.name || "匿名用户"}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-3">{review.content}</p>

            <div className="flex flex-wrap gap-2">
              {review.isVerified && <Badge variant="success">已验证参赛</Badge>}
              {review.userBadges.map((badge) => (
                <Badge key={badge}>{badge}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
