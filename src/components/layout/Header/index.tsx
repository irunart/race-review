"use client";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./SearchBar";
import { UserMenu } from "./UserMenu";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const { data: session } = useSession();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Desktop Nav */}
          <div className="flex items-center space-x-8">
            <Logo showText className="hidden sm:flex" />
            <Logo showText={false} className="sm:hidden" />

            {/* <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/races"
                className="text-sm font-medium text-gray-700 hover:text-primary-600"
              >
                赛事
              </Link>
              <Link
                href="/reviews"
                className="text-sm font-medium text-gray-700 hover:text-primary-600"
              >
                评论
              </Link>
              <Link
                href="/community"
                className="text-sm font-medium text-gray-700 hover:text-primary-600"
              >
                社区
              </Link>
            </nav> */}
          </div>

          {/* Desktop Search & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <SearchBar className="w-64" />
            {session ? (
              <UserMenu user={session.user} />
            ) : (
              <Button asChild variant="primary">
                <Link href="/auth/signin">登录</Link>
              </Button>
            )}
          </div>

          {/* Mobile Search & Menu */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <span className="sr-only">搜索</span>
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <MobileMenu session={session} />
          </div>
        </div>
      </div>

      {/* Mobile Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-white p-4 md:hidden">
          <div className="flex items-center justify-between">
            <SearchBar
              className="flex-1"
              autoFocus
              onClose={() => setIsSearchOpen(false)}
            />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="ml-2 p-2 text-gray-500 hover:text-gray-700"
            >
              <span className="sr-only">关闭</span>
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
