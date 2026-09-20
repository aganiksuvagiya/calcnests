import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { cn } from "@/lib/utils";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { CalculatorCard } from "@/components/cards/CalculatorCard";
import { AdSlot } from "@/components/ads/AdSlot";
import { Icon } from "@/components/icons/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { categories } from "@/lib/categories";
import { getCalculator } from "@/lib/calculators/registry";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CalcNests — All Your Calculations, In One Place",
  description:
    "All your calculations, in one place — fast, accurate, free calculators for money, math, home, education, and everyday decisions, built for the US.",
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

const usToolSlugs = ["minimum-wage", "state-sales-tax", "state-paycheck", "state-mortgage"];
const usTools = usToolSlugs
  .map((slug) => getCalculator(slug))
  .filter((c): c is NonNullable<typeof c> => Boolean(c));

const whyPoints = [
  {
    icon: "check-circle",
    title: "Built for accuracy",
    body: "Every calculator uses transparent, correct formulas — no shortcuts, no guesswork.",
  },
  {
    icon: "zap",
    title: "Fast by design",
    body: "Lightweight pages and instant results, with no sign-up and no clutter in the way.",
  },
  {
    icon: "flag",
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

function Eyebrow({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2", center && "justify-center")}>
      <span className="h-1 w-6 rounded-full bg-accent" aria-hidden="true" />
      <p className="text-xs font-semibold uppercase tracking-wide text-accent">{children}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />

      <section aria-labelledby="popular-heading" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <Eyebrow>Popular</Eyebrow>
            <h2 id="popular-heading" className="mt-1 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Popular calculators
            </h2>
          </div>
          <Link
            href="/calculators"
            className="focus-ring flex shrink-0 items-center gap-1 rounded text-sm font-medium text-accent hover:text-accent-hover"
          >
            View all
            <Icon icon="arrow-right" className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popularSlugs.map((slug) => {
            const calc = getCalculator(slug);
            if (!calc) return null;
            return <CalculatorCard key={slug} calculator={calc} />;
          })}
        </div>
      </section>

      <section aria-labelledby="categories-heading" className="border-y border-border bg-surface-muted py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Eyebrow>Categories</Eyebrow>
          <h2 id="categories-heading" className="mt-1 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Browse by category
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Every calculator on CalcNests is organized into one of seven categories, so you can go
            straight to the tool you need.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="us-tools-heading" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <Eyebrow>US Tools</Eyebrow>
            <h2 id="us-tools-heading" className="mt-1 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Featured US tools
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Calculators built around US-specific conventions like federal tax brackets and state
              minimum wage.
            </p>
          </div>
          <Link
            href="/calculators/us-tools"
            className="focus-ring flex shrink-0 items-center gap-1 rounded text-sm font-medium text-accent hover:text-accent-hover"
          >
            View all
            <Icon icon="arrow-right" className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {usTools.map((calc) => (
            <CalculatorCard key={calc.slug} calculator={calc} />
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdSlot variant="in-content" />
      </div>

      <section aria-labelledby="why-heading" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow center>Why CalcNests</Eyebrow>
          <h2 id="why-heading" className="mt-1 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Math you can trust, in seconds
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Everyday decisions — a tip, a loan, a grade, a move-in date — often come down to a
            calculation most people don&apos;t have time to do carefully. CalcNests exists to make
            that math instant, correct, and free, so a five-minute decision doesn&apos;t need a
            spreadsheet.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {whyPoints.map((point) => (
            <div
              key={point.title}
              className="rounded-2xl border border-border bg-surface p-6 shadow-xs transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Icon icon={point.icon} className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{point.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="home-faq-heading" className="border-t border-border bg-surface-muted py-16">
        <JsonLd data={faqJsonLd(faqs)} />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Eyebrow center>FAQ</Eyebrow>
            <h2 id="home-faq-heading" className="mt-1 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Frequently asked questions
            </h2>
          </div>
          <div className="mt-8 flex flex-col divide-y divide-border rounded-2xl border border-border bg-surface px-6 shadow-xs">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
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

      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <AdSlot variant="bottom" />
      </div>
    </div>
  );
}
