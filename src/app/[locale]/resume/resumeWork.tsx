import { experiences } from "@/src/app/constants/resume";
import { Link } from "@/src/i18n/routing";
import SkillPill from "./SkillPill";
import WorkSection from "./WorkSection";
import { useExperienceUtils } from "@/src/app/utils/resume";
import { useTranslations } from "next-intl";

export default function ResumeWork() {
  const { calculateExperience, calculateTotalExperience } =
    useExperienceUtils();
  const t = useTranslations("resume");

  const jobData = t.raw("work");
  const jobKeys = Object.keys(jobData);

  return (
    <>
      <div className="flex justify-between">
        <div className="mb-4 font-semibold text-cyan-500 text-3xl uppercase">
          Experience
        </div>
        {/* pill of total */}
        <div className="mt-2">
          <p className="text-xs py-1 px-4 bg-cyan-200 rounded-full whitespace-nowrap dark:text-zinc-800">
            {calculateTotalExperience(experiences)}
          </p>
        </div>
      </div>

      {jobKeys.map((key) => {
        const job = t.raw(`work.${key}`);

        const projects = job.projects
          ? Object.values(job.projects).map((project: any) => ({
              title: project.title,
              link: project.link,
              tasks: Object.values(project.tasks).map((task: any) => ({
                title: task.title,
                subtasks: task.subtasks,
              })),
            }))
          : [];

        return (
          <div key={key}>
            <WorkSection
              id={key}
              period={job.period}
              experience={calculateExperience(
                experiences.find((exp) => exp.id === key)?.start ?? "",
                experiences.find((exp) => exp.id === key)?.end ?? null
              )}
              company={job.company}
              location={job.location}
              position={job.position}
              link={job.link}
              skills={experiences.find((exp) => exp.id === key)?.skills ?? []}
              details={job.details}
              projects={projects}
            />
            <hr className="my-11 h-px bg-gray-200 border-0 dark:bg-gray-700" />
          </div>
        );
      })}
    </>
  );
}
