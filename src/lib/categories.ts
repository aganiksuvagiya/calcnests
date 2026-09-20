import type { Category, CategorySlug } from "@/types/calculator";

export const categories: Category[] = [
  {
    slug: "money",
    title: "Money",
    description: "Budgeting, loans, tips, taxes, and everyday financial math.",
    icon: "banknote",
    intro:
      "Money calculators handle the arithmetic behind everyday financial decisions — tipping at a restaurant, comparing loan offers, estimating a mortgage payment, or figuring out what a paycheck actually adds up to after taxes. Each one uses a standard, transparent formula rather than a hidden black-box calculation.\n\nThese are planning tools, not financial advice. Loan and mortgage estimates assume a fixed rate and don't account for fees a specific lender might charge, and paycheck estimates use simplified federal tax brackets rather than your exact W-4 withholding.",
    faqs: [
      {
        question: "Are these calculators accurate enough to make financial decisions?",
        answer:
          "They use correct, standard formulas (the same math a bank or calculator app would use), so they're accurate for the inputs you give them. The results are still estimates — real loan offers, paychecks, and mortgages depend on fees, exact tax withholding, and lender-specific terms these calculators don't have visibility into.",
      },
      {
        question: "Do these calculators account for taxes?",
        answer:
          "Some do directly — the Paycheck Calculator and Sales Tax Calculator both factor in tax. Others, like the Loan and Mortgage calculators, focus on principal and interest and note in their own pages what they exclude.",
      },
    ],
    relatedCategories: ["us-tools", "everyday"],
  },
  {
    slug: "math",
    title: "Math",
    description: "Core math tools for percentages, averages, and more.",
    icon: "calculator",
    intro:
      "Math calculators cover the general-purpose arithmetic that shows up across school, work, and everyday life — percentages, averages, ratios, and fractions. Unlike the Money calculators, these aren't tied to a specific real-world scenario; they're the building blocks other calculators (and plenty of homework) are built on.",
    faqs: [],
    relatedCategories: ["money", "education"],
  },
  {
    slug: "date-time",
    title: "Date & Time",
    description: "Ages, durations, countdowns, and date arithmetic.",
    icon: "calendar",
    intro:
      "Date and time calculators handle the counting that's surprisingly easy to get wrong by hand — how many days are actually between two dates, what your exact age is down to the day, or how much time is left until a deadline. They account for things like leap years and varying month lengths automatically.",
    faqs: [],
    relatedCategories: ["everyday", "education"],
  },
  {
    slug: "education",
    title: "Education",
    description: "GPA, grades, and academic planning calculators.",
    icon: "graduation-cap",
    intro:
      "Education calculators are built around the US grading conventions students and parents deal with most — the 4.0 GPA scale, weighted assignment grades, and figuring out what score you need on a final exam to hit a target grade in a class.",
    faqs: [],
    relatedCategories: ["math", "date-time"],
  },
  {
    slug: "home",
    title: "Home",
    description: "Household, mortgage, and home-project calculators.",
    icon: "home",
    intro:
      "Home calculators are for the material and cost estimates that come up around a house — how much paint or flooring a room needs, or its square footage. For the financial side of homeownership (mortgage payments, affordability), see the Money and US Tools categories, which cover that in more depth.",
    faqs: [],
    relatedCategories: ["money", "everyday"],
  },
  {
    slug: "everyday",
    title: "Everyday",
    description: "Health, units, and daily-life conversions.",
    icon: "sparkles",
    intro:
      "Everyday calculators are the general-purpose conversions and quick checks that don't fit neatly into money, school, or home — BMI, unit conversions, fuel costs for a trip. They're built for a quick answer, not a deep dive.",
    faqs: [],
    relatedCategories: ["money", "home"],
  },
  {
    slug: "us-tools",
    title: "US Tools",
    description: "Calculators built around US-specific conventions.",
    icon: "flag",
    intro:
      "US Tools calculators build in the state-by-state differences that generic calculators can't — sales tax rates, income tax, property tax, and minimum wage all vary significantly depending on which US state you're in. Pick your state from the dropdown in each calculator to get a result based on that state's actual rates instead of a rough national average.\n\nRates and figures here are approximate, based on generally published data, and are clearly labeled with when they were last checked — they're a planning estimate, not an official government calculation.",
    faqs: [
      {
        question: "Why do results change so much between states?",
        answer:
          "Because the underlying rates genuinely differ. Nine of the ten states covered here charge state income tax and one doesn't; sales tax rates range from under 7% to nearly 9%; and property tax rates vary by a factor of three or more between the lowest and highest states covered.",
      },
      {
        question: "Are the state tax rates exact?",
        answer:
          "They're representative estimates, not exact figures. States with a genuinely flat income tax rate (like Illinois and Pennsylvania) are precise; states with progressive brackets (like California and New York) use a single representative rate rather than modeling every bracket, which each calculator's page explains.",
      },
      {
        question: "Which states are covered?",
        answer:
          "California, Texas, Florida, New York, New Jersey, Illinois, Pennsylvania, Ohio, Georgia, and North Carolina — chosen for a mix of large populations and genuinely different tax situations (including the two, Texas and Florida, with no state income tax).",
      },
    ],
    relatedCategories: ["money"],
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
