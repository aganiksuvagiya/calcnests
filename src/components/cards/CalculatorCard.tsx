import Link from "next/link";
import type { CalculatorMeta } from "@/types/calculator";
import { cn } from "@/lib/utils";

export function CalculatorCard({ calculator }: { calculator: CalculatorMeta }) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold text-foreground group-hover:text-accent">
          {calculator.title}
        </h3>
        {!calculator.isLive && (
          <span className="shrink-0 rounded-full bg-surface-muted px-2.5 py-0.5 text-[11px] font-medium text-muted">
            Coming soon
          </span>
        )}
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{calculator.shortDescription}</p>
    </>
  );

  if (!calculator.isLive) {
    return (
      <div className="flex flex-col rounded-2xl border border-border bg-surface p-5 opacity-70">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/calculators/${calculator.slug}`}
      className={cn(
        "focus-ring group flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md"
      )}
    >
      {content}
    </Link>
  );
}
