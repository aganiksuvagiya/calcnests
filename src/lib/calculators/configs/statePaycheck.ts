import type { CalculatorConfig } from "@/types/calculator";
import { calculateStatePaycheck } from "@/lib/calculators/statePaycheck";
import type { FilingStatus } from "@/lib/calculators/paycheck";
import { US_STATES, STATE_OPTIONS, getStateInfo, LAST_UPDATED } from "@/lib/usStates";

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

export const statePaycheckConfig: CalculatorConfig = {
  slug: "state-paycheck",
  title: "State Paycheck Calculator",
  category: "us-tools",
  icon: "file-text",
  keywords: ["state paycheck calculator", "take home pay by state", "state income tax"],
  shortDescription: "Estimate take-home pay including federal, FICA, and state income tax.",
  explanation:
    "This builds on the general Paycheck Calculator by adding an estimated state income tax on top of federal tax and FICA. Nine of the ten states here charge income tax; Texas and Florida do not, so their state tax is $0.\n\nState tax is applied here as a single simplified flat rate on gross pay — real state tax systems use their own brackets and deductions (four of these states, Illinois, Pennsylvania, Georgia, and North Carolina, genuinely use a flat rate; California, New York, New Jersey, and Ohio use progressive brackets, so this is a rougher approximation for those four). This is a planning estimate, not tax advice — see each state's note below.",
  formula:
    "Federal tax = 2024 IRS brackets applied to (gross − standard deduction)\nState tax ≈ Gross pay × State's estimated flat rate\nFICA = 6.2% Social Security (up to the wage base) + 1.45%+ Medicare\nNet pay = Gross pay − Federal tax − State tax − FICA",
  example:
    "An $80,000 single filer in California, paid semimonthly: federal tax ≈ $9,441, Social Security ≈ $4,960, Medicare ≈ $1,160, and an estimated 6% state tax ≈ $4,800 — net pay ≈ $59,639/year, or about $2,484.96 per paycheck (24 paychecks/year).",
  faqs: [
    {
      question: "Why is the state tax just one flat rate?",
      answer:
        "Modeling exact brackets, deductions, and credits for multiple states accurately would require far more state-specific detail than a single calculator can respectfully guarantee. The flat rate here is a representative estimate — for Illinois, Pennsylvania, Georgia, and North Carolina it's structurally accurate since those states use flat rates; for California, New York, New Jersey, and Ohio it approximates a typical effective rate.",
    },
    {
      question: "Why is Texas or Florida's estimate higher take-home than California's?",
      answer:
        "Texas and Florida charge no state income tax at all, so more of your gross pay reaches your bank account compared to a state like California with both income tax and a higher estimated rate — even though other costs (property tax, insurance, general cost of living) can offset that difference.",
    },
    {
      question: "Is this official tax advice?",
      answer:
        "No. This is a simplified planning estimate. It excludes local taxes (like NYC's city income tax), pre-tax deductions, and credits. Consult a tax professional for advice specific to your situation.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "state-paycheck",
      label: "Paycheck",
      inputs: [
        {
          name: "state",
          label: "State",
          type: "select",
          defaultValue: "CA",
          options: STATE_OPTIONS,
        },
        {
          name: "grossAnnual",
          label: "Annual gross salary",
          type: "number",
          defaultValue: "80000",
          unit: "$",
          unitPosition: "prefix",
          validate: (value) => {
            const n = toNumber(value);
            if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid annual salary.";
            if (n < 0) return "Salary can't be negative.";
            return null;
          },
        },
        {
          name: "filingStatus",
          label: "Filing status",
          type: "select",
          defaultValue: "single",
          options: [
            { value: "single", label: "Single" },
            { value: "marriedJointly", label: "Married filing jointly" },
          ],
        },
        {
          name: "periodsPerYear",
          label: "Pay frequency",
          type: "select",
          defaultValue: "24",
          options: [
            { value: "52", label: "Weekly" },
            { value: "26", label: "Biweekly" },
            { value: "24", label: "Semimonthly" },
            { value: "12", label: "Monthly" },
          ],
        },
      ],
      compute: (values) => {
        const state = getStateInfo(values.state);
        if (!state) throw new Error("Select a state.");
        const result = calculateStatePaycheck(
          toNumber(values.grossAnnual),
          values.filingStatus as FilingStatus,
          toNumber(values.periodsPerYear),
          state.incomeTaxRatePercent
        );
        return {
          netPerPeriod: result.netPerPeriod,
          grossPerPeriod: result.grossPerPeriod,
          federalTaxAnnual: result.federalTaxAnnual,
          stateTaxAnnual: result.stateTaxAnnual,
          ficaAnnual: result.ficaAnnual,
          netAnnual: result.netAnnual,
        };
      },
      resultFields: [
        { key: "netPerPeriod", label: "Net pay per paycheck", format: "currency", primary: true },
        { key: "grossPerPeriod", label: "Gross pay per paycheck", format: "currency" },
        { key: "federalTaxAnnual", label: "Federal tax (annual)", format: "currency" },
        { key: "stateTaxAnnual", label: "State tax (annual, est.)", format: "currency" },
        { key: "ficaAnnual", label: "FICA (annual)", format: "currency" },
        { key: "netAnnual", label: "Net pay (annual)", format: "currency" },
      ],
      resultLabel: (values) => {
        const state = getStateInfo(values.state);
        return state ? `Estimated net pay in ${state.name}` : "Estimated net pay";
      },
    },
  ],
  stateTable: {
    title: "State income tax at a glance",
    lastUpdated: LAST_UPDATED,
    columns: [
      { key: "hasTax", label: "Has income tax?", format: "text" },
      { key: "rate", label: "Estimated rate", format: "percent" },
      { key: "note", label: "Notes", format: "text" },
    ],
    rows: US_STATES.map((s) => ({
      state: s.name,
      values: {
        hasTax: s.hasIncomeTax ? "Yes" : "No",
        rate: s.incomeTaxRatePercent,
        note: s.incomeTaxNote,
      },
    })),
  },
};
