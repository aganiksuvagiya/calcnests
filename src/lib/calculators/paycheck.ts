import { calculateProgressiveTax, FEDERAL_BRACKETS_2024, STANDARD_DEDUCTION_2024 } from "./taxBrackets";

export type FilingStatus = "single" | "marriedJointly";

/**
 * 2024 FICA figures. Social Security applies only up to the annual wage
 * base; Medicare applies to all wages, plus an extra 0.9% Additional
 * Medicare Tax above the filing-status threshold (employer withholding
 * only — this does not model a spouse's income for MFJ households).
 */
const SOCIAL_SECURITY_RATE = 0.062;
const SOCIAL_SECURITY_WAGE_BASE_2024 = 168600;
const MEDICARE_RATE = 0.0145;
const ADDITIONAL_MEDICARE_RATE = 0.009;
const ADDITIONAL_MEDICARE_THRESHOLD_2024: Record<FilingStatus, number> = {
  single: 200000,
  marriedJointly: 250000,
};

export interface PaycheckResult {
  grossAnnual: number;
  grossPerPeriod: number;
  federalTaxAnnual: number;
  socialSecurityAnnual: number;
  medicareAnnual: number;
  totalTaxAnnual: number;
  netAnnual: number;
  netPerPeriod: number;
}

/**
 * Estimates take-home pay after 2024 federal income tax withholding and
 * FICA (Social Security + Medicare). Does NOT include state or local
 * income tax, pre-tax deductions (401(k), health insurance), or tax
 * credits — all of which change actual take-home pay. This is a planning
 * estimate, not tax advice.
 */
export function calculatePaycheck(
  grossAnnual: number,
  filingStatus: FilingStatus,
  periodsPerYear: number
): PaycheckResult {
  if (grossAnnual < 0) throw new Error("Gross annual salary can't be negative.");
  if (periodsPerYear <= 0) throw new Error("Pay periods per year must be greater than 0.");

  const standardDeduction = STANDARD_DEDUCTION_2024[filingStatus];
  const taxableIncome = Math.max(grossAnnual - standardDeduction, 0);
  const federalTaxAnnual = calculateProgressiveTax(taxableIncome, FEDERAL_BRACKETS_2024[filingStatus]);

  const socialSecurityAnnual = Math.min(grossAnnual, SOCIAL_SECURITY_WAGE_BASE_2024) * SOCIAL_SECURITY_RATE;
  const additionalMedicareThreshold = ADDITIONAL_MEDICARE_THRESHOLD_2024[filingStatus];
  const medicareAnnual =
    grossAnnual * MEDICARE_RATE + Math.max(grossAnnual - additionalMedicareThreshold, 0) * ADDITIONAL_MEDICARE_RATE;

  const totalTaxAnnual = federalTaxAnnual + socialSecurityAnnual + medicareAnnual;
  const netAnnual = grossAnnual - totalTaxAnnual;

  return {
    grossAnnual,
    grossPerPeriod: grossAnnual / periodsPerYear,
    federalTaxAnnual,
    socialSecurityAnnual,
    medicareAnnual,
    totalTaxAnnual,
    netAnnual,
    netPerPeriod: netAnnual / periodsPerYear,
  };
}
