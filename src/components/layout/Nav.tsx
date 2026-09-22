import Link from "next/link";
import { categories } from "@/lib/categories";

const navLinks = [
  { label: "All Calculators", href: "/calculators" },
  ...categories.map((c) => ({ label: c.title, href: `/calculators/${c.slug}` })),
];

export function Nav() {
  return (
    <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="focus-ring rounded-full px-2.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent-soft hover:text-accent xl:px-3.5"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
