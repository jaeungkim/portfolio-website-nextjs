import type { ReactNode } from "react";
import { ResumeRow } from "@/src/app/(main)/resume/components/ResumeRow";

interface ResumeSectionItemProps {
  period?: string;
  children: ReactNode;
}

export function ResumeSectionItem({
  period,
  children,
}: ResumeSectionItemProps) {
  return (
    <article className="mt-8">
      <ResumeRow
        leading={
          period ? (
            <p className="text-2xl font-medium text-muted-foreground">
              {period}
            </p>
          ) : null
        }
      >
        {children}
      </ResumeRow>
    </article>
  );
}
