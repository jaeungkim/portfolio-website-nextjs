import type { ReactNode } from "react";

interface ResumeRowProps {
  leading: ReactNode;
  children: ReactNode;
}

export function ResumeRow({ leading, children }: ResumeRowProps) {
  return (
    <div className="md:grid md:grid-cols-4 md:gap-x-6">
      <div className="mb-2 md:mb-0">{leading}</div>
      <div className="col-span-3 space-y-4">{children}</div>
    </div>
  );
}
