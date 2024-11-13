export default function TopNav() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold">
            RaceReview
          </Link>
          <SearchBar className="hidden md:block" />
        </div>

        {/* 桌面端导航 */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/races">赛事</Link>
          <Link href="/reviews">评论</Link>
          <Link href="/community">社区</Link>
          <UserMenu />
        </div>
      </nav>
    </header>
  );
}
