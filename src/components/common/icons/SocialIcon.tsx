import { ComponentType } from "react";

interface SocialIconProps {
  href: string;
  IconComponent: ComponentType<{ className?: string }>;
}

export default function SocialIcon({ href, IconComponent }: SocialIconProps) {
  return (
    <a className="group" href={href} target="_blank" rel="noopener noreferrer">
      <IconComponent className="size-6 text-zinc-800 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors duration-300" />
    </a>
  );
}
