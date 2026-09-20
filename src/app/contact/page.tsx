import { Breadcrumbs } from "@/components/calculator/Breadcrumbs";
import { ContactForm } from "@/components/contact/ContactForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact CalcNests",
  description: "Questions, corrections, or a calculator request? Send CalcNests a message.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "Contact", path: "" }]} />

      <header className="mt-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Contact us</h1>
        <p className="mt-2 max-w-xl text-base leading-relaxed text-muted">
          Spotted an error, have a question about how a calculator works, or want to suggest one
          we should build? Send us a message below.
        </p>
      </header>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
        <ContactForm />
      </div>
    </div>
  );
}
