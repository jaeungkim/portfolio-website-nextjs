import { ExternalLink } from "@/src/components/shared/ExternalLink";
import { ResumeRow } from "@/src/app/(main)/resume/components/ResumeRow";

export function ResumeEducation() {
  return (
    <>
      <h2 className="text-base font-bold text-primary uppercase tracking-wider">
        Education
      </h2>

      <div className="mt-8">
        <ResumeRow
          leading={
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              2020.04
            </p>
          }
        >
          <ExternalLink link="https://www.ubc.ca/" className="text-2xl">
            University of British Columbia
          </ExternalLink>
          <p className="text-sm font-normal text-muted-foreground italic">
            Bachelor of Science - Major in Computer Science
          </p>
        </ResumeRow>
      </div>
    </>
  );
}
