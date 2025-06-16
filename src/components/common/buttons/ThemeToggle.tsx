"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SunIcon from "@/src/components/common/icons/iconComponents/SunIcon";
import MoonIcon from "@/src/components/common/icons/iconComponents/MoonIcon";

import Icon from "../icons/Icon";

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
      {isDark ? <Icon icon={SunIcon} /> : <Icon icon={MoonIcon} />}
    </button>
  );
}
