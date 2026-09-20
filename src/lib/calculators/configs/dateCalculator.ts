import type { CalculatorConfig } from "@/types/calculator";
import { addToDate, type DateUnit, type DateDirection } from "@/lib/calculators/dateArithmetic";
import { parseDateInput } from "@/lib/calculators/dateUtils";

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

export const dateCalculatorConfig: CalculatorConfig = {
  slug: "date",
  title: "Date Calculator",
  category: "date-time",
  icon: "calendar-plus",
  keywords: ["date calculator", "add days to date", "subtract days from date"],
  shortDescription: "Add or subtract days, weeks, months, or years from a date.",
  explanation:
    "Pick a starting date, an amount, a unit, and whether to add or subtract — the calculator handles month-length differences and leap years automatically, so \"3 months after January 31\" correctly lands on a valid date instead of overflowing.",
  formula: "Resulting date = Start date ± Amount (in the chosen unit)",
  example: "60 days after January 1, 2025 is March 2, 2025.",
  faqs: [
    {
      question: "What happens when adding months lands on a day that doesn't exist?",
      answer:
        "For example, adding 1 month to January 31 can't land on \"February 31\" — JavaScript's date handling rolls it forward to the next valid date (March 2 or 3, depending on the year). This is standard date-math behavior, not a bug.",
    },
    {
      question: "Can I calculate a date far in the past or future?",
      answer: "Yes, any valid calendar date works, in either direction.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "date",
      label: "Date math",
      inputs: [
        { name: "startDate", label: "Start date", type: "date", defaultValue: "2025-01-01" },
        {
          name: "direction",
          label: "Operation",
          type: "radio",
          defaultValue: "add",
          options: [
            { value: "add", label: "Add" },
            { value: "subtract", label: "Subtract" },
          ],
        },
        {
          name: "amount",
          label: "Amount",
          type: "number",
          defaultValue: "60",
          validate: (value) => {
            const n = toNumber(value);
            if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid amount.";
            if (n < 0) return "Amount can't be negative.";
            return null;
          },
        },
        {
          name: "unit",
          label: "Unit",
          type: "select",
          defaultValue: "days",
          options: [
            { value: "days", label: "Days" },
            { value: "weeks", label: "Weeks" },
            { value: "months", label: "Months" },
            { value: "years", label: "Years" },
          ],
        },
      ],
      compute: (values) => {
        const result = addToDate(
          parseDateInput(values.startDate),
          toNumber(values.amount),
          values.unit as DateUnit,
          values.direction as DateDirection
        );
        return { resultDate: result.getTime() };
      },
      resultFields: [{ key: "resultDate", label: "Resulting date", format: "date", primary: true }],
      resultLabel: (values) => (values.direction === "subtract" ? "Date before" : "Date after"),
    },
  ],
};
