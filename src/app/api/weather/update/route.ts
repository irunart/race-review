import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { WeatherService } from '@/lib/services/weather';
import { getServerSession } from 'next-auth';

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { raceId } = await request.json();
    if (!raceId) {
      return new NextResponse('Race ID is required', { status: 400 });
    }

    const race = await prisma.race.findUnique({
      where: { raceId },
    });

    if (!race) {
      return new NextResponse('Race not found', { status: 404 });
    }

    await WeatherService.updateRaceWeather(race);

    return new NextResponse('Weather data updated successfully', { status: 200 });
  } catch (error) {
    console.error('Error updating weather data:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Cron job to update weather data for upcoming races
export async function GET() {
  try {
    const now = new Date();
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    // Get all races in the next 7 days
    const upcomingRaces = await prisma.race.findMany({
      where: {
        date: {
          gte: now,
          lte: weekFromNow,
        },
      },
    });

    // Update weather for each race
    const updates = upcomingRaces.map(race => WeatherService.updateRaceWeather(race));
    await Promise.all(updates);

    return new NextResponse('Weather data updated for upcoming races', { status: 200 });
  } catch (error) {
    console.error('Error updating weather data for upcoming races:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
