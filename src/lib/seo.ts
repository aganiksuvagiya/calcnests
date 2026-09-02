import type { Metadata } from "next";
import type { CalculatorMeta, FaqItem } from "@/types/calculator";

export const SITE_NAME = "CalcNests";
export const SITE_TAGLINE = "Smart Calculators & Everyday Tools";
export const SITE_URL = "https://calcnests.com";
export const SITE_DESCRIPTION =
  "Fast, accurate, free calculators for money, math, home, education, and everyday decisions — built for the US.";

interface BuildMetadataArgs {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}

export function buildMetadata({ title, description, path, keywords }: BuildMetadataArgs): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function calculatorJsonLd(calculator: CalculatorMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: calculator.title,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    description: calculator.description,
    url: `${SITE_URL}/calculators/${calculator.slug}`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  };
}
