"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { ReactGanttChart } from "@jaeungkim/gantt-chart";

export default function Page() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  return (
    <div className="force-light relative overflow-auto w-full h-svh">
      <ReactGanttChart tasks={[]} columWidth="w-fit" ganttHeight="100%" />
    </div>
  );
}
