import Link from "next/link";
import type { CalculatorMeta } from "@/types/calculator";

interface RelatedCalculatorsProps {
  calculators: CalculatorMeta[];
  title?: string;
  headingId?: string;
}

export function RelatedCalculators({
  calculators,
  title = "Related calculators",
  headingId = "related-heading",
}: RelatedCalculatorsProps) {
  const live = calculators.filter((c) => c.isLive);
  if (live.length === 0) return null;

  return (
    <section aria-labelledby={headingId} className="border-t border-border pt-10">
      <h2 id={headingId} className="text-xl font-semibold text-foreground">
        {title}
      </h2>
      <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {live.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/calculators/${c.slug}`}
              className="focus-ring block rounded-xl border border-border bg-surface p-4 text-sm font-medium text-foreground transition-colors hover:border-accent/30 hover:text-accent"
            >
              {c.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
