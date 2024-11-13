// src/components/layout/Header/SearchBar.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { useDebounce } from "@/hooks/useDebounce";
import { searchRaces } from "@/services/race";

interface SearchBarProps {
  className?: string;
  autoFocus?: boolean;
  onClose?: () => void;
}

export function SearchBar({ className, autoFocus, onClose }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (debouncedQuery) {
      const search = async () => {
        const data = await searchRaces(debouncedQuery);
        setResults(data.slice(0, 5));
        setIsOpen(true);
      };
      search();
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={inputRef}>
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索赛事..."
          className="pl-10 pr-10"
          autoFocus={autoFocus}
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              onClose?.();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <XIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 max-h-[300px] overflow-auto rounded-md bg-white p-2 shadow-lg">
          {results.map((result) => (
            <button
              key={result.id}
              className="w-full rounded-md p-2 text-left hover:bg-gray-100"
              onClick={() => {
                router.push(`/races/${result.id}`);
                setQuery("");
                setIsOpen(false);
                onClose?.();
              }}
            >
              <div className="font-medium">{result.title}</div>
              <div className="text-sm text-gray-500">
                {result.date} · {result.location}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// src/components/layout/Header/UserMenu.tsx
("use client");

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  UserIcon,
  BookmarkIcon,
  HeartIcon,
  SettingsIcon,
  LogOutIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UserMenuProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center space-x-3 rounded-full">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || ""}
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
            <UserIcon className="h-5 w-5 text-primary-600" />
          </div>
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-2">
            {/* User Info */}
            <div className="px-3 py-2">
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-gray-500">{user.email}</div>
            </div>

            <div className="border-t my-1" />

            {/* Menu Items */}
            <MenuLink href="/profile" icon={UserIcon}>
              个人主页
            </MenuLink>
            <MenuLink href="/bookmarks" icon={BookmarkIcon}>
              我的收藏
            </MenuLink>
            <MenuLink href="/following" icon={HeartIcon}>
              关注赛事
            </MenuLink>
            <MenuLink href="/settings" icon={SettingsIcon}>
              账号设置
            </MenuLink>

            <div className="border-t my-1" />

            <Menu.Item>
              {({ active }) => (
                <button
                  className={cn(
                    "w-full flex items-center px-3 py-2 text-sm rounded-md",
                    active ? "bg-gray-100" : ""
                  )}
                  onClick={() => signOut()}
                >
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  退出登录
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function MenuLink({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          href={href}
          className={cn(
            "flex items-center px-3 py-2 text-sm rounded-md",
            active ? "bg-gray-100" : ""
          )}
        >
          <Icon className="mr-2 h-4 w-4" />
          {children}
        </Link>
      )}
    </Menu.Item>
  );
}
