"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "../icons/icons";
import IconWrapper from "../icons/IconWrapper";

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
      {isDark ? <IconWrapper icon={SunIcon} /> : <IconWrapper icon={MoonIcon} />}
    </button>
  );
}
