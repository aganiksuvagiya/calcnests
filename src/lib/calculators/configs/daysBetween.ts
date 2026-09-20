import type { CalculatorConfig } from "@/types/calculator";
import { calculateDaysBetween } from "@/lib/calculators/daysBetween";
import { parseDateInput } from "@/lib/calculators/dateUtils";

export const daysBetweenConfig: CalculatorConfig = {
  slug: "days-between-dates",
  title: "Days Between Dates",
  category: "date-time",
  icon: "calendar-range",
  keywords: ["days between dates calculator", "date difference"],
  shortDescription: "Calculate the exact number of days, weeks, and months between two dates.",
  explanation:
    "Enter any two dates in either order — the calculator finds the exact number of days between them, plus the equivalent in weeks and an approximate number of months (using an average 30.44-day month, since months vary in length).",
  formula: "Days = |Date 2 − Date 1| in days\nWeeks = Days ÷ 7\nMonths ≈ Days ÷ 30.44",
  example: "From January 1, 2025 to March 15, 2025 is 73 days — about 10.4 weeks or 2.4 months.",
  faqs: [
    {
      question: "Does the order of the two dates matter?",
      answer: "No — the result is always the absolute number of days between them, regardless of which date you enter first.",
    },
    {
      question: "Why is the month count approximate?",
      answer:
        "Months range from 28 to 31 days, so there's no single exact \"days ÷ months\" conversion. This uses the average calendar month length (30.44 days) for a reasonable estimate.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "days-between",
      label: "Days between",
      inputs: [
        { name: "dateA", label: "First date", type: "date", defaultValue: "2025-01-01" },
        { name: "dateB", label: "Second date", type: "date", defaultValue: "2025-03-15" },
      ],
      compute: (values) => {
        const result = calculateDaysBetween(parseDateInput(values.dateA), parseDateInput(values.dateB));
        return { days: result.days, weeks: result.weeks, months: result.months };
      },
      resultFields: [
        { key: "days", label: "Days", format: "number", suffix: "days", primary: true },
        { key: "weeks", label: "Weeks", format: "number", fractionDigits: 1 },
        { key: "months", label: "Months (approx.)", format: "number", fractionDigits: 1 },
      ],
      resultLabel: () => "Days between",
    },
  ],
};
