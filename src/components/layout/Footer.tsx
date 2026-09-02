import Link from "next/link";
import { categories } from "@/lib/categories";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-muted">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <span className="text-lg font-bold text-foreground">CalcNests</span>
            <p className="mt-2 text-sm text-muted">
              Smart calculators & everyday tools for money, math, home, and life.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Categories</h3>
            <ul className="mt-3 flex flex-col gap-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/calculators/${c.slug}`}
                    className="focus-ring rounded text-sm text-muted hover:text-foreground"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Site</h3>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <Link href="/calculators" className="focus-ring rounded text-sm text-muted hover:text-foreground">
                  All Calculators
                </Link>
              </li>
              <li>
                <Link href="/" className="focus-ring rounded text-sm text-muted hover:text-foreground">
                  Home
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">About</h3>
            <p className="mt-3 text-sm text-muted">
              CalcNests provides free calculators for informational purposes only. Results are
              estimates and not a substitute for professional financial, medical, or legal advice.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} CalcNests. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
