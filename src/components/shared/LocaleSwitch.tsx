"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface LocaleSwitchProps {
  label: string;
}

export function LocaleSwitch({ label }: LocaleSwitchProps) {
  const segments = usePathname().split("/");
  const target = segments[1] === "en" ? "ko" : "en";
  segments[1] = target;

  return (
    <Link
      href={segments.join("/")}
      className="flex items-center justify-center size-8 rounded-md text-xs font-semibold uppercase hover:bg-muted transition-colors"
      aria-label={label}
    >
      {target}
    </Link>
  );
}
