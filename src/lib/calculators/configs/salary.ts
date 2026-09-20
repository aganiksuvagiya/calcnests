import type { CalculatorConfig } from "@/types/calculator";
import { calculateAnnualFromHourly, calculateHourlyFromAnnual } from "@/lib/calculators/salary";

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

function validatePositiveHours(value: string): string | null {
  const n = toNumber(value);
  if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid number.";
  if (n <= 0) return "Must be greater than 0.";
  return null;
}

export const salaryConfig: CalculatorConfig = {
  slug: "salary",
  title: "Salary Calculator",
  category: "money",
  icon: "wallet",
  keywords: ["salary calculator", "hourly to salary", "annual salary"],
  shortDescription: "Convert pay between hourly, weekly, and annual amounts.",
  explanation:
    "This converts pay using a straightforward multiplication of hours and weeks — it doesn't account for unpaid time off, overtime, or bonuses. A standard US full-time schedule is 40 hours per week, 52 weeks per year (or 50 weeks if you subtract two weeks of unpaid time off).\n\nUse \"Hourly to salary\" if you know your hourly wage and want to see what it adds up to annually. Use \"Salary to hourly\" to work backward from an annual figure.",
  formula:
    "Weekly pay = Hourly rate × Hours per week\nAnnual pay = Weekly pay × Weeks per year\nHourly rate = Annual pay ÷ (Hours per week × Weeks per year)",
  example:
    "$25/hour at 40 hours/week, 52 weeks/year: weekly pay = $1,000, biweekly = $2,000, monthly ≈ $4,333.33, and annual pay = $52,000.",
  faqs: [
    {
      question: "Does this account for taxes?",
      answer:
        "No — these are gross (pre-tax) figures. Use the Paycheck Calculator to estimate take-home pay after federal tax and FICA withholding.",
    },
    {
      question: "What if I don't work exactly 52 weeks a year?",
      answer:
        "Adjust the \"weeks per year\" field — for example, use 50 if you take 2 unpaid weeks off, or fewer for a seasonal or part-year job.",
    },
    {
      question: "Does this include overtime pay?",
      answer:
        "No, this assumes a flat hourly rate for all hours entered. Use the Overtime Calculator if some of your hours are paid at a premium rate.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "hourly-to-annual",
      label: "Hourly → Annual",
      inputs: [
        {
          name: "hourlyRate",
          label: "Hourly rate",
          type: "number",
          defaultValue: "25",
          unit: "$",
          unitPosition: "prefix",
          validate: (value) => {
            const n = toNumber(value);
            if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid hourly rate.";
            if (n < 0) return "Hourly rate can't be negative.";
            return null;
          },
        },
        {
          name: "hoursPerWeek",
          label: "Hours per week",
          type: "number",
          defaultValue: "40",
          validate: validatePositiveHours,
        },
        {
          name: "weeksPerYear",
          label: "Weeks per year",
          type: "number",
          defaultValue: "52",
          validate: validatePositiveHours,
        },
      ],
      compute: (values) => {
        const result = calculateAnnualFromHourly(
          toNumber(values.hourlyRate),
          toNumber(values.hoursPerWeek),
          toNumber(values.weeksPerYear)
        );
        return {
          annualPay: result.annualPay,
          monthlyPay: result.monthlyPay,
          biweeklyPay: result.biweeklyPay,
          weeklyPay: result.weeklyPay,
        };
      },
      resultFields: [
        { key: "annualPay", label: "Annual pay", format: "currency", primary: true },
        { key: "monthlyPay", label: "Monthly", format: "currency" },
        { key: "biweeklyPay", label: "Biweekly", format: "currency" },
        { key: "weeklyPay", label: "Weekly", format: "currency" },
      ],
      resultLabel: () => "Annual pay",
    },
    {
      id: "annual-to-hourly",
      label: "Annual → Hourly",
      inputs: [
        {
          name: "annualPay",
          label: "Annual salary",
          type: "number",
          defaultValue: "52000",
          unit: "$",
          unitPosition: "prefix",
          validate: (value) => {
            const n = toNumber(value);
            if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid annual salary.";
            if (n < 0) return "Annual salary can't be negative.";
            return null;
          },
        },
        {
          name: "hoursPerWeek",
          label: "Hours per week",
          type: "number",
          defaultValue: "40",
          validate: validatePositiveHours,
        },
        {
          name: "weeksPerYear",
          label: "Weeks per year",
          type: "number",
          defaultValue: "52",
          validate: validatePositiveHours,
        },
      ],
      compute: (values) => {
        const result = calculateHourlyFromAnnual(
          toNumber(values.annualPay),
          toNumber(values.hoursPerWeek),
          toNumber(values.weeksPerYear)
        );
        return { hourlyRate: result.hourlyRate };
      },
      resultFields: [{ key: "hourlyRate", label: "Hourly rate", format: "currency", primary: true }],
      resultLabel: () => "Equivalent hourly rate",
    },
  ],
};
