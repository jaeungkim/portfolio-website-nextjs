import { formatDate } from "@/src/app/[lang]/(main)/blog/lib/utils";

interface ArticleDateDesktopProps {
  dateString: string;
}

export async function ArticleDateDesktop({
  dateString,
}: ArticleDateDesktopProps) {
  return (
    <time
      className="relative z-10 order-first mt-1 hidden text-sm text-muted-foreground md:block"
      dateTime={dateString}
    >
      {await formatDate(dateString)}
    </time>
  );
}
