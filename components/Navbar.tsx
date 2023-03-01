import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition, Dialog } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  SunIcon,
  HomeIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";

const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "About", href: "#", current: false },
  { name: "Articles", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Contact", href: "#", current: false },
];
export default function MyModal() {
  const { systemTheme, theme, setTheme } = useTheme();
  const renderThemeChanger = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <SunIcon
          className="w-10 h-10 text-yellow-500 "
          role="button"
          onClick={() => setTheme("light")}
        />
      );
    } else {
      return (
        <MoonIcon
          className="w-10 h-10 text-gray-900 "
          role="button"
          onClick={() => setTheme("dark")}
        />
      );
    }
  };
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="relative px-4 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl lg:max-w-5xl">
            <div className="relative flex gap-4">
              <div className="flex flex-1">
                <div className="h-10 w-10 rounded-full shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10">
                  <a aria-label="home" className="pointer-events-auto" href="/">
                    <HomeIcon />
                  </a>
                </div>
              </div>

              {/* Mobile Menu */}
              <div className="flex flex-1 justify-end md:justify-center">
                <div
                  className="pointer-events-auto md:hidden"
                  onClick={() => openModal()}
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
                  <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
                    {navigation.map((item) => (
                      <li
                        key={item.name}
                        aria-current={item.current ? "page" : undefined}
                      >
                        <a
                          className="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
                          href={item.href}
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className="flex justify-end md:flex-1">
                <div className="pointer-events-auto">
                  {renderThemeChanger()}
                </div>
              </div>
            </div>
          </div>

          {/* Theme Replacement */}
          {/* <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button type="button" className="rounded-full">
                  <span className="sr-only">View notifications</span>

                </button>
              </div> */}
        </div>
      </div>

      {/* Mobile Menu Modal Pop-up */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed top-0 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex justify-between text-lg font-medium leading-6 text-gray-900"
                  >
                    Navigation
                    <XMarkIcon
                      className="w-5"
                      onClick={() => setIsOpen(false)}
                    />
                  </Dialog.Title>
                  {navigation.map((item) => (
                    <ul>
                      <li
                        key={item.name}
                        aria-current={item.current ? "page" : undefined}
                        onClick={() => setIsOpen(false)}
                      >
                        <a href={item.href}>{item.name}</a>
                      </li>
                    </ul>
                  ))}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
