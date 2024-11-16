import { RaceService } from "@/services/race/raceService";
import Link from "next/link";

interface Props {
  searchParams: {
    keyword?: string;
    difficulty?: string;
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const raceService = new RaceService();
  const races = await raceService.searchRaces({
    keyword: searchParams.keyword,
    difficulty: searchParams.difficulty
      ? Number(searchParams.difficulty)
      : undefined,
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">赛事搜索</h1>

        <form className="flex gap-4">
          <input
            type="text"
            name="keyword"
            defaultValue={searchParams.keyword}
            placeholder="搜索赛事名称或地点"
            className="flex-1 p-2 border rounded"
          />
          <select
            name="difficulty"
            defaultValue={searchParams.difficulty}
            className="p-2 border rounded"
          >
            <option value="">难度</option>
            <option value="1">简单</option>
            <option value="3">中等</option>
            <option value="5">困难</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded"
          >
            搜索
          </button>
        </form>
      </div>

      <div className="space-y-6">
        {races.length === 0 ? (
          <p className="text-center text-gray-500 py-8">未找到相关赛事</p>
        ) : (
          races.map((race) => (
            <Link
              key={race.id}
              href={`/races/${race.id}`}
              className="block p-4 border rounded hover:shadow-md"
            >
              <h2 className="text-xl font-semibold mb-2">{race.name}</h2>
              <p className="text-gray-600 mb-2">{race.location}</p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>{race.date.toLocaleDateString()}</span>
                <span>{race.distance}km</span>
                <span>难度: {race.difficulty}/5</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
