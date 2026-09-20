import { describe, expect, it } from "vitest";
import { calculateDiscount } from "./discount";

describe("calculateDiscount", () => {
  it("computes discount amount and final price", () => {
    const result = calculateDiscount(80, 25);
    expect(result.discountAmount).toBe(20);
    expect(result.finalPrice).toBe(60);
  });

  it("handles a 0% discount", () => {
    const result = calculateDiscount(50, 0);
    expect(result.discountAmount).toBe(0);
    expect(result.finalPrice).toBe(50);
  });

  it("handles a 100% discount", () => {
    const result = calculateDiscount(50, 100);
    expect(result.discountAmount).toBe(50);
    expect(result.finalPrice).toBe(0);
  });

  it("handles a $0 price", () => {
    const result = calculateDiscount(0, 30);
    expect(result.discountAmount).toBe(0);
    expect(result.finalPrice).toBe(0);
  });

  it("handles decimal percentages", () => {
    const result = calculateDiscount(19.99, 12.5);
    expect(result.discountAmount).toBeCloseTo(2.49875);
    expect(result.finalPrice).toBeCloseTo(17.49125);
  });

  it("throws for a negative price", () => {
    expect(() => calculateDiscount(-10, 20)).toThrow(/negative/i);
  });

  it("throws for a negative discount percent", () => {
    expect(() => calculateDiscount(50, -5)).toThrow(/between 0 and 100/i);
  });

  it("throws for a discount percent over 100", () => {
    expect(() => calculateDiscount(50, 150)).toThrow(/between 0 and 100/i);
  });
});
