import { describe, expect, it } from "vitest";
import { calculateRentAffordability } from "./rent";

describe("calculateRentAffordability", () => {
  it("applies the income-percentage rule when it's the binding constraint", () => {
    const result = calculateRentAffordability(60000, 30, 0);
    expect(result.monthlyIncome).toBeCloseTo(5000);
    expect(result.incomeRuleRent).toBeCloseTo(1500);
    expect(result.debtAdjustedRent).toBeCloseTo(1800);
    expect(result.recommendedMaxRent).toBeCloseTo(1500);
  });

  it("applies the debt-adjusted cap when existing debts reduce it below the income rule", () => {
    const result = calculateRentAffordability(60000, 30, 1000);
    expect(result.debtAdjustedRent).toBeCloseTo(800);
    expect(result.recommendedMaxRent).toBeCloseTo(800);
  });

  it("never returns a negative debt-adjusted rent", () => {
    const result = calculateRentAffordability(30000, 30, 5000);
    expect(result.debtAdjustedRent).toBe(0);
    expect(result.recommendedMaxRent).toBe(0);
  });

  it("handles a $0 income", () => {
    const result = calculateRentAffordability(0, 30, 0);
    expect(result.recommendedMaxRent).toBe(0);
  });

  it("throws for a negative income", () => {
    expect(() => calculateRentAffordability(-1000, 30, 0)).toThrow(/negative/i);
  });

  it("throws for an income percent of 0", () => {
    expect(() => calculateRentAffordability(50000, 0, 0)).toThrow(/between 0 and 100/i);
  });

  it("throws for a negative monthly debt", () => {
    expect(() => calculateRentAffordability(50000, 30, -100)).toThrow(/negative/i);
  });
});
