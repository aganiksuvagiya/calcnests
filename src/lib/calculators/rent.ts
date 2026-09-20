/**
 * Rent affordability estimate using two common budgeting guidelines:
 * a target share of gross income (often 30%), and a debt-to-income cap
 * (commonly 36% of gross income for all recurring debt including rent).
 * The recommended max rent is the lower of the two.
 */
export interface RentAffordabilityResult {
  monthlyIncome: number;
  incomeRuleRent: number;
  debtAdjustedRent: number;
  recommendedMaxRent: number;
}

export function calculateRentAffordability(
  annualIncome: number,
  incomePercent: number,
  monthlyDebts: number
): RentAffordabilityResult {
  if (annualIncome < 0) throw new Error("Annual income can't be negative.");
  if (incomePercent <= 0 || incomePercent > 100) {
    throw new Error("Income percentage must be between 0 and 100.");
  }
  if (monthlyDebts < 0) throw new Error("Monthly debts can't be negative.");

  const monthlyIncome = annualIncome / 12;
  const incomeRuleRent = monthlyIncome * (incomePercent / 100);
  const debtAdjustedRent = Math.max(monthlyIncome * 0.36 - monthlyDebts, 0);
  const recommendedMaxRent = Math.min(incomeRuleRent, debtAdjustedRent);

  return { monthlyIncome, incomeRuleRent, debtAdjustedRent, recommendedMaxRent };
}
