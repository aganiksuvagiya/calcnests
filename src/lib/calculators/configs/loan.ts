import type { CalculatorConfig } from "@/types/calculator";
import { calculateLoan } from "@/lib/calculators/loan";

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

const termOptions = [2, 3, 4, 5, 6, 7, 8, 10].map((y) => ({ value: String(y), label: `${y} years` }));

export const loanConfig: CalculatorConfig = {
  slug: "loan",
  title: "Loan Calculator",
  category: "money",
  icon: "landmark",
  keywords: ["loan calculator", "amortization", "monthly payment"],
  shortDescription: "Estimate monthly payments on a personal, auto, or other fixed-rate loan.",
  explanation:
    "This calculator uses the standard fixed-rate amortization formula that lenders use for personal loans, auto loans, and other installment loans with equal monthly payments. It assumes a fixed interest rate for the full term and no extra payments.\n\nThe annual percentage rate (APR) you enter should reflect your loan's actual rate — if your offer states an APR that includes fees, your effective borrowing cost may be slightly higher than the interest-only figure this calculator uses.",
  formula:
    "Monthly payment = P × [r(1+r)^n] ÷ [(1+r)^n − 1]\nwhere P is the loan amount, r is the monthly interest rate (annual rate ÷ 12), and n is the number of monthly payments (years × 12)",
  example:
    "A $30,000 loan at 6% APR over 5 years: monthly payment ≈ $579.98, total paid ≈ $34,799.04, and total interest ≈ $4,799.04 over the life of the loan.",
  faqs: [
    {
      question: "Does this include loan origination fees?",
      answer:
        "No. This calculates payments based only on principal and interest. Origination fees, application fees, or prepaid interest would need to be added to the loan amount or accounted for separately.",
    },
    {
      question: "What happens if I make extra payments?",
      answer:
        "Extra payments reduce the principal faster, which shortens the loan and reduces total interest paid. This calculator shows the standard schedule assuming only the calculated payment is made each month.",
    },
    {
      question: "Is APR the same as the interest rate?",
      answer:
        "Not always. APR can include certain fees rolled into the cost of borrowing, making it slightly higher than the stated interest rate. Use the rate that most accurately reflects what you'll actually be charged.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "loan",
      label: "Loan",
      inputs: [
        {
          name: "principal",
          label: "Loan amount",
          type: "number",
          defaultValue: "30000",
          unit: "$",
          unitPosition: "prefix",
          validate: (value) => {
            const n = toNumber(value);
            if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid loan amount.";
            if (n < 0) return "Loan amount can't be negative.";
            return null;
          },
        },
        {
          name: "annualRatePercent",
          label: "Interest rate (APR)",
          type: "number",
          defaultValue: "6",
          unit: "%",
          unitPosition: "suffix",
          validate: (value) => {
            const n = toNumber(value);
            if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid interest rate.";
            if (n < 0) return "Interest rate can't be negative.";
            return null;
          },
        },
        {
          name: "termYears",
          label: "Loan term",
          type: "select",
          defaultValue: "5",
          options: termOptions,
        },
      ],
      compute: (values) => {
        const result = calculateLoan(
          toNumber(values.principal),
          toNumber(values.annualRatePercent),
          toNumber(values.termYears)
        );
        return {
          monthlyPayment: result.monthlyPayment,
          totalInterest: result.totalInterest,
          totalPaid: result.totalPaid,
        };
      },
      resultFields: [
        { key: "monthlyPayment", label: "Monthly payment", format: "currency", primary: true },
        { key: "totalInterest", label: "Total interest", format: "currency" },
        { key: "totalPaid", label: "Total paid", format: "currency" },
      ],
      resultLabel: () => "Estimated monthly payment",
    },
  ],
};
