import { calculateMonthlyPayment } from "./amortization";

/**
 * Estimates a full monthly mortgage payment (principal, interest, property
 * tax, homeowners insurance, and HOA — "PITI + HOA"). Does not model PMI,
 * points, or adjustable rates.
 */
export interface MortgageResult {
  loanAmount: number;
  downPaymentAmount: number;
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  monthlyHoa: number;
  totalMonthlyPayment: number;
  totalInterest: number;
}

export function calculateMortgage(
  homePrice: number,
  downPaymentPercent: number,
  annualRatePercent: number,
  termYears: number,
  annualPropertyTaxRatePercent: number,
  annualHomeInsurance: number,
  monthlyHoa: number
): MortgageResult {
  if (homePrice < 0) throw new Error("Home price can't be negative.");
  if (downPaymentPercent < 0 || downPaymentPercent > 100) {
    throw new Error("Down payment must be between 0 and 100%.");
  }
  if (annualPropertyTaxRatePercent < 0) throw new Error("Property tax rate can't be negative.");
  if (annualHomeInsurance < 0) throw new Error("Home insurance can't be negative.");
  if (monthlyHoa < 0) throw new Error("HOA dues can't be negative.");
  if (termYears <= 0) throw new Error("Loan term must be greater than 0.");

  const downPaymentAmount = homePrice * (downPaymentPercent / 100);
  const loanAmount = homePrice - downPaymentAmount;
  const termMonths = termYears * 12;

  const monthlyPrincipalAndInterest = calculateMonthlyPayment(loanAmount, annualRatePercent, termMonths);
  const monthlyPropertyTax = (homePrice * (annualPropertyTaxRatePercent / 100)) / 12;
  const monthlyInsurance = annualHomeInsurance / 12;
  const totalMonthlyPayment = monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyInsurance + monthlyHoa;
  const totalInterest = monthlyPrincipalAndInterest * termMonths - loanAmount;

  return {
    loanAmount,
    downPaymentAmount,
    monthlyPrincipalAndInterest,
    monthlyPropertyTax,
    monthlyInsurance,
    monthlyHoa,
    totalMonthlyPayment,
    totalInterest,
  };
}
