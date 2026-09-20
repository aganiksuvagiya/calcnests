import { describe, expect, it } from "vitest";
import { calculateSimpleInterest, calculateCompoundInterest } from "./interest";

describe("calculateSimpleInterest", () => {
  it("computes simple interest", () => {
    const result = calculateSimpleInterest(1000, 5, 3);
    expect(result.interest).toBeCloseTo(150);
    expect(result.total).toBeCloseTo(1150);
  });

  it("handles 0% rate", () => {
    const result = calculateSimpleInterest(1000, 0, 5);
    expect(result.interest).toBe(0);
    expect(result.total).toBe(1000);
  });

  it("handles 0 years", () => {
    const result = calculateSimpleInterest(1000, 5, 0);
    expect(result.interest).toBe(0);
  });

  it("throws for negative principal", () => {
    expect(() => calculateSimpleInterest(-100, 5, 1)).toThrow(/negative/i);
  });
});

describe("calculateCompoundInterest", () => {
  it("computes annually-compounded interest", () => {
    const result = calculateCompoundInterest(1000, 5, 10, 1);
    expect(result.total).toBeCloseTo(1628.89, 1);
  });

  it("compounds monthly, yielding more than annual compounding", () => {
    const annual = calculateCompoundInterest(1000, 5, 10, 1);
    const monthly = calculateCompoundInterest(1000, 5, 10, 12);
    expect(monthly.total).toBeGreaterThan(annual.total);
  });

  it("matches simple interest math for 0 years", () => {
    const result = calculateCompoundInterest(1000, 5, 0, 12);
    expect(result.total).toBeCloseTo(1000);
    expect(result.interest).toBeCloseTo(0);
  });

  it("handles daily compounding", () => {
    const result = calculateCompoundInterest(5000, 3, 2, 365);
    expect(result.total).toBeGreaterThan(5000);
    expect(result.interest).toBeCloseTo(result.total - 5000);
  });

  it("throws for compounding frequency below 1", () => {
    expect(() => calculateCompoundInterest(1000, 5, 1, 0)).toThrow(/at least 1/i);
  });

  it("throws for negative rate", () => {
    expect(() => calculateCompoundInterest(1000, -5, 1, 12)).toThrow(/negative/i);
  });
});
