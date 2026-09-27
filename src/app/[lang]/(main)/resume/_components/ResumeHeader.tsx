import Image from "next/image";
import { Mail } from "lucide-react";
import { ResumeNav } from "@/app/[lang]/(main)/resume/_components/ResumeNav";
import { PROFILE_LINKS } from "@/components/shared/profile-links";
import { getDictionary } from "@/i18n/dictionaries";

const EMAIL = "jaewoongkim95@gmail.com";
const LINK_CLASS =
  "inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground";

export async function ResumeHeader() {
  const dict = await getDictionary();
  const { resume } = dict;
  const sections = [
    { id: "about", label: resume.sections.about },
    { id: "experience", label: resume.sections.experience },
    { id: "projects", label: resume.sections.projects },
    { id: "education", label: resume.sections.education },
  ];

  return (
    <aside className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-4 lg:sticky lg:top-24 lg:block lg:space-y-6 lg:self-start">
      <div className="w-20 overflow-hidden rounded-xl border bg-muted sm:w-24 lg:w-44 lg:rounded-2xl">
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
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {resume.name}
        </h1>
        <p className="text-sm text-muted-foreground">{resume.role}</p>
      </div>

      <div className="col-span-full flex flex-wrap items-center gap-x-4 gap-y-2">
        <a href={`mailto:${EMAIL}`} className={LINK_CLASS}>
          <Mail className="size-3.5" aria-hidden="true" />
          <span>Email</span>
        </a>
        {PROFILE_LINKS.map(({ href, icon: Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK_CLASS}
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
