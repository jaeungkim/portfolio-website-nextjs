import { getSortedPostsData } from "@/app/[lang]/(main)/blog/_lib/posts";
import { SITE_URL } from "@/i18n/config";
import en from "@/i18n/dictionaries/en.json";

const escapeXml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function GET() {
  const posts = await getSortedPostsData();
  const items = posts.map((post) => {
    const url = `${SITE_URL}/en/blog/${post.slug}`;
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description>${escapeXml(post.summary)}</description>
    </item>`;
  });

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(en.site.name)}</title>
    <link>${SITE_URL}/en/blog</link>
    <description>${escapeXml(en.blog.metaDescription)}</description>
    <language>en</language>
${items.join("\n")}
  </channel>
</rss>`,
    { headers: { "Content-Type": "text/xml; charset=utf-8" } },
  );
}
