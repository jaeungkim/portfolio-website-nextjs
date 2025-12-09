import { projectsResume } from "../lib/resume";
import projectsData from "./data/projectsData.json";
import ResumeTitle from "./ResumeTitle";
import ProjectSection from "./ProjectSection";
import type { ProjectsData } from "./types";

const combineProjectData = (
  projectsResume: Array<{
    id: string;
    link?: { label: string; url: string };
    skills: string[];
  }>,
  projectsData: ProjectsData
) =>
  projectsResume
    .map((project) => ({
      ...project,
      projectInfo: projectsData[project.id],
    }))
    .filter(({ projectInfo }) => projectInfo !== undefined);

export default async function ResumeProject() {
  const data = projectsData as ProjectsData;

  const projects = combineProjectData(projectsResume, data);

  return (
    <div className="text-neutral-700 dark:text-neutral-300">
      <ResumeTitle title="Projects" />

      {projects.map(({ id, projectInfo, link, skills }) => (
        <ProjectSection
          key={id}
          title={projectInfo.title}
          description={projectInfo.description}
          link={link}
          skills={skills}
        />
      ))}
    </div>
  );
}
