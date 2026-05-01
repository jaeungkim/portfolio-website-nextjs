import { formatDate } from "@/src/app/(main)/blog/lib/utils";

interface ArticleDateMobileProps {
  dateString: string;
}

export function ArticleDateMobile({ dateString }: ArticleDateMobileProps) {
  return (
    <time
      className="relative z-10 order-first mb-3 flex items-center text-sm text-muted-foreground md:hidden pl-3.5"
      dateTime={dateString}
    >
      <span className="absolute inset-y-0 left-0 flex items-center">
        <span className="h-4 w-0.5 rounded-full bg-border" />
      </span>
      {formatDate(dateString)}
    </time>
  );
}
