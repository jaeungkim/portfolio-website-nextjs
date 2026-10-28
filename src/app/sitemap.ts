import type { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/app/[lang]/(main)/blog/_lib/posts";
import { DEFAULT_LOCALE, LOCALES, SITE_URL } from "@/i18n/config";

function localized(path: string): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    LOCALES.map((locale) => [locale, `${SITE_URL}/${locale}${path}`]),
  );
  languages["x-default"] = `${SITE_URL}/${DEFAULT_LOCALE}${path}`;

  return LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}${path}`,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllPostSlugs();

  return [
    ...localized(""),
    ...localized("/resume"),
    ...localized("/blog"),
    ...slugs.flatMap((slug) => localized(`/blog/${slug}`)),
  ];
}
