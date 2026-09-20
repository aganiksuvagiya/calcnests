import { describe, expect, it } from "vitest";
import { calculateBmi } from "./bmi";

describe("calculateBmi", () => {
  it("computes BMI using the US formula", () => {
    // 5'10" (70in), 160lb: 703*160/70^2 = 22.95
    const result = calculateBmi(5, 10, 160);
    expect(result.bmi).toBeCloseTo(22.95, 1);
    expect(result.categoryCode).toBe(1); // normal
  });

  it("categorizes underweight", () => {
    const result = calculateBmi(5, 10, 100);
    expect(result.categoryCode).toBe(0);
  });

  it("categorizes overweight", () => {
    const result = calculateBmi(5, 10, 190);
    expect(result.categoryCode).toBe(2);
  });

  it("categorizes obese", () => {
    const result = calculateBmi(5, 10, 220);
    expect(result.categoryCode).toBe(3);
  });

  it("throws for 0 height", () => {
    expect(() => calculateBmi(0, 0, 150)).toThrow();
  });

  it("throws for 0 weight", () => {
    expect(() => calculateBmi(5, 10, 0)).toThrow();
  });

  it("throws for inches >= 12", () => {
    expect(() => calculateBmi(5, 12, 150)).toThrow(/0–11/);
  });
});
