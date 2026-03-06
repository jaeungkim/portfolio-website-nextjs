import ResumeSectionItem from "./ResumeSectionItem";
import { resumeProjects } from "./resume.data";

export default function ResumeProject() {
  return (
    <>
      <div className="font-semibold text-foreground text-3xl uppercase">
        Projects
      </div>

      {resumeProjects.map((project) => (
        <ResumeSectionItem
          key={project.title}
          title={project.title}
          link={project.link}
          bullets={project.bullets}
          pills={project.pills}
        />
      ))}
    </>
  );
}
