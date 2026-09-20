/**
 * Pure sales tax math: adding tax to a price, or extracting the pre-tax
 * price from a tax-inclusive total.
 */

export interface SalesTaxResult {
  price: number;
  taxAmount: number;
  total: number;
}

export function calculateSalesTax(price: number, taxRatePercent: number): SalesTaxResult {
  if (price < 0) throw new Error("Price can't be negative.");
  if (taxRatePercent < 0) throw new Error("Tax rate can't be negative.");

  const taxAmount = price * (taxRatePercent / 100);
  const total = price + taxAmount;

  return { price, taxAmount, total };
}

export interface ReverseSalesTaxResult {
  total: number;
  preTaxAmount: number;
  taxAmount: number;
}

/** Given a tax-inclusive total, find the pre-tax price and the tax portion. */
export function calculateReverseSalesTax(total: number, taxRatePercent: number): ReverseSalesTaxResult {
  if (total < 0) throw new Error("Total can't be negative.");
  if (taxRatePercent < 0) throw new Error("Tax rate can't be negative.");

  const preTaxAmount = total / (1 + taxRatePercent / 100);
  const taxAmount = total - preTaxAmount;

  return { total, preTaxAmount, taxAmount };
}
