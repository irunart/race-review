import { prisma } from "@/lib/db/prisma";
import type { Review } from "@/models/review";

export class ReviewService {
  async createReview(data: Omit<Review, "id" | "createdAt">) {
    return await prisma.review.create({
      data: {
        ...data,
        createdAt: new Date(),
      },
    });
  }

  async getReviewsByRaceId(raceId: string) {
    return await prisma.review.findMany({
      where: { raceId },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
