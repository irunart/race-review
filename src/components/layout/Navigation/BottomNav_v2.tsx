export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="grid grid-cols-4 h-14">
        <NavItem href="/" icon={<HomeIcon />} label="首页" />
        <NavItem href="/races" icon={<RaceIcon />} label="赛事" />
        <NavItem href="/reviews" icon={<ReviewIcon />} label="评论" />
        <NavItem href="/me" icon={<UserIcon />} label="我的" />
      </div>
    </nav>
  );
}
