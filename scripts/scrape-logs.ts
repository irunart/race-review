import { prisma } from "../src/lib/db/prisma";

async function showLogs() {
  const logs = await prisma.scraperLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  console.log("Recent Scraper Logs:");
  console.log("-------------------");

  logs.forEach((log) => {
    console.log(`
Time: ${log.createdAt.toLocaleString()}
Source: ${log.source}
Status: ${log.status}
${
  log.status === "SUCCESS"
    ? `
Total: ${log.totalRaces}
Success: ${log.successCount}
Failed: ${log.failedCount}
New: ${log.newRaces}
Updated: ${log.updatedRaces}
`
    : `Error: ${log.error}`
}
-------------------
    `);
  });
}

showLogs().catch(console.error);
