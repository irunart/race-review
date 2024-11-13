import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  // 需要认证的路由
  const authRoutes = [
    "/races/create",
    "/reviews/create",
    "/profile",
    "/settings",
  ];

  // 检查当前路由是否需要认证
  const isAuthRoute = authRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isAuthRoute && !token) {
    const url = new URL("/auth/signin", request.url);
    url.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/races/create/:path*",
    "/reviews/create/:path*",
    "/profile/:path*",
    "/settings/:path*",
  ],
};
