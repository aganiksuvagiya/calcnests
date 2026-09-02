import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ResultPanelProps {
  label: string;
  value: ReactNode;
  helpText?: string;
  emphasis?: boolean;
}

export function ResultPanel({ label, value, helpText, emphasis = true }: ResultPanelProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "rounded-xl border p-5",
        emphasis ? "border-accent/20 bg-accent-soft" : "border-border bg-surface-muted"
      )}
    >
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className={cn("mt-1 text-3xl font-bold tracking-tight", emphasis ? "text-accent" : "text-foreground")}>
        {value}
      </p>
      {helpText && <p className="mt-2 text-sm text-muted">{helpText}</p>}
    </div>
  );
}
