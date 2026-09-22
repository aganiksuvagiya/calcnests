import type { CalculatorMeta } from "@/types/calculator";
import { CalculatorCard } from "@/components/cards/CalculatorCard";

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
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {live.map((c) => (
          <CalculatorCard key={c.slug} calculator={c} />
        ))}
      </div>
    </section>
  );
}
