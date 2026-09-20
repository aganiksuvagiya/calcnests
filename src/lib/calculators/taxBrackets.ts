/**
 * 2024 US federal income tax brackets and standard deductions.
 * Source: IRS Revenue Procedure 2023-34. These figures are fixed for the
 * 2024 tax year and are updated annually by the IRS — treat any estimate
 * built on them as a planning approximation, not current-year tax advice.
 */

export interface TaxBracket {
  rate: number;
  upTo: number | null;
}

export const FEDERAL_BRACKETS_2024: Record<"single" | "marriedJointly", TaxBracket[]> = {
  single: [
    { rate: 0.1, upTo: 11600 },
    { rate: 0.12, upTo: 47150 },
    { rate: 0.22, upTo: 100525 },
    { rate: 0.24, upTo: 191950 },
    { rate: 0.32, upTo: 243725 },
    { rate: 0.35, upTo: 609350 },
    { rate: 0.37, upTo: null },
  ],
  marriedJointly: [
    { rate: 0.1, upTo: 23200 },
    { rate: 0.12, upTo: 94300 },
    { rate: 0.22, upTo: 201050 },
    { rate: 0.24, upTo: 383900 },
    { rate: 0.32, upTo: 487450 },
    { rate: 0.35, upTo: 731200 },
    { rate: 0.37, upTo: null },
  ],
};

export const STANDARD_DEDUCTION_2024: Record<"single" | "marriedJointly", number> = {
  single: 14600,
  marriedJointly: 29200,
};

/** Progressive bracket tax: each bracket's rate applies only to income within it. */
export function calculateProgressiveTax(taxableIncome: number, brackets: TaxBracket[]): number {
  if (taxableIncome <= 0) return 0;

  let tax = 0;
  let lowerBound = 0;

  for (const bracket of brackets) {
    const upperBound = bracket.upTo ?? Infinity;
    if (taxableIncome <= lowerBound) break;

    const incomeInBracket = Math.min(taxableIncome, upperBound) - lowerBound;
    tax += incomeInBracket * bracket.rate;
    lowerBound = upperBound;
  }

  return tax;
}
