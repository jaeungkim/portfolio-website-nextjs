import type { ReactNode } from "react";

interface InlineCodeProps {
  children: ReactNode;
}

export function InlineCode({ children }: InlineCodeProps) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-sm">
      {children}
    </code>
  );
}
