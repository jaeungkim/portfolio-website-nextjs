import { ExternalLink } from "@/src/components/shared/ExternalLink";
import { ResumeRow } from "@/src/app/[lang]/(main)/resume/components/ResumeRow";
import { getDictionary } from "@/src/i18n/dictionaries";

const UBC_URL = "https://www.ubc.ca/";

export async function ResumeEducation() {
  const dict = await getDictionary();
  const { education, sections } = dict.resume;

  return (
    <>
      <h2 className="text-base font-bold text-primary uppercase tracking-wider">
        {sections.education}
      </h2>

      <div className="mt-8">
        <ResumeRow
          leading={
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {education.period}
            </p>
          }
        >
          <ExternalLink link={UBC_URL} className="text-2xl">
            {education.school}
          </ExternalLink>
          <p className="text-sm font-normal text-muted-foreground italic">
            {education.degree}
          </p>
        </ResumeRow>
      </div>
    </>
  );
}
