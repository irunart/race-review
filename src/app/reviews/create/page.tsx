"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ReviewService } from "@/services/review/reviewService";

export default function CreateReviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const raceId = searchParams.get("raceId");

  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!raceId) {
    return <div>Invalid race ID</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const reviewService = new ReviewService();
      await reviewService.createReview({
        raceId,
        content,
        rating: {
          difficulty: rating,
          supplies: rating,
          organization: rating,
          transportation: rating,
          valueForMoney: rating,
          scenery: rating,
          volunteerService: rating,
        },
        userId: "1", // In MVP, we'll use a mock user ID
        userBadges: [],
        isVerified: false,
      });

      router.push(`/races/${raceId}`);
    } catch (error) {
      console.error(error);
      alert("提交失败，请重试");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">写评价</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">总体评分</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full p-2 border rounded"
          >
            {[5, 4, 3, 2, 1].map((value) => (
              <option key={value} value={value}>
                {value} 星
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">评价内容</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded h-32"
            placeholder="分享你的参赛体验..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 bg-primary text-white rounded disabled:opacity-50"
        >
          {isSubmitting ? "提交中..." : "提交评价"}
        </button>
      </form>
    </div>
  );
}
