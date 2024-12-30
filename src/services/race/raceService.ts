import { prisma } from "@/lib/db/prisma";
import type { Race } from "@/models/race";

export class RaceService {
  async getRaceById(id: string) {
    return await prisma.race.findUnique({
      where: { id },
      include: {
        reviews: true,
        weatherHistory: true,
      },
    });
  }

  async searchRaces(params: {
    keyword?: string;
    difficulty?: number;
    suitableFor?: string[];
    location?: string;
  }) {
    return await prisma.race.findMany({
      where: {
        OR: [
          { name: { contains: params.keyword } },
          { location: { contains: params.location } },
        ],
        difficulty: params.difficulty,
        suitableFor: {
          hasAny: params.suitableFor,
        },
      },
    });
  }
}
