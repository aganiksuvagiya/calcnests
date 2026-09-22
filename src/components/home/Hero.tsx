import Link from "next/link";
import { SearchBox } from "@/components/search/SearchBox";
import { Icon } from "@/components/icons/Icon";
import { CountUp } from "@/components/motion/CountUp";
import { calculatorRegistry, getCalculator } from "@/lib/calculators/registry";
import { categories } from "@/lib/categories";
import { SITE_TAGLINE } from "@/lib/seo";

const popularSearchSlugs = ["percentage", "tip", "mortgage", "bmi", "gpa", "age"];

export function Hero() {
  const total = calculatorRegistry.length;
  const popularSearches = popularSearchSlugs
    .map((slug) => getCalculator(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const stats = [
    { icon: "calculator", value: total, suffix: "+", label: "calculators" },
    { icon: "layout-grid", value: categories.length, suffix: "", label: "categories" },
    { icon: "check-circle", value: 100, suffix: "%", label: "free, always" },
  ];

  return (
    <section className="relative border-b border-border bg-surface">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_20%,black,transparent)]" />
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,var(--accent-soft),transparent)]" />
        <div className="animate-blob-float absolute -left-24 top-10 hidden h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl sm:block" />
        <div
          style={{ animationDelay: "-5s" }}
          className="animate-blob-float absolute -right-24 top-24 hidden h-72 w-72 rounded-full bg-sky-200/30 blur-3xl sm:block"
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 pb-12 pt-16 text-center sm:px-6 sm:pb-16 sm:pt-24 lg:px-8">
        <span
          className="animate-fade-in-up focus-ring inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent-soft px-3 py-1 text-xs font-semibold text-accent"
        >
          <Icon icon="sparkles" className="h-3.5 w-3.5" />
          {SITE_TAGLINE}
        </span>

        <h1
          style={{ animationDelay: "80ms" }}
          className="animate-fade-in-up mt-6 text-4xl font-extrabold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl"
        >
          Every calculation you need,
          <br className="hidden sm:block" /> in{" "}
          <span className="relative whitespace-nowrap">
            <span className="relative z-10">one place</span>
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-1 z-0 h-3 rounded-full bg-accent-soft sm:h-4"
            />
          </span>
          .
        </h1>
        <p
          style={{ animationDelay: "160ms" }}
          className="animate-fade-in-up mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
        >
          Free, accurate calculators for money, home, education, health, and everyday decisions —
          built for the US, no sign-up required.
        </p>

        <div style={{ animationDelay: "240ms" }} className="animate-fade-in-up relative z-20 mx-auto mt-8 max-w-xl">
          <SearchBox size="lg" placeholder={`Search ${total}+ calculators…`} />
        </div>

        <div
          style={{ animationDelay: "320ms" }}
          className="animate-fade-in-up relative z-10 mx-auto mt-4 flex max-w-xl flex-wrap items-center justify-center gap-x-2 gap-y-2 text-sm"
        >
          <span className="text-muted">Popular:</span>
          {popularSearches.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/${calc.slug}`}
              className="focus-ring rounded-full border border-border bg-surface px-3 py-1 text-foreground/80 transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:bg-accent-soft hover:text-accent hover:shadow-xs"
            >
              {calc.shortTitle ?? calc.title}
            </Link>
          ))}
        </div>

        <dl
          style={{ animationDelay: "400ms" }}
          className="animate-fade-in-up mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-3 sm:mt-12"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="group flex items-center gap-2 rounded-full border border-border bg-surface py-2 pl-2 pr-4 shadow-xs transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-sm">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft text-accent transition-transform duration-200 group-hover:scale-110">
                  <Icon icon={stat.icon} className="h-3.5 w-3.5" />
                </span>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-sm font-semibold text-foreground">
                  <CountUp value={stat.value} suffix={stat.suffix} />{" "}
                  <span className="font-normal text-muted">{stat.label}</span>
                </dd>
              </div>
              {i < stats.length - 1 && (
                <span className="hidden h-1 w-1 rounded-full bg-border sm:block" aria-hidden="true" />
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
