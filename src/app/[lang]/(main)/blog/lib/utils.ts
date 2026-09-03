import { getLocale } from "@/src/i18n/dictionaries";
import type { Locale } from "@/src/i18n/config";

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
};

const FORMATTERS: Record<Locale, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat("en-US", DATE_OPTIONS),
  ko: new Intl.DateTimeFormat("ko-KR", DATE_OPTIONS),
};

/** Server-only: reads the active locale from the `[lang]` root segment. */
export async function formatDate(dateString: string): Promise<string> {
  const [year, month, day] = dateString.split("-").map(Number);

  return FORMATTERS[await getLocale()].format(
    new Date(Date.UTC(year, month - 1, day)),
  );
}
