import { calculatePaycheck, type FilingStatus } from "./paycheck";

/**
 * Extends the federal paycheck estimate with a simplified flat-rate state
 * income tax layer. State tax is applied to gross pay rather than a
 * state-specific taxable-income figure — a deliberate simplification since
 * each state defines its own deductions and brackets. See the state's
 * `incomeTaxNote` for how rough this estimate is for that state.
 */
export interface StatePaycheckResult {
  grossAnnual: number;
  grossPerPeriod: number;
  federalTaxAnnual: number;
  stateTaxAnnual: number;
  ficaAnnual: number;
  totalTaxAnnual: number;
  netAnnual: number;
  netPerPeriod: number;
}

export function calculateStatePaycheck(
  grossAnnual: number,
  filingStatus: FilingStatus,
  periodsPerYear: number,
  stateTaxRatePercent: number
): StatePaycheckResult {
  if (stateTaxRatePercent < 0) throw new Error("State tax rate can't be negative.");

  const federal = calculatePaycheck(grossAnnual, filingStatus, periodsPerYear);
  const stateTaxAnnual = grossAnnual * (stateTaxRatePercent / 100);
  const ficaAnnual = federal.socialSecurityAnnual + federal.medicareAnnual;
  const totalTaxAnnual = federal.federalTaxAnnual + stateTaxAnnual + ficaAnnual;
  const netAnnual = grossAnnual - totalTaxAnnual;

  return {
    grossAnnual,
    grossPerPeriod: federal.grossPerPeriod,
    federalTaxAnnual: federal.federalTaxAnnual,
    stateTaxAnnual,
    ficaAnnual,
    totalTaxAnnual,
    netAnnual,
    netPerPeriod: netAnnual / periodsPerYear,
  };
}
