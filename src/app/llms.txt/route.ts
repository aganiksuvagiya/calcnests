import { SITE_URL, SITE_DESCRIPTION } from "@/lib/seo";
import { categories } from "@/lib/categories";
import { getCalculatorsByCategory } from "@/lib/calculators/registry";

export const dynamic = "force-static";

/**
 * llms.txt (see llmstxt.org) — a plain-text index for AI assistants and
 * answer engines, mirroring the sitemap but written for an LLM to skim:
 * what the site is, and a categorized list of its pages. Generated from the
 * live registry so it can't drift out of sync with the actual site.
 */
export async function GET() {
  const lines: string[] = [];

  lines.push("# CalcNests");
  lines.push("");
  lines.push(`> ${SITE_DESCRIPTION}`);
  lines.push("");
  lines.push(
    "All calculators are free, require no account, and run instantly in the browser. Results are estimates for planning purposes, not professional financial, tax, or medical advice."
  );
  lines.push("");

  for (const category of categories) {
    const calculators = getCalculatorsByCategory(category.slug).filter((c) => c.isLive);
    if (calculators.length === 0) continue;

    lines.push(`## ${category.title}`);
    lines.push("");
    for (const calc of calculators) {
      lines.push(`- [${calc.title}](${SITE_URL}/calculators/${calc.slug}): ${calc.shortDescription}`);
    }
    lines.push("");
  }

  lines.push("## Site");
  lines.push("");
  lines.push(`- [All calculators](${SITE_URL}/calculators)`);
  lines.push(`- [About](${SITE_URL}/about)`);
  lines.push(`- [Contact](${SITE_URL}/contact)`);
  lines.push(`- [Privacy policy](${SITE_URL}/privacy)`);
  lines.push(`- [Terms of use](${SITE_URL}/terms)`);
  lines.push(`- [Disclaimer](${SITE_URL}/disclaimer)`);

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
