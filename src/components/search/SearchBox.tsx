"use client";

import { useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { calculatorRegistry } from "@/lib/calculators/registry";
import { cn } from "@/lib/utils";

interface SearchBoxProps {
  size?: "md" | "lg";
  placeholder?: string;
}

export function SearchBox({ size = "md", placeholder = "Search calculators…" }: SearchBoxProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return calculatorRegistry
      .filter(
        (c) =>
          c.isLive &&
          (c.title.toLowerCase().includes(q) ||
            c.keywords.some((k) => k.toLowerCase().includes(q)))
      )
      .slice(0, 6);
  }, [query]);

  const hasQuery = query.trim().length > 0;
  const optionId = (slug: string) => `${listId}-option-${slug}`;

  function goTo(slug: string) {
    setIsOpen(false);
    setQuery("");
    router.push(`/calculators/${slug}`);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      goTo(results[activeIndex].slug);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <label htmlFor="site-search" className="sr-only">
        Search calculators
      </label>
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          id="site-search"
          type="search"
          role="combobox"
          aria-expanded={isOpen && hasQuery}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={activeIndex >= 0 ? optionId(results[activeIndex].slug) : undefined}
          autoComplete="off"
          value={query}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 120)}
          onKeyDown={handleKeyDown}
          className={cn(
            "focus-ring w-full rounded-xl border border-border bg-surface pl-11 pr-4 text-foreground placeholder:text-muted transition-colors hover:border-foreground/20",
            size === "lg" ? "py-4 text-base shadow-sm" : "py-2.5 text-sm"
          )}
        />
      </div>

      {isOpen && hasQuery && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Search results"
          className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-surface shadow-lg"
        >
          {results.length > 0 ? (
            results.map((c, i) => (
              <li key={c.slug} id={optionId(c.slug)} role="option" aria-selected={i === activeIndex}>
                <button
                  type="button"
                  onMouseDown={() => goTo(c.slug)}
                  className={cn(
                    "flex w-full flex-col items-start gap-0.5 px-4 py-2.5 text-left text-sm transition-colors",
                    i === activeIndex ? "bg-accent-soft text-accent" : "text-foreground hover:bg-surface-muted"
                  )}
                >
                  <span className="font-medium">{c.title}</span>
                  <span className={cn("text-xs", i === activeIndex ? "text-foreground/80" : "text-muted")}>
                    {c.shortDescription}
                  </span>
                </button>
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-sm text-muted">
              No calculators match &ldquo;{query.trim()}&rdquo;.{" "}
              <Link href="/calculators" className="font-medium text-accent hover:text-accent-hover">
                Browse all calculators
              </Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
