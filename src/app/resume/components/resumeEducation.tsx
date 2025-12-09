import ResumeTitle from "./ResumeTitle";
import ExternalLink from "@/src/components/shared/buttons/ExternalLink";

export default function ResumeEducation() {
  return (
    <>
      <ResumeTitle title="Education" />

      <div className="mt-8 md:grid md:grid-cols-4 md:gap-4">
      <div className="text-2xl font-medium text-neutral-600 dark:text-neutral-400 mb-2 md:mb-0">
          2020.04
        </div>
        <div className="col-span-3 space-y-2">
          <ExternalLink
            additionalClassName="text-2xl"
            link="https://www.ubc.ca/"
          >
            University of British Columbia
          </ExternalLink>
          <p className="text-base font-normal text-[#808080] italic">
            Bachelor of Science - Major in Computer Science
          </p>
        </div>
      </div>
    </>
  );
}
