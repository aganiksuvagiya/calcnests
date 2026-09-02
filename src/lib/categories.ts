import type { Category, CategorySlug } from "@/types/calculator";

export const categories: Category[] = [
  {
    slug: "money",
    title: "Money",
    description: "Budgeting, loans, tips, taxes, and everyday financial math.",
    icon: "banknote",
  },
  {
    slug: "math",
    title: "Math",
    description: "Core math tools for percentages, averages, and more.",
    icon: "calculator",
  },
  {
    slug: "date-time",
    title: "Date & Time",
    description: "Ages, durations, countdowns, and date arithmetic.",
    icon: "calendar",
  },
  {
    slug: "education",
    title: "Education",
    description: "GPA, grades, and academic planning calculators.",
    icon: "graduation-cap",
  },
  {
    slug: "home",
    title: "Home",
    description: "Household, mortgage, and home-project calculators.",
    icon: "home",
  },
  {
    slug: "everyday",
    title: "Everyday",
    description: "Health, units, and daily-life conversions.",
    icon: "sparkles",
  },
  {
    slug: "us-tools",
    title: "US Tools",
    description: "Calculators built around US-specific conventions.",
    icon: "flag",
  },
];

export const categoryMap: Record<CategorySlug, Category> = categories.reduce(
  (acc, c) => {
    acc[c.slug] = c;
    return acc;
  },
  {} as Record<CategorySlug, Category>
);

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
