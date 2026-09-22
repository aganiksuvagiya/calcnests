import { Breadcrumbs } from "@/components/calculator/Breadcrumbs";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { CalculatorCard } from "@/components/cards/CalculatorCard";
import { AdSlot } from "@/components/ads/AdSlot";
import { JsonLd } from "@/components/seo/JsonLd";
import { categories } from "@/lib/categories";
import { getCalculatorsByCategory, getLiveCalculators } from "@/lib/calculators/registry";
import { buildMetadata, itemListJsonLd } from "@/lib/seo";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  if (q?.trim()) {
    return buildMetadata({
      title: `Search results for "${q.trim()}"`,
      description: `Calculators on CalcNests matching "${q.trim()}".`,
      path: "/calculators",
      noindex: true,
    });
  }
  return buildMetadata({
    title: "All Calculators",
    description:
      "Browse every CalcNests calculator across money, math, home, education, date & time, and everyday categories.",
    path: "/calculators",
  });
}

export default async function AllCalculatorsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim().toLowerCase();

  if (query) {
    const results = getLiveCalculators().filter(
      (c) =>
        c.title.toLowerCase().includes(query) ||
        c.keywords.some((k) => k.toLowerCase().includes(query))
    );

    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <JsonLd data={itemListJsonLd(results.map((c) => ({ name: c.title, path: `/calculators/${c.slug}` })))} />
        <Breadcrumbs items={[{ name: "Calculators", path: "/calculators" }]} />

        <header className="mt-4">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Search results for &ldquo;{q}&rdquo;
          </h1>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted">
            {results.length} calculator{results.length === 1 ? "" : "s"}{" "}
            {results.length === 1 ? "matches" : "match"} your search.{" "}
            <a href="/calculators" className="font-medium text-accent hover:text-accent-hover">
              Browse all calculators
            </a>{" "}
            instead.
          </p>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((calc) => (
            <CalculatorCard key={calc.slug} calculator={calc} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        data={itemListJsonLd(getLiveCalculators().map((c) => ({ name: c.title, path: `/calculators/${c.slug}` })))}
      />
      <Breadcrumbs items={[{ name: "Calculators", path: "/calculators" }]} />

      <header className="mt-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          All calculators
        </h1>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted">
          Every CalcNests tool, organized by category. Pick a category below or use search to jump
          straight to a calculator.
        </p>
      </header>

      <AdSlot variant="header" className="mt-6" />

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>

      <div className="mt-14 flex flex-col gap-12">
        {categories.map((category) => {
          const calcs = getCalculatorsByCategory(category.slug);
          return (
            <section key={category.slug} aria-labelledby={`${category.slug}-heading`}>
              <h2 id={`${category.slug}-heading`} className="text-xl font-semibold text-foreground">
                {category.title}
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {calcs.map((calc) => (
                  <CalculatorCard key={calc.slug} calculator={calc} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <AdSlot variant="bottom" className="mt-14" />
    </div>
  );
}
