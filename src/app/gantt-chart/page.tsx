"use client";

import dynamic from "next/dynamic";
import type { GanttChartProps } from "@jaeungkim/gantt-chart";
import "@jaeungkim/gantt-chart/style.css";
import ThemeToggle from "@/src/components/shared/buttons/ThemeToggle";
import CodeBlock, { TabbedInstall } from "@/src/components/shared/CodeBlock";
import { Github, Package, ExternalLink } from "lucide-react";
import { useMemo } from "react";
import { generateSampleTasks } from "./lib/generateTasks";

// 무거운 차트 코드를 메인 번들에서 분리하여 온디맨드 로드
const ReactGanttChart = dynamic<GanttChartProps>(
  () => import("@jaeungkim/gantt-chart").then((m) => m.ReactGanttChart),
  { ssr: false }
);

const usageCode = `import { ReactGanttChart } from '@jaeungkim/gantt-chart';
import type { Task } from '@jaeungkim/gantt-chart';

const tasks: Task[] = [
  {
    id: '1',
    name: 'Project Kickoff',
    startDate: '2024-06-01T09:00:00Z',
    endDate: '2024-06-03T17:00:00Z',
    parentId: null,
    sequence: '1',
    dependencies: [],
  },
  {
    id: '2',
    name: 'Requirements Gathering',
    startDate: '2024-06-04T09:00:00Z',
    endDate: '2024-06-10T17:00:00Z',
    parentId: null,
    sequence: '2',
    dependencies: [{ targetId: '1', type: 'FS' }],
  },
];

export default function App() {
  return (
    <ReactGanttChart
      tasks={tasks}
      height="100vh"
      width="100%"
      theme="system"
      defaultScale="month"
      onTasksChange={(updated) => console.log(updated)}
    />
  );
}`;

const taskFormatCode = `interface Task {
  id: string;
  name: string;
  startDate: string;    // UTC ISO string
  endDate: string;      // UTC ISO string
  parentId: string | null;
  sequence: string;
  dependencies?: TaskDependency[];
}

interface TaskDependency {
  targetId: string;
  type: DependencyType;
}

type DependencyType = 'FS' | 'SS' | 'FF' | 'SF';
// FS = Finish-to-Start
// SS = Start-to-Start
// FF = Finish-to-Finish
// SF = Start-to-Finish`;

// 목차 아이템
const tocItems = [
  { id: "installation", label: "Installation" },
  { id: "features", label: "Features" },
  { id: "usage", label: "Usage" },
  { id: "task-format", label: "Task Format" },
  { id: "demo", label: "Live Demo" },
  { id: "props", label: "Props" },
  { id: "scales", label: "Timeline Scales" },
];

function TableOfContents() {
  return (
    <nav
      className="hidden 2xl:block fixed top-32 w-40"
      style={{ right: "calc(50% + 520px)" }}
    >
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        On This Page
      </p>
      <ul className="space-y-2.5 text-sm border-l border-border pl-4">
        {tocItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-muted-foreground hover:text-foreground transition-colors block"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FeatureCard({
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <div className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
      <div className="text-2xl mb-2">{emoji}</div>
      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export default function Page() {
  // 오늘 날짜 기준으로 동적 생성된 샘플 태스크
  const sampleTasks = useMemo(() => generateSampleTasks(), []);

  return (
    <div className="min-h-svh bg-background text-foreground">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="/gantt-chart"
              className="flex items-center gap-2 font-semibold"
            >
              <div className="w-6 h-6 rounded bg-foreground flex items-center justify-center">
                <span className="text-background font-bold text-xs">G</span>
              </div>
              gantt-chart
            </a>
            <nav className="hidden sm:flex items-center gap-4 text-sm">
              <a
                href="#demo"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Demo
              </a>
              <a
                href="https://github.com/jaeungkim/gantt-chart"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/jaeungkim/gantt-chart"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.npmjs.com/package/@jaeungkim/gantt-chart"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="npm"
            >
              <Package className="w-5 h-5" />
            </a>
            <div className="w-px h-5 bg-border" />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TableOfContents />

        {/* 히어로 */}
        <section className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            @jaeungkim/gantt-chart
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
            Lightweight, high-performance Gantt chart component for React
            applications. Designed for fast rendering with virtualization and
            clean, minimal aesthetics.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/jaeungkim/gantt-chart"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/@jaeungkim/gantt-chart"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border font-medium text-sm hover:bg-secondary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              npm
            </a>
          </div>
        </section>

        {/* 설치 */}
        <section id="installation" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-semibold mb-4">Installation</h2>
          <div className="max-w-xl">
            <TabbedInstall packageName="@jaeungkim/gantt-chart" />
          </div>
        </section>

        {/* 주요 기능 */}
        <section id="features" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-semibold mb-6">Features</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard
              emoji="📆"
              title="Timeline Scales"
              description="Day, Week, Month, Year views"
            />
            <FeatureCard
              emoji="🔄"
              title="Drag & Resize"
              description="Move bars, resize edges, snap to intervals"
            />
            <FeatureCard
              emoji="🧲"
              title="Smart Dependencies"
              description="FS, SS, FF, SF arrows with auto-routing"
            />
            <FeatureCard
              emoji="⚡"
              title="Virtualized"
              description="Only visible rows render for 60fps"
            />
            <FeatureCard
              emoji="🌙"
              title="Theming"
              description="Light, Dark, and System theme support"
            />
            <FeatureCard
              emoji="📍"
              title="Today Marker"
              description="Visual indicator for current date"
            />
          </div>
        </section>

        {/* 사용법 */}
        <section id="usage" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-semibold mb-4">Usage</h2>
          <div className="max-w-2xl">
            <CodeBlock code={usageCode} filename="App.tsx" />
          </div>
        </section>

        {/* Task 포맷 */}
        <section id="task-format" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-semibold mb-4">Task Format</h2>
          <p className="text-muted-foreground mb-4 max-w-2xl">
            All dates must be in{" "}
            <strong className="text-foreground">UTC ISO string format</strong>:{" "}
            <code className="text-sm bg-secondary px-1.5 py-0.5 rounded font-mono">
              &quot;2024-06-01T09:00:00Z&quot;
            </code>
          </p>
          <div className="max-w-2xl">
            <CodeBlock code={taskFormatCode} filename="types.ts" />
          </div>
        </section>

        {/* 라이브 데모 */}
        <section id="demo" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-semibold mb-2">Live Demo</h2>
          <p className="text-muted-foreground mb-6">
            Interactive preview — drag bars to move, resize edges, switch
            timeline scales
          </p>

          {/* 데모 컨테이너 */}
          <div className="rounded-xl border border-border overflow-hidden">
            {/* 데모 헤더 바 */}
            <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-muted-foreground ml-2">
                gantt-chart-demo
              </span>
            </div>
            {/* 차트 영역 */}
            <div className="bg-card">
              <ReactGanttChart
                tasks={sampleTasks}
                height={480}
                width="100%"
                defaultScale="month"
              />
            </div>
          </div>
        </section>

        {/* Props */}
        <section id="props" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-semibold mb-6">Props</h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="text-left py-3 px-4 font-medium border-b border-border">
                    Prop
                  </th>
                  <th className="text-left py-3 px-4 font-medium border-b border-border">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 font-medium border-b border-border">
                    Default
                  </th>
                  <th className="text-left py-3 px-4 font-medium border-b border-border">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 font-mono text-sm">tasks</td>
                  <td className="py-3 px-4 font-mono text-sm text-muted-foreground">
                    Task[]
                  </td>
                  <td className="py-3 px-4 font-mono text-sm text-muted-foreground">
                    []
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Array of task objects
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 font-mono text-sm">onTasksChange</td>
                  <td className="py-3 px-4 font-mono text-sm text-muted-foreground">
                    (tasks) =&gt; void
                  </td>
                  <td className="py-3 px-4 font-mono text-sm text-muted-foreground">
                    -
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Callback when tasks change
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 font-mono text-sm">height</td>
                  <td className="py-3 px-4 font-mono text-sm text-muted-foreground">
                    number | string
                  </td>
                  <td className="py-3 px-4 font-mono text-sm text-muted-foreground">
                    600
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Chart height (px or CSS)
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 font-mono text-sm">width</td>
                  <td className="py-3 px-4 font-mono text-sm text-muted-foreground">
                    number | string
                  </td>
                  <td className="py-3 px-4 font-mono text-sm text-muted-foreground">
                    &quot;100%&quot;
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Chart width (px or CSS)
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 font-mono text-sm">theme</td>
                  <td className="py-3 px-4 font-mono text-sm text-muted-foreground">
                    &quot;light&quot; | &quot;dark&quot; | &quot;system&quot;
                  </td>
                  <td className="py-3 px-4 font-mono text-sm text-muted-foreground">
                    -
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Theme mode
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 font-mono text-sm">defaultScale</td>
                  <td className="py-3 px-4 font-mono text-sm text-muted-foreground">
                    &quot;day&quot; | &quot;week&quot; | &quot;month&quot; |
                    &quot;year&quot;
                  </td>
                  <td className="py-3 px-4 font-mono text-sm text-muted-foreground">
                    &quot;month&quot;
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Initial timeline scale
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-sm">className</td>
                  <td className="py-3 px-4 font-mono text-sm text-muted-foreground">
                    string
                  </td>
                  <td className="py-3 px-4 font-mono text-sm text-muted-foreground">
                    -
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Additional CSS class
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Timeline Scales */}
        <section id="scales" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-semibold mb-6">Timeline Scales</h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="text-left py-3 px-4 font-medium border-b border-border">
                    Scale
                  </th>
                  <th className="text-left py-3 px-4 font-medium border-b border-border">
                    Header Label
                  </th>
                  <th className="text-left py-3 px-4 font-medium border-b border-border">
                    Tick Unit
                  </th>
                  <th className="text-left py-3 px-4 font-medium border-b border-border">
                    Drag Step
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 font-mono text-sm">day</td>
                  <td className="py-3 px-4 text-muted-foreground">Day</td>
                  <td className="py-3 px-4 text-muted-foreground">Hour</td>
                  <td className="py-3 px-4 text-muted-foreground">1 hour</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 font-mono text-sm">week</td>
                  <td className="py-3 px-4 text-muted-foreground">Week</td>
                  <td className="py-3 px-4 text-muted-foreground">Day</td>
                  <td className="py-3 px-4 text-muted-foreground">6 hours</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 font-mono text-sm">month</td>
                  <td className="py-3 px-4 text-muted-foreground">Month</td>
                  <td className="py-3 px-4 text-muted-foreground">Day</td>
                  <td className="py-3 px-4 text-muted-foreground">1 day</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-sm">year</td>
                  <td className="py-3 px-4 text-muted-foreground">Year</td>
                  <td className="py-3 px-4 text-muted-foreground">Month</td>
                  <td className="py-3 px-4 text-muted-foreground">7 days</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Switch scales using the dropdown at the top-right of the chart.
          </p>
        </section>

        {/* 피드백 */}
        <section className="mb-16 p-6 rounded-lg border border-border bg-secondary/30">
          <p className="text-muted-foreground mb-2">
            <strong className="text-foreground">Question?</strong> Give us
            feedback →
          </p>
          <a
            href="https://github.com/jaeungkim/gantt-chart/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            Open an issue on GitHub
          </a>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="border-t border-border">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            MIT 2025 ©{" "}
            <a
              href="https://jaeungkim.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Jaeung Kim
            </a>
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a
              href="https://github.com/jaeungkim/gantt-chart"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/@jaeungkim/gantt-chart"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              npm
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
