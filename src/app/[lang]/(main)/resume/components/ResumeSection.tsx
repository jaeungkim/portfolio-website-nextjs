import type { ReactNode } from "react";

interface ResumeSectionProps {
  id: string;
  title: string;
  /** Sits inline after the eyebrow, e.g. the experience duration pill. */
  aside?: ReactNode;
  children: ReactNode;
}

// Text rules for the whole resume:
// - Shades: text-foreground for headings and every line of prose (intro, descriptions, bullets).
//   text-muted-foreground only for metadata: eyebrows, dates, places, roles, notes, tags, inactive nav.
// - Weights: 400 body, 600 headings and name. Nothing else is loaded.
// - Decorations: inline links underline on hover; nav lists shift color; uppercase only on eyebrows.
// - Rhythm: eyebrow, 24px, entries 48px apart; 16px between blocks inside an entry.
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
