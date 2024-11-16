import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import AdminStats from "@/components/admin/AdminStats";
import ScraperStatus from "@/components/admin/ScraperStatus";
import UserManagement from "@/components/admin/UserManagement";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/auth/login");
  }

  const stats = await prisma.$transaction([
    prisma.user.count(),
    prisma.race.count(),
    prisma.review.count(),
    prisma.review.count({ where: { isVerified: false } }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">管理后台</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <AdminStats
            userCount={stats[0]}
            raceCount={stats[1]}
            reviewCount={stats[2]}
            pendingReviews={stats[3]}
          />

          <ScraperStatus />
        </div>

        <div>
          <UserManagement />
        </div>
      </div>
    </div>
  );
}
