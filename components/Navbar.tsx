import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Transition, Dialog } from "@headlessui/react";
import { XMarkIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next"; // Import useTranslation

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Blog", href: "/blog", current: false },
  { name: "Project", href: "/project", current: false },
  { name: "Contact", href: "/contact", current: false },
];

export default function Navbar() {
  let [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { i18n } = useTranslation(); // Initialize i18n

  const themeButtonClass = useMemo(() => {
    return `group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 ${
      theme === "dark"
        ? "text-yellow-300 hover:text-yellow-500"
        : "text-cyan-500 hover:text-cyan-700"
    }`;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const icon = useMemo(() => {
    return theme === "dark" ? (
      <SunIcon className="w-5 h-5 text-yellow-400" />
    ) : (
      <MoonIcon className="w-5 h-5 text-blue-500" />
    );
  }, [theme]);

  const toggleModal = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <>
      <div className="w-full mx-auto max-w-7xl lg:px-8">
        <div className="relative px-4 sm:px-8 lg:px-12 flex gap-4 items-center">
          <div className="flex flex-1">
            <div className="h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10">
              <Link className="pointer-events-auto" href="/">
                <Image
                  className="rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 h-9 w-9"
                  src="/images/ill_prof.jpeg"
                  alt="profileLogo"
                  width="36"
                  height="36"
                  priority
                />
              </Link>
            </div>
          </div>
          <div className="flex flex-1 justify-end md:justify-center">
            {/* Mobile Menu */}
            <div
              className="pointer-events-auto md:hidden"
              onClick={toggleModal}
            >
              <button
                className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20"
                type="button"
                aria-expanded="false"
                data-headlessui-state=""
                id="headlessui-popover-button-:R2qb6:"
              >
                Menu
              </button>
            </div>
            {/* DESKTOP */}
            <nav className="pointer-events-auto hidden md:block">
              <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20">
                {navigation.map((item) => (
                  <li
                    key={item.name}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <Link
                      className="relative block px-3 py-2 transition hover:text-cyan-500 dark:hover:text-cyan-400"
                      href={item.href}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex justify-end md:flex-1">
            <div className="pointer-events-auto flex gap-2">
              {/* Theme Switcher */}
              <button onClick={toggleTheme} className={themeButtonClass}>
                {icon}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Modal Pop-up */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[100] h-screen min-h-screen overflow-auto"
          onClose={toggleModal}
        >
          <Transition.Child
            key="hi"
            as={Fragment}
            enter="transition ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed top-0 inset-0 overflow-y-auto backdrop-blur bg-zinc-800/40 dark:bg-black/80 opacity-100">
            <div className="flex items-center justify-center p-4 text-center">
              <Transition.Child
                key="hi"
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="overflow-auto fixed inset-x-4 top-8 z-[100] origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800 opacity-100 scale-100">
                  <Dialog.Title
                    as="h2"
                    className="flex flex-row w-full items-center justify-between text-sm font-medium text-zinc-600 dark:text-zinc-400"
                  >
                    Navigation
                    <XMarkIcon
                      className="w-5"
                      onClick={() => setIsOpen(false)}
                    />
                  </Dialog.Title>
                  <nav className="mt-6">
                    <ul className="my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                      {navigation.map((item) => (
                        <li
                          className="text-left"
                          key={item.name}
                          aria-current={item.current ? "page" : undefined}
                          onClick={() => setIsOpen(false)}
                        >
                          <Link className="block py-2" href={item.href}>
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
