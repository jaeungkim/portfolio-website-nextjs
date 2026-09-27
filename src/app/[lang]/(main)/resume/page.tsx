import type { Metadata } from "next";
import { ResumeHeader } from "@/app/[lang]/(main)/resume/_components/ResumeHeader";
import { ResumeSection } from "@/app/[lang]/(main)/resume/_components/ResumeSection";
import { ResumeWork } from "@/app/[lang]/(main)/resume/_components/ResumeWork";
import { ResumeSectionItem } from "@/app/[lang]/(main)/resume/_components/ResumeSectionItem";
import { ResumeStack } from "@/app/[lang]/(main)/resume/_components/ResumeStack";
import { ResumeBullets } from "@/app/[lang]/(main)/resume/_components/ResumeBullets";
import { getDictionary, localeAlternates } from "@/i18n/dictionaries";

const LAST_UPDATED = "2026.06.30";
const HANDLE = "@jaeungkim";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    title: dict.resume.metaTitle,
    description: dict.resume.metaDescription,
    alternates: await localeAlternates("/resume"),
  };
}

export default async function ResumePage() {
  const dict = await getDictionary();

  return (
    <div className="lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-x-14">
      <ResumeHeader />

      <div className="mt-12 max-w-2xl space-y-16 lg:mt-0 lg:max-w-none lg:space-y-20">
        <ResumeSection id="about" title={dict.resume.sections.about}>
          <div className="space-y-3 text-sm leading-relaxed">
            {dict.resume.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </ResumeSection>

        <ResumeWork />
        <ResumeSection id="projects" title={dict.resume.sections.projects}>
          <ResumeSectionItem
            title="@jaeungkim/gantt-chart"
            href="https://gantt.jaeungkim.com"
          >
            <ResumeStack items={["React", "TypeScript", "Zustand", "Vite"]} />
            <ResumeBullets items={dict.resume.projects.gantt} />
          </ResumeSectionItem>
        </ResumeSection>

        <ResumeSection id="education" title={dict.resume.sections.education}>
          <ResumeSectionItem
            title={dict.resume.education.school}
            href="https://www.ubc.ca/"
            period={dict.resume.education.period}
            role={dict.resume.education.degree}
          />
        </ResumeSection>

        <footer className="space-y-6 text-sm text-muted-foreground">
          <p className="text-foreground">{dict.resume.thanks}</p>
          <div>
            <p>
              {dict.resume.lastUpdatedLabel}: {LAST_UPDATED}
            </p>
            <p>{HANDLE}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
