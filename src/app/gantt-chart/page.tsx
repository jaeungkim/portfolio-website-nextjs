import type { Metadata } from "next";
import { BookOpen, ExternalLink, Package } from "lucide-react";
import { GithubIcon } from "@/src/components/shared/GithubIcon";
import { CodeBlock, TabbedInstall } from "@/src/components/shared/CodeBlock";
import { GanttChartDemo } from "@/src/app/gantt-chart/components/GanttChartDemo";
import { ExternalButton } from "@/src/app/gantt-chart/components/ExternalButton";
import {
  USAGE_CODE,
  TASK_FORMAT_CODE,
  TOC_ITEMS,
  FEATURES,
  DOC_LINKS,
  DOCS_EN_INDEX,
  DOCS_KO_INDEX,
} from "@/src/app/gantt-chart/data/pageContent";

export const metadata: Metadata = {
  title: "@jaeungkim/gantt-chart",
  description:
    "Virtualized React Gantt chart with six timeline scales, four dependency types, auto-scheduling, a working-day calendar, critical path, and keyboard and screen-reader support.",
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
              scheduling engine that runs without a DOM.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ExternalButton href={DOCS_EN_INDEX}>
              <BookOpen className="size-4" />
              Documentation
            </ExternalButton>
            <ExternalButton
              href="https://github.com/jaeungkim/gantt-chart"
              variant="secondary"
            >
              <GithubIcon className="size-4" />
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
            Dates go in as anything{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-sm">
              dayjs.utc()
            </code>{" "}
            parses, so a bare{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-sm">
              2026-03-02
            </code>{" "}
            is UTC midnight, and they come back out of{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-sm">
              onTasksChange
            </code>{" "}
            as{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-sm">
              YYYY-MM-DDTHH:mm:ss.sssZ
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

      <section id="docs" className="space-y-6 scroll-mt-24">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-foreground">
            Documentation
          </h2>
          <p className="text-muted-foreground">
            Every prop, guide and reference page lives on the documentation
            site, in English and{" "}
            <a
              href={DOCS_KO_INDEX}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 transition-colors hover:text-cyan-500"
            >
              한국어
            </a>
            .
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {DOC_LINKS.map((doc) => (
            <a
              key={doc.href}
              href={doc.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-cyan-500/50"
            >
              <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
                {doc.title}
                <ExternalLink className="size-4" />
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {doc.description}
              </p>
            </a>
          ))}
        </div>
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
