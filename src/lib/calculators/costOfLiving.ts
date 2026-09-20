/**
 * Cost-of-living comparison using each location's composite index
 * (US average = 100). This scales a salary by the ratio of the two
 * indices — it does not model taxes, which are handled by the Paycheck
 * calculators.
 */
export interface CostOfLivingResult {
  currentSalary: number;
  equivalentSalary: number;
  difference: number;
  percentChange: number;
}

export function calculateEquivalentSalary(
  currentSalary: number,
  currentIndex: number,
  targetIndex: number
): CostOfLivingResult {
  if (currentSalary < 0) throw new Error("Salary can't be negative.");
  if (currentIndex <= 0 || targetIndex <= 0) throw new Error("Cost-of-living index must be greater than 0.");

  const equivalentSalary = currentSalary * (targetIndex / currentIndex);
  const difference = equivalentSalary - currentSalary;
  const percentChange = currentSalary === 0 ? 0 : (difference / currentSalary) * 100;

  return { currentSalary, equivalentSalary, difference, percentChange };
}
