"use client";

import { usePathname, useRouter } from "next/navigation";
import { LOCALE_COOKIE, type Locale } from "@/src/i18n/config";

interface LocaleSwitchProps {
  target: Locale;
  label: string;
}

export function LocaleSwitch({ target, label }: LocaleSwitchProps) {
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale() {
    // Remembered so a later visit to `/` skips Accept-Language negotiation.
    document.cookie = `${LOCALE_COOKIE}=${target};path=/;max-age=31536000;samesite=lax`;

    const segments = pathname.split("/");
    segments[1] = target;
    router.push(segments.join("/"));
  }

  return (
    <button
      type="button"
      onClick={switchLocale}
      className="flex items-center justify-center size-8 rounded-md text-xs font-semibold uppercase hover:bg-muted transition-colors"
      aria-label={label}
    >
      {target}
    </button>
  );
}
