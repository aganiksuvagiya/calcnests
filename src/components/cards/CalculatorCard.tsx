import Link from "next/link";
import type { CalculatorMeta } from "@/types/calculator";
import { categoryMap } from "@/lib/categories";
import { Icon } from "@/components/icons/Icon";
import { CATEGORY_COLORS } from "@/lib/categoryColors";
import { cn } from "@/lib/utils";

export function CalculatorCard({ calculator }: { calculator: CalculatorMeta }) {
  const category = categoryMap[calculator.category];
  const color = CATEGORY_COLORS[calculator.category];

  const content = (
    <>
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
            color.soft,
            color.text,
            calculator.isLive && color.hoverBg,
            calculator.isLive && "group-hover:text-white"
          )}
        >
          <Icon icon={calculator.icon} className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold leading-snug text-foreground group-hover:text-accent">
              {calculator.title}
            </h3>
            {calculator.isLive ? (
              <Icon
                icon="arrow-right"
                className="mt-1 h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
              />
            ) : (
              <span className="shrink-0 rounded-full bg-surface-muted px-2.5 py-0.5 text-[11px] font-medium text-muted">
                Soon
              </span>
            )}
          </div>
          {category && <p className="mt-0.5 text-xs font-medium text-muted">{category.title}</p>}
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{calculator.shortDescription}</p>
    </>
  );

  if (!calculator.isLive) {
    return (
      <div className="flex min-h-[10.5rem] flex-col rounded-2xl border border-border bg-surface p-5 opacity-70 sm:p-6">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/calculators/${calculator.slug}`}
      className="focus-ring group flex min-h-[10.5rem] flex-col rounded-2xl border border-border bg-surface p-5 shadow-xs transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg sm:p-6"
    >
      {content}
    </Link>
  );
}
