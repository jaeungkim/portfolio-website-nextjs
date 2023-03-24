import React, { ChangeEvent, memo, useCallback } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const selectOptions = ["Web Application", "Mobile Application", "UI/UX Design"];

interface ProjectsFilterProps {
  setSelectProject: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ProjectsFilter = memo(({ setSelectProject }: ProjectsFilterProps) => {
  const handleSelectChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setSelectProject(e.target.value);
    },
    [setSelectProject]
  );

  return (
    <div className="relative w-52">
      <select
        onChange={handleSelectChange}
        defaultValue=""
        className="block w-full px-4 py-2 pr-8 bg-white/90 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 rounded-lg focus:ring-cyan-500 focus:border-cyan-500  dark:focus:ring-cyan-500 dark:focus:border-cyan-500 appearance-none"
      >
        <option value="">
          All Projects
        </option>
        {selectOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <ChevronDownIcon className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
});

export default ProjectsFilter;
