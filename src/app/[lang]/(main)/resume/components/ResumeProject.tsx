import { ResumeSectionItem } from "@/src/app/[lang]/(main)/resume/components/ResumeSectionItem";
import { ResumeTitle } from "@/src/app/[lang]/(main)/resume/components/ResumeTitle";
import { ResumePills } from "@/src/app/[lang]/(main)/resume/components/ResumePills";
import { ResumeBullets } from "@/src/app/[lang]/(main)/resume/components/ResumeBullets";
import { getDictionary } from "@/src/i18n/dictionaries";

// Titles, links and tech names do not translate — only the bullets do.
const PROJECTS = [
  {
    key: "gantt",
    title: "React Gantt Chart",
    link: "https://gantt.jaeungkim.com",
    pills: ["React", "Vite", "Zustand"],
  },
  {
    key: "portfolio",
    title: "Portfolio Website",
    link: "https://github.com/jaeungkim/portfolio-website-nextjs",
    pills: [
      "Next 15 (App)",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "Three.js",
    ],
  },
  {
    key: "bcGovernment",
    title: "BC Government",
    link: "https://github.com/jaeungkim/moti-is24-code-challenge",
    pills: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Docker",
    ],
  },
  {
    key: "lostArk",
    title: "Lost Ark Discord Bot",
    link: "https://github.com/jaeungkim/lostark_bot",
    pills: ["Node.js", "Discord.js", "Heroku", "JavaScript"],
  },
] as const;

export async function ResumeProject() {
  const dict = await getDictionary();

  return (
    <>
      <h2 className="text-base font-bold text-primary uppercase tracking-wider">
        {dict.resume.sections.projects}
      </h2>

      {PROJECTS.map((project) => (
        <ResumeSectionItem key={project.key}>
          <ResumeTitle link={project.link}>{project.title}</ResumeTitle>
          <ResumePills items={[...project.pills]} />
          <ResumeBullets items={dict.resume.projects[project.key]} />
        </ResumeSectionItem>
      ))}
    </>
  );
}
