import type { MetadataRoute } from "next";
import { getSortedPostsData } from "@/app/[lang]/(main)/blog/_lib/posts";
import { DEFAULT_LOCALE, LOCALES, SITE_URL } from "@/i18n/config";

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
    ...posts.flatMap((post) => localized(`/blog/${post.slug}`, post.date)),
  ];
}
