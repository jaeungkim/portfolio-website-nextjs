import { ArrowRight } from "lucide-react";
import type { Post } from "@/app/[lang]/(main)/blog/_lib/posts";
import { formatDate } from "@/app/[lang]/(main)/blog/_lib/format-date";
import { LocaleLink } from "@/components/shared/LocaleLink";
import { getDictionary } from "@/i18n/dictionaries";

interface ArticleProps {
  post: Post;
}

export async function Article({ post }: ArticleProps) {
  const [dict, date] = await Promise.all([
    getDictionary(),
    formatDate(post.date),
  ]);

  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline motion-safe:animate-in fade-in slide-in-from-bottom-5 duration-600 fill-mode-both">
      <LocaleLink
        href={`/blog/${post.slug}`}
        className="md:col-span-3 group relative flex flex-col items-start"
      >
        <div
          aria-hidden="true"
          className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-muted opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl"
        />

        <h2 className="relative z-10 text-base font-semibold">{post.title}</h2>

        <time
          className="relative z-10 order-first mb-3 flex items-center text-sm text-muted-foreground md:hidden pl-3.5"
          dateTime={post.date}
        >
          <span className="absolute inset-y-0 left-0 flex items-center">
            <span className="h-4 w-0.5 rounded-full bg-border" />
          </span>
          {date}
        </time>

        <p className="relative z-10 mt-2 text-sm text-muted-foreground">
          {post.summary}
        </p>

        <div className="relative z-10 mt-4 flex items-center text-sm font-medium text-muted-foreground">
          {dict.blog.readMore}
          <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
        </div>
      </LocaleLink>

      <time
        className="relative z-10 order-first mt-1 hidden text-sm text-muted-foreground md:block"
        dateTime={post.date}
      >
        {date}
      </time>
    </article>
  );
}
