import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { categories } from "@/lib/categories";
import { getLiveCalculators } from "@/lib/calculators/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/calculators`, changeFrequency: "weekly", priority: 0.9 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE_URL}/calculators/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const calculatorRoutes: MetadataRoute.Sitemap = getLiveCalculators().map((c) => ({
    url: `${SITE_URL}/calculators/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...calculatorRoutes];
}
