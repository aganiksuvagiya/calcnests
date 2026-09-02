import Link from "next/link";
import type { Category } from "@/types/calculator";
import { getCalculatorsByCategory } from "@/lib/calculators/registry";

export function CategoryCard({ category }: { category: Category }) {
  const count = getCalculatorsByCategory(category.slug).length;

  return (
    <Link
      href={`/calculators/${category.slug}`}
      className="focus-ring group flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6 shadow-xs transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-sm font-bold text-accent">
        {category.title.charAt(0)}
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
