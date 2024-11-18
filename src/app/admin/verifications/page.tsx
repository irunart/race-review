import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export default async function VerificationRequestsPage() {
  const session = await getServerSession();
  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/auth/signin');
  }

  const requests = await prisma.verificationRequest.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const columns = [
    {
      header: '申请人',
      accessorKey: 'user.name',
      cell: ({ row }: any) => (
        <div>
          <div>{row.original.user.name}</div>
          <div className="text-sm text-gray-500">{row.original.user.email}</div>
        </div>
      ),
    },
    {
      header: '真实姓名',
      accessorKey: 'realName',
    },
    {
      header: '状态',
      accessorKey: 'status',
      cell: ({ row }: any) => {
        const status = row.original.status;
        const colors = {
          PENDING: 'yellow',
          APPROVED: 'green',
          REJECTED: 'red',
        };
        const labels = {
          PENDING: '待审核',
          APPROVED: '已通过',
          REJECTED: '已拒绝',
        };
        return (
          <Badge color={colors[status]}>
            {labels[status]}
          </Badge>
        );
      },
    },
    {
      header: '提交时间',
      accessorKey: 'createdAt',
      cell: ({ row }: any) => format(
        new Date(row.original.createdAt),
        'yyyy年M月d日 HH:mm',
        { locale: zhCN }
      ),
    },
    {
      header: '操作',
      id: 'actions',
      cell: ({ row }: any) => {
        const status = row.original.status;
        if (status !== 'PENDING') return null;
        
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="success"
              onClick={() => handleVerification(row.original.id, 'APPROVED')}
            >
              通过
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => handleVerification(row.original.id, 'REJECTED')}
            >
              拒绝
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">用户认证申请</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => window.location.reload()}>
            刷新
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <DataTable
          columns={columns}
          data={requests}
          pagination
          search
          searchPlaceholder="搜索申请人..."
        />
      </div>
    </div>
  );
}

async function handleVerification(id: string, status: 'APPROVED' | 'REJECTED') {
  'use server';
  
  try {
    const request = await prisma.verificationRequest.update({
      where: { id },
      data: { status },
      include: {
        user: true,
      },
    });

    if (status === 'APPROVED') {
      // Update user's verified status
      await prisma.user.update({
        where: { id: request.userId },
        data: { isVerifiedRunner: true },
      });

      // Create achievement for becoming verified
      await prisma.achievement.create({
        data: {
          userId: request.userId,
          type: 'VERIFIED_RUNNER',
          date: new Date(),
          metadata: {
            verificationId: id,
          },
        },
      });
    }

    // TODO: Send notification to user about verification result
  } catch (error) {
    console.error('Error handling verification:', error);
    throw new Error('处理认证申请失败');
  }
}
