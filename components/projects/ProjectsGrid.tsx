import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ProjectSingle from "./ProjectSingle";
import { projectsData } from "@/data/projectsData";

function ProjectsGrid() {
  const [selectProject, setSelectProject] = useState("");

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const filteredProjects = useMemo(
    () =>
      projectsData.filter((project) => {
        const category = capitalizeFirstLetter(project.category);
        return !selectProject || category.includes(selectProject);
      }),
    [selectProject]
  );

  const renderProject = (project, index) => {
    const [ref, inView] = useInView({ triggerOnce: true });
    const animationProps = {
      initial: { opacity: 0, y: 20 },
      animate: inView ? { opacity: 1, y: 0 } : {},
      transition: { duration: 0.6, delay: index * 0.01 },
    };

    return (
      <motion.div key={project.id} ref={ref} {...animationProps}>
        <ProjectSingle {...project} />
      </motion.div>
    );
  };

  return (
    <section className="mt-14 sm:mt-16">
      {/* MOBILE */}
      <div className="grid grid-cols-1 sm:hidden gap-2">
        {filteredProjects.map(renderProject)}
      </div>

      {/* TABLET OR BIGGER */}
      <div className="hidden sm:flex gap-2">
        <div className="flex flex-1 flex-col gap-4">
          {filteredProjects
            .slice(0, Math.ceil(filteredProjects.length / 2))
            .map(renderProject)}
        </div>
        <div className="flex flex-1 flex-col gap-4">
          {filteredProjects
            .slice(Math.ceil(filteredProjects.length / 2))
            .map(renderProject)}
        </div>
      </div>
    </section>
  );
}

export default ProjectsGrid;
