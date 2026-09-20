import { ImageResponse } from "next/og";
import { categories, getCategory } from "@/lib/categories";
import { getLiveCalculators } from "@/lib/calculators/registry";
import { calculatorConfigs, getCalculatorConfig } from "@/lib/calculators/configs";
import { SITE_NAME } from "@/lib/seo";
import { ogImageContent, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from "@/lib/ogImageTemplate";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export function generateStaticParams() {
  const categorySlugs = categories.map((c) => ({ slug: c.slug }));
  const calculatorSlugs = getLiveCalculators()
    .filter((c) => calculatorConfigs[c.slug])
    .map((c) => ({ slug: c.slug }));
  return [...categorySlugs, ...calculatorSlugs];
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const category = getCategory(slug);
  if (category) {
    return new ImageResponse(ogImageContent(`${category.title} Calculators`, category.description), size);
  }

  const config = getCalculatorConfig(slug);
  if (config) {
    return new ImageResponse(ogImageContent(config.title, config.shortDescription), size);
  }

  return new ImageResponse(ogImageContent(SITE_NAME, "Smart Calculators & Everyday Tools"), size);
}
