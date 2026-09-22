import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Nav } from "@/components/layout/Nav";
import { MobileNav } from "@/components/layout/MobileNav";
import { Icon } from "@/components/icons/Icon";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface/95 shadow-xs backdrop-blur supports-backdrop-blur:bg-surface/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Logo />
          <span className="hidden h-6 w-px bg-border lg:block" aria-hidden="true" />
          <Nav />
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/calculators"
            className="focus-ring group hidden items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-xs transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-md sm:inline-flex"
          >
            Browse Calculators
            <Icon icon="arrow-right" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
