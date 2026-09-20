import type { CalculatorConfig } from "@/types/calculator";
import { calculateRentAffordability } from "@/lib/calculators/rent";

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

export const rentConfig: CalculatorConfig = {
  slug: "rent",
  title: "Rent Calculator",
  category: "money",
  icon: "key",
  keywords: ["rent calculator", "how much rent can i afford", "affordability"],
  shortDescription: "Figure out how much rent you can comfortably afford.",
  explanation:
    "This calculator applies two common budgeting guidelines: spending no more than a target share of your gross (pre-tax) income on rent — 30% is the traditional rule of thumb — and keeping all recurring debt payments, including rent, under 36% of gross income (a standard debt-to-income guideline lenders use). Your recommended maximum is whichever of the two is lower.\n\nThese are general guidelines, not hard limits — your actual comfortable rent depends on your other expenses, savings goals, and local cost of living.",
  formula:
    "Monthly income = Annual income ÷ 12\nIncome-rule rent = Monthly income × (Target % ÷ 100)\nDebt-adjusted rent = (Monthly income × 36%) − Other monthly debts\nRecommended max rent = the lower of the two",
  example:
    "On a $72,000 annual income with $300 in other monthly debts, using the 30% rule: monthly income is $6,000, the income rule allows $1,800, and the debt-adjusted cap allows $1,860 — so the recommended max rent is $1,800 (the income rule is the binding constraint here).",
  faqs: [
    {
      question: "Why 30%?",
      answer:
        "The 30%-of-income guideline for housing costs dates back to US federal housing policy from the 1980s and remains a common budgeting benchmark, though many renters in high-cost areas spend more.",
    },
    {
      question: "What counts as 'other monthly debts'?",
      answer:
        "Recurring obligations like car payments, student loans, credit card minimums, and child support — not everyday variable expenses like groceries or entertainment.",
    },
    {
      question: "Should I use gross or net income?",
      answer:
        "This calculator uses gross (pre-tax) income, matching how landlords and the 30%/36% guidelines are typically defined. Your actual take-home budget will be tighter after taxes.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "rent",
      label: "Affordability",
      inputs: [
        {
          name: "annualIncome",
          label: "Annual gross income",
          type: "number",
          defaultValue: "72000",
          unit: "$",
          unitPosition: "prefix",
          validate: (value) => {
            const n = toNumber(value);
            if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid annual income.";
            if (n < 0) return "Income can't be negative.";
            return null;
          },
        },
        {
          name: "incomePercent",
          label: "Target % of income",
          type: "select",
          defaultValue: "30",
          options: [
            { value: "25", label: "25% (conservative)" },
            { value: "28", label: "28%" },
            { value: "30", label: "30% (standard)" },
            { value: "35", label: "35% (aggressive)" },
          ],
        },
        {
          name: "monthlyDebts",
          label: "Other monthly debts",
          type: "number",
          defaultValue: "300",
          unit: "$",
          unitPosition: "prefix",
          helpText: "Car payments, student loans, credit cards, etc. Enter 0 if none.",
          validate: (value) => {
            const n = toNumber(value);
            if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid amount.";
            if (n < 0) return "Monthly debts can't be negative.";
            return null;
          },
        },
      ],
      compute: (values) => {
        const result = calculateRentAffordability(
          toNumber(values.annualIncome),
          toNumber(values.incomePercent),
          toNumber(values.monthlyDebts)
        );
        return {
          recommendedMaxRent: result.recommendedMaxRent,
          monthlyIncome: result.monthlyIncome,
          incomeRuleRent: result.incomeRuleRent,
          debtAdjustedRent: result.debtAdjustedRent,
        };
      },
      resultFields: [
        { key: "recommendedMaxRent", label: "Recommended max rent", format: "currency", primary: true },
        { key: "monthlyIncome", label: "Monthly income", format: "currency" },
        { key: "incomeRuleRent", label: "Income-rule limit", format: "currency" },
        { key: "debtAdjustedRent", label: "Debt-adjusted limit", format: "currency" },
      ],
      resultLabel: () => "Recommended max rent",
    },
  ],
};
