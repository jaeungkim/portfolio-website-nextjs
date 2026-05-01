import { ResumeSkillRow } from "@/src/app/(main)/resume/components/ResumeSkillRow";

const SKILL_GROUPS = [
  {
    category: "Frontend",
    skills: [
      "Next.js",
      "React",
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
    category: "Backend",
    skills: ["Node.js", "Nest.js", "Express.js", "PostgreSQL", "MongoDB"],
  },
  {
    category: "DevOps",
    skills: ["AWS", "Docker", "Jenkins"],
  },
];

export function ResumeSkill() {
  return (
    <>
      <h2 className="text-lg font-bold text-primary uppercase tracking-wider">
        Skills
      </h2>

      <div className="mt-8 space-y-8">
        {SKILL_GROUPS.map((group) => (
          <ResumeSkillRow
            key={group.category}
            category={group.category}
            skills={group.skills}
          />
        ))}
      </div>
    </>
  );
}
