import {
  experiences,
  calculateExperience,
  calculateTotalExperience,
} from "../lib/resume";
import workData from "./data/workData.json";
import ResumeTitle from "./ResumeTitle";
import WorkSection from "./WorkSection";
import Pill from "@/src/components/shared/Pill";
import type { WorkData } from "./types";
import { toWorkSectionProps } from "./utils/dataTransform";

const combineWorkWithExperience = (
  workData: WorkData,
  experiences: Array<{
    id: string;
    start: string;
    end?: string | null;
    skills?: string[];
  }>
) =>
  Object.entries(workData).map(([key, job]) => ({
    jobKey: key,
    job,
    experience: experiences.find((exp) => exp.id === key),
  }));

export default function ResumeWork() {
  const data = workData as WorkData;
  const workSections = combineWorkWithExperience(data, experiences);

  return (
    <>
      <div className="flex justify-between items-center">
        <ResumeTitle title="Experiences" />
        <Pill name={calculateTotalExperience(experiences)} />
      </div>

      {workSections.map(({ jobKey, job, experience }) => (
        <WorkSection
          key={jobKey}
          {...toWorkSectionProps(jobKey, job, experience?.skills)}
          experience={calculateExperience(
            experience?.start ?? "",
            experience?.end ?? null
          )}
        />
      ))}
    </>
  );
}
