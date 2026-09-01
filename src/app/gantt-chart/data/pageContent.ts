export const USAGE_CODE = `import { ReactGanttChart } from "@jaeungkim/gantt-chart";
import type { Task } from "@jaeungkim/gantt-chart";

const tasks: Task[] = [
  {
    id: "1",
    name: "Project Kickoff",
    startDate: "2024-06-01T09:00:00Z",
    endDate: "2024-06-03T17:00:00Z",
    parentId: null,
    sequence: "1",
    dependencies: [],
  },
  {
    id: "2",
    name: "Requirements Gathering",
    startDate: "2024-06-04T09:00:00Z",
    endDate: "2024-06-10T17:00:00Z",
    parentId: null,
    sequence: "2",
    dependencies: [{ targetId: "1", type: "FS" }],
  },
];

export default function App() {
  return (
    <ReactGanttChart
      tasks={tasks}
      height={600}
      width="100%"
      theme="system"
      defaultScale="month"
      onTasksChange={(updatedTasks) => console.log(updatedTasks)}
    />
  );
}`;

export const TASK_FORMAT_CODE = `interface Task {
  id: string;
  name: string;
  startDate: string; // UTC ISO string
  endDate: string; // UTC ISO string
  parentId: string | null;
  sequence: string;
  dependencies?: TaskDependency[];
}

interface TaskDependency {
  targetId: string;
  type: DependencyType;
}

type DependencyType = "FS" | "SS" | "FF" | "SF";
// FS = Finish-to-Start
// SS = Start-to-Start
// FF = Finish-to-Finish
// SF = Start-to-Finish`;

export const TOC_ITEMS = [
  { id: "installation", label: "Installation" },
  { id: "features", label: "Features" },
  { id: "usage", label: "Usage" },
  { id: "task-format", label: "Task Format" },
  { id: "demo", label: "Live Demo" },
  { id: "props", label: "Props" },
  { id: "scales", label: "Timeline Scales" },
];

export const FEATURES = [
  {
    title: "Timeline scales",
    description:
      "Day, week, month, and year views with matching drag intervals.",
  },
  {
    title: "Virtualized rendering",
    description:
      "Keeps large task sets responsive by rendering only what is visible.",
  },
  {
    title: "Dependency support",
    description:
      "Supports FS, SS, FF, and SF relationships with auto-routed connectors.",
  },
  {
    title: "Interactive editing",
    description:
      "Drag bars, resize edges, and push updates back through a single callback.",
  },
  {
    title: "Theme-aware",
    description:
      "Fits light, dark, and system themes without extra wrapper code.",
  },
  {
    title: "Minimal API surface",
    description:
      "The exported component stays small enough to drop into product code quickly.",
  },
];

export const PROP_ROWS: string[][] = [
  ["tasks", "Task[]", "[]", "Array of task objects to render."],
  [
    "onTasksChange",
    "(tasks) => void",
    "undefined",
    "Receives updated task data after edits.",
  ],
  [
    "height",
    "number | string",
    "600",
    "Chart height in pixels or any CSS length.",
  ],
  [
    "width",
    "number | string",
    `"100%"`,
    "Chart width in pixels or any CSS length.",
  ],
  [
    "theme",
    `"light" | "dark" | "system"`,
    `"system"`,
    "Theme mode applied inside the chart.",
  ],
  [
    "defaultScale",
    `"day" | "week" | "month" | "year"`,
    `"month"`,
    "Initial visible timeline scale.",
  ],
  [
    "className",
    "string",
    "undefined",
    "Additional class name for the outer wrapper.",
  ],
];

export const SCALE_ROWS: string[][] = [
  ["day", "Day", "Hour", "1 hour"],
  ["week", "Week", "Day", "6 hours"],
  ["month", "Month", "Day", "1 day"],
  ["year", "Year", "Month", "7 days"],
];
