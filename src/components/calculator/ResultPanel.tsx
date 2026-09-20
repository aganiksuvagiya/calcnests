import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ResultPanelProps {
  label: string;
  value: ReactNode;
  helpText?: string;
  emphasis?: boolean;
}

export function ResultPanel({ label, value, helpText, emphasis = true }: ResultPanelProps) {
  // text-muted on the tinted accent-soft background falls short of the 4.5:1
  // AA contrast minimum (~4.3:1) — text-foreground/80 clears ~8.8:1 on that
  // background while text-muted is fine on the plain surface-muted variant.
  const secondaryText = emphasis ? "text-foreground/80" : "text-muted";

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "rounded-xl border p-5",
        emphasis ? "border-accent/20 bg-accent-soft" : "border-border bg-surface-muted"
      )}
    >
      <p className={cn("text-sm font-medium", secondaryText)}>{label}</p>
      <p className={cn("mt-1 text-3xl font-bold tracking-tight", emphasis ? "text-accent" : "text-foreground")}>
        {value}
      </p>
      {helpText && <p className={cn("mt-2 text-sm", secondaryText)}>{helpText}</p>}
    </div>
  );
}
