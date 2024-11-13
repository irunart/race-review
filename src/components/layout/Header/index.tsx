import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/Button";
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
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="h-8 w-8" />
              <span className="hidden font-bold sm:inline-block">
                RaceReview
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
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
            </nav>
          </div>

          {/* Desktop Search & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <SearchBar className="w-[300px]" />
            {session ? (
              <UserMenu user={session.user} />
            ) : (
              <div className="space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/auth/signin">登录</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/signup">注册</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <SearchIcon className="h-5 w-5" />
            </button>
            <MobileMenu session={session} />
          </div>
        </div>
      </div>

      {/* Mobile Search Dialog */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center space-x-2">
              <button onClick={() => setIsSearchOpen(false)} className="p-2">
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
              <SearchBar
                className="flex-1"
                autoFocus
                onClose={() => setIsSearchOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
