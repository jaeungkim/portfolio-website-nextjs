import type { ReactNode } from "react";
import { ExternalLink } from "@/app/[lang]/(main)/resume/_components/ExternalLink";

interface ResumeSectionItemProps {
  title: string;
  href?: string;
  period?: string;
  role?: string;
  location?: string;
  children?: ReactNode;
}

export function ResumeSectionItem({
  title,
  href,
  period,
  role,
  location,
  children,
}: ResumeSectionItemProps) {
  return (
    <article className="space-y-4">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-1">
        <h3 className="text-lg font-semibold">
          {href ? <ExternalLink href={href}>{title}</ExternalLink> : title}
        </h3>
        {period && (
          <p className="text-right text-sm tabular-nums text-muted-foreground">
            {period}
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
