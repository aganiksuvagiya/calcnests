/**
 * Reusable US state configuration system.
 *
 * Central place for the state-level data that genuinely changes several
 * calculators' results (sales tax, income tax, property tax, minimum wage,
 * cost of living). Adding state #11 is one entry here — every state-aware
 * calculator (selector + comparison table) picks it up automatically.
 *
 * Figures are directional planning estimates based on generally published
 * 2024 data, not authoritative tax or legal figures — rates change and
 * often vary further by city/county. See LAST_UPDATED and each
 * calculator's own disclaimer.
 */

export interface StateInfo {
  code: string;
  name: string;
  hasIncomeTax: boolean;
  /** Simplified flat-rate estimate. States with progressive brackets (CA, NY, NJ, OH) will see their real effective rate vary by income. */
  incomeTaxRatePercent: number;
  incomeTaxNote: string;
  /** Approximate combined state + average local sales tax rate. */
  combinedSalesTaxRatePercent: number;
  salesTaxNote: string;
  /** Approximate average effective property tax rate (tax ÷ home value). */
  avgPropertyTaxRatePercent: number;
  /** Approximate average annual homeowners insurance premium. */
  avgHomeInsuranceAnnual: number;
  /** Composite cost-of-living index, US average = 100. */
  costOfLivingIndex: number;
  /** State minimum wage in USD/hour (federal minimum $7.25 applies where a state has none higher). */
  minimumWage: number;
  minimumWageNote: string;
}

export const LAST_UPDATED = "2024";

export const US_STATES: StateInfo[] = [
  {
    code: "CA",
    name: "California",
    hasIncomeTax: true,
    incomeTaxRatePercent: 6,
    incomeTaxNote: "Progressive brackets from 1% to 13.3%; 6% is a representative mid-range estimate, not your exact rate.",
    combinedSalesTaxRatePercent: 8.85,
    salesTaxNote: "7.25% statewide base plus local district taxes that push many cities above 9%.",
    avgPropertyTaxRatePercent: 0.75,
    avgHomeInsuranceAnnual: 1600,
    costOfLivingIndex: 138,
    minimumWage: 16,
    minimumWageNote: "Some cities and fast-food workers have a higher local minimum.",
  },
  {
    code: "TX",
    name: "Texas",
    hasIncomeTax: false,
    incomeTaxRatePercent: 0,
    incomeTaxNote: "Texas has no state income tax.",
    combinedSalesTaxRatePercent: 8.2,
    salesTaxNote: "6.25% statewide base; local jurisdictions can add up to 2% more.",
    avgPropertyTaxRatePercent: 1.68,
    avgHomeInsuranceAnnual: 2200,
    costOfLivingIndex: 92,
    minimumWage: 7.25,
    minimumWageNote: "Texas has no state minimum above the federal $7.25/hour rate.",
  },
  {
    code: "FL",
    name: "Florida",
    hasIncomeTax: false,
    incomeTaxRatePercent: 0,
    incomeTaxNote: "Florida has no state income tax.",
    combinedSalesTaxRatePercent: 7.0,
    salesTaxNote: "6% statewide base plus modest local surtaxes in most counties.",
    avgPropertyTaxRatePercent: 0.86,
    avgHomeInsuranceAnnual: 3200,
    costOfLivingIndex: 100,
    minimumWage: 13,
    minimumWageNote: "Rising $1/year under a voter-approved schedule until it reaches $15 in September 2026.",
  },
  {
    code: "NY",
    name: "New York",
    hasIncomeTax: true,
    incomeTaxRatePercent: 5.5,
    incomeTaxNote: "Progressive brackets up to 10.9%; NYC residents also pay separate city income tax not included here.",
    combinedSalesTaxRatePercent: 8.53,
    salesTaxNote: "4% statewide base; NYC and many counties add local tax bringing totals near 8.875%.",
    avgPropertyTaxRatePercent: 1.72,
    avgHomeInsuranceAnnual: 1400,
    costOfLivingIndex: 125,
    minimumWage: 15,
    minimumWageNote: "$16.00/hour in NYC, Long Island, and Westchester; $15.00 in the rest of the state.",
  },
  {
    code: "NJ",
    name: "New Jersey",
    hasIncomeTax: true,
    incomeTaxRatePercent: 5,
    incomeTaxNote: "Progressive brackets up to 10.75% for very high earners; most filers pay well under 5%.",
    combinedSalesTaxRatePercent: 6.6,
    salesTaxNote: "Flat 6.625% statewide rate with little local variation.",
    avgPropertyTaxRatePercent: 2.23,
    avgHomeInsuranceAnnual: 1300,
    costOfLivingIndex: 114,
    minimumWage: 15.13,
    minimumWageNote: "Indexed to inflation and adjusted most Januarys.",
  },
  {
    code: "IL",
    name: "Illinois",
    hasIncomeTax: true,
    incomeTaxRatePercent: 4.95,
    incomeTaxNote: "Illinois uses a flat income tax rate for all income levels.",
    combinedSalesTaxRatePercent: 8.86,
    salesTaxNote: "6.25% statewide base; Chicago and Cook County add substantial local tax.",
    avgPropertyTaxRatePercent: 2.11,
    avgHomeInsuranceAnnual: 1500,
    costOfLivingIndex: 94,
    minimumWage: 14,
    minimumWageNote: "Scheduled to reach $15.00 in 2025.",
  },
  {
    code: "PA",
    name: "Pennsylvania",
    hasIncomeTax: true,
    incomeTaxRatePercent: 3.07,
    incomeTaxNote: "Pennsylvania uses a flat income tax rate for all income levels.",
    combinedSalesTaxRatePercent: 6.34,
    salesTaxNote: "6% statewide base; Philadelphia and Allegheny County add local tax.",
    avgPropertyTaxRatePercent: 1.53,
    avgHomeInsuranceAnnual: 1300,
    costOfLivingIndex: 96,
    minimumWage: 7.25,
    minimumWageNote: "Pennsylvania has not raised its minimum above the federal rate.",
  },
  {
    code: "OH",
    name: "Ohio",
    hasIncomeTax: true,
    incomeTaxRatePercent: 3,
    incomeTaxNote: "Progressive brackets with a low top rate after recent reform; 3% is a representative mid-range estimate.",
    combinedSalesTaxRatePercent: 7.24,
    salesTaxNote: "5.75% statewide base plus county-level additions.",
    avgPropertyTaxRatePercent: 1.53,
    avgHomeInsuranceAnnual: 1200,
    costOfLivingIndex: 90,
    minimumWage: 10.45,
    minimumWageNote: "Indexed to inflation and adjusted most Januarys.",
  },
  {
    code: "GA",
    name: "Georgia",
    hasIncomeTax: true,
    incomeTaxRatePercent: 5.39,
    incomeTaxNote: "Georgia moved to a flat income tax rate in 2024, phasing down gradually in future years.",
    combinedSalesTaxRatePercent: 7.38,
    salesTaxNote: "4% statewide base plus local option sales taxes in most counties.",
    avgPropertyTaxRatePercent: 0.87,
    avgHomeInsuranceAnnual: 1900,
    costOfLivingIndex: 89,
    minimumWage: 7.25,
    minimumWageNote: "Georgia's own statutory minimum is lower, but federal law sets an effective $7.25 floor for most employers.",
  },
  {
    code: "NC",
    name: "North Carolina",
    hasIncomeTax: true,
    incomeTaxRatePercent: 4.5,
    incomeTaxNote: "North Carolina uses a flat income tax rate that is being phased down each year toward 3.99%.",
    combinedSalesTaxRatePercent: 6.98,
    salesTaxNote: "4.75% statewide base plus county-level additions.",
    avgPropertyTaxRatePercent: 0.78,
    avgHomeInsuranceAnnual: 1700,
    costOfLivingIndex: 91,
    minimumWage: 7.25,
    minimumWageNote: "North Carolina has not raised its minimum above the federal rate.",
  },
];

export function getStateInfo(code: string): StateInfo | undefined {
  return US_STATES.find((s) => s.code === code);
}

export const STATE_OPTIONS = US_STATES.map((s) => ({ value: s.code, label: s.name }));
