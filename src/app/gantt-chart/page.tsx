"use client";

import { ReactGanttChart } from "@jaeungkim/gantt-chart";

export default function Page() {
  return (
    <div className="force-light relative overflow-auto w-full h-svh">
      <ReactGanttChart tasks={[]} columWidth="w-fit" ganttHeight="100%" />
    </div>
  );
}
