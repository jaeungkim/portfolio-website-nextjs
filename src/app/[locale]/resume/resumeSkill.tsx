import ResumeTitle from "./components/ResumeTitle";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "React Query",
      "Recoil",
      "Zustand",
      "Redux",
      "JavaScript",
      "TypeScript",
      "WebGL",
      "Three.js",
      "GSAP",
      "Tailwind",
      "Storybook",
      "Figma",
    ],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Nest.js", "Express.js", "PostgreSQL", "MongoDB"],
  },
  {
    title: "DevOps",
    skills: ["AWS", "NGINX", "Docker", "Jenkins"],
  },
  {
    title: "Misc.",
    skills: [
      "Java",
      "Agile/Scrum",
      "Jira",
      "Confluence",
      "Git",
      "GitHub",
      "GitLab",
      "BitBucket",
      "Slack",
      "VS Code",
    ],
  },
];

export default function ResumeSkill() {
  return (
    <div className="text-neutral-700 dark:text-neutral-300">
      <ResumeTitle title="Skills" />

      <div className="mt-8 space-y-8">
        {skillCategories.map(({ title, skills }) => (
          <div key={title} className="md:grid md:grid-cols-4 md:gap-2">
            <div className="text-2xl font-medium text-neutral-600 dark:text-neutral-400 mb-2 md:mb-0">
              {title}
            </div>
            <ul className="col-span-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 pl-5 list-disc text-base font-normal">
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
