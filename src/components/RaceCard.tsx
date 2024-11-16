import Link from "next/link";
import { Race } from "@prisma/client";
import { Badge } from "./ui/Badge";

interface Props {
  race: Race & {
    _count: {
      reviews: number;
    };
  };
}

export default function RaceCard({ race }: Props) {
  return (
    <Link href={`/races/${race.id}`}>
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{race.name}</h2>
          <p className="text-gray-600 mb-2">{race.location}</p>

          <div className="flex gap-2 mb-3">
            <Badge>{race.distance}km</Badge>
            <Badge variant={race.difficulty >= 4 ? "warning" : "default"}>
              难度 {race.difficulty}/5
            </Badge>
          </div>

          <p className="text-gray-700 line-clamp-2">{race.description}</p>

          <div className="mt-4 text-sm text-gray-500">
            <span>{new Date(race.date).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>{race._count.reviews} 条评价</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
