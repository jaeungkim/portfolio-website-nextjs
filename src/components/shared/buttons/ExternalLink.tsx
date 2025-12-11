import type React from "react";
import { ExternalLink as ExternalLinkIcon } from "lucide-react";
import { cn } from "@/src/lib/cn";

export default function ExternalLink({
  link,
  children,
  additionalClassName,
}: {
  link: string;
  children: React.ReactNode;
  additionalClassName?: string;
}) {
  return (
    <a
      className={cn(
        "text-foreground font-bold cursor-pointer w-fit flex items-center gap-1 border-b border-border leading-5 hover:border-muted-foreground transition-colors",
        additionalClassName
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
