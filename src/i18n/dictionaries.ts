import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import en from "@/src/i18n/dictionaries/en.json";
import ko from "@/src/i18n/dictionaries/ko.json";
import { LOCALES, isLocale, type Locale } from "@/src/i18n/config";

/** The English dictionary is the shape every other locale has to satisfy. */
export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, ko };

/**
 * Reads the locale from the `[lang]` root segment. Server Components only —
 * `next/root-params` fails to compile in a Client Component.
 */
export async function getLocale(): Promise<Locale> {
  const locale = await lang();
  if (!isLocale(locale)) notFound();
  return locale;
}

export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLocale()];
}

/** Per-page `hreflang` set. `path` is the route below the locale, e.g. `/resume`. */
export async function localeAlternates(path: string = "") {
  const locale = await getLocale();

  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(LOCALES.map((code) => [code, `/${code}${path}`])),
      "x-default": `/en${path}`,
    },
  };
}
