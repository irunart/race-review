import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-800 hover:bg-gray-200",
        success: "bg-green-100 text-green-800 hover:bg-green-200",
        warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
        error: "bg-red-100 text-red-800 hover:bg-red-200",
      },
      clickable: {
        true: "cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      clickable: false,
    },
  }
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Badge({ 
  children, 
  variant, 
  clickable, 
  className, 
  onClick 
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, clickable }), className)}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
