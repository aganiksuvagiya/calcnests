import { formatCurrencyUSD, formatNumber, formatPercent } from "@/lib/utils";
import type { StateReferenceTable as StateReferenceTableData, StateTableCellFormat } from "@/types/calculator";

function formatCell(value: string | number, format?: StateTableCellFormat): string {
  if (typeof value === "string") return value;
  switch (format) {
    case "currency":
      return formatCurrencyUSD(value, 2);
    case "percent":
      return formatPercent(value, 2);
    case "number":
      return formatNumber(value, 0);
    default:
      return String(value);
  }
}

export function StateReferenceTable({ table }: { table: StateReferenceTableData }) {
  return (
    <section className="border-t border-border pt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-semibold text-foreground">{table.title}</h2>
        <p className="text-xs text-muted">Data reflects {table.lastUpdated}</p>
      </div>
      <div className="mt-4 overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-muted text-left">
              <th className="px-4 py-2.5 font-semibold text-foreground">State</th>
              {table.columns.map((col) => (
                <th key={col.key} className="px-4 py-2.5 font-semibold text-foreground">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {table.rows.map((row) => (
              <tr key={row.state}>
                <td className="px-4 py-2.5 font-medium text-foreground">{row.state}</td>
                {table.columns.map((col) => (
                  <td key={col.key} className="px-4 py-2.5 text-muted">
                    {formatCell(row.values[col.key], col.format)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.note && <p className="mt-3 text-xs text-muted">{table.note}</p>}
    </section>
  );
}
