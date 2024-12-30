import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <Link href="/" className={cn('flex items-center space-x-2', className)}>
      <div className="relative flex items-center">
        {/* Logo Icon */}
        <div className="relative h-8 w-8">
          <div className="absolute inset-0 rounded-full bg-primary-500 opacity-20" />
          <div className="absolute inset-1 rounded-full bg-primary-500 opacity-40" />
          <div className="absolute inset-2 rounded-full bg-primary-500" />
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
            R
          </div>
        </div>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className="text-lg font-bold tracking-tight text-gray-900">
            Race Review
          </span>
          <span className="text-xs text-gray-500 -mt-1">
            赛事评价平台
          </span>
        </div>
      )}
    </Link>
  );
}
