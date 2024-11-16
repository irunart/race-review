import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword");
  const difficulty = searchParams.get("difficulty");

  const races = await prisma.race.findMany({
    where: {
      OR: keyword
        ? [{ name: { contains: keyword } }, { location: { contains: keyword } }]
        : undefined,
      difficulty: difficulty ? Number(difficulty) : undefined,
    },
    include: {
      weatherHistory: true,
      _count: {
        select: { reviews: true },
      },
    },
  });

  return NextResponse.json(races);
}
