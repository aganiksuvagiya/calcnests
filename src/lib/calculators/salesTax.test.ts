import { describe, expect, it } from "vitest";
import { calculateSalesTax, calculateReverseSalesTax } from "./salesTax";

describe("calculateSalesTax", () => {
  it("adds tax to a price", () => {
    const result = calculateSalesTax(100, 8.25);
    expect(result.taxAmount).toBeCloseTo(8.25);
    expect(result.total).toBeCloseTo(108.25);
  });

  it("handles 0% tax", () => {
    const result = calculateSalesTax(50, 0);
    expect(result.taxAmount).toBe(0);
    expect(result.total).toBe(50);
  });

  it("handles a $0 price", () => {
    const result = calculateSalesTax(0, 8.25);
    expect(result.total).toBe(0);
  });

  it("throws for a negative price", () => {
    expect(() => calculateSalesTax(-10, 8)).toThrow(/negative/i);
  });

  it("throws for a negative tax rate", () => {
    expect(() => calculateSalesTax(10, -1)).toThrow(/negative/i);
  });
});

describe("calculateReverseSalesTax", () => {
  it("extracts the pre-tax price from a tax-inclusive total", () => {
    const result = calculateReverseSalesTax(108.25, 8.25);
    expect(result.preTaxAmount).toBeCloseTo(100);
    expect(result.taxAmount).toBeCloseTo(8.25);
  });

  it("round-trips with calculateSalesTax", () => {
    const forward = calculateSalesTax(59.99, 6.5);
    const reverse = calculateReverseSalesTax(forward.total, 6.5);
    expect(reverse.preTaxAmount).toBeCloseTo(59.99, 5);
  });

  it("handles 0% tax", () => {
    const result = calculateReverseSalesTax(50, 0);
    expect(result.preTaxAmount).toBe(50);
    expect(result.taxAmount).toBe(0);
  });

  it("throws for a negative total", () => {
    expect(() => calculateReverseSalesTax(-5, 8)).toThrow(/negative/i);
  });
});
