export const LOCALES = ["en", "ko"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Cookie the locale switcher writes so a manual choice survives the next visit to `/`. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export function isLocale(value: string | undefined): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "ko" : "en";
}

/** Open Graph wants a full `language_TERRITORY` tag, not the bare subtag. */
export const OG_LOCALES: Record<Locale, string> = {
  en: "en_US",
  ko: "ko_KR",
};
