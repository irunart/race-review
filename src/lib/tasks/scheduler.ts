import { CronJob } from "cron";
import { RunChinaScraper } from "../scraper/runChina.ts";
import { prisma } from "../db/prisma.ts";
import { sendNotification } from "../utils/notification.ts";

export async function updateRaces() {
  console.log("Starting race data update:", new Date().toISOString());

  const scraper = new RunChinaScraper();
  const results = {
    total: 0,
    success: 0,
    failed: 0,
    newRaces: 0,
    updatedRaces: 0,
  };

  try {
    const races = await scraper.getAllRaces();
    results.total = races.length;

    for (const race of races) {
      try {
        const existing = await prisma.race.findUnique({
          where: { raceId: race.raceId.toString() },
        });

        if (existing) {
          await prisma.race.update({
            where: { raceId: race.raceId.toString() },
            data: race,
          });
          results.updatedRaces++;
        } else {
          await prisma.race.create({
            data: race,
          });
          results.newRaces++;
        }
        results.success++;
      } catch (error) {
        console.error(`Error saving race ${race.raceId}:`, error);
        results.failed++;
      }
    }

    // 记录爬虫执行记录
    await prisma.scraperLog.create({
      data: {
        source: "中国马拉松",
        totalRaces: results.total,
        successCount: results.success,
        failedCount: results.failed,
        newRaces: results.newRaces,
        updatedRaces: results.updatedRaces,
        status: "SUCCESS",
      },
    });

    // 发送通知
    await sendNotification({
      title: "赛事数据更新完成",
      message: `
        总数: ${results.total}
        成功: ${results.success}
        失败: ${results.failed}
        新增: ${results.newRaces}
        更新: ${results.updatedRaces}
      `,
    });
  } catch (error) {
    console.error("Race update failed:", error);

    // 记录失败日志
    await prisma.scraperLog.create({
      data: {
        source: "中国马拉松",
        status: "FAILED",
        error: error instanceof Error ? error.message : String(error),
      },
    });

    // 发送失败通知
    await sendNotification({
      title: "赛事数据更新失败",
      message: error,
    });
  }
}
