import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';

const verificationSchema = z.object({
  // 身份证信息
  idNumber: z.string().length(18),
  realName: z.string().min(2),
  
  // 跑步成绩证明
  raceResults: z.array(z.object({
    raceName: z.string(),
    raceDate: z.string(),
    finishTime: z.string(),
    certificateUrl: z.string().url(),
  })).min(1),
  
  // 社交媒体账号（可选）
  socialMedia: z.object({
    platform: z.enum(['STRAVA', 'WEIBO', 'WECHAT']),
    profileUrl: z.string().url(),
  }).optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: '请先登录' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validatedData = verificationSchema.parse(body);

    // 检查是否已经提交过验证申请
    const existingVerification = await prisma.verificationRequest.findFirst({
      where: {
        userId: session.user.id,
        status: 'PENDING',
      },
    });

    if (existingVerification) {
      return NextResponse.json(
        { error: '您已有一个正在处理的验证申请' },
        { status: 400 }
      );
    }

    // 创建验证申请
    const verificationRequest = await prisma.verificationRequest.create({
      data: {
        userId: session.user.id,
        idNumber: validatedData.idNumber,
        realName: validatedData.realName,
        raceResults: validatedData.raceResults,
        socialMedia: validatedData.socialMedia,
        status: 'PENDING',
      },
    });

    // 发送通知给管理员（可以通过邮件或站内消息）
    // await notifyAdmins(verificationRequest.id);

    return NextResponse.json({
      message: '验证申请已提交，我们将在3个工作日内审核',
      requestId: verificationRequest.id,
    });

  } catch (error) {
    console.error('User verification error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '提交的数据格式有误', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: '验证申请提交失败' },
      { status: 500 }
    );
  }
}

// 获取验证状态
export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: '请先登录' },
        { status: 401 }
      );
    }

    const verificationRequest = await prisma.verificationRequest.findFirst({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!verificationRequest) {
      return NextResponse.json({
        isVerified: false,
        status: null,
      });
    }

    return NextResponse.json({
      isVerified: verificationRequest.status === 'APPROVED',
      status: verificationRequest.status,
      requestId: verificationRequest.id,
      submittedAt: verificationRequest.createdAt,
    });

  } catch (error) {
    console.error('Verification status check error:', error);
    return NextResponse.json(
      { error: '获取验证状态失败' },
      { status: 500 }
    );
  }
}
