import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/calculator/Breadcrumbs";
import { FAQSection } from "@/components/calculator/FAQSection";
import { CalculatorCard } from "@/components/cards/CalculatorCard";
import { CalculatorPageView } from "@/components/calculator/CalculatorPageView";
import { AdSlot } from "@/components/ads/AdSlot";
import { Icon } from "@/components/icons/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { categories, categoryMap, getCategory } from "@/lib/categories";
import { getCalculatorsByCategory, getLiveCalculators } from "@/lib/calculators/registry";
import { calculatorConfigs, getCalculatorConfig } from "@/lib/calculators/configs";
import { buildMetadata, itemListJsonLd } from "@/lib/seo";

interface SlugPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * `/calculators/<slug>` resolves to either a category listing or a live
 * calculator, depending on which the slug matches. This keeps calculator
 * URLs flat (`/calculators/tip`, not `/calculators/money/tip`) while letting
 * a new calculator go live without adding a route file — just register it
 * in `calculatorConfigs` and flip `isLive` in the registry.
 */
export function generateStaticParams() {
  const categorySlugs = categories.map((c) => ({ slug: c.slug }));
  const calculatorSlugs = getLiveCalculators()
    .filter((c) => calculatorConfigs[c.slug])
    .map((c) => ({ slug: c.slug }));
  return [...categorySlugs, ...calculatorSlugs];
}

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;

  const category = getCategory(slug);
  if (category) {
    const liveCount = getCalculatorsByCategory(category.slug).filter((c) => c.isLive).length;
    return buildMetadata({
      title: `${category.title} Calculators`,
      description: `${category.description} Free, accurate ${category.title.toLowerCase()} calculators from CalcNests.`,
      path: `/calculators/${category.slug}`,
      // A category with no live calculators yet is just a grid of "coming
      // soon" cards — not useful enough to surface in search results until
      // it has real tools. Still fully browsable via site navigation.
      noindex: liveCount === 0,
    });
  }

  const config = getCalculatorConfig(slug);
  if (config) {
    return buildMetadata({
      title: config.title,
      description: config.shortDescription,
      path: `/calculators/${config.slug}`,
      keywords: config.keywords,
    });
  }

  return {};
}

export default async function CalculatorsSlugPage({ params }: SlugPageProps) {
  const { slug } = await params;

  const category = getCategory(slug);
  if (category) {
    const calculators = getCalculatorsByCategory(category.slug);
    const liveCalculators = calculators.filter((c) => c.isLive);
    const introParagraphs = category.intro.split("\n\n");
    const relatedCategories = category.relatedCategories.map((s) => categoryMap[s]).filter(Boolean);

    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {liveCalculators.length > 0 && (
          <JsonLd
            data={itemListJsonLd(liveCalculators.map((c) => ({ name: c.title, path: `/calculators/${c.slug}` })))}
          />
        )}
        <Breadcrumbs
          items={[
            { name: "Calculators", path: "/calculators" },
            { name: category.title, path: `/calculators/${category.slug}` },
          ]}
        />

        <header className="mt-4">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {category.title} calculators
          </h1>
          {introParagraphs.map((paragraph, i) => (
            <p key={i} className="mt-2 max-w-2xl text-base leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </header>

        <AdSlot variant="header" className="mt-6" />

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {calculators.map((calc) => (
            <CalculatorCard key={calc.slug} calculator={calc} />
          ))}
        </div>

        <AdSlot variant="bottom" className="mt-12" />

        {category.faqs.length > 0 && (
          <div className="mt-12">
            <FAQSection faqs={category.faqs} />
          </div>
        )}

        {relatedCategories.length > 0 && (
          <section aria-labelledby="related-categories-heading" className="mt-12 border-t border-border pt-10">
            <h2 id="related-categories-heading" className="text-xl font-semibold text-foreground">
              Related categories
            </h2>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {relatedCategories.map((related) => (
                <li key={related.slug}>
                  <Link
                    href={`/calculators/${related.slug}`}
                    className="focus-ring group flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/30"
                  >
                    <Icon icon={related.icon} className="h-5 w-5 text-accent" />
                    <span className="text-sm font-medium text-foreground group-hover:text-accent">
                      {related.title} calculators
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  }

  const config = getCalculatorConfig(slug);
  if (config) {
    return <CalculatorPageView config={config} />;
  }

  notFound();
}
