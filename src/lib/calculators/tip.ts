/**
 * Pure tip math. No React, no DOM — unit-testable in isolation.
 */

export interface TipResult {
  billAmount: number;
  tipPercent: number;
  numPeople: number;
  tipAmount: number;
  totalAmount: number;
  amountPerPerson: number;
}

export function calculateTip(billAmount: number, tipPercent: number, numPeople: number): TipResult {
  if (billAmount < 0) {
    throw new Error("Bill amount can't be negative.");
  }
  if (tipPercent < 0) {
    throw new Error("Tip percent can't be negative.");
  }
  if (numPeople < 1) {
    throw new Error("Number of people must be at least 1.");
  }

  const tipAmount = billAmount * (tipPercent / 100);
  const totalAmount = billAmount + tipAmount;
  const amountPerPerson = totalAmount / numPeople;

  return { billAmount, tipPercent, numPeople, tipAmount, totalAmount, amountPerPerson };
}
