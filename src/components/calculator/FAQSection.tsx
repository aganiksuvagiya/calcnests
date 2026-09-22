import type { FaqItem } from "@/types/calculator";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/icons/Icon";
import { faqJsonLd } from "@/lib/seo";

export function FAQSection({ faqs, title = "Frequently asked questions" }: { faqs: FaqItem[]; title?: string }) {
  if (faqs.length === 0) return null;

  return (
    <section aria-labelledby="faq-heading" className="border-t border-border pt-10">
      <JsonLd data={faqJsonLd(faqs)} />
      <h2 id="faq-heading" className="text-xl font-semibold text-foreground">
        {title}
      </h2>
      <div className="mt-6 flex flex-col divide-y divide-border rounded-2xl border border-border bg-surface px-5 shadow-sm">
        {faqs.map((faq, i) => (
          <details key={faq.question} className="group py-4" open={i === 0}>
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
      </div>
    </section>
  );
}
