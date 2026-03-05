"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="cursor-pointer group transition"
    >
      {isDark ? (
        <Sun className="size-4 stroke-foreground transition-colors duration-300 ease-in-out group-hover:stroke-muted-foreground" />
      ) : (
        <Moon className="size-4 stroke-foreground transition-colors duration-300 ease-in-out group-hover:stroke-muted-foreground" />
      )}
    </button>
  );
}
