import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="focus-ring flex items-center gap-2 rounded-md text-lg font-bold tracking-tight text-foreground"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm text-white">
        C
      </span>
      CalcNests
    </Link>
  );
}
