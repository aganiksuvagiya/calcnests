/**
 * Pure bill-splitting math. Tip is calculated on the pre-tax subtotal
 * (the common convention), not on the tax-inclusive total.
 */

export interface SplitBillResult {
  subtotal: number;
  taxAmount: number;
  tipAmount: number;
  total: number;
  amountPerPerson: number;
}

export function calculateSplitBill(
  subtotal: number,
  taxPercent: number,
  tipPercent: number,
  numPeople: number
): SplitBillResult {
  if (subtotal < 0) throw new Error("Subtotal can't be negative.");
  if (taxPercent < 0) throw new Error("Tax percent can't be negative.");
  if (tipPercent < 0) throw new Error("Tip percent can't be negative.");
  if (numPeople < 1) throw new Error("Number of people must be at least 1.");

  const taxAmount = subtotal * (taxPercent / 100);
  const tipAmount = subtotal * (tipPercent / 100);
  const total = subtotal + taxAmount + tipAmount;
  const amountPerPerson = total / numPeople;

  return { subtotal, taxAmount, tipAmount, total, amountPerPerson };
}
