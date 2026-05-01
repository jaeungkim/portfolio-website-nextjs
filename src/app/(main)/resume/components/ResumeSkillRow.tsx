interface ResumeSkillRowProps {
  category: string;
  skills: string[];
}

export function ResumeSkillRow({ category, skills }: ResumeSkillRowProps) {
  return (
    <div className="md:grid md:grid-cols-4 md:gap-2">
      <div className="text-2xl font-medium text-muted-foreground mb-2 md:mb-0">
        {category}
      </div>
      <ul className="col-span-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 pl-5 list-disc text-base">
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}
