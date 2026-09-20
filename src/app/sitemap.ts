import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { categories } from "@/lib/categories";
import { getCalculatorsByCategory, getLiveCalculators } from "@/lib/calculators/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/calculators`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/disclaimer`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];

  // A category with no live calculators yet is noindexed on the page itself
  // (see [slug]/page.tsx) — keep it out of the sitemap too, since listing a
  // noindexed URL there is contradictory and not something Google wants.
  const categoryRoutes: MetadataRoute.Sitemap = categories
    .filter((c) => getCalculatorsByCategory(c.slug).some((calc) => calc.isLive))
    .map((c) => ({
      url: `${SITE_URL}/calculators/${c.slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  const calculatorRoutes: MetadataRoute.Sitemap = getLiveCalculators().map((c) => ({
    url: `${SITE_URL}/calculators/${c.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...calculatorRoutes];
}
