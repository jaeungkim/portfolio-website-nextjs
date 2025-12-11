import ResumeTitle from "./ResumeTitle";
import skillCategories from "./data/skillCategories.json";
import type { SkillCategories, SkillCategory } from "./types";

function SkillCategoryItem({ category }: { category: SkillCategory }) {
  return (
    <div className="md:grid md:grid-cols-4 md:gap-2">
      <div className="text-2xl font-medium text-muted-foreground mb-2 md:mb-0">
        {category.title}
      </div>
      <ul className="col-span-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 pl-5 list-disc text-base font-normal">
        {category.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}

function SkillCategoriesList({ categories }: { categories: SkillCategories }) {
  return (
    <div className="mt-8 space-y-8">
      {categories.map((category) => (
        <SkillCategoryItem key={category.title} category={category} />
      ))}
    </div>
  );
}

export default function ResumeSkill() {
  const categories = skillCategories as SkillCategories;

  return (
    <div className="text-foreground">
      <ResumeTitle title="Skills" />
      <SkillCategoriesList categories={categories} />
    </div>
  );
}
