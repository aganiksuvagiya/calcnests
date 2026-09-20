import type { CalculatorConfig } from "@/types/calculator";
import { calculateMortgage } from "@/lib/calculators/mortgage";
import { US_STATES, STATE_OPTIONS, getStateInfo, LAST_UPDATED } from "@/lib/usStates";

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

export const stateMortgageConfig: CalculatorConfig = {
  slug: "state-mortgage",
  title: "State Mortgage Calculator",
  category: "us-tools",
  icon: "home",
  keywords: ["state mortgage calculator", "property tax by state", "mortgage payment by state"],
  shortDescription: "Estimate a mortgage payment using each state's typical property tax and insurance cost.",
  explanation:
    "Property tax and homeowners insurance are two of the biggest reasons the same size mortgage costs differently in different states. This calculator fills in each state's average effective property tax rate and average annual insurance premium automatically, so you can see a more realistic total monthly payment than principal and interest alone.\n\nProperty tax and insurance both vary further by county, city, home age, and coverage level — treat these as a starting estimate. For full manual control over every input, use the general Mortgage Calculator.",
  formula:
    "Loan amount = Home price − Down payment\nMonthly P&I = standard amortization formula\nMonthly tax = (Home price × State's avg property tax rate) ÷ 12\nTotal monthly payment = P&I + Monthly tax + (State's avg annual insurance ÷ 12)",
  example:
    "A $350,000 home in Texas with 10% down ($35,000): a $315,000 loan at 6.5% over 30 years costs about $1,991.01/month in principal and interest, plus Texas's relatively high property tax (≈$490.00/month) and insurance (≈$183.33/month) — a total of about $2,664.35/month.",
  faqs: [
    {
      question: "Why is Texas's estimate so much higher in taxes than California's?",
      answer:
        "Texas has no state income tax, and makes up a meaningful part of the difference through above-average property taxes. California's Prop 13 keeps its average effective property tax rate comparatively low, even though home prices there are often much higher.",
    },
    {
      question: "Does this include PMI?",
      answer:
        "No. Private mortgage insurance, typically required with less than 20% down, isn't modeled here — see the general Mortgage Calculator's FAQ for more detail.",
    },
    {
      question: "Can I override the state's property tax rate?",
      answer:
        "Not on this page — it's designed to show a state-typical estimate automatically. Use the general Mortgage Calculator if you know your exact local property tax rate and insurance quote.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "state-mortgage",
      label: "Mortgage",
      inputs: [
        {
          name: "state",
          label: "State",
          type: "select",
          defaultValue: "TX",
          options: STATE_OPTIONS,
        },
        {
          name: "homePrice",
          label: "Home price",
          type: "number",
          defaultValue: "350000",
          unit: "$",
          unitPosition: "prefix",
          validate: validateNonNegative("home price"),
        },
        {
          name: "downPaymentPercent",
          label: "Down payment",
          type: "number",
          defaultValue: "10",
          unit: "%",
          unitPosition: "suffix",
          validate: (value) => {
            const n = toNumber(value);
            if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid down payment percentage.";
            if (n < 0 || n > 100) return "Down payment must be between 0 and 100.";
            return null;
          },
        },
        {
          name: "annualRatePercent",
          label: "Interest rate (APR)",
          type: "number",
          defaultValue: "6.5",
          unit: "%",
          unitPosition: "suffix",
          validate: validateNonNegative("interest rate"),
        },
        {
          name: "termYears",
          label: "Loan term",
          type: "select",
          defaultValue: "30",
          options: [
            { value: "15", label: "15 years" },
            { value: "20", label: "20 years" },
            { value: "30", label: "30 years" },
          ],
        },
      ],
      compute: (values) => {
        const state = getStateInfo(values.state);
        if (!state) throw new Error("Select a state.");
        const result = calculateMortgage(
          toNumber(values.homePrice),
          toNumber(values.downPaymentPercent),
          toNumber(values.annualRatePercent),
          toNumber(values.termYears),
          state.avgPropertyTaxRatePercent,
          state.avgHomeInsuranceAnnual,
          0
        );
        return {
          totalMonthlyPayment: result.totalMonthlyPayment,
          monthlyPrincipalAndInterest: result.monthlyPrincipalAndInterest,
          monthlyPropertyTax: result.monthlyPropertyTax,
          monthlyInsurance: result.monthlyInsurance,
          loanAmount: result.loanAmount,
        };
      },
      resultFields: [
        { key: "totalMonthlyPayment", label: "Total monthly payment", format: "currency", primary: true },
        { key: "monthlyPrincipalAndInterest", label: "Principal & interest", format: "currency" },
        { key: "monthlyPropertyTax", label: "Property tax (est.)", format: "currency" },
        { key: "monthlyInsurance", label: "Insurance (est.)", format: "currency" },
        { key: "loanAmount", label: "Loan amount", format: "currency" },
      ],
      resultLabel: (values) => {
        const state = getStateInfo(values.state);
        return state ? `Estimated payment in ${state.name}` : "Estimated monthly payment";
      },
    },
  ],
  stateTable: {
    title: "Property tax & insurance by state",
    lastUpdated: LAST_UPDATED,
    columns: [
      { key: "propertyTax", label: "Avg. property tax rate", format: "percent" },
      { key: "insurance", label: "Avg. annual insurance", format: "currency" },
    ],
    rows: US_STATES.map((s) => ({
      state: s.name,
      values: { propertyTax: s.avgPropertyTaxRatePercent, insurance: s.avgHomeInsuranceAnnual },
    })),
    note: "Averages only — actual property tax and insurance costs vary by county, home age, and coverage level.",
  },
};
