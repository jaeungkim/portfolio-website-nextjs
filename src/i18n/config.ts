export const LOCALES = ["ko", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ko";

export const SITE_URL = "https://jaeungkim.com";

export const hasLocale = (locale: string): locale is Locale =>
  LOCALES.includes(locale as Locale);

export const OG_LOCALES: Record<Locale, string> = {
  en: "en_US",
  ko: "ko_KR",
};
