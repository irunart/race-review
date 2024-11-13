import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/",
    label: "首页",
    icon: HomeIcon,
  },
  {
    href: "/races",
    label: "赛事",
    icon: FlagIcon,
  },
  {
    href: "/reviews",
    label: "评论",
    icon: ChatIcon,
  },
  {
    href: "/me",
    label: "我的",
    icon: UserIcon,
  },
];

export function BottomNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-white border-t py-2",
        className
      )}
    >
      <div className="grid grid-cols-4 h-14">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center space-y-1",
                isActive ? "text-primary-600" : "text-gray-600"
              )}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
