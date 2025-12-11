import { ComponentType } from "react";

interface SocialIconProps {
  href: string;
  IconComponent: ComponentType<{ className?: string }>;
}

export default function SocialIcon({ href, IconComponent }: SocialIconProps) {
  return (
    <a className="group" href={href} target="_blank" rel="noopener noreferrer">
      <IconComponent className="size-6 stroke-foreground group-hover:stroke-muted-foreground transition-colors duration-300" />
    </a>
  );
}
