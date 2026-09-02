import { ReactNode } from "react";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/calculator/Breadcrumbs";
import { FAQSection } from "@/components/calculator/FAQSection";
import { RelatedCalculators } from "@/components/calculator/RelatedCalculators";
import { AdSlot } from "@/components/ads/AdSlot";
import { JsonLd } from "@/components/seo/JsonLd";
import type { CalculatorMeta } from "@/types/calculator";
import { calculatorJsonLd } from "@/lib/seo";

interface CalculatorShellProps {
  calculator: CalculatorMeta;
  breadcrumbs: BreadcrumbItem[];
  /** The interactive form + result panel (client component). */
  form: ReactNode;
  /** Explanatory / SEO content rendered below the calculator. */
  content?: ReactNode;
  related: CalculatorMeta[];
}

export function CalculatorShell({ calculator, breadcrumbs, form, content, related }: CalculatorShellProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <JsonLd data={calculatorJsonLd(calculator)} />
      <Breadcrumbs items={breadcrumbs} />

      <header className="mt-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {calculator.title}
        </h1>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted">
          {calculator.description}
        </p>
      </header>

      <div className="mt-6">{form}</div>

      <AdSlot variant="inline" className="mt-10" />

      <div className="mt-10 flex flex-col gap-10">
        {content}
        <FAQSection faqs={calculator.faqs} />
        <RelatedCalculators calculators={related} />
      </div>
    </div>
  );
}
