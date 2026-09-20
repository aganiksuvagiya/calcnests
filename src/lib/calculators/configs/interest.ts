import type { CalculatorConfig } from "@/types/calculator";
import { calculateSimpleInterest, calculateCompoundInterest } from "@/lib/calculators/interest";

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

function validateNonNegative(label: string) {
  return (value: string): string | null => {
    const n = toNumber(value);
    if (value.trim() === "" || Number.isNaN(n)) return `Enter a valid ${label}.`;
    if (n < 0) return `${label.charAt(0).toUpperCase()}${label.slice(1)} can't be negative.`;
    return null;
  };
}

export const interestConfig: CalculatorConfig = {
  slug: "interest",
  title: "Interest Calculator",
  category: "money",
  icon: "trending-up",
  keywords: ["interest calculator", "simple interest", "compound interest"],
  shortDescription: "Calculate simple or compound interest on savings or debt.",
  explanation:
    "Simple interest is calculated only on the original principal for the entire period — the amount of interest earned each year is the same. Compound interest is calculated on the principal plus any interest already earned, so it grows faster the more frequently it compounds.\n\nMost savings accounts, CDs, and credit cards use compound interest. Some personal loans and older-style bonds use simple interest.",
  formula:
    "Simple: Interest = Principal × Rate × Time\nCompound: Total = Principal × (1 + Rate ÷ n)^(n × Time), where n is the number of times interest compounds per year",
  example:
    "$5,000 at 4% for 10 years: simple interest earns $2,000 total ($5,000 × 0.04 × 10). The same amount compounded monthly grows to about $7,454.16 — $2,454.16 in interest, because each month's interest starts earning its own interest.",
  faqs: [
    {
      question: "What's the difference between simple and compound interest?",
      answer:
        "Simple interest is calculated only on the original principal, so it grows at a constant rate. Compound interest is calculated on the principal plus previously earned interest, so it grows faster over time — the more frequently it compounds, the faster it grows.",
    },
    {
      question: "What compounding frequency should I use?",
      answer:
        "Check your account terms — savings accounts commonly compound daily or monthly, while some bonds and CDs compound annually or semiannually. More frequent compounding produces a slightly higher return at the same stated rate.",
    },
    {
      question: "Does this account for additional contributions?",
      answer:
        "No — this calculates interest on a single lump-sum principal. Regular contributions would require a separate savings-growth calculation.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "simple",
      label: "Simple interest",
      inputs: [
        {
          name: "principal",
          label: "Principal",
          type: "number",
          defaultValue: "5000",
          unit: "$",
          unitPosition: "prefix",
          validate: validateNonNegative("principal"),
        },
        {
          name: "ratePercent",
          label: "Annual interest rate",
          type: "number",
          defaultValue: "4",
          unit: "%",
          unitPosition: "suffix",
          validate: validateNonNegative("interest rate"),
        },
        {
          name: "years",
          label: "Time period (years)",
          type: "number",
          defaultValue: "10",
          validate: validateNonNegative("time period"),
        },
      ],
      compute: (values) => {
        const result = calculateSimpleInterest(
          toNumber(values.principal),
          toNumber(values.ratePercent),
          toNumber(values.years)
        );
        return { total: result.total, interest: result.interest };
      },
      resultFields: [
        { key: "total", label: "Total value", format: "currency", primary: true },
        { key: "interest", label: "Interest earned", format: "currency" },
      ],
      resultLabel: () => "Total after interest",
    },
    {
      id: "compound",
      label: "Compound interest",
      inputs: [
        {
          name: "principal",
          label: "Principal",
          type: "number",
          defaultValue: "5000",
          unit: "$",
          unitPosition: "prefix",
          validate: validateNonNegative("principal"),
        },
        {
          name: "ratePercent",
          label: "Annual interest rate",
          type: "number",
          defaultValue: "4",
          unit: "%",
          unitPosition: "suffix",
          validate: validateNonNegative("interest rate"),
        },
        {
          name: "years",
          label: "Time period (years)",
          type: "number",
          defaultValue: "10",
          validate: validateNonNegative("time period"),
        },
        {
          name: "compoundsPerYear",
          label: "Compounding frequency",
          type: "select",
          defaultValue: "12",
          options: [
            { value: "1", label: "Annually" },
            { value: "2", label: "Semiannually" },
            { value: "4", label: "Quarterly" },
            { value: "12", label: "Monthly" },
            { value: "365", label: "Daily" },
          ],
        },
      ],
      compute: (values) => {
        const result = calculateCompoundInterest(
          toNumber(values.principal),
          toNumber(values.ratePercent),
          toNumber(values.years),
          toNumber(values.compoundsPerYear)
        );
        return { total: result.total, interest: result.interest };
      },
      resultFields: [
        { key: "total", label: "Total value", format: "currency", primary: true },
        { key: "interest", label: "Interest earned", format: "currency" },
      ],
      resultLabel: () => "Total after interest",
    },
  ],
};
