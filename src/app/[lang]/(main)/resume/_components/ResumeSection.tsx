import type { ReactNode } from "react";

interface ResumeSectionProps {
  id: string;
  title: string;
  aside?: ReactNode;
  children: ReactNode;
}

export function ResumeSection({
  id,
  title,
  aside,
  children,
}: ResumeSectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-center gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </h2>
        {aside}
      </div>
      <div className="mt-6 space-y-12">{children}</div>
    </section>
  );
}
