import type { MetadataRoute } from "next";
import { getSortedPostsData } from "@/src/app/[lang]/(main)/blog/lib/posts";
import { DEFAULT_LOCALE, LOCALES, SITE_URL } from "@/src/i18n/config";

/** One entry per locale for `path`, each carrying the full hreflang set. */
function localized(path: string, lastModified?: string): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    LOCALES.map((locale) => [locale, `${SITE_URL}/${locale}${path}`]),
  );
  languages["x-default"] = `${SITE_URL}/${DEFAULT_LOCALE}${path}`;

  return LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}${path}`,
    lastModified,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getSortedPostsData();

  return [
    ...localized(""),
    ...localized("/resume"),
    ...localized("/blog"),
    ...posts.flatMap((post) => localized(`/blog/${post.id}`, post.date)),
  ];
}
