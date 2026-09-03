import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/src/i18n/config";

interface LanguageRange {
  tag: string;
  quality: number;
}

/**
 * Parses an `Accept-Language` header into ranges ordered by descending quality.
 * Ties keep header order, which is what RFC 9110 asks for (Array#sort is stable).
 */
function parseAcceptLanguage(header: string): LanguageRange[] {
  return header
    .split(",")
    .map((part) => {
      const [tag, ...parameters] = part.trim().split(";");
      const q = parameters
        .map((parameter) => parameter.trim())
        .find((parameter) => parameter.startsWith("q="));
      const quality = q ? Number.parseFloat(q.slice(2)) : 1;

      return {
        tag: tag.trim().toLowerCase(),
        quality: Number.isNaN(quality) ? 0 : quality,
      };
    })
    .filter((range) => range.tag.length > 0 && range.quality > 0)
    .sort((a, b) => b.quality - a.quality);
}

/**
 * Picks the best supported locale for an `Accept-Language` header.
 * Matches on the primary subtag only — `ko-KR` and `ko` both resolve to `ko`.
 */
export function negotiateLocale(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;

  for (const { tag } of parseAcceptLanguage(header)) {
    if (tag === "*") return DEFAULT_LOCALE;

    const primary = tag.split("-")[0];
    const match = LOCALES.find((locale) => locale === primary);
    if (match) return match;
  }

  return DEFAULT_LOCALE;
}
