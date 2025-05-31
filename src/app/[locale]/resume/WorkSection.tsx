import { Link } from "@/src/i18n/routing";
import SkillPill from "./components/SkillPill";
import ExternalLink from "@/src/components/common/ExternalLink";
import Pill from "@/src/components/common/Pill";

const WorkSection = ({
  period,
  experience,
  company,
  location,
  position,
  link,
  skills,
  details = [],
  projects = [],
}: any) => {
  return (
    <div className="md:grid md:grid-cols-4 md:gap-x-6 gap-y-6 my-8 text-neutral-700 dark:text-neutral-300">
      {/* Left Side */}

      <p className="text-2xl font-medium text-neutral-600 dark:text-neutral-400 mb-2 md:mb-0">
        {period}
      </p>
      {/* <Pill name={experience} /> */}

      {/* Right Side */}
      <div className="col-span-3 space-y-2 md:space-y-4">
        {/* 회사명 */}
        {link ? (
          <ExternalLink additionalClassName="text-2xl" link={link}>
            {company}
          </ExternalLink>
        ) : (
          <p className="text-2xl font-medium">{company}</p>
        )}

        {/* 위치/직책 */}
        <div className="space-y-1">
          <p className="text-base font-normal text-neutral-600 dark:text-neutral-400 italic">
            {location}
          </p>
          <p className="text-base font-normal text-neutral-600 dark:text-neutral-400 italic">
            {position}
          </p>
        </div>

        {/* 스킬 Pill 섹션 */}
        {skills?.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {skills.map((skill, idx) => (
              <Pill key={idx} name={skill} />
            ))}
          </div>
        )}

        {/* 회사에서 한 일 목록 */}
        {details?.length > 0 && (
          <ul className="list-disc space-y-2 pl-2 md:pl-4">
            {details.map((text, idx) => (
              <li key={idx}>{text}</li>
            ))}
          </ul>
        )}

        {/* 프로젝트 목록 */}
        {projects?.length > 0 && (
          <div className="space-y-8">
            {projects.map((project, idx) => (
              <div key={idx} className="">
                {project.link ? (
                  <ExternalLink
                    additionalClassName="text-base"
                    link={project.link}
                  >
                    <p>{project.title}</p>
                  </ExternalLink>
                ) : (
                  <p className="font-bold">{project.title}</p>
                )}

                <p className="pl-2 md:pl-4 font-bold text-base py-2">
                  {project.description}
                </p>
                <ul className="list-disc space-y-2 pl-5 text-base font-normal">
                  {project.tasks.map((task, tIdx) => (
                    <li key={tIdx}>
                      {task.title && (
                        <p className="font-semibold">{task.title}</p>
                      )}
                      {task.subtasks && (
                        <ul className="list-[circle] space-y-1 pl-5 mt-1">
                          {task.subtasks.map((sub, sIdx) => (
                            <li key={sIdx}>{sub}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkSection;
