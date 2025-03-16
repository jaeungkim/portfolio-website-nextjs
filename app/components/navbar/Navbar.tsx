"use client";

import { useState } from "react";
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
import NavLinks, { navigation } from "./NavLinks";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const toggleModal = () => setIsOpen((prev) => !prev);

  return (
    <header className="sticky top-0 bg-opacity-70 backdrop-blur flex flex-col h-full py-4 z-40">
      <div className="w-full mx-auto max-w-7xl lg:px-8">
        <div className="relative px-4 sm:px-8 lg:px-12 flex gap-4 items-center">
          {/* Logo */}
          <div className="flex flex-1">
            <div className="h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10">
              <Link className="" href="/">
                <Image
                  className="rounded-full object-cover h-9 w-9 dark:bg-zinc-800"
                  src="/images/ill_prof.jpeg"
                  alt="profileLogo"
                  width={36}
                  height={36}
                  priority
                />
              </Link>
            </div>
          </div>

          {/* Desktop Navigation (Server Component) */}
          <nav className=" hidden md:block">
            <NavLinks />
          </nav>

          {/* Theme Toggle */}
          <div className="flex justify-end md:flex-1">
            <button
              type="button"
              onClick={toggleTheme}
              className={`cursor-pointer group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 ${
                theme === "dark"
                  ? "text-yellow-300 hover:text-yellow-500"
                  : "text-cyan-500 hover:text-cyan-700"
              }`}
            >
              {theme === "dark" ? (
                <SunIcon className="w-5 h-5 text-yellow-400" />
              ) : (
                <MoonIcon className="w-5 h-5 text-blue-500" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20"
              onClick={toggleModal}
            >
              Menu
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Modal */}
      <Transition appear show={isOpen} as="div">
        <Dialog
          as="div"
          className="relative z-[100] h-screen min-h-screen overflow-auto"
          onClose={toggleModal}
        >
          <TransitionChild
            enter="transition ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed top-0 inset-0 overflow-y-auto backdrop-blur bg-zinc-800/40 dark:bg-black/80 opacity-100">
            <div className="flex items-center justify-center p-4 text-center">
              <TransitionChild
                enter="transition ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="overflow-auto fixed inset-x-4 top-8 z-[100] origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800 opacity-100 scale-100">
                  <DialogTitle
                    as="h2"
                    className="flex flex-row w-full items-center justify-between text-sm font-medium text-zinc-600 dark:text-zinc-400"
                  >
                    Navigation
                    <XMarkIcon
                      className="w-5 cursor-pointer"
                      onClick={toggleModal}
                    />
                  </DialogTitle>
                  <nav className="mt-6">
                    <ul className="my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                      {navigation.map((item) => (
                        <li
                          className="text-left"
                          key={item.name}
                          onClick={toggleModal}
                        >
                          <Link className="block py-2" href={item.href}>
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
