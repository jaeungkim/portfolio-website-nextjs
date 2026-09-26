import Image from "next/image";
import { Mail, FileText } from "lucide-react";
import { GithubIcon } from "@/src/components/shared/GithubIcon";
import { LinkedinIcon } from "@/src/components/shared/LinkedinIcon";
import { ResumeNav } from "@/src/app/[lang]/(main)/resume/components/ResumeNav";
import { getDictionary } from "@/src/i18n/dictionaries";

const SOCIAL_LINKS = [
  {
    href: "mailto:jaewoongkim95@gmail.com",
    icon: Mail,
    label: "Email",
    external: false,
  },
  {
    href: "https://github.com/jaeungkim",
    icon: GithubIcon,
    label: "GitHub",
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/jaeungkim0526",
    icon: LinkedinIcon,
    label: "LinkedIn",
    external: true,
  },
  {
    href: "https://jaeungkim.notion.site",
    icon: FileText,
    label: "Notion",
    external: true,
  },
] as const;

export async function ResumeHeader() {
  const dict = await getDictionary();
  const { resume } = dict;
  const sections = [
    { id: "about", label: dict.nav.about },
    { id: "experience", label: resume.sections.experiences },
    { id: "projects", label: resume.sections.projects },
    { id: "education", label: resume.sections.education },
  ];

  return (
    // Below lg: photo beside the name, links under both. lg+: a sticky stacked column with section nav.
    <aside className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-4 lg:sticky lg:top-24 lg:block lg:space-y-6 lg:self-start">
      <div className="w-20 overflow-hidden rounded-xl border border-border bg-muted sm:w-24 lg:w-44 lg:rounded-2xl">
        <div className="relative aspect-[4/5]">
          <Image
            src="/images/profile.jpeg"
            alt={resume.photoAlt}
            fill
            sizes="(min-width: 1024px) 176px, (min-width: 640px) 96px, 80px"
            className="object-cover"
            preload
          />
        </div>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {resume.name}
        </h1>
        <p className="text-sm text-muted-foreground">{resume.role}</p>
      </div>

      <div className="col-span-full flex flex-wrap items-center gap-x-4 gap-y-2">
        {SOCIAL_LINKS.map(({ href, icon: Icon, label, external }) => (
          <a
            key={label}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            href={href}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <Icon className="size-3.5" aria-hidden="true" />
            <span>{label}</span>
          </a>
        ))}
      </div>

      <ResumeNav label={resume.metaTitle} items={sections} />
    </aside>
  );
}
