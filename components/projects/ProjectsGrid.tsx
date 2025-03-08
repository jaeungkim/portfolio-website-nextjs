import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ProjectSingle from "./ProjectSingle";
import { projectsData } from "@/data/projectsData";

const ProjectItem = ({ project, index }: { project: any; index: number }) => {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.01 }}
    >
      <ProjectSingle {...project} />
    </motion.div>
  );
};

function ProjectsGrid() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredProjects = useMemo(
    () =>
      selectedCategory
        ? projectsData.filter(
            (project) =>
              project.category.toLowerCase() === selectedCategory.toLowerCase()
          )
        : projectsData,
    [selectedCategory]
  );

  const mobileView = useMemo(
    () =>
      filteredProjects.map((project, index) => (
        <ProjectItem key={project.id} project={project} index={index} />
      )),
    [filteredProjects]
  );

  const desktopView = useMemo(() => {
    const midpoint = Math.ceil(filteredProjects.length / 2);
    return (
      <div className="hidden sm:flex gap-2">
        <div className="flex flex-1 flex-col gap-4">
          {filteredProjects.slice(0, midpoint).map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-4">
          {filteredProjects.slice(midpoint).map((project, index) => (
            <ProjectItem
              key={project.id}
              project={project}
              index={index + midpoint}
            />
          ))}
        </div>
      </div>
    );
  }, [filteredProjects]);

  return (
    <section className="mt-14 sm:mt-16">
      <div className="grid grid-cols-1 sm:hidden gap-2">{mobileView}</div>
      {desktopView}
    </section>
  );
}

export default ProjectsGrid;
