"use client";

import { useState } from "react";
import Link from "next/link";
import { categories } from "@/lib/categories";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="focus-ring flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-accent/30 hover:bg-accent-soft hover:text-accent"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        )}
      </button>

      {open && (
        <div
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-16 z-40 origin-top animate-[mobile-nav-in_150ms_ease-out] border-b border-border bg-surface px-4 py-4 shadow-md"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            <Link
              href="/calculators"
              onClick={() => setOpen(false)}
              className="focus-ring rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent-soft hover:text-accent"
            >
              All Calculators
            </Link>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/calculators/${c.slug}`}
                onClick={() => setOpen(false)}
                className="focus-ring rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent-soft hover:text-accent"
              >
                {c.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
