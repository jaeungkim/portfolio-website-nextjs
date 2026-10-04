import type { Metadata } from "next";
import { ExternalLink } from "@/components/shared/ExternalLink";
import { getDictionary, localeAlternates } from "@/i18n/dictionaries";

interface Project {
  key: "gantt" | "footprint";
  name: string;
  stack: string;
  inProgress?: boolean;
  links: { key: "website" | "github" | "npm"; href: string }[];
}

const PROJECTS: Project[] = [
  {
    key: "gantt",
    name: "Gantt Chart",
    stack: "React, TypeScript",
    links: [
      { key: "website", href: "https://gantt.jaeungkim.com" },
      { key: "github", href: "https://github.com/jaeungkim/gantt-chart" },
      {
        key: "npm",
        href: "https://www.npmjs.com/package/@jaeungkim/gantt-chart",
      },
    ],
  },
  {
    key: "footprint",
    name: "Footprint",
    stack: "Next.js, NestJS, PostGIS, MapLibre",
    inProgress: true,
    links: [
      { key: "github", href: "https://github.com/jaeungkim/gis-footprint" },
    ],
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    title: dict.projects.metaTitle,
    description: dict.projects.metaDescription,
    alternates: await localeAlternates("/projects"),
  };
}

export default async function ProjectsPage() {
  const dict = await getDictionary();

  return (
    <>
      <h1 className="mb-12 text-4xl font-bold sm:text-5xl">
        {dict.projects.title}
      </h1>

      <div className="flex max-w-2xl flex-col space-y-16">
        {PROJECTS.map((project) => (
          <article
            key={project.key}
            className="motion-safe:animate-in fade-in slide-in-from-bottom-5 duration-600 fill-mode-both"
          >
            <h2 className="flex items-center gap-2 text-base font-semibold">
              {project.name}
              {project.inProgress && (
                <span className="rounded-full border px-2 py-0.5 text-xs font-normal text-muted-foreground">
                  {dict.projects.inProgress}
                </span>
              )}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {dict.projects.items[project.key]}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              {project.stack}
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
              {project.links.map((link) => (
                <li key={link.key}>
                  <ExternalLink href={link.href}>
                    {dict.projects.links[link.key]}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </>
  );
}
