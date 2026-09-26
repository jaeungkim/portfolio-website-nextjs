import type { ReactNode } from "react";
import { ExternalLink } from "@/src/components/shared/ExternalLink";

interface ResumeSectionItemProps {
  title: string;
  link?: string;
  /** Right of the title: a period or a company tag. */
  meta?: string;
  role?: string;
  location?: string;
  children?: ReactNode;
}

// Entry header is a 2x2: title | meta, role | location. Blocks below it sit 16px apart.
export function ResumeSectionItem({
  title,
  link,
  meta,
  role,
  location,
  children,
}: ResumeSectionItemProps) {
  return (
    <article className="space-y-4">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-1">
        <h3 className="text-lg font-semibold text-foreground">
          {link ? <ExternalLink link={link}>{title}</ExternalLink> : title}
        </h3>
        {meta && (
          <p className="text-right text-sm tabular-nums text-muted-foreground">
            {meta}
          </p>
        )}
        {role && (
          <p className="col-start-1 text-sm text-muted-foreground">{role}</p>
        )}
        {location && (
          <p className="col-start-2 text-right text-sm text-muted-foreground">
            {location}
          </p>
        )}
      </header>
      {children}
    </article>
  );
}
