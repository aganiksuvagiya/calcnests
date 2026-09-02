import type { FaqItem } from "@/types/calculator";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/seo";

export function FAQSection({ faqs, title = "Frequently asked questions" }: { faqs: FaqItem[]; title?: string }) {
  if (faqs.length === 0) return null;

  return (
    <section aria-labelledby="faq-heading" className="border-t border-border pt-10">
      <JsonLd data={faqJsonLd(faqs)} />
      <h2 id="faq-heading" className="text-xl font-semibold text-foreground">
        {title}
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
    </section>
  );
}
