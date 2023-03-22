import React, { ChangeEvent } from "react";

const selectOptions = [
  "Web Application",
  "Mobile Application",
  "UI/UX Design",
  "Branding",
];

interface ProjectsFilterProps {
  setSelectProject: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function ProjectsFilter({ setSelectProject }: ProjectsFilterProps) {
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectProject(e.target.value);
  };

  return (
    <select
      onChange={handleSelectChange}
      defaultValue=""
      className="block p-2.5 bg-white/90 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 rounded-lg focus:ring-cyan-500 focus:border-cyan-500  dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
    >
      <option value="" selected>
        All Projects
      </option>
      {selectOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default ProjectsFilter;
