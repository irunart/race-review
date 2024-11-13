"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface MobileMenuProps {
  session: any;
}

export function MobileMenu({ session }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-gray-100 rounded-lg"
      >
        <MenuIcon className="h-5 w-5" />
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 lg:hidden"
          onClose={setIsOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 -translate-x-full"
            enterTo="opacity-100 translate-x-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 -translate-x-full"
          >
            <Dialog.Panel className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-lg">
              {/* Close button */}
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Menu content */}
              <div className="px-4 py-2">
                {session ? (
                  <div className="mb-6">
                    <Link
                      href="/profile"
                      className="flex items-center space-x-3 mb-4"
                      onClick={() => setIsOpen(false)}
                    >
                      {session.user.image ? (
                        <Image
                          src={session.user.image}
                          alt={session.user.name || ""}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <UserIcon className="h-6 w-6 text-primary-600" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium">{session.user.name}</div>
                        <div className="text-sm text-gray-500">
                          {session.user.email}
                        </div>
                      </div>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2 mb-6">
                    <Button asChild variant="outline" className="w-full">
                      <Link
                        href="/auth/signin"
                        onClick={() => setIsOpen(false)}
                      >
                        登录
                      </Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link
                        href="/auth/signup"
                        onClick={() => setIsOpen(false)}
                      >
                        注册
                      </Link>
                    </Button>
                  </div>
                )}

                <nav className="space-y-4">
                  <NavLink href="/races" onClick={() => setIsOpen(false)}>
                    浏览赛事
                  </NavLink>
                  <NavLink href="/reviews" onClick={() => setIsOpen(false)}>
                    评论
                  </NavLink>
                  <NavLink href="/community" onClick={() => setIsOpen(false)}>
                    社区
                  </NavLink>
                  <NavLink href="/events" onClick={() => setIsOpen(false)}>
                    线下活动
                  </NavLink>
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      className="block py-2 text-base font-medium text-gray-900 hover:text-primary-600"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
