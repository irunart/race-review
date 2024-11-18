"use client";
import Link from "next/link";
import { Race } from "@prisma/client";
import { Badge } from "./ui/Badge";
// import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils/date";

// Omit the date field from Race to handle it separately
type BaseRace = Omit<Race, 'date'>;

// Extended race type to handle scraped data
interface ScrapedRace extends Partial<BaseRace> {
  raceId: string;
  name: string;
  date: string | Date;
  location?: string;
  distance?: number;
  difficulty?: number;
  description?: string;
  _count?: {
    reviews: number;
  };
}

interface Props {
  race: ScrapedRace;
}

export default function RaceCard({ race }: Props) {
  const formattedDate = formatDate(race.date, '日期待定');

  return (
    <Link href={`/races/${race.raceId}`} className="block">
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2 line-clamp-1">{race.name}</h2>
          {race.location && (
            <p className="text-gray-600 mb-2 line-clamp-1">{race.location}</p>
          )}

          <div className="flex flex-wrap gap-2 mb-3">
            {race.distance && (
              <Badge>{race.distance}km</Badge>
            )}
            {race.difficulty !== undefined && (
              <Badge variant={race.difficulty >= 4 ? "warning" : "default"}>
                难度 {race.difficulty}/5
              </Badge>
            )}
          </div>

          {race.description && (
            <p className="text-gray-700 line-clamp-2">{race.description}</p>
          )}

          <div className="mt-4 text-sm text-gray-500">
            <span>{formattedDate}</span>
            {race._count && (
              <>
                <span className="mx-2">•</span>
                <span>{race._count.reviews} 条评价</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
