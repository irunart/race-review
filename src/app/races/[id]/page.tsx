import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { RaceDifficultyRating } from "@/components/features/RaceDifficultyRating";
import ReviewList from "@/components/features/ReviewList";
import WeatherHistory from "@/components/features/WeatherHistory";
import RaceInfoSection from "@/components/features/RaceInfoSection";
import { DetailedRatings } from "@/components/features/DetailedRatings/DetailedRatings";
import { RaceRecommendations } from "@/components/features/RaceRecommendations/RaceRecommendations";
import { RaceDifficultyGrade } from "@/components/features/RaceDifficultyGrade/RaceDifficultyGrade";
import { WeatherDisplay } from "@/components/features/WeatherDisplay/WeatherDisplay";

interface Props {
  params: {
    id: string;
  };
}

function isWeatherDataStale(updatedAt: Date) {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return updatedAt < oneDayAgo;
}

export default async function RaceDetailPage({ params }: Props) {
  const race = await prisma.race.findUnique({
    where: { raceId: params.id },
    include: {
      weatherHistory: {
        orderBy: { date: 'desc' },
        take: 1,
      },
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
          createdAt: "desc",
        },
      },
      creator: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  if (!race) {
    notFound();
  }

  // Ensure weather data is up to date
  if (!race.weatherHistory[0] || isWeatherDataStale(race.weatherHistory[0].updatedAt)) {
    await fetch(`/api/weather/update`, {
      method: 'POST',
      body: JSON.stringify({ raceId: race.id }),
    });
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 主要信息区 */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{race.name}</h1>
          <div className="flex items-center gap-2 text-gray-600 mb-6">
            <span>{race.location}</span>
            <span>•</span>
            <span>{new Date(race.date).toLocaleDateString()}</span>
          </div>

          <div className="prose max-w-none mb-8">
            <p>{race.description}</p>
          </div>

          <RaceDifficultyRating
            initialRatings={{
              elevation: race.difficulty,
              road: 0,
              technical: 0,
            }}
            readonly
          />

          <DetailedRatings reviews={race.reviews} />

          <RaceDifficultyGrade
            elevation={race.elevation}
            distance={race.distance}
            terrain={race.terrain}
            technicalLevel={race.technicalLevel}
            className="mb-8"
          />

          <RaceRecommendations
            race={race}
            weatherData={race.weatherHistory[0]}
          />

          <WeatherDisplay
            weather={race.weatherHistory[0]}
            showAdvice={true}
          />

          <WeatherHistory data={race.weatherHistory} />
        </div>

        {/* 侧边信息栏 */}
        <div>
          <RaceInfoSection race={race} />
        </div>
      </div>

      {/* 评论区 */}
      <div className="mt-12">
        <ReviewList reviews={race.reviews} raceId={race.id} />
      </div>
    </div>
  );
}
