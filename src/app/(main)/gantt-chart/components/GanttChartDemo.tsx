"use client";

import dynamic from "next/dynamic";
import type { GanttProps } from "@jaeungkim/gantt-chart";
import "@jaeungkim/gantt-chart/style.css";
import { generateSampleTasks } from "@/src/app/(main)/gantt-chart/lib/generateTasks";

const SAMPLE_TASKS = generateSampleTasks();

const ReactGanttChart = dynamic<GanttProps>(
  () =>
    import("@jaeungkim/gantt-chart").then((module) => module.ReactGanttChart),
  { ssr: false },
);

export function GanttChartDemo() {
  return (
    <div className="bg-card">
      <ReactGanttChart
        tasks={SAMPLE_TASKS}
        height={600}
        width="100%"
        defaultScale="month"
      />
    </div>
  );
}
