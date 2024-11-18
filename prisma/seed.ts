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
      location: "22.783333,100.966667", // 使用经纬度格式
      date: new Date("2025-01-12"),
      distance: 42.195, // 全程马拉松距离
      elevation: 350, // 示例海拔变化
      terrain: "ROAD",
      technicalLevel: 2,
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
      humidity: 65,
      windSpeed: 3.2,
      conditions: "Clear",
      rainfall: 0,
      visibility: 10,
      pressure: 1013.25,
    },
  });

  // 创建示例评论
  await prisma.review.create({
    data: {
      id: "example-review-1",
      raceId: race.raceId,
      userId: admin.id,
      rating: 4.5,
      title: "很好的赛事体验",
      content: "赛道规划合理，补给充足，志愿者服务热情。适合新手参加的马拉松赛事。",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log("Seed data created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
