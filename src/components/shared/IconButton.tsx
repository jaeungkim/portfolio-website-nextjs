import type { LucideIcon } from "lucide-react";

interface IconButtonProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

export function IconButton({ href, icon: Icon, label }: IconButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-all text-sm"
    >
      <Icon className="size-4" aria-hidden="true" />
      {label}
    </a>
  );
}
