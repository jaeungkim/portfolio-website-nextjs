import type { ReactNode } from "react";
import { ExternalLink } from "@/src/components/shared/ExternalLink";

interface ResumeProjectItemProps {
  title: string;
  link: string;
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
      <ExternalLink link={link} className="text-base font-medium">
        {title}
      </ExternalLink>
      <p className="pl-4 text-base font-bold text-muted-foreground">
        {description}
      </p>
      <div className="space-y-4 pl-4">{children}</div>
    </article>
  );
}
