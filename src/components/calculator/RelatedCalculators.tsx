import Link from "next/link";
import type { CalculatorMeta } from "@/types/calculator";

export function RelatedCalculators({ calculators }: { calculators: CalculatorMeta[] }) {
  const live = calculators.filter((c) => c.isLive);
  if (live.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="border-t border-border pt-10">
      <h2 id="related-heading" className="text-xl font-semibold text-foreground">
        Related calculators
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
