"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import Image from "next/image";
import TranslateIcon from "@/src/components/common/icons/iconComponents/TranslateIcon";
import Icon from "../icons/Icon";

const LOCALES = [
  { code: "en", label: "English", flag: "/images/flag_us.png" },
  { code: "kr", label: "한국어", flag: "/images/flag_kr.png" },
];

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const current = LOCALES.find((l) => l.code === locale);

  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  };

  const handleLocaleChange = (nextLocale: string) => {
    const [, , ...rest] = pathname.split("/");
    const newPath = `/${nextLocale}/${rest.join("/")}`;
    router.push(newPath);
    setOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left z-50">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1 p-1 transition-all"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {/* Globe Icon */}
        <Icon icon={TranslateIcon} />

        <svg
          className={`size-4 text-zinc-500 dark:text-zinc-400 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 0 1 
            1.414-1.414L10 9.586l3.293-3.293a1 1 0 0 1 
            1.414 1.414l-4 4A1 1 0 0 1 10 12z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-fit rounded-lg bg-white dark:bg-zinc-800 shadow-md">
          <ul className="py-1">
            {LOCALES.map(({ code, label }) => (
              <li key={code}>
                <button
                  onClick={() => handleLocaleChange(code)}
                  disabled={code === locale}
                  className={`flex items-center gap-2 w-full px-4 py-1 text-sm font-bold transition-all
                    ${
                      code === locale
                        ? "transition duration-300 text-zinc-800 dark:text-zinc-200 hover:text-neutral-500 dark:hover:text-neutral-400"
                        : "transition duration-300 text-zinc-800 dark:text-zinc-200 hover:text-neutral-500 dark:hover:text-neutral-400"
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
