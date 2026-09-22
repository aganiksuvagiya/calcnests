import type { Metadata } from "next";
import type { FaqItem } from "@/types/calculator";

export const SITE_NAME = "CalcNests";
export const SITE_TAGLINE = "All Your Calculations, In One Place";
export const SITE_URL = "https://www.calcnests.com";
export const SITE_EMAIL = "hello.calcnests@gmail.com";
export const SITE_DESCRIPTION =
  "All your calculations, in one place — fast, accurate, free calculators for money, math, home, education, and everyday decisions, built for the US.";

interface BuildMetadataArgs {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  /** Set true for pages that exist but shouldn't appear in search results yet (e.g. a category with no live calculators). */
  noindex?: boolean;
}

export function buildMetadata({ title, description, path, keywords, noindex }: BuildMetadataArgs): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    ...(noindex && {
      robots: { index: false, follow: true },
    }),
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

export function calculatorJsonLd(calculator: { title: string; slug: string; description: string }) {
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

function joinWithAnd(items: string[]): string {
  if (items.length <= 1) return items.join("");
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

export function howToJsonLd(calculator: {
  title: string;
  slug: string;
  description: string;
  /** Labels of the inputs on the calculator's default (first) mode, e.g. ["Percentage", "Of value"]. */
  inputLabels: string[];
  /** First line of the calculator's formula, e.g. "Tip = Bill × (Tip % ÷ 100)". */
  formula: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use the ${calculator.title}`,
    description: calculator.description,
    step: [
      {
        "@type": "HowToStep",
        name: "Enter your values",
        text:
          calculator.inputLabels.length > 0
            ? `Enter ${joinWithAnd(calculator.inputLabels)} into the calculator.`
            : "Enter your values into the calculator.",
      },
      {
        "@type": "HowToStep",
        name: "Calculation",
        text: `The calculator applies the formula: ${calculator.formula}.`,
      },
      {
        "@type": "HowToStep",
        name: "Get your result",
        text: "The result updates instantly, shown alongside the formula used so the calculation is transparent.",
      },
    ],
    url: `${SITE_URL}/calculators/${calculator.slug}`,
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    email: SITE_EMAIL,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/calculators?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function itemListJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: `${SITE_URL}${item.path}`,
    })),
  };
}
