"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
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
