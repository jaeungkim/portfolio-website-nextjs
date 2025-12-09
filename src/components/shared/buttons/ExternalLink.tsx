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
        `text-neutral-700 dark:text-neutral-300 font-bold cursor-pointer w-fit flex items-center gap-1 border-solid border-b border-neutral-700 leading-5 group-hover:border-neutral-200 transition-all duration-300 ease-in-out`,
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
