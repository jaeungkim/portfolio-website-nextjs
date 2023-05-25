import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import ProjectSingle from "./ProjectSingle";
import { projectsData } from "../../data/projectsData";

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
    <section className="mt-14 sm:mt-16">
      {/* <ProjectsFilter setSelectProject={setSelectProject} /> */}

      {/* MOBILE */}
      <div className="grid grid-cols-1 sm:hidden gap-2">
        {filteredProjects.map((project, index) => {
          const [ref, inView] = useInView({
            triggerOnce: true,
          });

          const animationProps = {
            initial: { opacity: 0, y: 20 },
            animate: inView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 0.6, delay: index * 0.01 },
          };

          return (
            <motion.div key={index} ref={ref} {...animationProps}>
              <ProjectSingle {...project} />
            </motion.div>
          );
        })}
      </div>

      {/* TABLET OR BIGGER */}
      <div className="hidden sm:flex gap-2">
        <div className="flex flex-col gap-4">
          {filteredProjects
            .slice(0, Math.ceil(filteredProjects.length / 2))
            .map((project, index) => {
              const [ref, inView] = useInView({
                triggerOnce: true,
              });

              const animationProps = {
                initial: { opacity: 0, y: 20 },
                animate: inView ? { opacity: 1, y: 0 } : {},
                transition: { duration: 0.6, delay: index * 0.01 },
              };

              return (
                <motion.div key={index} ref={ref} {...animationProps}>
                  <ProjectSingle {...project} />
                </motion.div>
              );
            })}
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
