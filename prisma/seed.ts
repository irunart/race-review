import { PrismaClient } from "@prisma/client";
import pkg from "bcryptjs";
const { hash } = pkg;
const prisma = new PrismaClient();

async function main() {
  // 创建管理员用户
  const adminPassword = await hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // 创建示例赛事
  const race = await prisma.race.create({
    data: {
      raceId: "2025145119", // 使用一个示例ID
      name: "2025普洱思茅马拉松",
      location: "云南省/普洱市/思茅区",
      date: new Date("2025-01-12"),
      raceGrade: "A (A1)",
      raceItems: ["全程", "半程", "5公里"],
      raceScale: "20000人",
      source: "中国马拉松",
      sourceUrl: "https://www.runchina.org.cn/portal/zh-CN/races/2025145119",
      lastUpdated: new Date(),
      createdAt: new Date(),
    },
  });

  // 创建天气历史记录
  await prisma.weatherHistory.create({
    data: {
      raceId: race.raceId,
      date: new Date("2025-01-12"),
      temperature: 18.5,
      humidity: 65.0,
      windSpeed: 3.2,
      conditions: "晴朗",
    },
  });

  // 创建示例评论
  await prisma.review.create({
    data: {
      raceId: race.raceId,
      userId: admin.id,
      rating: 4,
      content: "赛道风景优美，组织有序，值得参加！",
      isVerified: true,
    },
  });

  console.log({
    admin,
    race,
    message: "Seed data created successfully",
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
