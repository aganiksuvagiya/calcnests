import { describe, expect, it } from "vitest";
import { calculateEquivalentSalary } from "./costOfLiving";

describe("calculateEquivalentSalary", () => {
  it("scales salary up when moving to a more expensive area", () => {
    // California (138) vs Texas (92)
    const result = calculateEquivalentSalary(80000, 92, 138);
    expect(result.equivalentSalary).toBeCloseTo(120000);
    expect(result.difference).toBeCloseTo(40000);
    expect(result.percentChange).toBeCloseTo(50);
  });

  it("scales salary down when moving to a cheaper area", () => {
    const result = calculateEquivalentSalary(120000, 138, 92);
    expect(result.equivalentSalary).toBeCloseTo(80000);
    expect(result.percentChange).toBeCloseTo(-33.333, 2);
  });

  it("returns the same salary when indices are equal", () => {
    const result = calculateEquivalentSalary(75000, 100, 100);
    expect(result.equivalentSalary).toBe(75000);
    expect(result.difference).toBe(0);
    expect(result.percentChange).toBe(0);
  });

  it("handles a $0 salary without producing NaN", () => {
    const result = calculateEquivalentSalary(0, 100, 138);
    expect(result.equivalentSalary).toBe(0);
    expect(result.percentChange).toBe(0);
  });

  it("throws for a negative salary", () => {
    expect(() => calculateEquivalentSalary(-1000, 100, 100)).toThrow(/negative/i);
  });

  it("throws for a 0 or negative index", () => {
    expect(() => calculateEquivalentSalary(50000, 0, 100)).toThrow(/greater than 0/i);
    expect(() => calculateEquivalentSalary(50000, 100, -10)).toThrow(/greater than 0/i);
  });
});
