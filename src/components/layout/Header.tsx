import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Nav } from "@/components/layout/Nav";
import { MobileNav } from "@/components/layout/MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface/95 backdrop-blur supports-backdrop-blur:bg-surface/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo />
          <Nav />
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/calculators"
            className="focus-ring hidden rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover sm:inline-flex"
          >
            Browse Calculators
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
