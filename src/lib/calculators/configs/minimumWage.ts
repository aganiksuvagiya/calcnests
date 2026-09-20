import type { CalculatorConfig } from "@/types/calculator";
import { calculateAnnualFromHourly } from "@/lib/calculators/salary";
import { US_STATES, STATE_OPTIONS, getStateInfo, LAST_UPDATED } from "@/lib/usStates";

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

function validatePositive(value: string): string | null {
  const n = toNumber(value);
  if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid number.";
  if (n <= 0) return "Must be greater than 0.";
  return null;
}

export const minimumWageConfig: CalculatorConfig = {
  slug: "minimum-wage",
  title: "Minimum Wage Calculator",
  category: "us-tools",
  icon: "banknote",
  keywords: ["minimum wage calculator", "minimum wage by state"],
  shortDescription: "Calculate earnings at a state's minimum wage.",
  explanation:
    "The federal minimum wage has been $7.25/hour since 2009, but most states set their own higher minimum, and some cities set an even higher local minimum on top of that. Pick a state to see its current minimum wage and what it adds up to over a week, month, and year at full-time hours.\n\nA handful of states in this list — Texas, Pennsylvania, Georgia, and North Carolina — have not set a state minimum above the federal $7.25 rate.",
  formula: "Weekly pay = State minimum wage × Hours per week\nAnnual pay = Weekly pay × Weeks per year",
  example:
    "At California's $16.00/hour minimum wage, working 40 hours/week for 52 weeks: weekly pay = $640, and annual pay = $33,280.",
  faqs: [
    {
      question: "Can my city's minimum wage be higher than my state's?",
      answer:
        "Yes. Many cities and counties — especially in California and New York — set a local minimum wage above the state figure. Check your city or county government's website for the exact local rate.",
    },
    {
      question: "Does this apply to tipped workers?",
      answer:
        "No. Tipped employees are often paid a lower direct cash wage as long as tips bring their total pay up to at least the standard minimum wage — the rules and minimum cash wage for tipped workers vary by state.",
    },
    {
      question: "Why do some states show the federal $7.25 rate?",
      answer:
        "A state's own minimum wage law can't go below the federal minimum, but it doesn't have to exceed it either. States that haven't passed a higher state minimum default to the federal $7.25/hour floor.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "minimum-wage",
      label: "Minimum wage",
      inputs: [
        {
          name: "state",
          label: "State",
          type: "select",
          defaultValue: "CA",
          options: STATE_OPTIONS,
        },
        {
          name: "hoursPerWeek",
          label: "Hours per week",
          type: "number",
          defaultValue: "40",
          validate: validatePositive,
        },
        {
          name: "weeksPerYear",
          label: "Weeks per year",
          type: "number",
          defaultValue: "52",
          validate: validatePositive,
        },
      ],
      compute: (values) => {
        const state = getStateInfo(values.state);
        if (!state) throw new Error("Select a state.");
        const result = calculateAnnualFromHourly(
          state.minimumWage,
          toNumber(values.hoursPerWeek),
          toNumber(values.weeksPerYear)
        );
        return {
          annualPay: result.annualPay,
          monthlyPay: result.monthlyPay,
          weeklyPay: result.weeklyPay,
          hourlyRate: state.minimumWage,
        };
      },
      resultFields: [
        { key: "annualPay", label: "Annual pay", format: "currency", primary: true },
        { key: "monthlyPay", label: "Monthly", format: "currency" },
        { key: "weeklyPay", label: "Weekly", format: "currency" },
        { key: "hourlyRate", label: "Minimum wage used", format: "currency" },
      ],
      resultLabel: (values) => {
        const state = getStateInfo(values.state);
        return state ? `Annual pay at ${state.name}'s minimum wage` : "Annual pay at minimum wage";
      },
    },
  ],
  stateTable: {
    title: "Minimum wage by state",
    lastUpdated: LAST_UPDATED,
    columns: [
      { key: "wage", label: "Minimum wage", format: "currency" },
      { key: "note", label: "Notes", format: "text" },
    ],
    rows: US_STATES.map((s) => ({
      state: s.name,
      values: { wage: s.minimumWage, note: s.minimumWageNote },
    })),
  },
};
