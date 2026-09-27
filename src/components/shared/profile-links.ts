import { GithubIcon } from "@/components/shared/GithubIcon";
import { LinkedinIcon } from "@/components/shared/LinkedinIcon";
import { NotionIcon } from "@/components/shared/NotionIcon";

export const PROFILE_LINKS = [
  { href: "https://github.com/jaeungkim", icon: GithubIcon, label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/jaeungkim0526",
    icon: LinkedinIcon,
    label: "LinkedIn",
  },
  { href: "https://jaeungkim.notion.site", icon: NotionIcon, label: "Notion" },
] as const;
