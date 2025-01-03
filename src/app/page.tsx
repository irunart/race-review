import { prisma } from "@/lib/db/prisma";
import RaceCard from "@/components/RaceCard";
import SearchBar from "@/components/SearchBar";

export default async function Home() {
  const races = await prisma.race.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { reviews: true },
      },
    },
  });

  return (
    <main className="container mx-auto px-4 py-8">
      
      <SearchBar />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {races.map((race) => (
          <RaceCard key={race.raceId} race={race} />
        ))}
      </div>
    </main>
  );
}
