import { ResumeSection } from "@/src/app/[lang]/(main)/resume/components/ResumeSection";
import { ResumeSectionItem } from "@/src/app/[lang]/(main)/resume/components/ResumeSectionItem";
import { getDictionary } from "@/src/i18n/dictionaries";

const UBC_URL = "https://www.ubc.ca/";

export async function ResumeEducation() {
  const dict = await getDictionary();
  const { education, sections } = dict.resume;

  return (
    <ResumeSection id="education" title={sections.education}>
      <ResumeSectionItem
        title={education.school}
        link={UBC_URL}
        meta={education.period}
        role={education.degree}
      />
    </ResumeSection>
  );
}
