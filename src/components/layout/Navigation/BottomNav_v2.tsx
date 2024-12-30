"use client";

import { Home, Flag, MessageSquare, User } from "lucide-react";
import Link from "next/link";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem = ({ href, icon, label }: NavItemProps) => (
  <Link href={href} className="flex flex-col items-center justify-center">
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </Link>
);

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="grid grid-cols-4 h-14">
        <NavItem href="/" icon={<Home />} label="首页" />
        <NavItem href="/races" icon={<Flag />} label="赛事" />
        <NavItem href="/reviews" icon={<MessageSquare />} label="评论" />
        <NavItem href="/me" icon={<User />} label="我的" />
      </div>
    </nav>
  );
}
