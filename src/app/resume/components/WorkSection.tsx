import ExternalLink from "@/src/components/shared/buttons/ExternalLink";
import Pill from "@/src/components/shared/Pill";
import type { WorkSectionProps, Project, ProjectTask } from "./types";

function CompanyName({ company, link }: { company: string; link?: string }) {
  return link ? (
    <ExternalLink additionalClassName="text-2xl" link={link}>
      {company}
    </ExternalLink>
  ) : (
    <p className="text-2xl font-medium">{company}</p>
  );
}

function LocationInfo({
  location,
  position,
}: {
  location: string;
  position: string;
}) {
  return (
    <div className="space-y-1">
      <p className="text-base font-normal text-neutral-600 dark:text-neutral-400 italic">
        {location}
      </p>
      <p className="text-base font-normal text-neutral-600 dark:text-neutral-400 italic">
        {position}
      </p>
    </div>
  );
}

function SkillsList({ skills }: { skills: string[] }) {
  return (
    <div className="flex flex-wrap gap-1 pt-1">
      {skills.map((skill, idx) => (
        <Pill key={idx} name={skill} variant="skill" />
      ))}
    </div>
  );
}

function DetailsList({ details }: { details: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-2 md:pl-4">
      {details.map((text, idx) => (
        <li key={idx}>{text}</li>
      ))}
    </ul>
  );
}

function TaskItem({ task }: { task: ProjectTask }) {
  return (
    <li>
      {task.title && <p className="font-semibold">{task.title}</p>}
      {task.subtasks && (
        <ul className="list-[circle] space-y-1 pl-5 mt-1">
          {task.subtasks.map((sub, idx) => (
            <li key={idx}>{sub}</li>
          ))}
        </ul>
      )}
    </li>
  );
}

function ProjectItem({ project }: { project: Project }) {
  return (
    <div>
      {project.link ? (
        <ExternalLink additionalClassName="text-base" link={project.link}>
          <p>{project.title}</p>
        </ExternalLink>
      ) : (
        <p className="font-bold">{project.title}</p>
      )}

      <p className="pl-2 md:pl-4 font-bold text-base py-2">
        {project.description}
      </p>
      <ul className="list-disc space-y-2 pl-5 text-base font-normal">
        {project.tasks.map((task, idx) => (
          <TaskItem key={idx} task={task} />
        ))}
      </ul>
    </div>
  );
}

function ProjectsList({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-8">
      {projects.map((project, idx) => (
        <ProjectItem key={idx} project={project} />
      ))}
    </div>
  );
}

export default function WorkSection({
  period,
  company,
  location,
  position,
  link,
  skills = [],
  details = [],
  projects = [],
}: WorkSectionProps) {
  return (
    <div className="md:grid md:grid-cols-4 md:gap-x-6 gap-y-6 my-8 text-neutral-700 dark:text-neutral-300">
      <p className="text-2xl font-medium text-neutral-600 dark:text-neutral-400 mb-2 md:mb-0">
        {period}
      </p>

      <div className="col-span-3 space-y-2 md:space-y-4">
        <CompanyName company={company} link={link} />
        <LocationInfo location={location} position={position} />
        {skills.length > 0 && <SkillsList skills={skills} />}
        {details.length > 0 && <DetailsList details={details} />}
        {projects.length > 0 && <ProjectsList projects={projects} />}
      </div>
    </div>
  );
}
