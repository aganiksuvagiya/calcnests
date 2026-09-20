import type { CalculatorConfig } from "@/types/calculator";
import { calculateAge } from "@/lib/calculators/age";
import { parseDateInput } from "@/lib/calculators/dateUtils";

export const ageConfig: CalculatorConfig = {
  slug: "age",
  title: "Age Calculator",
  category: "date-time",
  icon: "cake",
  keywords: ["age calculator", "how old am i", "calculate age"],
  shortDescription: "Calculate exact age in years, months, and days from a birth date.",
  explanation:
    "Enter a birth date to see the exact age as of today — not just years, but the precise years, months, and days, and the total number of days lived. This accounts for varying month lengths and leap years automatically, which a rough \"divide by 365\" estimate doesn't.",
  formula:
    "Years = full years since the birth date\nMonths = remaining full months since the last birthday\nDays = remaining days since the last full month",
  example:
    "Someone born March 31, 2000, checked on March 10, 2025, is 24 years, 11 months, and 7 days old — not yet 25, since this year's birthday hasn't happened yet.",
  faqs: [
    {
      question: "Why isn't my age just today's date minus my birth year?",
      answer:
        "Subtracting years alone ignores whether your birthday has happened yet this year. This calculator checks the exact month and day, so it only counts a full year once your birthday has actually passed.",
    },
    {
      question: "Does this account for leap years?",
      answer:
        "Yes — the calculation is based on actual calendar dates and real month lengths (including February 29 in leap years), not a fixed 365-day approximation.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "age",
      label: "Age",
      inputs: [
        {
          name: "birthDate",
          label: "Date of birth",
          type: "date",
          defaultValue: "2000-01-01",
        },
      ],
      compute: (values) => {
        const result = calculateAge(parseDateInput(values.birthDate), new Date());
        return { years: result.years, months: result.months, days: result.days, totalDays: result.totalDays };
      },
      resultFields: [
        { key: "years", label: "Years", format: "number", suffix: "years", primary: true },
        { key: "months", label: "Months", format: "number" },
        { key: "days", label: "Days", format: "number" },
        { key: "totalDays", label: "Total days lived", format: "number" },
      ],
      resultLabel: () => "Current age",
    },
  ],
};
