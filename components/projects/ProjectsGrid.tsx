import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import ProjectSingle from "./ProjectSingle";
import { projectsData } from "../../data/projectsData";
import ProjectsFilter from "./ProjectsFilter";
function ProjectsGrid() {
  const [searchProject, setSearchProject] = useState("");
  const [selectProject, setSelectProject] = useState("");

  const filteredProjects = projectsData.filter((project) => {
    const projectTitle = project.title.toLowerCase();
    const searchValue = searchProject.toLowerCase();
    const category =
      project.category.charAt(0).toUpperCase() + project.category.slice(1);

    if (searchValue && !projectTitle.includes(searchValue)) {
      return false;
    }

    if (selectProject && !category.includes(selectProject)) {
      return false;
    }

    return true;
  });

  return (
    <section className="mt-16 sm:mt-20">
      <ProjectsFilter setSelectProject={setSelectProject} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 sm:gap-5">
        {filteredProjects.map((project, index) => (
          <ProjectSingle key={index} {...project} />
        ))}
      </div>
    </section>
  );
}

export default ProjectsGrid;
