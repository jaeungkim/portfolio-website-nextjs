import type { ReactNode } from "react";
import { ExternalLink as ExternalLinkIcon } from "lucide-react";
import { cn } from "@/src/lib/cn";

interface ExternalLinkProps {
  link: string;
  children: ReactNode;
  className?: string;
}

export function ExternalLink({ link, children, className }: ExternalLinkProps) {
  return (
    <a
      className={cn(
        "text-foreground font-bold cursor-pointer w-fit flex items-center gap-1 border-b border-border leading-5 hover:border-muted-foreground transition-colors",
        className,
      )}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ExternalLinkIcon className="size-4" aria-hidden="true" />
    </a>
  );
}
