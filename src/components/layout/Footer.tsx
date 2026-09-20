import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/categories";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-muted">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2">
              <Image src="/logo-icon.png" alt="" width={32} height={35} className="h-8 w-auto" />
              <span className="text-lg font-bold text-foreground">
                Calc<span className="text-accent">Nests</span>
              </span>
            </div>
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
              <li>
                <Link href="/about" className="focus-ring rounded text-sm text-muted hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="focus-ring rounded text-sm text-muted hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Legal</h3>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <Link href="/privacy" className="focus-ring rounded text-sm text-muted hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="focus-ring rounded text-sm text-muted hover:text-foreground">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="focus-ring rounded text-sm text-muted hover:text-foreground">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted">© {new Date().getFullYear()} CalcNests. All rights reserved.</p>
          <p className="max-w-md text-center text-xs text-muted sm:text-right">
            Calculators provide estimates for informational purposes and aren&apos;t a substitute
            for professional financial, tax, legal, or medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
