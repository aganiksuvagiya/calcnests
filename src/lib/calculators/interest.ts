/**
 * Pure simple and compound interest math.
 */

export interface SimpleInterestResult {
  principal: number;
  interest: number;
  total: number;
}

export function calculateSimpleInterest(principal: number, ratePercent: number, years: number): SimpleInterestResult {
  if (principal < 0) throw new Error("Principal can't be negative.");
  if (ratePercent < 0) throw new Error("Interest rate can't be negative.");
  if (years < 0) throw new Error("Time period can't be negative.");

  const interest = principal * (ratePercent / 100) * years;
  const total = principal + interest;

  return { principal, interest, total };
}

export interface CompoundInterestResult {
  principal: number;
  interest: number;
  total: number;
}

export function calculateCompoundInterest(
  principal: number,
  ratePercent: number,
  years: number,
  compoundsPerYear: number
): CompoundInterestResult {
  if (principal < 0) throw new Error("Principal can't be negative.");
  if (ratePercent < 0) throw new Error("Interest rate can't be negative.");
  if (years < 0) throw new Error("Time period can't be negative.");
  if (compoundsPerYear < 1) throw new Error("Compounding frequency must be at least 1 per year.");

  const rate = ratePercent / 100;
  const total = principal * Math.pow(1 + rate / compoundsPerYear, compoundsPerYear * years);
  const interest = total - principal;

  return { principal, interest, total };
}
