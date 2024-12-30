import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import ProfileForm from "@/components/features/ProfileForm";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      image: true,
      _count: {
        select: {
          reviews: true,
          createdRaces: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">个人资料</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <ProfileForm user={user} />
        </div>

        <div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-semibold mb-4">统计信息</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>评论数</span>
                <span>{user._count.reviews}</span>
              </div>
              <div className="flex justify-between">
                <span>创建的赛事</span>
                <span>{user._count.createdRaces}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
