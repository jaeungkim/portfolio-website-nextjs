"use client";

import { Fragment, useCallback, useMemo, useState, useTransition } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Link } from "@/src/i18n/routing";
import LocaleSwitcher from "../LocaleSwitcher";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/resume" },
  { name: "Blog", href: "/blog" },
  // { name: "Project", href: "/project" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [_, startTransition] = useTransition();

  const themeButtonClass = useMemo(() => {
    const base =
      "cursor-pointer group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10";
    return theme === "dark"
      ? `${base} text-yellow-300 hover:text-yellow-500`
      : `${base} text-cyan-500 hover:text-cyan-700`;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    startTransition(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    });
  }, [theme, setTheme]);

  const toggleModal = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeModal = useCallback(() => {
    requestAnimationFrame(() => setIsOpen(false));
  }, []);

  const icon =
    theme === "dark" ? (
      <SunIcon className="w-5 h-5 text-yellow-400" />
    ) : (
      <MoonIcon className="w-5 h-5 text-blue-500" />
    );

  return (
    <header className="sticky top-0 z-40 bg-opacity-70 backdrop-blur py-4">
      <div className="w-full mx-auto max-w-7xl lg:px-8">
        <div className="relative px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex flex-1">
            <Link href="/" className="pointer-events-auto">
              <Image
                src="/images/ill_prof.jpeg"
                alt="profileLogo"
                width={36}
                height={36}
                priority
                className="h-10 w-10 rounded-full object-cover bg-zinc-100 dark:bg-zinc-800 shadow-lg ring-1 ring-zinc-900/5 dark:ring-white/10"
              />
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <div className="hidden md:flex md:flex-1 md:justify-center">
            <nav className="pointer-events-auto">
              <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    prefetch={false}
                    className="relative block px-3 py-2 transition hover:text-cyan-500 dark:hover:text-cyan-400"
                  >
                    {item.name}
                  </Link>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right: LocaleSwitcher, Theme Button, and Mobile Menu */}
          <div className="flex gap-2 justify-end flex-1">
            <LocaleSwitcher />

            <button
              type="button"
              onClick={toggleTheme}
              className={themeButtonClass}
            >
              {icon}
            </button>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={toggleModal}
                className="pointer-events-auto group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200"
              >
                Menu
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={toggleModal}>
          <TransitionChild
            as={Fragment}
            enter="transition-opacity ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto backdrop-blur bg-zinc-800/40 dark:bg-black/80">
            <div className="flex items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="transition-transform ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition-transform ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="fixed inset-x-4 top-8 z-[100] origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800">
                  <DialogTitle className="flex items-center justify-between text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    Navigation
                    <XMarkIcon
                      className="w-5 cursor-pointer"
                      onClick={closeModal}
                    />
                  </DialogTitle>

                  <nav className="mt-6">
                    <ul className="divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                      {navigation.map((item) => (
                        <li key={item.name} className="py-2">
                          <Link
                            href={item.href}
                            prefetch={false}
                            onClick={closeModal}
                            className="block w-full text-left"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </header>
  );
}
