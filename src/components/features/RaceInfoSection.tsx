import { Badge } from "../ui/Badge";
import Link from "next/link";

interface Props {
  race: {
    distance: number;
    suitableFor: string[];
    equipmentSuggestions: string[];
    accommodationInfo?: string | null;
    transportInfo?: string | null;
  };
}

export default function RaceInfoSection({ race }: Props) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg space-y-6">
      <div>
        <h3 className="font-semibold mb-2">基本信息</h3>
        <Badge>{race.distance}km</Badge>
      </div>

      <div>
        <h3 className="font-semibold mb-2">适合人群</h3>
        <div className="flex flex-wrap gap-2">
          {race.suitableFor.map((item) => (
            <Badge key={item} variant="success">
              {item}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">建议装备</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          {race.equipmentSuggestions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {race.accommodationInfo && (
        <div>
          <h3 className="font-semibold mb-2">住宿信息</h3>
          <p className="text-gray-600">{race.accommodationInfo}</p>
        </div>
      )}

      {race.transportInfo && (
        <div>
          <h3 className="font-semibold mb-2">交通信息</h3>
          <p className="text-gray-600">{race.transportInfo}</p>
        </div>
      )}

      <Link
        href={`/reviews/create?raceId=${race.id}`}
        className="block w-full text-center py-2 bg-primary text-white rounded-lg hover:bg-primary-dark mt-6"
      >
        写评价
      </Link>
    </div>
  );
}
