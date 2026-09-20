import { describe, expect, it } from "vitest";
import { calculateStatePaycheck } from "./statePaycheck";
import { calculatePaycheck } from "./paycheck";

describe("calculateStatePaycheck", () => {
  it("adds a flat state tax on top of the federal estimate", () => {
    const federal = calculatePaycheck(70000, "single", 12);
    const withState = calculateStatePaycheck(70000, "single", 12, 5);

    expect(withState.stateTaxAnnual).toBeCloseTo(70000 * 0.05);
    expect(withState.federalTaxAnnual).toBeCloseTo(federal.federalTaxAnnual);
    expect(withState.netAnnual).toBeCloseTo(federal.netAnnual - 70000 * 0.05);
  });

  it("matches the federal-only result when state rate is 0 (no-income-tax states)", () => {
    const federal = calculatePaycheck(70000, "single", 26);
    const noStateTax = calculateStatePaycheck(70000, "single", 26, 0);

    expect(noStateTax.netAnnual).toBeCloseTo(federal.netAnnual);
    expect(noStateTax.stateTaxAnnual).toBe(0);
  });

  it("divides net pay evenly across pay periods", () => {
    const result = calculateStatePaycheck(60000, "marriedJointly", 24, 4);
    expect(result.netPerPeriod).toBeCloseTo(result.netAnnual / 24);
  });

  it("throws for a negative state tax rate", () => {
    expect(() => calculateStatePaycheck(50000, "single", 12, -1)).toThrow(/negative/i);
  });

  it("throws for a negative gross salary (delegated to the federal calculation)", () => {
    expect(() => calculateStatePaycheck(-1000, "single", 12, 5)).toThrow(/negative/i);
  });
});
