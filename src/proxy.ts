import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Every route on this site is lowercase by construction (calculator and
 * category slugs are all lowercase-with-hyphens), so this never fires for
 * normal traffic. It exists as a safety net: a mixed-case URL variant of a
 * real page (e.g. "/Calculators/Tip") would otherwise be a second,
 * uncanonicalized way to reach the same content — a permanent redirect to
 * the lowercase form keeps that from ever becoming duplicate content.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const lower = pathname.toLowerCase();

  if (pathname !== lower) {
    const url = request.nextUrl.clone();
    url.pathname = lower;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/|_next/|favicon.ico).*)"],
};
