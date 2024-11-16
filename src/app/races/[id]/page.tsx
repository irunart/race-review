import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { RaceDifficultyRating } from "@/components/features/RaceDifficultyRating";
import { Badge } from "@/components/ui/Badge";
import ReviewList from "@/components/features/ReviewList";
import WeatherHistory from "@/components/features/WeatherHistory";
import RaceInfoSection from "@/components/features/RaceInfoSection";

interface Props {
  params: {
    id: string;
  };
}

export default async function RaceDetailPage({ params }: Props) {
  const race = await prisma.race.findUnique({
    where: { id: params.id },
    include: {
      weatherHistory: true,
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
