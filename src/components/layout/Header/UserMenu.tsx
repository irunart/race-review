"use client";

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
