declare module "@jaeungkim/gantt-chart" {
  import { ComponentType } from "react";

  export type DependencyType = "FS" | "SS" | "FF" | "SF";

  export interface TaskDependency {
    targetId: string;
    type: DependencyType;
  }

  export interface Task {
    id: string;
    name: string;
    startDate: string; // UTC ISO string
    endDate: string; // UTC ISO string
    parentId: string | null;
    sequence: string;
    dependencies?: TaskDependency[];
  }

  export interface GanttChartProps {
    tasks: Task[];
    onTasksChange?: (updatedTasks: Task[]) => void;
    height?: number | string;
    width?: number | string;
    theme?: "light" | "dark" | "system";
    defaultScale?: "day" | "week" | "month" | "year";
    className?: string;
  }

  export const ReactGanttChart: ComponentType<GanttChartProps>;
}
