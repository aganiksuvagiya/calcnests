import type { CalculatorConfig } from "@/types/calculator";
import { calculateSalesTax } from "@/lib/calculators/salesTax";
import { US_STATES, STATE_OPTIONS, getStateInfo, LAST_UPDATED } from "@/lib/usStates";

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

export const stateSalesTaxConfig: CalculatorConfig = {
  slug: "state-sales-tax",
  title: "State Sales Tax Calculator",
  category: "us-tools",
  icon: "receipt",
  keywords: ["state sales tax calculator", "sales tax by state", "sales tax rates"],
  shortDescription: "Calculate sales tax using each state's actual combined rate.",
  explanation:
    "Pick a state and this calculator applies its approximate combined state-plus-average-local sales tax rate automatically, instead of you having to look it up. Combined rates vary not just by state but by city and county within a state — this uses a representative average, so your actual local rate may be a bit higher or lower.\n\nFor an exact calculation with a rate you already know, use the general Sales Tax Calculator instead.",
  formula: "Tax amount = Price × (Combined rate % ÷ 100)\nTotal = Price + Tax amount",
  example:
    "A $200 purchase in Illinois, where the combined average rate is about 8.86%: tax = $200 × 0.0886 = $17.72, total = $217.72.",
  faqs: [
    {
      question: "Why does my receipt show a different rate than this calculator?",
      answer:
        "This uses an average combined rate for the state. Your specific city or county may charge a different local add-on than the statewide average this tool uses.",
    },
    {
      question: "Which states have no sales tax?",
      answer:
        "Oregon, Montana, New Hampshire, Delaware, and Alaska (at the state level — some Alaska localities do charge local sales tax) have no statewide sales tax. All 10 states supported here do charge sales tax.",
    },
    {
      question: "Is this the same as the general Sales Tax Calculator?",
      answer:
        "It uses the same math, but this version picks the tax rate for you based on the state you select. Use the general Sales Tax Calculator if you already know the exact local rate.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "state-sales-tax",
      label: "Sales tax",
      inputs: [
        {
          name: "state",
          label: "State",
          type: "select",
          defaultValue: STATE_OPTIONS[0].value,
          options: STATE_OPTIONS,
        },
        {
          name: "price",
          label: "Price before tax",
          type: "number",
          defaultValue: "200",
          unit: "$",
          unitPosition: "prefix",
          validate: (value) => {
            const n = toNumber(value);
            if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid price.";
            if (n < 0) return "Price can't be negative.";
            return null;
          },
        },
      ],
      compute: (values) => {
        const state = getStateInfo(values.state);
        if (!state) throw new Error("Select a state.");
        const result = calculateSalesTax(toNumber(values.price), state.combinedSalesTaxRatePercent);
        return { total: result.total, taxAmount: result.taxAmount, rateUsed: state.combinedSalesTaxRatePercent };
      },
      resultFields: [
        { key: "total", label: "Total price", format: "currency", primary: true },
        { key: "taxAmount", label: "Tax amount", format: "currency" },
        { key: "rateUsed", label: "Rate used", format: "percent" },
      ],
      resultLabel: (values) => {
        const state = getStateInfo(values.state);
        return state ? `Total with ${state.name} sales tax` : "Total with tax";
      },
    },
  ],
  stateTable: {
    title: "Combined sales tax rate by state",
    lastUpdated: LAST_UPDATED,
    columns: [
      { key: "rate", label: "Combined rate", format: "percent" },
      { key: "note", label: "Notes", format: "text" },
    ],
    rows: US_STATES.map((s) => ({
      state: s.name,
      values: { rate: s.combinedSalesTaxRatePercent, note: s.salesTaxNote },
    })),
    note: "Combined rate = statewide base rate + an average local add-on. Actual local rates vary by city and county.",
  },
};
