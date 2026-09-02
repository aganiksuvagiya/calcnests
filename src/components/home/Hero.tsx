import Link from "next/link";
import { SearchBox } from "@/components/search/SearchBox";
import { CategoryIcon } from "@/components/icons/CategoryIcon";
import { categories } from "@/lib/categories";
import { getCalculatorsByCategory, calculatorRegistry } from "@/lib/calculators/registry";

export function Hero() {
  const total = calculatorRegistry.length;

  return (
    <section className="relative overflow-hidden border-b border-border bg-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_-10%,var(--accent-soft),transparent)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="text-sm font-medium text-muted">Your life in</p>
            <h1 className="mt-1 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              <span className="text-accent">{total}</span> free calculators
            </h1>
            <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
              Fast, accurate, and free tools for money, math, home, education, and daily life —
              built for the US.
            </p>
          </div>
          <div>
            <SearchBox size="lg" placeholder={`Search ${total}+ calculators…`} />
          </div>
        </div>

        <div className="relative z-10 -mb-10 mt-10 translate-y-10 rounded-2xl border border-border bg-surface p-4 shadow-lg sm:p-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => {
              const count = getCalculatorsByCategory(category.slug).length;
              return (
                <Link
                  key={category.slug}
                  href={`/calculators/${category.slug}`}
                  className="focus-ring group flex flex-col items-center gap-2 rounded-xl border border-border bg-surface px-4 py-5 text-center transition-colors hover:border-accent/30 hover:bg-accent-soft"
                >
                  <CategoryIcon
                    icon={category.icon}
                    className="h-6 w-6 text-accent"
                  />
                  <span className="text-sm font-semibold text-foreground">{category.title}</span>
                  <span className="text-xs text-muted">{count} calculators</span>
                </Link>
              );
            })}
            <Link
              href="/calculators"
              className="focus-ring flex flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-accent/40 bg-accent-soft px-4 py-5 text-center transition-colors hover:border-accent"
            >
              <span className="text-sm font-semibold text-accent">Browse all</span>
              <span className="text-xs text-accent/80">{total} calculators →</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
