import { notFound } from "next/navigation";
import { routing } from "@/src/i18n/routing";
import { getAllPostSlugs, getPostData } from "@/src/utils/posts";

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export const dynamicParams = false;
export const dynamic = "force-static";

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;

  const postData = await getPostData(slug);
  if (!postData) notFound();

  return (
    <>
      <article className="prose dark:prose-invert mx-auto overflow-auto max-w-3xl">
        <h1 className="text-4xl font-bold mb-6">{postData.title}</h1>
        {postData.content}
      </article>
    </>
  );
}
