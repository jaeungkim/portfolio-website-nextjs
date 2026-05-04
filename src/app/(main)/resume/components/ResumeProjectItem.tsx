import type { ReactNode } from "react";
import { ExternalLink } from "@/src/components/shared/ExternalLink";

interface ResumeProjectItemProps {
  title: string;
  link?: string;
  description: string;
  children: ReactNode;
}

export function ResumeProjectItem({
  title,
  link,
  description,
  children,
}: ResumeProjectItemProps) {
  return (
    <article className="space-y-3">
      {link ? (
        <ExternalLink link={link}>{title}</ExternalLink>
      ) : (
        <h3 className="text-base font-bold text-foreground">{title}</h3>
      )}
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      <div className="space-y-4">{children}</div>
    </article>
  );
}
