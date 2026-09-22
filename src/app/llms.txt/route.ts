import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/seo";
import { categories } from "@/lib/categories";
import { getCalculatorsByCategory } from "@/lib/calculators/registry";

/**
 * llms.txt — a machine-readable summary of the site for LLMs and AI
 * crawlers (see llmstxt.org). Generated from the same registry that drives
 * the sitemap, so it can't drift out of sync as calculators are added.
 */
export async function GET() {
  const lines: string[] = [];

  lines.push(`# ${SITE_NAME}`);
  lines.push("");
  lines.push(`> ${SITE_DESCRIPTION}`);
  lines.push("");
  lines.push(
    `${SITE_NAME} is a free online calculator platform built for US users. Every calculator is free, requires no sign-up or account, runs instantly in the browser, and shows the formula behind its result. Calculators are organized into ${categories.length} categories covering money, math, dates and time, education, home projects, everyday conversions, and US-specific tools (state taxes, wages, and cost of living).`
  );
  lines.push("");

  lines.push("## Categories");
  lines.push("");
  for (const category of categories) {
    const liveCount = getCalculatorsByCategory(category.slug).filter((c) => c.isLive).length;
    if (liveCount === 0) continue;
    lines.push(
      `- [${category.title}](${SITE_URL}/calculators/${category.slug}): ${category.description} (${liveCount} calculator${liveCount === 1 ? "" : "s"})`
    );
  }
  lines.push("");

  lines.push("## Calculators");
  lines.push("");
  for (const category of categories) {
    const liveCalcs = getCalculatorsByCategory(category.slug).filter((c) => c.isLive);
    if (liveCalcs.length === 0) continue;
    lines.push(`### ${category.title}`);
    lines.push("");
    for (const calc of liveCalcs) {
      lines.push(`- [${calc.title}](${SITE_URL}/calculators/${calc.slug}): ${calc.shortDescription}`);
    }
    lines.push("");
  }

  lines.push("## Site");
  lines.push("");
  lines.push(`- [All calculators](${SITE_URL}/calculators): Browse every calculator by category.`);
  lines.push(`- [About](${SITE_URL}/about): Who CalcNests is for and how the calculators are built.`);
  lines.push(`- [Contact](${SITE_URL}/contact): Get in touch with questions, corrections, or requests.`);
  lines.push("");

  lines.push("## Usage notes");
  lines.push("");
  lines.push(
    "- Calculators are estimation and planning tools, not professional financial, tax, legal, or medical advice."
  );
  lines.push(
    "- Formulas used by each calculator are disclosed on that calculator's own page, under \"How it works\" and \"Formula\"."
  );
  lines.push(
    `- Canonical site URL: ${SITE_URL}. All calculator and category pages follow the pattern ${SITE_URL}/calculators/<slug>.`
  );

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
