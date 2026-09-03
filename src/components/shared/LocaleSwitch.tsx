"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, type Locale } from "@/src/i18n/config";

interface LocaleSwitchProps {
  target: Locale;
  label: string;
}

/**
 * A `<Link>` rather than `router.push`: it sits in the navbar, so the other
 * locale's route is prefetched as soon as the page loads and the swap is
 * instant instead of waiting on a fresh server round trip.
 */
export function LocaleSwitch({ target, label }: LocaleSwitchProps) {
  const segments = usePathname().split("/");
  segments[1] = target;

  function rememberLocale() {
    // Remembered so a later visit to `/` skips Accept-Language negotiation.
    document.cookie = `${LOCALE_COOKIE}=${target};path=/;max-age=31536000;samesite=lax`;
  }

  return (
    <Link
      href={segments.join("/")}
      onClick={rememberLocale}
      className="flex items-center justify-center size-8 rounded-md text-xs font-semibold uppercase hover:bg-muted transition-colors"
      aria-label={label}
    >
      {target}
    </Link>
  );
}
