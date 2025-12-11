import { memo } from "react";
import { cn } from "@/src/lib/cn";
import { formatDate } from "../lib/utils";

interface ArticleDateProps {
  dateString: string;
  mobile: boolean;
}

function ArticleDate({ dateString, mobile }: ArticleDateProps) {
  return (
    <time
      className={cn(
        "relative z-10 order-first mb-3 flex items-center text-sm text-muted-foreground",
        mobile ? "md:hidden pl-3.5" : "hidden md:block mt-1"
      )}
      dateTime={dateString}
    >
      {mobile && (
        <span className="absolute inset-y-0 left-0 flex items-center">
          <span className="h-4 w-0.5 rounded-full bg-border" />
        </span>
      )}
      {formatDate(dateString)}
    </time>
  );
}

export default memo(ArticleDate);
