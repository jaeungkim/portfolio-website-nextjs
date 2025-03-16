"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ProjectSingle from "./ProjectSingle";
import { projectsData } from "@/data/projectsData";

type ProjectType = {
  id: number;
  category: string;
  [key: string]: any; // Adjust as needed
};

type ProjectItemProps = {
  project: ProjectType;
  index: number;
};

function ProjectItem({ project, index }: ProjectItemProps) {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.01 }}
    >
      <ProjectSingle
        id={project.id.toString()}
        img={project.img}
        title={project.title}
        date={project.date}
        videoSrc={project.videoSrc}
      />
    </motion.div>
  );
}

export default function ProjectsGrid() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredProjects = useMemo(() => {
    if (!selectedCategory) return projectsData;
    return projectsData.filter(
      (project) =>
        project.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [selectedCategory]);

  const renderMobileView = filteredProjects.map((project, i) => (
    <ProjectItem key={project.id} project={project} index={i} />
  ));

  // Split into two columns for desktop
  const midpoint = Math.ceil(filteredProjects.length / 2);
  const renderDesktopView = (
    <div className="hidden sm:flex gap-2">
      <div className="flex flex-1 flex-col gap-4">
        {filteredProjects.slice(0, midpoint).map((project, i) => (
          <ProjectItem key={project.id} project={project} index={i} />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-4">
        {filteredProjects.slice(midpoint).map((project, i) => (
          <ProjectItem
            key={project.id}
            project={project}
            index={i + midpoint}
          />
        ))}
      </div>
    </div>
  );

  return (
    <section className="mt-14 sm:mt-16">
      {/* Mobile */}
      <div className="grid grid-cols-1 sm:hidden gap-2">{renderMobileView}</div>
      {/* Desktop */}
      {renderDesktopView}
    </section>
  );
}
