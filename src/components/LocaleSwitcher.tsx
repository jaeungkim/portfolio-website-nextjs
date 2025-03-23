"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
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
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-full items-center justify-between w-fit px-3 py-2 rounded-full bg-white dark:bg-zinc-800 shadow-md ring-1 ring-zinc-200 dark:ring-zinc-700 transition-all"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <Image
            src={currentLocaleData?.flag || ""}
            alt={currentLocaleData?.label || ""}
            width={20}
            height={14}
            className="w-5 h-3.5 object-cover"
          />

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
        <div className="absolute right-0 mt-2 w-fit min-w-[8rem] rounded-lg bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-700 transition-all">
          <ul className="py-1">
            {locales.map(({ code, label, flag }) => (
              <li key={code}>
                <button
                  onClick={() => switchLocale(code)}
                  disabled={currentLocale === code}
                  className={`flex items-center w-full px-4 py-2 text-sm gap-2 transition-all
                    ${
                      currentLocale === code
                        ? " "
                        : "hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                    }`}
                >
                  <Image
                    src={flag}
                    alt={label}
                    width={20}
                    height={14}
                    className="w-5 h-3.5 object-cover "
                  />
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
