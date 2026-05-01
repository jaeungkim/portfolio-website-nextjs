import type { ReactNode } from "react";
import { ExternalLink } from "@/src/components/shared/ExternalLink";

interface ResumeTitleProps {
  link?: string;
  children: ReactNode;
}

export function ResumeTitle({ link, children }: ResumeTitleProps) {
  if (link) {
    return (
      <ExternalLink link={link} className="text-2xl">
        {children}
      </ExternalLink>
    );
  }
  return <p className="text-2xl font-medium">{children}</p>;
}
