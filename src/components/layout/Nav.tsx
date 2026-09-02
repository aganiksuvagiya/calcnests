import Link from "next/link";
import { categories } from "@/lib/categories";

const navLinks = [
  { label: "All Calculators", href: "/calculators" },
  ...categories.slice(0, 4).map((c) => ({ label: c.title, href: `/calculators/${c.slug}` })),
];

export function Nav() {
  return (
    <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="focus-ring rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-surface-muted hover:text-foreground"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
