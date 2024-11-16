import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
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
    return NextResponse.json({ error: "Race not found" }, { status: 404 });
  }

  return NextResponse.json(race);
}
