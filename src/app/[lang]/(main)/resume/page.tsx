import type { Metadata } from "next";
import { ResumeHeader } from "@/src/app/[lang]/(main)/resume/components/ResumeHeader";
import { ResumeSection } from "@/src/app/[lang]/(main)/resume/components/ResumeSection";
import { ResumeWork } from "@/src/app/[lang]/(main)/resume/components/ResumeWork";
import { ResumeProject } from "@/src/app/[lang]/(main)/resume/components/ResumeProject";
import { ResumeEducation } from "@/src/app/[lang]/(main)/resume/components/ResumeEducation";
import { getDictionary, localeAlternates } from "@/src/i18n/dictionaries";

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
    // lg+: identity sticks in a left column while one readable column scrolls on the right.
    <div className="lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-x-14">
      <ResumeHeader />

      <div className="mt-12 max-w-2xl space-y-16 lg:mt-0 lg:max-w-none lg:space-y-20">
        <ResumeSection id="about" title={dict.nav.about}>
          <div className="space-y-3 text-sm leading-relaxed text-foreground">
            {dict.resume.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </ResumeSection>

        <ResumeWork />
        <ResumeProject />
        <ResumeEducation />

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
