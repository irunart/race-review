import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import { RunChinaScraper } from "@/lib/scraper/runChina";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const scraper = new RunChinaScraper();
  const results = {
    total: 0,
    success: 0,
    failed: 0,
  };

  try {
    const races = await scraper.getAllRaces();
    results.total = races.length;

    // 批量更新数据库
    for (const race of races) {
      try {
        await prisma.race.upsert({
          where: { raceId: race.raceId },
          update: race,
          create: race,
        });
        results.success++;
      } catch (error) {
        console.error(`Error saving race ${race.raceId}:`, error);
        results.failed++;
      }
    }

    return NextResponse.json({
      message: "Scraping completed",
      results,
    });
  } catch (error) {
    console.error("Scraping error:", error);
    return NextResponse.json({ error: "Scraping failed" }, { status: 500 });
  }
}
