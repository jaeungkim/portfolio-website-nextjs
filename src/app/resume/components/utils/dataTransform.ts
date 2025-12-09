import type { WorkDataEntry, WorkDataProject, Project } from "../types";

const toProject = (project: WorkDataProject): Project => ({
  title: project.title,
  description: project.description,
  link: project.link,
  tasks: Object.values(project.tasks).map((task) => ({
    title: task.title,
    subtasks: task.subtasks,
  })),
});

export const toProjects = (
  projects?: Record<string, WorkDataProject>
): Project[] => (projects ? Object.values(projects).map(toProject) : []);

export const toWorkSectionProps = (
  jobKey: string,
  job: WorkDataEntry,
  skills: string[] = []
) => ({
  id: jobKey,
  period: job.period,
  company: job.company,
  location: job.location,
  position: job.position,
  link: job.link,
  skills,
  details: job.details,
  projects: toProjects(job.projects),
});
