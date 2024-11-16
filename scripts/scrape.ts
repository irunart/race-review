import { PrismaClient } from "@prisma/client";
import { updateRaces } from "../src/lib/tasks/scheduler";

const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const isForce = args.includes("--force");

const prisma = new PrismaClient();

async function main() {
  if (isDryRun) {
    console.log("Dry run mode - no data will be saved");
  }

  const lastLog = await prisma.scraperLog.findFirst({
    where: { status: "SUCCESS" },
    orderBy: { createdAt: "desc" },
  });

  // 检查上次成功运行时间，除非使用 --force
  if (!isForce && lastLog) {
    const hoursSinceLastRun =
      (Date.now() - lastLog.createdAt.getTime()) / (1000 * 60 * 60);
    if (hoursSinceLastRun < 24) {
      console.log(
        `Last successful run was ${hoursSinceLastRun.toFixed(1)} hours ago.`
      );
      console.log("Use --force to run anyway.");
      process.exit(0);
    }
  }

  await updateRaces();
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
