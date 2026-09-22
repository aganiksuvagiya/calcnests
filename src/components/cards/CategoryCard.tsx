import Link from "next/link";
import type { Category } from "@/types/calculator";
import { Icon } from "@/components/icons/Icon";
import { getCalculatorsByCategory } from "@/lib/calculators/registry";
import { CATEGORY_COLORS } from "@/lib/categoryColors";
import { cn } from "@/lib/utils";

export function CategoryCard({ category }: { category: Category }) {
  const count = getCalculatorsByCategory(category.slug).length;
  const color = CATEGORY_COLORS[category.slug];

  return (
    <Link
      href={`/calculators/${category.slug}`}
      className={cn(
        "focus-ring group flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl",
        color.glow
      )}
    >
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl transition-colors group-hover:text-white",
            color.soft,
            color.text,
            color.hoverBg
          )}
        >
          <Icon icon={category.icon} className="h-5 w-5" />
        </div>
        <Icon
          icon="arrow-right"
          className="mt-2 h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
        />
      </div>
      <div>
        <h3 className="text-base font-semibold text-foreground group-hover:text-accent">
          {category.title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">{category.description}</p>
      </div>
      <span className="mt-auto text-xs font-medium text-muted">
        {count} calculator{count === 1 ? "" : "s"}
      </span>
    </Link>
  );
}
