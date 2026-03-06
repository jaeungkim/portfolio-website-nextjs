"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme((theme) => (theme === "dark" ? "light" : "dark"))}
      className="relative flex items-center justify-center size-8 rounded-md hover:bg-muted transition-colors"
      aria-label="Toggle theme"
    >
      <Sun className="absolute size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}
