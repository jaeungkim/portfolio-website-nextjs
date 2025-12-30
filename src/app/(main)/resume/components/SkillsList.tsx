import Pill from "@/src/components/shared/Pill";

interface SkillsListProps {
  skills: string[];
  className?: string;
}

export default function SkillsList({
  skills,
  className = "flex flex-wrap gap-1",
}: SkillsListProps) {
  return (
    <div className={className}>
      {skills.map((skill, idx) => (
        <Pill key={idx} name={skill} variant="skill" />
      ))}
    </div>
  );
}
