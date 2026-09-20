import { ReactNode } from "react";
import { Breadcrumbs } from "@/components/calculator/Breadcrumbs";

interface LegalPageLayoutProps {
  title: string;
  intro?: string;
  lastUpdated?: string;
  children: ReactNode;
}

export function LegalPageLayout({ title, intro, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: title, path: "" }]} />

      <header className="mt-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h1>
        {lastUpdated && <p className="mt-2 text-xs text-muted">Last updated: {lastUpdated}</p>}
        {intro && <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{intro}</p>}
      </header>

      <div className="prose-legal mt-8 flex flex-col gap-8">{children}</div>
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <div className="mt-2.5 flex flex-col gap-3 text-sm leading-relaxed text-muted">{children}</div>
    </section>
  );
}
