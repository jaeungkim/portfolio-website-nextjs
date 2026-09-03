import type { Metadata } from "next";
import { ResumeHeader } from "@/src/app/[lang]/(main)/resume/components/ResumeHeader";
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
    <>
      <ResumeHeader />
      <hr className="my-6 h-px bg-border border-0" />
      <ResumeWork />
      <hr className="my-6 h-px bg-border border-0" />
      <ResumeProject />
      <hr className="my-6 h-px bg-border border-0" />
      <ResumeEducation />
      <footer className="pt-36 text-center">
        <p>{dict.resume.thanks}</p>
        <div className="mt-12 space-y-1 text-sm text-muted-foreground">
          <p>
            {dict.resume.lastUpdatedLabel}: {LAST_UPDATED}
          </p>
          <p>{HANDLE}</p>
        </div>
      </footer>
    </>
  );
}
