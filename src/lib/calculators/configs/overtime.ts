import type { CalculatorConfig } from "@/types/calculator";
import { calculateOvertime } from "@/lib/calculators/overtime";

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

export const overtimeConfig: CalculatorConfig = {
  slug: "overtime",
  title: "Overtime Calculator",
  category: "money",
  icon: "clock",
  keywords: ["overtime calculator", "overtime pay", "time and a half"],
  shortDescription: "Calculate overtime pay for hours worked over 40 in a week.",
  explanation:
    "Under the US Fair Labor Standards Act (FLSA), most hourly (non-exempt) employees must be paid at least 1.5× their regular rate for hours worked beyond 40 in a single workweek — this is standard \"time-and-a-half.\" Some states and employers require a higher rate (such as 2× \"double time\") in specific situations, like working a seventh consecutive day.\n\nThis calculator applies the 40-hour threshold per week. It doesn't account for daily overtime rules that a few states (like California) apply on top of the weekly rule.",
  formula:
    "Regular hours = min(Hours worked, 40)\nOvertime hours = max(Hours worked − 40, 0)\nRegular pay = Rate × Regular hours\nOvertime pay = Rate × Multiplier × Overtime hours",
  example:
    "At $20/hour with 45 hours worked and a 1.5× multiplier: 40 regular hours pay $800, and 5 overtime hours pay $150 (5 × $20 × 1.5), for $950 total.",
  faqs: [
    {
      question: "Who is eligible for overtime pay?",
      answer:
        "Most hourly employees are eligible under the FLSA. Many salaried employees are exempt if they meet specific duties and salary-threshold tests — exemption rules are more complex than this calculator covers.",
    },
    {
      question: "Is overtime always 1.5×?",
      answer:
        "1.5× (\"time-and-a-half\") is the federal minimum for hours over 40 in a week. Some states or union contracts require higher rates, including double time in specific circumstances.",
    },
    {
      question: "Does this account for daily overtime rules?",
      answer:
        "No — a few states require overtime after 8 hours in a single day regardless of the weekly total. This calculator only applies the federal weekly 40-hour threshold.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "overtime",
      label: "Overtime",
      inputs: [
        {
          name: "hourlyRate",
          label: "Hourly rate",
          type: "number",
          defaultValue: "20",
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
          name: "hoursWorked",
          label: "Hours worked this week",
          type: "number",
          defaultValue: "45",
          validate: (value) => {
            const n = toNumber(value);
            if (value.trim() === "" || Number.isNaN(n)) return "Enter valid hours.";
            if (n < 0) return "Hours can't be negative.";
            return null;
          },
        },
        {
          name: "overtimeMultiplier",
          label: "Overtime rate",
          type: "radio",
          defaultValue: "1.5",
          options: [
            { value: "1.5", label: "1.5× (time-and-a-half)" },
            { value: "2", label: "2× (double time)" },
          ],
        },
      ],
      compute: (values) => {
        const result = calculateOvertime(
          toNumber(values.hourlyRate),
          toNumber(values.hoursWorked),
          toNumber(values.overtimeMultiplier)
        );
        return {
          totalPay: result.totalPay,
          regularPay: result.regularPay,
          overtimePay: result.overtimePay,
          overtimeHours: result.overtimeHours,
        };
      },
      resultFields: [
        { key: "totalPay", label: "Total pay", format: "currency", primary: true },
        { key: "regularPay", label: "Regular pay", format: "currency" },
        { key: "overtimePay", label: "Overtime pay", format: "currency" },
        { key: "overtimeHours", label: "Overtime hours", format: "number" },
      ],
      resultLabel: () => "Total pay this week",
    },
  ],
};
