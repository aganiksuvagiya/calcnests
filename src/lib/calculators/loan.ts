import { calculateMonthlyPayment } from "./amortization";

export interface LoanResult {
  principal: number;
  monthlyPayment: number;
  totalPaid: number;
  totalInterest: number;
}

export function calculateLoan(principal: number, annualRatePercent: number, termYears: number): LoanResult {
  if (termYears <= 0) throw new Error("Loan term must be greater than 0.");

  const termMonths = termYears * 12;
  const monthlyPayment = calculateMonthlyPayment(principal, annualRatePercent, termMonths);
  const totalPaid = monthlyPayment * termMonths;
  const totalInterest = totalPaid - principal;

  return { principal, monthlyPayment, totalPaid, totalInterest };
}
