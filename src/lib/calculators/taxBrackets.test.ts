import { describe, expect, it } from "vitest";
import { calculateProgressiveTax, FEDERAL_BRACKETS_2024 } from "./taxBrackets";

describe("calculateProgressiveTax", () => {
  it("taxes income entirely within the first bracket at that rate", () => {
    const tax = calculateProgressiveTax(10000, FEDERAL_BRACKETS_2024.single);
    expect(tax).toBeCloseTo(1000); // 10% of 10,000
  });

  it("applies each bracket's rate only to the income within it", () => {
    // 50,000 taxable (single): 11,600@10% + (47,150-11,600)@12% + (50,000-47,150)@22%
    const tax = calculateProgressiveTax(50000, FEDERAL_BRACKETS_2024.single);
    const expected = 11600 * 0.1 + (47150 - 11600) * 0.12 + (50000 - 47150) * 0.22;
    expect(tax).toBeCloseTo(expected);
  });

  it("returns 0 for 0 or negative taxable income", () => {
    expect(calculateProgressiveTax(0, FEDERAL_BRACKETS_2024.single)).toBe(0);
    expect(calculateProgressiveTax(-500, FEDERAL_BRACKETS_2024.single)).toBe(0);
  });

  it("applies the top bracket rate to income above the last threshold", () => {
    const tax = calculateProgressiveTax(700000, FEDERAL_BRACKETS_2024.single);
    // Sanity check: effective rate should be well below the top marginal rate.
    expect(tax / 700000).toBeLessThan(0.37);
    expect(tax / 700000).toBeGreaterThan(0.3);
  });

  it("computes married-filing-jointly brackets independently from single", () => {
    const singleTax = calculateProgressiveTax(90000, FEDERAL_BRACKETS_2024.single);
    const jointTax = calculateProgressiveTax(90000, FEDERAL_BRACKETS_2024.marriedJointly);
    expect(jointTax).toBeLessThan(singleTax);
  });
});
