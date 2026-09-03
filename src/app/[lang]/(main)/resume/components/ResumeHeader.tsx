import Image from "next/image";
import { Mail, FileText } from "lucide-react";
import { GithubIcon } from "@/src/components/shared/GithubIcon";
import { LinkedinIcon } from "@/src/components/shared/LinkedinIcon";
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

  return (
    <section className="grid gap-y-6 md:grid-cols-[clamp(180px,24vw,220px)_minmax(0,1fr)] md:gap-x-8 lg:gap-x-10">
      <div className="w-full max-w-[150px] overflow-hidden rounded-xl border border-border bg-muted sm:max-w-[172px] md:w-[clamp(180px,24vw,220px)] md:max-w-none md:self-start">
        <div className="relative aspect-[4/5] w-full">
          <Image
            src="/images/profile.jpeg"
            alt={resume.photoAlt}
            fill
            sizes="(min-width: 1024px) 220px, (min-width: 768px) 24vw, (min-width: 640px) 172px, 150px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="flex max-w-[72ch] flex-col gap-5">
        <header className="space-y-1.5">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {resume.name}
          </h1>
          <p className="text-base font-medium text-muted-foreground">
            {resume.role}
          </p>
        </header>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 md:gap-x-5">
          {SOCIAL_LINKS.map(({ href, icon: Icon, label, external }) => (
            <a
              key={label}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
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

        <div className="space-y-3 text-sm leading-relaxed text-foreground">
          {resume.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
