"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/Logo";

export function Footer({ className }: { className?: string }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("bg-white border-t", className)}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Social */}
          <div className="space-y-4">
            <Logo showText />
            <p className="text-sm text-gray-600">发现精彩赛事，分享跑步体验</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">关于我们</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">
                  平台介绍
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
                  联系我们
                </Link>
              </li>
              <li>
                <Link href="/join" className="text-sm text-gray-600 hover:text-gray-900">
                  加入我们
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">帮助中心</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-sm text-gray-600 hover:text-gray-900">
                  使用指南
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-600 hover:text-gray-900">
                  常见问题
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-sm text-gray-600 hover:text-gray-900">
                  意见反馈
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">法律信息</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                  服务条款
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                  隐私政策
                </Link>
              </li>
              <li>
                <Link href="/copyright" className="text-sm text-gray-600 hover:text-gray-900">
                  版权声明
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8">
          <p className="text-center text-sm text-gray-600">
            {currentYear} RaceReview. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
