import { prisma } from '@/lib/db/prisma';
import { Prisma } from '@prisma/client';

export interface SearchRaceResult {
  raceId: string;
  name: string;
  location: string;
  date: Date;
  distance: number;
  raceGrade: string;
  raceItems: string[];
}

export async function searchRaces(query: string): Promise<SearchRaceResult[]> {
  const races = await prisma.race.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { location: { contains: query, mode: 'insensitive' } },
        { raceGrade: { contains: query, mode: 'insensitive' } },
        { raceItems: { hasSome: [query] } },
      ],
    },
    select: {
      raceId: true,
      name: true,
      location: true,
      date: true,
      distance: true,
      raceGrade: true,
      raceItems: true,
    },
    orderBy: {
      date: 'desc',
    },
  });

  return races;
}

export async function getRaceById(raceId: string) {
  const race = await prisma.race.findUnique({
    where: { raceId },
    include: {
      reviews: {
        include: {
          user: {
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
      weatherHistory: {
        orderBy: {
          date: 'desc',
        },
        take: 1,
      },
    },
  });

  return race;
}

export async function getUpcomingRaces(limit = 5) {
  const now = new Date();
  return prisma.race.findMany({
    where: {
      date: {
        gte: now,
      },
    },
    orderBy: {
      date: 'asc',
    },
    take: limit,
    include: {
      weatherHistory: {
        orderBy: {
          date: 'desc',
        },
        take: 1,
      },
    },
  });
}

export async function getPopularRaces(limit = 5) {
  return prisma.race.findMany({
    orderBy: {
      reviews: {
        _count: 'desc',
      },
    },
    take: limit,
    include: {
      reviews: {
        select: {
          rating: true,
        },
      },
      weatherHistory: {
        orderBy: {
          date: 'desc',
        },
        take: 1,
      },
    },
  });
}

export async function getRacesByLocation(location: string, limit = 10) {
  return prisma.race.findMany({
    where: {
      location: {
        contains: location,
        mode: 'insensitive',
      },
    },
    orderBy: {
      date: 'desc',
    },
    take: limit,
    include: {
      weatherHistory: {
        orderBy: {
          date: 'desc',
        },
        take: 1,
      },
    },
  });
}

export async function getRacesByDistance(distance: number, tolerance = 5) {
  return prisma.race.findMany({
    where: {
      distance: {
        gte: distance - tolerance,
        lte: distance + tolerance,
      },
    },
    orderBy: {
      date: 'desc',
    },
    include: {
      weatherHistory: {
        orderBy: {
          date: 'desc',
        },
        take: 1,
      },
    },
  });
}

export async function getRaceStats() {
  const stats = await prisma.$transaction([
    prisma.race.count(),
    prisma.race.count({
      where: {
        date: {
          gte: new Date(),
        },
      },
    }),
    prisma.review.aggregate({
      _avg: {
        rating: true,
      },
    }),
  ]);

  return {
    totalRaces: stats[0],
    upcomingRaces: stats[1],
    averageRating: stats[2]._avg.rating || 0,
  };
}

export type CreateRaceInput = Prisma.RaceCreateInput;
export type UpdateRaceInput = Prisma.RaceUpdateInput;

export async function createRace(data: CreateRaceInput) {
  return prisma.race.create({
    data,
  });
}

export async function updateRace(raceId: string, data: UpdateRaceInput) {
  return prisma.race.update({
    where: { raceId },
    data,
  });
}

export async function deleteRace(raceId: string) {
  return prisma.race.delete({
    where: { raceId },
  });
}
