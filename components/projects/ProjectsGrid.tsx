import { useState } from "react";
import ProjectSingle from "./ProjectSingle";
import { projectsData } from "../../data/projectsData";
import ProjectsFilter from "./ProjectsFilter";
function ProjectsGrid() {
  const [selectProject, setSelectProject] = useState("");

  const filteredProjects = projectsData.filter((project) => {
    const category =
      project.category.charAt(0).toUpperCase() + project.category.slice(1);

    if (selectProject && !category.includes(selectProject)) {
      return false;
    }

    return true;
  });

  return (
    <section className="mt-16 sm:mt-20">
      {/* <ProjectsFilter setSelectProject={setSelectProject} /> */}

      {/* MOBILE */}
      <div className="grid grid-cols-1 sm:hidden gap-2">
        {filteredProjects.map((project, index) => (
          <ProjectSingle key={index} {...project} />
        ))}
      </div>

      {/* TABLET OR BIGGER */}
      <div className="hidden sm:flex gap-2">
        <div className="flex flex-col gap-4">
          {filteredProjects
            .slice(0, Math.ceil(filteredProjects.length / 2))
            .map((project, index) => (
              <ProjectSingle key={index} {...project} />
            ))}
        </div>
        <div className="flex flex-col gap-4">
          {filteredProjects
            .slice(Math.ceil(filteredProjects.length / 2))
            .map((project, index) => (
              <ProjectSingle key={index} {...project} />
            ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsGrid;
