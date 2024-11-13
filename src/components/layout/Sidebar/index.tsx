import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
  items: {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

export function Sidebar({ className, items }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn("w-64 flex-shrink-0", className)}>
      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-md",
                isActive
                  ? "bg-primary-50 text-primary-600"
                  : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
              )}
            >
              <Icon
                className={cn(
                  "mr-3 flex-shrink-0 h-6 w-6",
                  isActive
                    ? "text-primary-600"
                    : "text-gray-400 group-hover:text-primary-600"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
