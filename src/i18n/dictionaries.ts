import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { DEFAULT_LOCALE, LOCALES, hasLocale } from "@/i18n/config";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  ko: () => import("./dictionaries/ko.json").then((module) => module.default),
};

export async function getLocale() {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  return locale;
}

export const getDictionary = async () => dictionaries[await getLocale()]();

export async function localeAlternates(path: string = "") {
  const locale = await getLocale();

  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(LOCALES.map((code) => [code, `/${code}${path}`])),
      "x-default": `/${DEFAULT_LOCALE}${path}`,
    },
  };
}
