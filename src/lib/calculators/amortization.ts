/**
 * Standard fixed-rate amortizing loan payment formula, shared by the Loan
 * and Mortgage calculators.
 *
 * M = P × [r(1+r)^n] / [(1+r)^n − 1]
 * where r is the monthly interest rate and n is the number of monthly
 * payments. When r is 0, the payment is simply principal ÷ n.
 */
export function calculateMonthlyPayment(principal: number, annualRatePercent: number, termMonths: number): number {
  if (principal < 0) throw new Error("Loan amount can't be negative.");
  if (annualRatePercent < 0) throw new Error("Interest rate can't be negative.");
  if (termMonths <= 0) throw new Error("Loan term must be greater than 0.");

  const monthlyRate = annualRatePercent / 100 / 12;

  if (monthlyRate === 0) {
    return principal / termMonths;
  }

  const factor = Math.pow(1 + monthlyRate, termMonths);
  return (principal * monthlyRate * factor) / (factor - 1);
}
