import { projectsResume } from "@/src/constants/resume";
import SkillPill from "../common/SkillPill";
import ResumeTitle from "./ResumeTitle";
import Pill from "@/src/components/common/Pill";
import ExternalLink from "@/src/components/common/buttons/ExternalLink";
import { getTranslations } from "next-intl/server";

export default async function ResumeProject() {
  const t = await getTranslations("resume");
  const projectsData = t.raw("projects") as Record<
    string,
    { title: string; description: string[] }
  >;

  return (
    <div className="text-neutral-700 dark:text-neutral-300">
      <ResumeTitle title="Projects" />

      {/* Projects list */}
      {projectsResume.map((project, index) => {
        const { id, link, skills } = project;
        const i18nInfo = projectsData[id];

        if (!i18nInfo) {
          return null;
        }

        const { title, description } = i18nInfo;

        return (
          <div key={id}>
            <ProjectSection
              title={title}
              description={description}
              link={link}
              skills={skills}
            />
          </div>
        );
      })}
    </div>
  );
}

type ProjectSectionProps = {
  title: string;
  description: string[];
  link?: { label: string; url: string };
  skills: string[];
};

function ProjectSection({
  title,
  description,
  link,
  skills,
}: ProjectSectionProps) {
  return (
    <div className="mt-8 md:grid md:grid-cols-4 md:gap-4 text-neutral-700 dark:text-neutral-300">
      {/* Left side: Title */}
      <div className="flex items-start mb-2 md:mb-0">
        <ExternalLink
          additionalClassName="text-xl text-neutral-600 dark:text-neutral-400"
          link={link?.url || ""}
        >
          {title}
        </ExternalLink>
      </div>

      {/* Right side: Content */}
      <div className="space-y-2 col-span-3">
        <ul className="text-base font-normal pl-4 list-disc space-y-2">
          {description.map((desc, idx) => (
            <li key={idx}>{desc}</li>
          ))}
        </ul>

        {/* Skill Pills (from the constant array) */}
        <div className="flex flex-wrap gap-1 pl-4">
          {skills.map((skill, idx) => (
            <Pill key={idx} name={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}
