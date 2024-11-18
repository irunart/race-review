import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';

const reviewSchema = z.object({
  raceId: z.string(),
  trackDifficulty: z.number().min(1).max(5),
  supplies: z.number().min(1).max(5),
  organization: z.number().min(1).max(5),
  transportation: z.number().min(1).max(5),
  valueForMoney: z.number().min(1).max(5),
  scenery: z.number().min(1).max(5),
  volunteerService: z.number().min(1).max(5),
  content: z.string().min(50),
  tags: z.array(z.string())
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
    const validatedData = reviewSchema.parse(body);

    // Check if user has already reviewed this race
    const existingReview = await prisma.review.findFirst({
      where: {
        raceId: validatedData.raceId,
        userId: session.user.id,
      },
    });

    if (existingReview) {
      return NextResponse.json(
        { error: '您已经评价过这场赛事' },
        { status: 400 }
      );
    }

    // Create the review
    const review = await prisma.review.create({
      data: {
        raceId: validatedData.raceId,
        userId: session.user.id,
        rating: Math.round(
          (validatedData.trackDifficulty +
            validatedData.supplies +
            validatedData.organization +
            validatedData.transportation +
            validatedData.valueForMoney +
            validatedData.scenery +
            validatedData.volunteerService) / 7
        ),
        content: validatedData.content,
        // Store detailed ratings in a JSON field or separate table
        detailedRatings: {
          trackDifficulty: validatedData.trackDifficulty,
          supplies: validatedData.supplies,
          organization: validatedData.organization,
          transportation: validatedData.transportation,
          valueForMoney: validatedData.valueForMoney,
          scenery: validatedData.scenery,
          volunteerService: validatedData.volunteerService,
        },
        tags: validatedData.tags,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error('Review creation error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '提交的数据格式有误', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: '评价提交失败' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const raceId = searchParams.get('raceId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const where = raceId ? { raceId } : {};

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.review.count({ where }),
    ]);

    return NextResponse.json({
      reviews,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: page,
      },
    });
  } catch (error) {
    console.error('Review fetch error:', error);
    return NextResponse.json(
      { error: '获取评价失败' },
      { status: 500 }
    );
  }
}
