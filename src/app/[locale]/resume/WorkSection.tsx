import { Link } from "@/src/i18n/routing";
import SkillPill from "./SkillPill";
import ExternalLink from "@/src/components/ExternalLink";

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
    <div className="md:grid md:grid-cols-4 md:gap-x-6 gap-y-6 my-8">
      {/* Left Side */}
      <div className="mb-4 md:mb-0 flex flex-col items-start md:items-end">
        {/* 근무 기간 */}
        <p className="text-2xl font-medium text-[#808080] whitespace-nowrap">
          {period}
        </p>
        {/* 경험 기간 (X년 Y개월...) */}
        <p className="font-medium text-xs py-1 px-4 bg-cyan-200 rounded-full w-fit mt-2 md:mt-4 dark:text-zinc-800">
          {experience}
        </p>
      </div>

      {/* Right Side */}
      <div className="col-span-3 space-y-4 md:space-y-6">
        {/* 회사명 */}
        {link ? (
          <ExternalLink additionalClassName="text-2xl font-medium" link={link}>
            {company}
          </ExternalLink>
        ) : (
          <p className="text-2xl font-medium">{company}</p>
        )}

        {/* 위치/직책 */}
        <div className="space-y-1">
          <p className="text-base font-normal text-[#808080] italic">
            {location}
          </p>
          <p className="text-base font-normal text-[#808080] italic">
            {position}
          </p>
        </div>

        {/* 스킬 Pill 섹션 */}
        {skills?.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {skills.map((skill, idx) => (
              <SkillPill key={idx} name={skill} />
            ))}
          </div>
        )}

        {/* 회사에서 한 일 목록 */}
        {details?.length > 0 && (
          <ul className="list-disc space-y-2 pl-5 md:pl-8 text-base font-normal">
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
                  <p className="text-base font-medium text-cyan-400 ">
                    {project.title}
                  </p>
                )}

                <p className="pl-5 md:pl-8 font-bold text-base py-2">
                  {project.description}
                </p>
                <ul className="list-disc space-y-2 pl-5 md:pl-8 text-base font-normal">
                  {project.tasks.map((task, tIdx) => (
                    <li key={tIdx}>
                      {task.title && <strong>{task.title}</strong>}
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
