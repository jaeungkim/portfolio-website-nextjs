import { experiences } from "@/src/constants/resume";
import { Link } from "@/src/i18n/routing";
import SkillPill from "./components/SkillPill";
import WorkSection from "./WorkSection";
import { getExperienceUtils } from "@/src/utils/resume";
import ResumeTitle from "./components/ResumeTitle";
import Pill from "@/src/components/common/Pill";
import { getTranslations } from "next-intl/server";

export default async function ResumeWork() {
  const t = await getTranslations("resume");
  const jobData = t.raw("work");
  const jobKeys = Object.keys(jobData);

  const { calculateExperience, calculateTotalExperience } =
    await getExperienceUtils();

  return (
    <>
      <div className="flex justify-between items-center">
        <ResumeTitle title="Experiences" />

        <Pill name={calculateTotalExperience(experiences)} />
      </div>

      {jobKeys.map((key) => {
        const job = t.raw(`work.${key}`);

        const projects = job.projects
          ? Object.values(job.projects).map((project: any) => ({
              title: project.title,
              description: project.description,
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
          </div>
        );
      })}
    </>
  );
}
