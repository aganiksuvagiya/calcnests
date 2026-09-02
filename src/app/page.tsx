import Link from "next/link";
import { SearchBox } from "@/components/search/SearchBox";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { CalculatorCard } from "@/components/cards/CalculatorCard";
import { AdSlot } from "@/components/ads/AdSlot";
import { categories } from "@/lib/categories";
import { calculatorRegistry, getCalculator } from "@/lib/calculators/registry";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CalcNests — Smart Calculators & Everyday Tools",
  description:
    "Fast, accurate, free calculators for money, math, home, education, and everyday decisions — built for the US.",
  path: "/",
});

const popularSlugs = [
  "percentage",
  "mortgage",
  "tip",
  "bmi",
  "age",
  "gpa",
  "loan",
  "sales-tax",
];

const usTools = calculatorRegistry.filter((c) => c.category === "us-tools");

const whyPoints = [
  {
    title: "Built for accuracy",
    body: "Every calculator uses transparent, correct formulas — no shortcuts, no guesswork.",
  },
  {
    title: "Fast by design",
    body: "Lightweight pages and instant results, with no sign-up and no clutter in the way.",
  },
  {
    title: "Made for the US",
    body: "US units, tax conventions, and currency by default, so results match what you expect.",
  },
];

const faqs = [
  {
    question: "Are CalcNests calculators free to use?",
    answer: "Yes. Every calculator on CalcNests is free, with no account or sign-up required.",
  },
  {
    question: "How accurate are the results?",
    answer:
      "Each calculator is built on standard, verifiable formulas. Results are estimates intended for planning — for decisions involving taxes, loans, or medical matters, confirm with a licensed professional.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No. All calculators run instantly in your browser with no account needed.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Smart calculators for everyday decisions
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
              Fast, accurate, and free tools for money, math, home, education, and daily life —
              built for the US.
            </p>
          </div>
          <div className="mx-auto mt-6 max-w-xl">
            <SearchBox size="lg" placeholder="Search 30+ calculators…" />
          </div>
        </div>
      </section>

      <section aria-labelledby="popular-heading" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between">
          <h2 id="popular-heading" className="text-xl font-semibold text-foreground">
            Popular calculators
          </h2>
          <Link href="/calculators" className="focus-ring rounded text-sm font-medium text-accent hover:text-accent-hover">
            View all
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popularSlugs.map((slug) => {
            const calc = getCalculator(slug);
            if (!calc) return null;
            return <CalculatorCard key={slug} calculator={calc} />;
          })}
        </div>
      </section>

      <section aria-labelledby="categories-heading" className="bg-surface-muted py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="categories-heading" className="text-xl font-semibold text-foreground">
            Browse by category
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="us-tools-heading" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 id="us-tools-heading" className="text-xl font-semibold text-foreground">
          Featured US tools
        </h2>
        <p className="mt-1.5 max-w-2xl text-sm text-muted">
          Calculators built around US-specific conventions like federal tax brackets and state
          minimum wage.
        </p>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {usTools.map((calc) => (
            <CalculatorCard key={calc.slug} calculator={calc} />
          ))}
        </div>
      </section>

      <AdSlot variant="banner" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" />

      <section aria-labelledby="why-heading" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 id="why-heading" className="text-xl font-semibold text-foreground">
          Why CalcNests
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {whyPoints.map((point) => (
            <div key={point.title} className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="text-base font-semibold text-foreground">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{point.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="home-faq-heading" className="border-t border-border bg-surface-muted py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 id="home-faq-heading" className="text-xl font-semibold text-foreground">
            Frequently asked questions
          </h2>
          <div className="mt-6 flex flex-col divide-y divide-border">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 rounded-md text-sm font-medium text-foreground">
                  {faq.question}
                  <span className="shrink-0 text-muted transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
