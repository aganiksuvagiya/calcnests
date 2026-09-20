import Link from "next/link";
import { SearchBox } from "@/components/search/SearchBox";
import { Icon } from "@/components/icons/Icon";
import { calculatorRegistry, getCalculator } from "@/lib/calculators/registry";
import { SITE_TAGLINE } from "@/lib/seo";

const popularSearchSlugs = ["percentage", "tip", "mortgage", "bmi", "gpa", "age"];

const trustPoints = [
  { icon: "check-circle", label: "100% free" },
  { icon: "zap", label: "Instant results" },
  { icon: "flag", label: "No sign-up required" },
];

export function Hero() {
  const total = calculatorRegistry.length;
  const popularSearches = popularSearchSlugs
    .map((slug) => getCalculator(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <section className="relative overflow-hidden border-b border-border bg-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,var(--accent-soft),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 hidden h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl sm:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-24 hidden h-72 w-72 rounded-full bg-sky-200/30 blur-3xl sm:block"
      />

      <div className="relative mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">{SITE_TAGLINE}</p>
        <span className="focus-ring mt-3 inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
          <Icon icon="calculator" className="h-3.5 w-3.5" />
          {total}+ free calculators, built for the US
        </span>

        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Smart calculators for money, math, and everyday life
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Search {total} free, accurate calculators for money, home, education, and daily
          decisions — no sign-up required.
        </p>

        <div className="mx-auto mt-8 max-w-xl">
          <SearchBox size="lg" placeholder={`Search ${total}+ calculators…`} />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-sm">
          <span className="text-muted">Popular:</span>
          {popularSearches.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/${calc.slug}`}
              className="focus-ring rounded-full border border-border bg-surface px-3 py-1 text-foreground/80 transition-colors hover:border-accent/30 hover:text-accent"
            >
              {calc.shortTitle ?? calc.title}
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-border pt-6 text-sm text-muted">
          {trustPoints.map((point) => (
            <span key={point.label} className="flex items-center gap-1.5">
              <Icon icon={point.icon} className="h-4 w-4 text-accent" />
              {point.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
