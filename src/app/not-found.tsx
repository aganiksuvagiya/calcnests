import Link from "next/link";
import type { Metadata } from "next";
import { SearchBox } from "@/components/search/SearchBox";
import { Icon } from "@/components/icons/Icon";
import { getCalculator } from "@/lib/calculators/registry";

// Metadata doesn't cascade-merge field-by-field from the root layout, so
// without this the root layout's `robots: index, follow` would win over
// Next's own automatic noindex for this route. Setting it explicitly here
// keeps both in agreement instead of contradicting each other.
export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

const popularSlugs = ["percentage", "tip", "mortgage", "loan", "sales-tax", "paycheck"];

export default function NotFound() {
  const popularCalculators = popularSlugs.map((slug) => getCalculator(slug)).filter((c) => c?.isLive);

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
        <Icon icon="search" className="h-6 w-6" />
      </span>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Page not found</h1>
      <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have moved. Try searching for a
        calculator, or pick one of the popular tools below.
      </p>

      <div className="mt-8 w-full max-w-md">
        <SearchBox size="lg" placeholder="Search calculators…" />
      </div>

      {popularCalculators.length > 0 && (
        <div className="mt-10 w-full">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Popular calculators</h2>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {popularCalculators.map((calc) => (
              <li key={calc!.slug}>
                <Link
                  href={`/calculators/${calc!.slug}`}
                  className="focus-ring block rounded-xl border border-border bg-surface p-4 text-left text-sm font-medium text-foreground transition-colors hover:border-accent/30 hover:text-accent"
                >
                  {calc!.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link
        href="/"
        className="focus-ring mt-10 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
      >
        <Icon icon="arrow-right" className="h-4 w-4 -scale-x-100" />
        Back to homepage
      </Link>
    </div>
  );
}
