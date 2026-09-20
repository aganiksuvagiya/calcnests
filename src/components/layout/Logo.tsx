import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link
      href="/"
      className="focus-ring flex items-center gap-2 rounded-md text-lg font-bold tracking-tight text-foreground"
    >
      <Image src="/logo-icon.png" alt="" width={32} height={35} priority className="h-8 w-auto" />
      <span>
        Calc<span className="text-accent">Nests</span>
      </span>
    </Link>
  );
}
