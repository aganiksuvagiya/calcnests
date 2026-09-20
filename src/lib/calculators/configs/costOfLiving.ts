import type { CalculatorConfig } from "@/types/calculator";
import { calculateEquivalentSalary } from "@/lib/calculators/costOfLiving";
import { US_STATES, STATE_OPTIONS, getStateInfo, LAST_UPDATED } from "@/lib/usStates";

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

export const costOfLivingConfig: CalculatorConfig = {
  slug: "cost-of-living",
  title: "Cost of Living Calculator",
  category: "us-tools",
  icon: "map-pin",
  keywords: ["cost of living calculator", "cost of living by state", "salary comparison"],
  shortDescription: "Find the equivalent salary needed to keep your lifestyle in a different state.",
  explanation:
    "This compares two states using a composite cost-of-living index (US average = 100), covering everyday costs like housing, groceries, utilities, and transportation. It scales your current salary by the ratio of the two states' indices to estimate what you'd need to earn elsewhere to maintain the same standard of living.\n\nThis does not account for state income tax differences — pair it with the State Paycheck Calculator to see the tax side of a move as well. A composite statewide index also smooths over large differences between a state's expensive metro areas and its cheaper rural areas.",
  formula: "Equivalent salary = Current salary × (Target state index ÷ Current state index)",
  example:
    "A $80,000 salary in Texas (index 92) moving to California (index 138): equivalent salary = $80,000 × (138 ÷ 92) = $120,000 — about 50% more to maintain the same purchasing power.",
  faqs: [
    {
      question: "What does the cost-of-living index measure?",
      answer:
        "It's a composite score covering housing, groceries, utilities, transportation, and other everyday costs relative to the US average (100). A state at 120 is roughly 20% more expensive to live in than the national average.",
    },
    {
      question: "Does this include taxes?",
      answer:
        "No — this only compares everyday living costs. State income tax, sales tax, and property tax differ separately; use the State Paycheck Calculator and State Mortgage Calculator alongside this one for a fuller picture.",
    },
    {
      question: "Why does my city feel more or less expensive than the state average?",
      answer:
        "A statewide index blends expensive metro areas with cheaper small towns and rural areas. If you're comparing specific cities, a city-level cost-of-living index would be more precise than this statewide figure.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "cost-of-living",
      label: "Compare",
      inputs: [
        {
          name: "currentState",
          label: "Current state",
          type: "select",
          defaultValue: "TX",
          options: STATE_OPTIONS,
        },
        {
          name: "currentSalary",
          label: "Current salary",
          type: "number",
          defaultValue: "80000",
          unit: "$",
          unitPosition: "prefix",
          validate: (value) => {
            const n = toNumber(value);
            if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid salary.";
            if (n < 0) return "Salary can't be negative.";
            return null;
          },
        },
        {
          name: "targetState",
          label: "Target state",
          type: "select",
          defaultValue: "CA",
          options: STATE_OPTIONS,
        },
      ],
      compute: (values) => {
        const current = getStateInfo(values.currentState);
        const target = getStateInfo(values.targetState);
        if (!current || !target) throw new Error("Select both states.");
        const result = calculateEquivalentSalary(
          toNumber(values.currentSalary),
          current.costOfLivingIndex,
          target.costOfLivingIndex
        );
        return {
          equivalentSalary: result.equivalentSalary,
          difference: result.difference,
          percentChange: result.percentChange,
        };
      },
      resultFields: [
        { key: "equivalentSalary", label: "Equivalent salary", format: "currency", primary: true },
        { key: "difference", label: "Difference", format: "currency", signed: true },
        { key: "percentChange", label: "Percent change", format: "percent", signed: true },
      ],
      resultLabel: (values) => {
        const target = getStateInfo(values.targetState);
        return target ? `Equivalent salary in ${target.name}` : "Equivalent salary";
      },
    },
  ],
  stateTable: {
    title: "Cost of living index by state",
    lastUpdated: LAST_UPDATED,
    columns: [{ key: "index", label: "Index (US avg = 100)", format: "number" }],
    rows: US_STATES.map((s) => ({ state: s.name, values: { index: s.costOfLivingIndex } })),
  },
};
