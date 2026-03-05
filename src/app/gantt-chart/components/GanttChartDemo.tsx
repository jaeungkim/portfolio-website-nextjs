"use client";

import dynamic from "next/dynamic";
import type { GanttChartProps } from "@jaeungkim/gantt-chart";
import "@jaeungkim/gantt-chart/style.css";
import { useMemo } from "react";
import { generateSampleTasks } from "../lib/generateTasks";

const ReactGanttChart = dynamic<GanttChartProps>(
  () => import("@jaeungkim/gantt-chart").then((m) => m.ReactGanttChart),
  { ssr: false },
);

export default function GanttChartDemo() {
  const sampleTasks = useMemo(() => generateSampleTasks(), []);

  return (
    <div className="bg-card">
      <ReactGanttChart
        tasks={sampleTasks}
        height={600}
        width="100%"
        defaultScale="month"
      />
    </div>
  );
}
