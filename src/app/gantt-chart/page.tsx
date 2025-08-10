"use client";

import dynamic from "next/dynamic";

interface GanttChartProps {
  tasks: unknown[];
  columWidth?: string;
  ganttHeight?: string;
}

// Avoid bundling heavy chart code into main client bundle; load on demand
const ReactGanttChart = dynamic<GanttChartProps>(
  () => import("@jaeungkim/gantt-chart").then((m) => m.ReactGanttChart),
  { ssr: false }
);

export default function Page() {
  return (
    <div className="force-light relative overflow-auto w-full h-svh">
      <ReactGanttChart tasks={[]} columWidth="w-fit" ganttHeight="100%" />
    </div>
  );
}
