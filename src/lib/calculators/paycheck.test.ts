import { describe, expect, it } from "vitest";
import { calculatePaycheck } from "./paycheck";

describe("calculatePaycheck", () => {
  it("computes net pay for a typical single filer salary", () => {
    const result = calculatePaycheck(60000, "single", 26);
    // Taxable income: 60,000 - 14,600 = 45,400 (all in the 10%/12% brackets)
    const expectedFederalTax = 11600 * 0.1 + (45400 - 11600) * 0.12;
    expect(result.federalTaxAnnual).toBeCloseTo(expectedFederalTax);
    expect(result.socialSecurityAnnual).toBeCloseTo(60000 * 0.062);
    expect(result.medicareAnnual).toBeCloseTo(60000 * 0.0145);
    expect(result.netAnnual).toBeCloseTo(60000 - result.totalTaxAnnual);
    expect(result.netPerPeriod).toBeCloseTo(result.netAnnual / 26);
  });

  it("caps Social Security tax at the wage base", () => {
    const result = calculatePaycheck(250000, "single", 12);
    expect(result.socialSecurityAnnual).toBeCloseTo(168600 * 0.062);
  });

  it("applies the additional 0.9% Medicare tax above the single threshold", () => {
    const result = calculatePaycheck(250000, "single", 12);
    const expectedMedicare = 250000 * 0.0145 + (250000 - 200000) * 0.009;
    expect(result.medicareAnnual).toBeCloseTo(expectedMedicare);
  });

  it("does not apply the additional Medicare tax below the threshold", () => {
    const result = calculatePaycheck(150000, "single", 12);
    expect(result.medicareAnnual).toBeCloseTo(150000 * 0.0145);
  });

  it("gives married-filing-jointly a lower tax bill than single at the same income", () => {
    const single = calculatePaycheck(90000, "single", 12);
    const joint = calculatePaycheck(90000, "marriedJointly", 12);
    expect(joint.federalTaxAnnual).toBeLessThan(single.federalTaxAnnual);
  });

  it("never taxes income below the standard deduction federally", () => {
    const result = calculatePaycheck(10000, "single", 12);
    expect(result.federalTaxAnnual).toBe(0);
  });

  it("throws for a negative salary", () => {
    expect(() => calculatePaycheck(-1000, "single", 12)).toThrow(/negative/i);
  });

  it("throws for 0 pay periods", () => {
    expect(() => calculatePaycheck(50000, "single", 0)).toThrow(/greater than 0/i);
  });
});
