import { describe, expect, it } from "vitest";
import { calculateFraction } from "./fraction";

describe("calculateFraction", () => {
  it("adds two fractions and simplifies", () => {
    // 1/2 + 1/4 = 3/4
    const result = calculateFraction(1, 2, "add", 1, 4);
    expect(result.numerator).toBe(3);
    expect(result.denominator).toBe(4);
  });

  it("subtracts two fractions", () => {
    // 3/4 - 1/4 = 1/2
    const result = calculateFraction(3, 4, "subtract", 1, 4);
    expect(result.numerator).toBe(1);
    expect(result.denominator).toBe(2);
  });

  it("multiplies two fractions", () => {
    // 2/3 * 3/4 = 1/2
    const result = calculateFraction(2, 3, "multiply", 3, 4);
    expect(result.numerator).toBe(1);
    expect(result.denominator).toBe(2);
  });

  it("divides two fractions", () => {
    // 1/2 ÷ 1/4 = 2/1
    const result = calculateFraction(1, 2, "divide", 1, 4);
    expect(result.numerator).toBe(2);
    expect(result.denominator).toBe(1);
  });

  it("normalizes a negative denominator", () => {
    const result = calculateFraction(1, -2, "add", 1, 2);
    expect(result.decimal).toBeCloseTo(0);
  });

  it("throws for a zero denominator", () => {
    expect(() => calculateFraction(1, 0, "add", 1, 2)).toThrow(/zero/i);
  });

  it("throws when dividing by a zero fraction", () => {
    expect(() => calculateFraction(1, 2, "divide", 0, 4)).toThrow(/zero/i);
  });
});
