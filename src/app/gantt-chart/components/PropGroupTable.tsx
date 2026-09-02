import { DataTable } from "@/src/app/gantt-chart/components/DataTable";
import type { PropRow } from "@/src/app/gantt-chart/data/pageContent";

interface PropGroupTableProps {
  title: string;
  rows: PropRow[];
}

export function PropGroupTable({ title, rows }: PropGroupTableProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <DataTable
        headers={["Prop", "Type", "Default", "Description"]}
        rows={rows}
      />
    </div>
  );
}
