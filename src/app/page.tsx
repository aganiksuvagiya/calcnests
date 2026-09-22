import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { cn } from "@/lib/utils";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { CalculatorCard } from "@/components/cards/CalculatorCard";
import { AdSlot } from "@/components/ads/AdSlot";
import { Icon } from "@/components/icons/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { categories } from "@/lib/categories";
import { calculatorRegistry, getCalculator } from "@/lib/calculators/registry";
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
    soft: "bg-emerald-50",
    text: "text-emerald-600",
    solid: "group-hover:bg-emerald-600",
  },
  {
    icon: "zap",
    title: "Fast by design",
    body: "Lightweight pages and instant results, with no sign-up and no clutter in the way.",
    soft: "bg-sky-50",
    text: "text-sky-600",
    solid: "group-hover:bg-sky-600",
  },
  {
    icon: "flag",
    title: "Made for the US",
    body: "US units, tax conventions, and currency by default, so results match what you expect.",
    soft: "bg-violet-50",
    text: "text-violet-600",
    solid: "group-hover:bg-violet-600",
  },
];

const steps = [
  {
    icon: "search",
    title: "Find your calculator",
    body: "Search by name or browse by category — money, math, home, education, and more.",
  },
  {
    icon: "calculator",
    title: "Enter your numbers",
    body: "Type in a few values on a clean, focused page. No sign-up, no distractions.",
  },
  {
    icon: "zap",
    title: "Get an instant answer",
    body: "See your result immediately, with the formula behind it so every calculation is transparent.",
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
  {
    question: "Are the calculators made for US users?",
    answer:
      "Yes. CalcNests calculators use US units, currency, and conventions by default — including federal and state tax rules where relevant — so results match what US users expect.",
  },
  {
    question: "How are calculator formulas calculated?",
    answer:
      "Each calculator uses standard, published formulas for its category — for example IRS tax brackets, BMI formulas from health guidelines, or standard financial math for loans and mortgages. Every calculator page explains the formula it uses.",
  },
  {
    question: "Can I use CalcNests on mobile?",
    answer:
      "Yes. Every calculator is built mobile-first, with large touch-friendly inputs and no horizontal scrolling, so it works the same on phones, tablets, and desktop.",
  },
];

function Eyebrow({
  children,
  center,
  icon,
}: {
  children: React.ReactNode;
  center?: boolean;
  icon?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", center && "justify-center")}>
      {icon ? (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-soft text-accent" aria-hidden="true">
          <Icon icon={icon} className="h-3 w-3" />
        </span>
      ) : (
        <span className="h-1 w-6 rounded-full bg-accent" aria-hidden="true" />
      )}
      <p className="text-xs font-semibold uppercase tracking-wide text-accent">{children}</p>
    </div>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative whitespace-nowrap">
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0.5 z-0 h-2.5 rounded-full bg-accent-soft sm:h-3"
      />
    </span>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />

      <section aria-labelledby="popular-heading" className="relative overflow-hidden py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-sky-100/50 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex items-end justify-between gap-4">
            <div>
              <Eyebrow icon="trending-up">Popular</Eyebrow>
              <h2 id="popular-heading" className="mt-1 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                <Highlight>Popular</Highlight> calculators
              </h2>
            </div>
            <Link
              href="/calculators"
              className="focus-ring group flex shrink-0 items-center gap-1 rounded text-sm font-medium text-accent hover:text-accent-hover"
            >
              View all
              <Icon icon="arrow-right" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {popularSlugs.map((slug, i) => {
              const calc = getCalculator(slug);
              if (!calc) return null;
              return (
                <Reveal key={slug} delay={i * 60}>
                  <CalculatorCard calculator={calc} />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="steps-heading" className="border-y border-border bg-surface-muted py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow center icon="zap">How it works</Eyebrow>
            <h2 id="steps-heading" className="mt-1 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              From question to answer in seconds
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 100} className="relative flex items-center">
                <div className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-3 -top-6 select-none text-7xl font-extrabold text-foreground/[0.05] transition-colors duration-200 group-hover:text-accent/10"
                  >
                    {i + 1}
                  </span>
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent transition-all duration-200 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
                    <Icon icon={step.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="relative mt-4 text-base font-semibold text-foreground transition-colors group-hover:text-accent">
                    {step.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
                </div>
                {i < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute -right-6 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface p-1.5 text-muted sm:flex"
                  >
                    <Icon icon="arrow-right" className="h-3.5 w-3.5" />
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="categories-heading" className="relative overflow-hidden border-b border-border bg-surface py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent-soft/60 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Eyebrow icon="layout-grid">Categories</Eyebrow>
            <h2 id="categories-heading" className="mt-1 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Browse by <Highlight>category</Highlight>
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Every calculator on CalcNests is organized into one of seven categories, so you can go
              straight to the tool you need.
            </p>
          </Reveal>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, i) => (
              <Reveal key={category.slug} delay={i * 60}>
                <CategoryCard category={category} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="us-tools-heading" className="relative overflow-hidden py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-indigo-100/50 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex items-end justify-between gap-4">
            <div>
              <Eyebrow icon="flag">US Tools</Eyebrow>
              <h2 id="us-tools-heading" className="mt-1 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                Featured <Highlight>US tools</Highlight>
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted">
                Calculators built around US-specific conventions like federal tax brackets and state
                minimum wage.
              </p>
            </div>
            <Link
              href="/calculators/us-tools"
              className="focus-ring group flex shrink-0 items-center gap-1 rounded text-sm font-medium text-accent hover:text-accent-hover"
            >
              View all
              <Icon icon="arrow-right" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {usTools.map((calc, i) => (
              <Reveal key={calc.slug} delay={i * 60}>
                <CalculatorCard calculator={calc} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdSlot variant="in-content" />
      </div>

      <section aria-labelledby="why-heading" className="relative overflow-hidden py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-accent-soft/50 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow center icon="sparkles">Why CalcNests</Eyebrow>
            <h2 id="why-heading" className="mt-1 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Math you can trust, in seconds
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Everyday decisions — a tip, a loan, a grade, a move-in date — often come down to a
              calculation most people don&apos;t have time to do carefully. CalcNests exists to make
              that math instant, correct, and free, so a five-minute decision doesn&apos;t need a
              spreadsheet.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {whyPoints.map((point, i) => (
              <Reveal
                key={point.title}
                delay={i * 100}
                className="group rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl"
              >
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 group-hover:scale-110 group-hover:text-white",
                    point.soft,
                    point.text,
                    point.solid
                  )}
                >
                  <Icon icon={point.icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground transition-colors group-hover:text-accent">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{point.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="home-faq-heading" className="border-t border-border bg-surface-muted py-16">
        <JsonLd data={faqJsonLd(faqs)} />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <Eyebrow center icon="search">FAQ</Eyebrow>
            <h2 id="home-faq-heading" className="mt-1 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Frequently asked questions
            </h2>
          </Reveal>
          <Reveal delay={100} className="mt-8 flex flex-col divide-y divide-border rounded-2xl border border-border bg-surface px-6 shadow-sm">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="focus-ring flex cursor-pointer list-none items-center gap-4 rounded-md text-sm font-medium text-foreground transition-colors hover:text-accent">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Icon icon="check-circle" className="h-3.5 w-3.5" />
                  </span>
                  <span className="flex-1">{faq.question}</span>
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-muted transition-all group-hover:bg-accent-soft group-hover:text-accent group-open:rotate-45 group-open:bg-accent-soft group-open:text-accent"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="ml-10 mt-2.5 text-sm leading-relaxed text-muted">{faq.answer}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      <Reveal as="section" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-muted px-8 py-12 text-center sm:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,var(--accent-soft),transparent)]"
          />
          <div className="relative">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Can&apos;t find the calculator you need?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              Browse the full library of {calculatorRegistry.length}+ calculators across every
              category, or search for exactly what you&apos;re looking for.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/calculators"
                className="focus-ring group inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-lg"
              >
                Browse all calculators
                <Icon icon="arrow-right" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <AdSlot variant="bottom" />
      </div>
    </div>
  );
}
