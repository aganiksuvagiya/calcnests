import { ReactNode } from "react";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/calculator/Breadcrumbs";
import { FAQSection } from "@/components/calculator/FAQSection";
import { RelatedCalculators } from "@/components/calculator/RelatedCalculators";
import { AdSlot } from "@/components/ads/AdSlot";
import { JsonLd } from "@/components/seo/JsonLd";
import type { CalculatorMeta, FaqItem } from "@/types/calculator";
import { calculatorJsonLd } from "@/lib/seo";

interface CalculatorShellProps {
  slug: string;
  title: string;
  /** Short, one-line description shown under the title. */
  description: string;
  breadcrumbs: BreadcrumbItem[];
  /** The interactive form + result panel (client component). */
  form: ReactNode;
  /** Explanatory / SEO content rendered below the calculator. */
  content?: ReactNode;
  faqs: FaqItem[];
  related: CalculatorMeta[];
  /** Calculators in a different category that are still genuinely relevant (e.g. Paycheck ↔ State Paycheck). */
  crossCategoryRelated?: CalculatorMeta[];
}

/**
 * Ad placements on a calculator page, deliberately excluding a top/header
 * banner: the calculator itself must be the first thing a visitor sees and
 * uses, so nothing is placed above or beside the form. Ads only start
 * appearing once someone has scrolled past the result into supporting
 * content (inline → in-content → sidebar alongside that content → bottom).
 */
export function CalculatorShell({
  slug,
  title,
  description,
  breadcrumbs,
  form,
  content,
  faqs,
  related,
  crossCategoryRelated = [],
}: CalculatorShellProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <JsonLd data={calculatorJsonLd({ slug, title, description })} />

      <div className="mx-auto max-w-4xl">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mt-4">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted">{description}</p>
        </header>

        <div className="mt-6">{form}</div>

        <AdSlot variant="inline" className="mt-10" />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 lg:mx-0">
          {content}
          <AdSlot variant="in-content" />
          <FAQSection faqs={faqs} />
          <RelatedCalculators calculators={related} />
          {crossCategoryRelated.length > 0 && (
            <RelatedCalculators
              calculators={crossCategoryRelated}
              title="You might also need"
              headingId="cross-related-heading"
            />
          )}
          <AdSlot variant="bottom" />
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <AdSlot variant="sidebar" />
          </div>
        </aside>
      </div>
    </div>
  );
}
