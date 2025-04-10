"use client";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={clsx(
        "cursor-pointer group p-1 transition",
        isDark
          ? "text-yellow-300 hover:text-yellow-500"
          : "text-cyan-500 hover:text-cyan-700"
      )}
    >
      {isDark ? (
        <SunIcon className="w-5 h-5 text-yellow-400" />
      ) : (
        <MoonIcon className="w-5 h-5 text-blue-500" />
      )}
    </button>
  );
}
