import { ResumeSection } from "@/src/app/[lang]/(main)/resume/components/ResumeSection";
import { ResumeSectionItem } from "@/src/app/[lang]/(main)/resume/components/ResumeSectionItem";
import { ResumeStack } from "@/src/app/[lang]/(main)/resume/components/ResumeStack";
import { ResumeBullets } from "@/src/app/[lang]/(main)/resume/components/ResumeBullets";
import { getDictionary } from "@/src/i18n/dictionaries";

// Title, link and tech names do not translate; only the bullets do.
const GANTT_URL = "https://gantt.jaeungkim.com";
const GANTT_STACK = ["React", "TypeScript", "Zustand", "Vite"];

export async function ResumeProject() {
  const dict = await getDictionary();
  const { sections, projects } = dict.resume;

  return (
    <ResumeSection id="projects" title={sections.projects}>
      <ResumeSectionItem title="@jaeungkim/gantt-chart" link={GANTT_URL}>
        <ResumeStack items={GANTT_STACK} />
        <ResumeBullets items={projects.gantt} />
      </ResumeSectionItem>
    </ResumeSection>
  );
}
