import type { ReactNode } from "react";

interface ResumeRowProps {
  leading: ReactNode;
  children: ReactNode;
}

export function ResumeRow({ leading, children }: ResumeRowProps) {
  return (
    <div className="md:grid md:grid-cols-[clamp(180px,24vw,220px)_minmax(0,1fr)] md:gap-x-8 lg:gap-x-10">
      <div className="mb-2 md:mb-0">{leading}</div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
