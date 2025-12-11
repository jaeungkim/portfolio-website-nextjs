declare module "@jaeungkim/gantt-chart" {
  import { ComponentType } from "react";

  export interface GanttChartProps {
    tasks: unknown[];
    columWidth?: string;
    ganttHeight?: string;
  }

  export const ReactGanttChart: ComponentType<GanttChartProps>;
}

