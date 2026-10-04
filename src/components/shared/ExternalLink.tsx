import { ExternalLink as ExternalLinkIcon } from "lucide-react";

interface ExternalLinkProps {
  href: string;
  children: string;
}

export function ExternalLink({ href, children }: ExternalLinkProps) {
  const split = children.lastIndexOf(" ") + 1;

  return (
    <a
      className="underline-offset-4 hover:underline"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children.slice(0, split)}
      <span className="whitespace-nowrap">
        {children.slice(split)}&nbsp;
        <ExternalLinkIcon
          className="inline size-[0.9em] align-[-0.1em] text-muted-foreground"
          aria-hidden="true"
        />
      </span>
    </a>
  );
}
