import { getSortedPostsData } from "@/src/app/[lang]/(main)/blog/lib/posts";
import { SITE_URL } from "@/src/i18n/config";
import en from "@/src/i18n/dictionaries/en.json";

// Posts are written in English, so the feed links to the English edition.
const FEED_LOCALE = "en";

function escapeXml(text: string): string {
  return text.replace(
    /[<>&]/g,
    (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c]!,
  );
}

export async function GET() {
  const posts = await getSortedPostsData();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/${FEED_LOCALE}/blog/${post.id}`;
      return `<item><title>${escapeXml(post.title)}</title><link>${url}</link><guid>${url}</guid><description>${escapeXml(post.summary)}</description><pubDate>${new Date(post.date).toUTCString()}</pubDate></item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escapeXml(en.site.name)}</title><link>${SITE_URL}/${FEED_LOCALE}/blog</link><description>${escapeXml(en.blog.metaDescription)}</description>${items}</channel></rss>`;

  return new Response(rss, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
