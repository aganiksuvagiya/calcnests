import type { CalculatorConfig } from "@/types/calculator";
import { calculateMortgage } from "@/lib/calculators/mortgage";

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

export const mortgageConfig: CalculatorConfig = {
  slug: "mortgage",
  title: "Mortgage Calculator",
  category: "money",
  icon: "home",
  keywords: ["mortgage calculator", "home loan", "monthly mortgage payment"],
  shortDescription: "Estimate your total monthly mortgage payment, including taxes and insurance.",
  explanation:
    "This calculator estimates a full monthly housing payment — principal, interest, property tax, homeowners insurance, and HOA dues (sometimes called \"PITI + HOA\"). Principal and interest are fixed once you lock in a rate; property tax and insurance are estimated from annual rates you provide and will vary by location and insurer.\n\nThis does not include private mortgage insurance (PMI), which many lenders require when your down payment is below 20%, or one-time closing costs. Your actual payment from a lender may differ.",
  formula:
    "Loan amount = Home price − Down payment\nMonthly P&I = Loan × [r(1+r)^n] ÷ [(1+r)^n − 1], where r is the monthly rate and n is the number of monthly payments\nMonthly tax = (Home price × Property tax rate %) ÷ 12\nTotal monthly payment = P&I + Monthly tax + (Annual insurance ÷ 12) + Monthly HOA",
  example:
    "A $400,000 home with 20% down ($80,000), a $320,000 loan at 6.5% over 30 years, 1.1% annual property tax, and $1,500/year insurance: monthly P&I ≈ $2,022.62, plus ≈$366.67 tax and $125.00 insurance, for a total monthly payment of about $2,514.28.",
  faqs: [
    {
      question: "Does this include PMI?",
      answer:
        "No. Private mortgage insurance is typically required when your down payment is below 20% of the home price, and its cost varies by lender and credit profile. Factor it in separately if it applies to you.",
    },
    {
      question: "How accurate is the property tax estimate?",
      answer:
        "Property tax rates vary significantly by state and even by county or city. This calculator applies the annual rate you enter to the full home price — check your local assessor's site for a more precise rate and note that some areas assess value differently than purchase price.",
    },
    {
      question: "What isn't included in this estimate?",
      answer:
        "This doesn't include PMI, one-time closing costs, or maintenance. It's a planning estimate for your recurring monthly payment, not a loan offer.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "mortgage",
      label: "Mortgage",
      inputs: [
        {
          name: "homePrice",
          label: "Home price",
          type: "number",
          defaultValue: "400000",
          unit: "$",
          unitPosition: "prefix",
          validate: validateNonNegative("home price"),
        },
        {
          name: "downPaymentPercent",
          label: "Down payment",
          type: "number",
          defaultValue: "20",
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
        {
          name: "annualPropertyTaxRatePercent",
          label: "Property tax rate",
          type: "number",
          defaultValue: "1.1",
          unit: "%/yr",
          unitPosition: "suffix",
          helpText: "The 2023 US average is about 1.1% of home value per year.",
          validate: validateNonNegative("property tax rate"),
        },
        {
          name: "annualHomeInsurance",
          label: "Home insurance",
          type: "number",
          defaultValue: "1500",
          unit: "$/yr",
          unitPosition: "suffix",
          validate: validateNonNegative("home insurance"),
        },
        {
          name: "monthlyHoa",
          label: "HOA dues",
          type: "number",
          defaultValue: "0",
          unit: "$/mo",
          unitPosition: "suffix",
          validate: validateNonNegative("HOA dues"),
        },
      ],
      compute: (values) => {
        const result = calculateMortgage(
          toNumber(values.homePrice),
          toNumber(values.downPaymentPercent),
          toNumber(values.annualRatePercent),
          toNumber(values.termYears),
          toNumber(values.annualPropertyTaxRatePercent),
          toNumber(values.annualHomeInsurance),
          toNumber(values.monthlyHoa)
        );
        return {
          totalMonthlyPayment: result.totalMonthlyPayment,
          monthlyPrincipalAndInterest: result.monthlyPrincipalAndInterest,
          monthlyPropertyTax: result.monthlyPropertyTax,
          monthlyInsurance: result.monthlyInsurance,
          loanAmount: result.loanAmount,
          totalInterest: result.totalInterest,
        };
      },
      resultFields: [
        { key: "totalMonthlyPayment", label: "Total monthly payment", format: "currency", primary: true },
        { key: "monthlyPrincipalAndInterest", label: "Principal & interest", format: "currency" },
        { key: "monthlyPropertyTax", label: "Property tax", format: "currency" },
        { key: "monthlyInsurance", label: "Insurance", format: "currency" },
        { key: "loanAmount", label: "Loan amount", format: "currency" },
        { key: "totalInterest", label: "Total interest (life of loan)", format: "currency" },
      ],
      resultLabel: () => "Estimated monthly payment",
    },
  ],
};
