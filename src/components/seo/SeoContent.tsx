import { ReactNode } from "react";

export function SeoContent({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-border pt-10">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <div className="prose-sm mt-4 flex flex-col gap-4 text-sm leading-relaxed text-muted [&_strong]:text-foreground">
        {children}
      </div>
    </section>
  );
}
