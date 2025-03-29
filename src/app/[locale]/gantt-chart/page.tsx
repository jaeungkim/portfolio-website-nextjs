"use client";

import { ReactGanttChart } from "@jaeungkim/gantt-chart";

export default function Page() {
  return (
    <div className="relative overflow-auto">
      <ReactGanttChart tasks={[]} columWidth={1000} ganttHeight={500} />
    </div>
  );
}
