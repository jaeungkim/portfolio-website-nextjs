"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { ChevronDownIcon, LanguageIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

const locales = [
  { code: "en", label: "English", flag: "/images/flag_us.png" },
  { code: "kr", label: "한국어", flag: "/images/flag_kr.png" },
];

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const switchLocale = (nextLocale: string) => {
    const segments = pathname.split("/");

    if (!segments[1]) {
      segments[1] = nextLocale;
    } else {
      segments[1] = nextLocale;
    }

    const newPath = segments.join("/") || `/${nextLocale}`;

    router.push(newPath);
    setIsOpen(false);
  };

  const currentLocaleData = locales.find((loc) => loc.code === currentLocale);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left z-50">
      {/* Dropdown Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer flex h-full items-center justify-between w-fit p-1 transition-all"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          <LanguageIcon className=" size-6 fill-zinc-900 dark:fill-zinc-400 transition-transform duration-300" />

          {/* Optionally show the locale label for more width */}
          {/* <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {currentLocaleData?.label}
          </span> */}

          <ChevronDownIcon
            className={`h-4 w-4 text-zinc-500 dark:text-zinc-400 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-1 w-fit rounded-lg bg-white dark:bg-zinc-800 shadow-md transition-all">
          <ul className="py-1">
            {locales.map(({ code, label, flag }) => (
              <li key={code}>
                <button
                  onClick={() => switchLocale(code)}
                  disabled={currentLocale === code}
                  className={`font-bold flex items-center w-full px-4 py-1 text-sm gap-1 transition-all
                    ${
                      currentLocale === code
                        ? "text-cyan-500 dark:text-cyan-500"
                        : "text-zinc-200 dark:text-zinc-600 cursor-pointer"
                    }`}
                >
                  <span>{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
