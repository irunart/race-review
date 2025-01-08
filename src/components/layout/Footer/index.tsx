"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/Logo";

export function Footer({ className }: { className?: string }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("bg-white border-t", className)}>
      <div className="container mx-auto px-4 py-4">
        <div>
          <p className="text-center text-sm text-gray-600">
            {currentYear} RaceReview. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
