import type { Metadata } from "next";
import { ExternalLink, Github, Package } from "lucide-react";
import { CodeBlock, TabbedInstall } from "@/src/components/shared/CodeBlock";
import { GanttChartDemo } from "@/src/app/(main)/gantt-chart/components/GanttChartDemo";
import { ExternalButton } from "@/src/app/(main)/gantt-chart/components/ExternalButton";
import { DataTable } from "@/src/app/(main)/gantt-chart/components/DataTable";
import {
  USAGE_CODE,
  TASK_FORMAT_CODE,
  TOC_ITEMS,
  FEATURES,
  PROP_ROWS,
  SCALE_ROWS,
} from "@/src/app/(main)/gantt-chart/data/pageContent";

export const metadata: Metadata = {
  title: "@jaeungkim/gantt-chart",
  description:
    "Lightweight, high-performance Gantt chart UI for React with virtualization, editable dependencies, and a minimal API surface.",
};

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
            {TOC_ITEMS.map((item) => (
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
          {FEATURES.map((feature) => (
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
          <CodeBlock code={USAGE_CODE} filename="App.tsx" />
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
          <CodeBlock code={TASK_FORMAT_CODE} filename="types.ts" />
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
          rows={PROP_ROWS}
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
          rows={SCALE_ROWS}
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
