import { useTranslations } from "next-intl";
import { projectsResume } from "@/src/app/constants/resume";
import SkillPill from "./SkillPill";

export default function ResumeProject() {
  const t = useTranslations("resume");
  const projectsData = t.raw("projects") as Record<
    string,
    { title: string; description: string[] }
  >;

  return (
    <div className="">
      <h2 className="mb-11 text-3xl font-semibold text-cyan-500 uppercase">
        Open Source & Project
      </h2>

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

            <Divider />
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
    <div className="md:grid md:grid-cols-4 md:gap-4">
      {/* Left side: Title */}
      <div className="flex items-start">
        <h3 className="text-2xl font-medium text-[#808080]">{title}</h3>
      </div>

      {/* Right side: Content */}
      <div className="col-span-3 space-y-4">
        <ul className="text-base font-normal pl-4 md:pl-8 list-disc space-y-2">
          {description.map((desc, idx) => (
            <li key={idx}>{desc}</li>
          ))}

          {/* Link section (from the constant array) */}
          {link?.url && (
            <li>
              <a
                className="text-cyan-500 hover:underline hover:underline-offset-2"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            </li>
          )}
        </ul>

        {/* Skill Pills (from the constant array) */}
        <div className="flex flex-wrap gap-2 mt-4 pl-4">
          {skills.map((skill, idx) => (
            <SkillPill key={idx} name={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return <hr className="my-11 h-px bg-gray-200 border-0 dark:bg-gray-700" />;
}
