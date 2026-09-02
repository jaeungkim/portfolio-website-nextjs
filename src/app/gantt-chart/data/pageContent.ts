export const USAGE_CODE = `import { useState } from "react";
import { ReactGanttChart } from "@jaeungkim/gantt-chart";
import type { Task } from "@jaeungkim/gantt-chart";
import "@jaeungkim/gantt-chart/style.css";

const initialTasks: Task[] = [
  {
    id: "design",
    name: "Design",
    startDate: "2026-03-02",
    endDate: "2026-03-06",
    parentId: null,
    sequence: "1",
    progress: 100,
  },
  {
    id: "build",
    name: "Build",
    startDate: "2026-03-09",
    endDate: "2026-03-20",
    parentId: null,
    sequence: "2",
    progress: 40,
    dependencies: [{ targetId: "design", type: "FS" }],
  },
];

export default function ProjectChart() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  return (
    <ReactGanttChart
      tasks={tasks}
      onTasksChange={setTasks}
      height={420}
      defaultScale="month"
      showTaskList
      theme="system"
    />
  );
}`;

export const TASK_FORMAT_CODE = `// Six fields are required: id, name, startDate, endDate, parentId, sequence.
// Everything else is optional. There is no runtime validation.
interface Task {
  id: string;
  name: string;
  /** Anything dayjs.utc() parses. "2026-03-02" is UTC midnight */
  startDate: string;
  /** Same parsing. Ignored for a milestone */
  endDate: string;
  /** Id of the parent, or null for a root row */
  parentId: string | null;
  /** Dot-separated numbers, e.g. "2.10" - decides row order */
  sequence: string;

  /** "milestone" renders a diamond at startDate (default "task") */
  type?: "task" | "milestone";
  /** 0-100 (%), clamped. Omitted means no progress handle */
  progress?: number;
  /** Any CSS color - the progress fill and hover shade derive from it */
  color?: string;
  /** Added to both the bar and the task-list row */
  className?: string;
  /** Tasks sharing a lane pack onto one row inside their group */
  lane?: string;
  /** Predecessors this task waits on */
  dependencies?: TaskDependency[];

  /** Blocks every gesture on this task - beats the chart's readOnly */
  readOnly?: boolean;
  allowMove?: boolean;
  allowResize?: boolean;
  allowProgressChange?: boolean;
  allowLinkCreate?: boolean;
  allowLinkDelete?: boolean;
  /** Drag bounds (ISO strings) - fall back to the chart's minDate / maxDate */
  minDate?: string;
  maxDate?: string;

  /** The scheduling engine never moves this task; it still constrains successors */
  manuallyScheduled?: boolean;
  /** Planned snapshot, drawn as a thin bar under the live one (UTC ISO) */
  baselineStart?: string;
  baselineEnd?: string;
}

interface TaskDependency {
  /** Id of the predecessor - a link is stored on the successor */
  targetId: string;
  type: DependencyType;
  /** Signed days, default 0. Positive is lag, negative is lead */
  lag?: number;
}

type DependencyType = "FS" | "SS" | "FF" | "SF";
// FS = Finish-to-Start
// SS = Start-to-Start
// FF = Finish-to-Finish
// SF = Start-to-Finish

// Dates go in as anything dayjs.utc() parses and come back out of
// onTasksChange as YYYY-MM-DDTHH:mm:ss.sssZ. There is no local time-zone mode.`;

interface TocItem {
  id: string;
  label: string;
}

export const TOC_ITEMS: TocItem[] = [
  { id: "installation", label: "Installation" },
  { id: "features", label: "Features" },
  { id: "usage", label: "Usage" },
  { id: "task-format", label: "Task Format" },
  { id: "demo", label: "Live Demo" },
  { id: "docs", label: "Documentation" },
];

interface Feature {
  title: string;
  description: string;
}

export const FEATURES: Feature[] = [
  {
    title: "Six timeline scales",
    description:
      "Hour, day, week, month, quarter and year, each with its own tick unit, header format and drag step.",
  },
  {
    title: "Auto-scheduling",
    description:
      "schedulingPolicy moves successors when a bar is dragged: shift-on-overlap only when a link breaks, maintain-gap in both directions.",
  },
  {
    title: "Working-day calendar",
    description:
      "With workingCalendar on, durations, drag results and dependency lag skip weekends and the dates listed in holidays.",
  },
  {
    title: "Critical path and slack",
    description:
      "criticalPath marks zero-slack bars and fills in earlyStart, lateFinish, totalSlack and freeSlack on every task.",
  },
  {
    title: "Four dependency types",
    description:
      "FS, SS, FF and SF links with optional lag, drawn by dragging between two bars and removed with Delete.",
  },
  {
    title: "Grouping and lanes",
    description:
      "groupBy splits rows into swimlanes with a header row each, and the task field lane packs non-overlapping tasks onto one row.",
  },
  {
    title: "Row reordering",
    description:
      "allowRowReorder lets a task-list row be dragged among its siblings; horizontal offset indents or outdents it like an outliner.",
  },
  {
    title: "Markers, bands and baselines",
    description:
      "Labelled vertical lines, shaded date ranges, and a planned bar drawn under any task carrying baselineStart.",
  },
  {
    title: "Keyboard and screen readers",
    description:
      "The chart renders as an ARIA treegrid: arrows navigate cells, and Alt or Shift arrows move and resize the focused task.",
  },
  {
    title: "Imperative handle",
    description:
      "A ref exposes scrollToTask, zoomToFit, undo and redo (100 steps by default), and exportToPng.",
  },
  {
    title: "Virtualized rendering",
    description:
      "Rows render with five rows of overscan, and bars outside the horizontal window are culled.",
  },
  {
    title: "Headless scheduling core",
    description:
      "scheduleTasks, computeCriticalPath and the tree helpers import no React and touch no DOM, so a server or worker can run them.",
  },
];

interface DocLink {
  title: string;
  description: string;
  href: string;
}

const DOCS_BASE = "https://gantt.jaeungkim.com/docs";

export const DOCS_EN_INDEX = DOCS_BASE;

export const DOCS_KO_INDEX = "https://gantt.jaeungkim.com/ko/docs";

export const DOC_LINKS: DocLink[] = [
  {
    title: "Documentation index",
    description: "Every guide and reference page, in reading order.",
    href: `${DOCS_BASE}`,
  },
  {
    title: "Quick start",
    description:
      "Install, import the stylesheet, and get to a chart whose edits land in your state.",
    href: `${DOCS_BASE}/quick-start`,
  },
  {
    title: "Task data",
    description:
      "The Task shape, how dates are parsed, and how the tasks prop is compared.",
    href: `${DOCS_BASE}/task-data`,
  },
  {
    title: "Editing tasks",
    description:
      "Move, resize, progress, per-task permissions, touch, and drawing a new task.",
    href: `${DOCS_BASE}/editing`,
  },
  {
    title: "Dependencies",
    description: "The four link types, lag, and drawing or deleting arrows.",
    href: `${DOCS_BASE}/dependencies`,
  },
  {
    title: "Scheduling",
    description:
      "Auto-scheduling policies, the working calendar, critical path and baselines.",
    href: `${DOCS_BASE}/scheduling`,
  },
  {
    title: "Keyboard and screen readers",
    description:
      "The key map, the ARIA treegrid, and the gaps that are still open.",
    href: `${DOCS_BASE}/accessibility`,
  },
  {
    title: "Theming",
    description:
      "The theme prop and the 33 CSS custom properties every color reads.",
    href: `${DOCS_BASE}/theming`,
  },
];
