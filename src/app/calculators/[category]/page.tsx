import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/calculator/Breadcrumbs";
import { CalculatorCard } from "@/components/cards/CalculatorCard";
import { AdSlot } from "@/components/ads/AdSlot";
import { categories, getCategory } from "@/lib/categories";
import { getCalculatorsByCategory } from "@/lib/calculators/registry";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  return buildMetadata({
    title: `${category.title} Calculators`,
    description: `${category.description} Free, accurate ${category.title.toLowerCase()} calculators from CalcNests.`,
    path: `/calculators/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const calculators = getCalculatorsByCategory(category.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
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
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted">{category.description}</p>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {calculators.map((calc) => (
          <CalculatorCard key={calc.slug} calculator={calc} />
        ))}
      </div>

      <AdSlot variant="banner" className="mt-12" />
    </div>
  );
}
