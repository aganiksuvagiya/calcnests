import type { CalculatorConfig } from "@/types/calculator";
import { calculatePaycheck, type FilingStatus } from "@/lib/calculators/paycheck";

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

export const paycheckConfig: CalculatorConfig = {
  slug: "paycheck",
  title: "Paycheck Calculator",
  category: "money",
  icon: "file-text",
  keywords: ["paycheck calculator", "take home pay", "net pay estimate"],
  shortDescription: "Estimate take-home pay after federal tax and FICA.",
  explanation:
    "This estimates your take-home pay after 2024 federal income tax withholding and FICA (Social Security and Medicare) — the taxes that apply to nearly every US paycheck regardless of state. It applies the standard deduction for your filing status, then runs the remainder through the 2024 IRS tax brackets.\n\nThis estimate does not include state or local income tax (which varies by where you live and doesn't exist at all in a handful of states), pre-tax deductions like 401(k) contributions or health insurance premiums, or tax credits — all of which change your actual paycheck. This is a planning estimate only, not tax advice; consult a tax professional or your employer's payroll department for your actual withholding.",
  formula:
    "Taxable income = Gross annual pay − Standard deduction\nFederal tax = progressive 2024 IRS brackets applied to taxable income\nSocial Security = 6.2% of wages up to $168,600\nMedicare = 1.45% of all wages, plus 0.9% on wages above $200,000 (single) / $250,000 (married filing jointly)\nNet pay = Gross pay − Federal tax − Social Security − Medicare",
  example:
    "A $65,000 single filer paid biweekly: taxable income is $50,400 after the $14,600 standard deduction, federal tax is $6,141, Social Security is $4,030, and Medicare is $942.50 — for a net annual pay of $53,886.50, or about $2,072.56 per biweekly paycheck (versus $2,500 gross).",
  faqs: [
    {
      question: "Is this official tax advice?",
      answer:
        "No. This is a simplified planning estimate based on 2024 federal tax brackets and FICA rates. It excludes state tax, pre-tax deductions, credits, and your specific W-4 elections, all of which affect your actual paycheck. Consult a tax professional for advice specific to your situation.",
    },
    {
      question: "Why isn't state income tax included?",
      answer:
        "State income tax rules and rates vary enormously — several states (like Texas, Florida, and Washington) charge no state income tax at all, while others have their own progressive brackets. Adding an accurate state calculation requires knowing your specific state.",
    },
    {
      question: "What if I have a 401(k) or health insurance deduction?",
      answer:
        "Pre-tax deductions reduce your taxable income before federal tax is calculated, which would lower your federal tax below what's shown here. This calculator assumes no pre-tax deductions.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "paycheck",
      label: "Paycheck",
      inputs: [
        {
          name: "grossAnnual",
          label: "Annual gross salary",
          type: "number",
          defaultValue: "65000",
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
          defaultValue: "26",
          options: [
            { value: "52", label: "Weekly" },
            { value: "26", label: "Biweekly" },
            { value: "24", label: "Semimonthly" },
            { value: "12", label: "Monthly" },
          ],
        },
      ],
      compute: (values) => {
        const result = calculatePaycheck(
          toNumber(values.grossAnnual),
          values.filingStatus as FilingStatus,
          toNumber(values.periodsPerYear)
        );
        return {
          netPerPeriod: result.netPerPeriod,
          grossPerPeriod: result.grossPerPeriod,
          federalTaxAnnual: result.federalTaxAnnual,
          socialSecurityAnnual: result.socialSecurityAnnual,
          medicareAnnual: result.medicareAnnual,
          netAnnual: result.netAnnual,
        };
      },
      resultFields: [
        { key: "netPerPeriod", label: "Net pay per paycheck", format: "currency", primary: true },
        { key: "grossPerPeriod", label: "Gross pay per paycheck", format: "currency" },
        { key: "federalTaxAnnual", label: "Federal tax (annual)", format: "currency" },
        { key: "socialSecurityAnnual", label: "Social Security (annual)", format: "currency" },
        { key: "medicareAnnual", label: "Medicare (annual)", format: "currency" },
        { key: "netAnnual", label: "Net pay (annual)", format: "currency" },
      ],
      resultLabel: () => "Estimated net pay per paycheck",
    },
  ],
};
