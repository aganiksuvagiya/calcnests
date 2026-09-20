import { describe, expect, it } from "vitest";
import { calculateSquareFootage } from "./squareFootage";

describe("calculateSquareFootage", () => {
  it("computes area for a simple rectangle", () => {
    expect(calculateSquareFootage(12, 10, 0, 0).totalArea).toBe(120);
  });

  it("adds a second rectangular section for L-shaped rooms", () => {
    expect(calculateSquareFootage(12, 10, 4, 5).totalArea).toBe(140);
  });

  it("throws for a 0 primary dimension", () => {
    expect(() => calculateSquareFootage(0, 10, 0, 0)).toThrow();
  });

  it("throws for negative extra dimensions", () => {
    expect(() => calculateSquareFootage(10, 10, -1, 5)).toThrow(/negative/i);
  });
});
