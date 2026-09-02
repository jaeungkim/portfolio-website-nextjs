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
  { id: "props", label: "Props" },
  { id: "scales", label: "Timeline Scales" },
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

/** [prop, type, default, description] */
export type PropRow = [string, string, string, string];

interface PropGroup {
  id: string;
  title: string;
  rows: PropRow[];
}

export const PROP_GROUPS: PropGroup[] = [
  {
    id: "data",
    title: "Data",
    rows: [
      [
        "tasks",
        "Task[]",
        "[]",
        "The task array. Reflected only when the contents actually change.",
      ],
      [
        "onTasksChange",
        "(updatedTasks: Task[]) => void",
        "none",
        "Fires with the whole array after any committed edit.",
      ],
    ],
  },
  {
    id: "layout",
    title: "Layout and size",
    rows: [
      [
        "height",
        "number | string",
        "600",
        "Chart height, a number in px or any CSS length.",
      ],
      [
        "width",
        "number | string",
        `"100%"`,
        "Chart width, a number in px or any CSS length.",
      ],
      [
        "className",
        "string",
        "none",
        "Appended to the container's gantt-container class.",
      ],
    ],
  },
  {
    id: "task-list",
    title: "Task list",
    rows: [
      [
        "showTaskList",
        "boolean",
        "columns !== undefined",
        "Shows the left pane. Passing columns alone turns it on.",
      ],
      [
        "columns",
        "GanttColumn[]",
        "Name / Start / End",
        "Column definitions for the pane. The first column carries the tree indentation.",
      ],
    ],
  },
  {
    id: "hierarchy",
    title: "Hierarchy and grouping",
    rows: [
      [
        "hierarchy",
        "boolean",
        "false",
        "Derives depth from parentId and turns rows with children into summary rows.",
      ],
      [
        "collapsedIds",
        "string[]",
        "none",
        "Controlled collapsed set. Given, the chart stops tracking its own.",
      ],
      [
        "defaultCollapsedIds",
        "string[]",
        "[]",
        "Uncontrolled seed, read once on mount.",
      ],
      [
        "onCollapsedChange",
        "(collapsedIds: string[]) => void",
        "none",
        "Fires on every collapse toggle, controlled or not.",
      ],
      [
        "groupBy",
        "GanttGroupBy",
        "none",
        "A task field name or accessor that groups rows into swimlanes.",
      ],
      [
        "ungroupedLabel",
        "string",
        `"Ungrouped"`,
        "Header label for tasks with no group value.",
      ],
    ],
  },
  {
    id: "timeline",
    title: "Timeline and range",
    rows: [
      [
        "defaultScale",
        "GanttScaleKey",
        `"month"`,
        "Seed scale, used only when no scale is stored under storageKey.",
      ],
      [
        "visibleStart",
        "string",
        "none",
        "Pins the timeline's start to this ISO date.",
      ],
      [
        "visibleEnd",
        "string",
        "none",
        "Pins the timeline's end to this ISO date.",
      ],
      [
        "showNonWorkingDays",
        "boolean",
        "true",
        "Shades weekends and holidays.",
      ],
      [
        "holidays",
        "string[]",
        "none",
        "ISO date strings shaded as non-working.",
      ],
      [
        "isNonWorkingDay",
        "(date: Dayjs) => boolean",
        "none",
        "Replaces the built-in weekend plus holidays test.",
      ],
      [
        "markers",
        "GanttMarker[]",
        "[]",
        "Labelled vertical lines at given dates.",
      ],
      [
        "rangeBands",
        "GanttRangeBand[]",
        "[]",
        "Shaded bands covering a date range.",
      ],
      [
        "onRangeChange",
        "(range: GanttDateRange) => void",
        "none",
        "Fires whenever the rendered range changes.",
      ],
    ],
  },
  {
    id: "zoom",
    title: "Zoom and scrolling",
    rows: [
      [
        "zoomOnWheel",
        "boolean",
        "false",
        "Ctrl/Cmd + wheel steps through the scale ladder.",
      ],
      [
        "infiniteScroll",
        "boolean",
        "false",
        "Grows the rendered range when either end is approached.",
      ],
      [
        "initialScrollTo",
        `"today" | string`,
        "none",
        "Scrolls once, after the timeline first renders.",
      ],
      [
        "autoScrollOnDrag",
        "boolean",
        "true",
        "A bar drag at a viewport edge scrolls the timeline.",
      ],
    ],
  },
  {
    id: "editing",
    title: "Editing",
    rows: [
      [
        "readOnly",
        "boolean",
        "false",
        "Blocks moving, resizing and progress dragging on every task.",
      ],
      [
        "allowMove",
        "boolean",
        "!readOnly",
        "Allows moving bars, overriding readOnly.",
      ],
      [
        "allowResize",
        "boolean",
        "!readOnly",
        "Allows resizing bars, overriding readOnly.",
      ],
      [
        "allowProgressChange",
        "boolean",
        "!readOnly",
        "Allows dragging the progress handle, overriding readOnly.",
      ],
      [
        "allowTaskCreate",
        "boolean",
        "!readOnly",
        "Allows drawing a new task on empty row space. Needs onTaskCreate to do anything.",
      ],
      [
        "allowRowReorder",
        "boolean",
        "false",
        "Allows dragging a task-list row to reorder and re-parent.",
      ],
      [
        "minDate",
        "string",
        "none",
        "Earliest ISO date any bar may be dragged to.",
      ],
      [
        "maxDate",
        "string",
        "none",
        "Latest ISO date any bar may be dragged to.",
      ],
    ],
  },
  {
    id: "dependencies",
    title: "Dependencies",
    rows: [
      [
        "allowLinkCreate",
        "boolean",
        "!readOnly",
        "Allows drawing dependencies between bars.",
      ],
      [
        "allowLinkDelete",
        "boolean",
        "!readOnly",
        "Allows selecting and deleting dependency arrows.",
      ],
      [
        "onDependencyCreate",
        "(change: GanttDependencyChange) => boolean | void",
        "none",
        "Runs before a drawn link is applied; false rejects it.",
      ],
      [
        "onDependencyDelete",
        "(change: GanttDependencyChange) => boolean | void",
        "none",
        "Runs before an arrow is removed; false keeps it.",
      ],
    ],
  },
  {
    id: "scheduling",
    title: "Scheduling",
    rows: [
      [
        "schedulingPolicy",
        `"off" | "shift-on-overlap" | "maintain-gap"`,
        `"off"`,
        "How a move propagates to the dragged task's successors.",
      ],
      [
        "onSchedulingCycle",
        "(taskIds: string[]) => void",
        "none",
        "Fires with the ids caught in a dependency cycle.",
      ],
      [
        "workingCalendar",
        "boolean",
        "false",
        "Routes every date calculation through a working-day calendar.",
      ],
      [
        "criticalPath",
        "boolean",
        "false",
        "Computes the critical path and fills in the slack fields.",
      ],
    ],
  },
  {
    id: "rendering",
    title: "Rendering",
    rows: [
      [
        "renderBar",
        "GanttBarRenderer",
        "none",
        "Replaces the bar node entirely.",
      ],
      [
        "renderTooltip",
        "GanttTooltipRenderer",
        "none",
        "Replaces the hover and drag tooltip node.",
      ],
      [
        "renderHeaderCell",
        "GanttHeaderCellRenderer",
        "none",
        "Replaces a timeline header cell in both rows.",
      ],
      [
        "renderBaseline",
        "(task: TaskTransformed) => ReactNode",
        "none",
        "Replaces the baseline bar for tasks carrying baselineStart.",
      ],
      ["showTooltip", "boolean", "true", "Shows the hover and drag tooltips."],
    ],
  },
  {
    id: "events",
    title: "Events",
    rows: [
      [
        "onTaskClick",
        "(task: TaskTransformed, event: React.MouseEvent) => void",
        "none",
        "Fires on a bar or row click, not after a drag.",
      ],
      [
        "onTaskDoubleClick",
        "(task: TaskTransformed, event: React.MouseEvent) => void",
        "none",
        "Fires on a double click.",
      ],
      [
        "onTaskSelect",
        "(task: TaskTransformed | null) => void",
        "none",
        "Fires when the selection changes, null on an empty-timeline click.",
      ],
      [
        "selectable",
        "boolean",
        "onTaskSelect !== undefined",
        "Turns click-to-select and its highlight on.",
      ],
      [
        "onBeforeTaskChange",
        "GanttBeforeChangeHandler",
        "none",
        "Runs before a move, resize or progress change is written, and can cancel it.",
      ],
      [
        "onTaskCreate",
        "(draft: GanttTaskDraft) => void",
        "none",
        "Fires with the range drawn on empty row space.",
      ],
      [
        "onReorder",
        "(change: GanttReorderChange) => void | boolean",
        "none",
        "Runs before a row drop is committed; false cancels it.",
      ],
    ],
  },
  {
    id: "locale-theme",
    title: "Locale and theme",
    rows: [
      [
        "locale",
        "string",
        "none",
        "BCP 47 tag applied to every date label through Intl.",
      ],
      [
        "formats",
        "GanttFormatOverrides",
        "none",
        "Per-scale tick / header / tooltip label overrides. Must be memoized.",
      ],
      [
        "firstDayOfWeek",
        "number",
        "none",
        "0 = Sunday .. 6 = Saturday. Groups the week scale's top header.",
      ],
      [
        "theme",
        `"light" | "dark" | "system"`,
        "none",
        "Omitted, no theme class is attached and the stylesheet follows the OS.",
      ],
    ],
  },
  {
    id: "storage",
    title: "Storage and history",
    rows: [
      [
        "storageKey",
        "string",
        `"gantt-scale"`,
        "sessionStorage key the scale selection is stored under.",
      ],
      ["historyLimit", "number", "100", "Undo steps kept; 0 turns undo off."],
    ],
  },
];

/** [scale, labelUnit, tickUnit, drag step] */
export type ScaleRow = [string, string, string, string];

export const SCALE_ROWS: ScaleRow[] = [
  ["hour", "Day", "Hour", "15 minutes"],
  ["day", "Day", "Hour", "1 hour"],
  ["week", "Month", "Day", "6 hours"],
  ["month", "Month", "Day", "1 day"],
  ["quarter", "Quarter", "Month", "3 days"],
  ["year", "Year", "Month", "7 days"],
];

interface DocLink {
  title: string;
  description: string;
  href: string;
}

const DOCS_BASE = "https://github.com/jaeungkim/gantt-chart/blob/main/docs/en";

export const DOCS_KO_INDEX =
  "https://github.com/jaeungkim/gantt-chart/blob/main/docs/ko/README.md";

export const DOC_LINKS: DocLink[] = [
  {
    title: "Documentation index",
    description: "Every guide and reference page, in reading order.",
    href: `${DOCS_BASE}/README.md`,
  },
  {
    title: "Quick start",
    description:
      "Install, import the stylesheet, and get to a chart whose edits land in your state.",
    href: `${DOCS_BASE}/quick-start.md`,
  },
  {
    title: "Task data",
    description:
      "The Task shape, how dates are parsed, and how the tasks prop is compared.",
    href: `${DOCS_BASE}/task-data.md`,
  },
  {
    title: "Editing tasks",
    description:
      "Move, resize, progress, per-task permissions, touch, and drawing a new task.",
    href: `${DOCS_BASE}/editing.md`,
  },
  {
    title: "Dependencies",
    description: "The four link types, lag, and drawing or deleting arrows.",
    href: `${DOCS_BASE}/dependencies.md`,
  },
  {
    title: "Scheduling",
    description:
      "Auto-scheduling policies, the working calendar, critical path and baselines.",
    href: `${DOCS_BASE}/scheduling.md`,
  },
  {
    title: "Keyboard and screen readers",
    description:
      "The key map, the ARIA treegrid, and the gaps that are still open.",
    href: `${DOCS_BASE}/accessibility.md`,
  },
  {
    title: "Theming",
    description:
      "The theme prop and the 33 CSS custom properties every color reads.",
    href: `${DOCS_BASE}/theming.md`,
  },
];
