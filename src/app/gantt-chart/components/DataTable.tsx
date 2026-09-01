import { cn } from "@/src/lib/cn";

interface DataTableProps {
  headers: string[];
  rows: string[][];
}

export function DataTable({ headers, rows }: DataTableProps) {
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
              className={cn(
                rowIndex !== rows.length - 1 && "border-b border-border",
              )}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={`${row[0]}-${headers[cellIndex]}`}
                  className={cn(
                    "px-4 py-3 align-top",
                    cellIndex === 0
                      ? "font-mono text-foreground"
                      : "text-muted-foreground",
                  )}
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
