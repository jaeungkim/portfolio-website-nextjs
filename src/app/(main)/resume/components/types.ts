export interface WorkDataProjectTask {
  title: string;
  subtasks: string[];
}

export interface WorkDataProject {
  title: string;
  description: string;
  link: string;
  tasks: Record<string, WorkDataProjectTask>;
}

export interface WorkDataEntry {
  period: string;
  company: string;
  link?: string;
  location: string;
  position: string;
  details: string[];
  projects?: Record<string, WorkDataProject>;
}

export type WorkData = Record<string, WorkDataEntry>;

export interface ProjectData {
  title: string;
  description: string[];
}

export type ProjectsData = Record<string, ProjectData>;

export interface SkillCategory {
  title: string;
  skills: string[];
}

export type SkillCategories = SkillCategory[];

export interface ProjectTask {
  title?: string;
  subtasks?: string[];
}

export interface Project {
  title: string;
  description: string;
  link?: string;
  tasks: ProjectTask[];
}

export interface WorkSectionProps {
  id?: string;
  period: string;
  experience?: string;
  company: string;
  location: string;
  position: string;
  link?: string;
  skills?: string[];
  details?: string[];
  projects?: Project[];
}

export interface ResumeTitleProps {
  title: string;
}

export interface ProjectSectionProps {
  title: string;
  description: string[];
  link?: { label: string; url: string };
  skills: string[];
}
