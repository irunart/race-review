import { prisma } from "@/lib/db/prisma";

export interface SearchRaceResult {
  raceId: string;
  name: string;
  location: string;
  date: Date;
  distance: number;
  difficulty: number;
  suitableFor: string[];
}

export class RaceService {
  static async searchRaces(query: string): Promise<SearchRaceResult[]> {
    return await prisma.race.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { location: { contains: query } },
        ],
      },
      select: {
        raceId: true,
        name: true,
        location: true,
        date: true,
        distance: true,
        difficulty: true,
        suitableFor: true,
      },
      take: 10,
      orderBy: { date: 'desc' },
    });
  }

  static async getRaceById(raceId: string) {
    return await prisma.race.findUnique({
      where: { raceId },
      include: {
        reviews: {
          include: {
            author: {
              select: {
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        weatherHistory: true,
      },
    });
  }

  static async getRacesByLocation(location: string) {
    return await prisma.race.findMany({
      where: {
        location: {
          contains: location,
        },
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  static async getUpcomingRaces() {
    const now = new Date();
    return await prisma.race.findMany({
      where: {
        date: {
          gte: now,
        },
      },
      orderBy: {
        date: 'asc',
      },
      take: 5,
    });
  }
}
