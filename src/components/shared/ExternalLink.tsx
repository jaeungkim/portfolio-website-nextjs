import { ExternalLink as ExternalLinkIcon } from "lucide-react";

interface ExternalLinkProps {
  link: string;
  children: string;
}

// Inherits the surrounding text's size and weight. The icon is wrapped with the last word so a
// title that wraps never leaves the icon alone on its own line.
export function ExternalLink({ link, children }: ExternalLinkProps) {
  const split = children.lastIndexOf(" ") + 1;

  return (
    <a
      className="underline-offset-4 hover:underline"
      href={link}
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
