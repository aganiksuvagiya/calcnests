/**
 * Pure discount math. No React, no DOM — unit-testable in isolation.
 */

export interface DiscountResult {
  originalPrice: number;
  discountPercent: number;
  discountAmount: number;
  finalPrice: number;
}

export function calculateDiscount(originalPrice: number, discountPercent: number): DiscountResult {
  if (originalPrice < 0) {
    throw new Error("Original price can't be negative.");
  }
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error("Discount percent must be between 0 and 100.");
  }

  const discountAmount = originalPrice * (discountPercent / 100);
  const finalPrice = originalPrice - discountAmount;

  return { originalPrice, discountPercent, discountAmount, finalPrice };
}
