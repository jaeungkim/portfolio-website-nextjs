import type { ReactNode } from "react";
import CodeBlock, { TabbedInstall } from "@/src/components/shared/CodeBlock";
import { ExternalLink, Github, Package } from "lucide-react";
import GanttChartDemo from "./components/GanttChartDemo";

const usageCode = `import { ReactGanttChart } from "@jaeungkim/gantt-chart";
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

const taskFormatCode = `interface Task {
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

const tocItems = [
  { id: "installation", label: "Installation" },
  { id: "features", label: "Features" },
  { id: "usage", label: "Usage" },
  { id: "task-format", label: "Task Format" },
  { id: "demo", label: "Live Demo" },
  { id: "props", label: "Props" },
  { id: "scales", label: "Timeline Scales" },
];

const features = [
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

const propRows = [
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

const scaleRows = [
  ["day", "Day", "Hour", "1 hour"],
  ["week", "Week", "Day", "6 hours"],
  ["month", "Month", "Day", "1 day"],
  ["year", "Year", "Month", "7 days"],
];

function ExternalButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const className =
    variant === "primary"
      ? "inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
      : "inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-secondary/40">
            {headers.map((header) => (
              <th
                key={header}
                className="border-b border-border px-4 py-3 text-left font-medium"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={row.join("-")}
              className={
                rowIndex === rows.length - 1
                  ? undefined
                  : "border-b border-border"
              }
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={`${row[0]}-${headers[cellIndex]}`}
                  className={`px-4 py-3 align-top ${
                    cellIndex === 0
                      ? "font-mono text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function GanttChartPage() {
  return (
    <div className="space-y-16 pb-8">
      <section className="rounded-[2rem] border border-border bg-gradient-to-br from-cyan-500/10 via-background to-background p-8 md:p-10">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            React component library
          </p>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              @jaeungkim/gantt-chart
            </h1>
            <p className="text-lg leading-8 text-muted-foreground">
              Lightweight, high-performance Gantt chart UI for React
              applications with virtualization, editable dependencies, and a
              minimal API surface.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ExternalButton href="https://github.com/jaeungkim/gantt-chart">
              <Github className="size-4" />
              GitHub
            </ExternalButton>
            <ExternalButton
              href="https://www.npmjs.com/package/@jaeungkim/gantt-chart"
              variant="secondary"
            >
              <Package className="size-4" />
              npm
            </ExternalButton>
          </div>
          <nav className="flex flex-wrap gap-2 pt-2">
            {tocItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section id="installation" className="space-y-4 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-foreground">Installation</h2>
        <div className="max-w-xl">
          <TabbedInstall packageName="@jaeungkim/gantt-chart" />
        </div>
      </section>

      <section id="features" className="space-y-6 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-foreground">Features</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <h3 className="text-base font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="usage" className="space-y-4 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-foreground">Usage</h2>
        <div className="max-w-3xl">
          <CodeBlock code={usageCode} filename="App.tsx" />
        </div>
      </section>

      <section id="task-format" className="space-y-4 scroll-mt-24">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-foreground">
            Task Format
          </h2>
          <p className="text-muted-foreground">
            All dates should be passed as UTC ISO strings such as{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-sm">
              2024-06-01T09:00:00Z
            </code>
            .
          </p>
        </div>
        <div className="max-w-3xl">
          <CodeBlock code={taskFormatCode} filename="types.ts" />
        </div>
      </section>

      <section id="demo" className="space-y-4 scroll-mt-24">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-foreground">Live Demo</h2>
          <p className="text-muted-foreground">
            Drag bars, resize edges, and switch scales to test the interaction
            model.
          </p>
        </div>
        <div className="overflow-hidden rounded-[1.5rem] border border-border">
          <div className="flex items-center gap-2 border-b border-border bg-secondary/40 px-4 py-3">
            <div className="size-3 rounded-full bg-red-500/80" />
            <div className="size-3 rounded-full bg-yellow-500/80" />
            <div className="size-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs text-muted-foreground">
              gantt-chart-demo
            </span>
          </div>
          <GanttChartDemo />
        </div>
      </section>

      <section id="props" className="space-y-4 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-foreground">Props</h2>
        <DataTable
          headers={["Prop", "Type", "Default", "Description"]}
          rows={propRows}
        />
      </section>

      <section id="scales" className="space-y-4 scroll-mt-24">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-foreground">
            Timeline Scales
          </h2>
          <p className="text-muted-foreground">
            The scale switcher in the chart header controls the visible timeline
            density.
          </p>
        </div>
        <DataTable
          headers={["Scale", "Header Label", "Tick Unit", "Drag Step"]}
          rows={scaleRows}
        />
      </section>

      <section className="rounded-[1.5rem] border border-border bg-secondary/30 p-6">
        <p className="text-muted-foreground">
          Questions or feedback? Open an issue and I’ll take a look.
        </p>
        <a
          href="https://github.com/jaeungkim/gantt-chart/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-cyan-500"
        >
          Open an issue
          <ExternalLink className="size-4" />
        </a>
      </section>
    </div>
  );
}
