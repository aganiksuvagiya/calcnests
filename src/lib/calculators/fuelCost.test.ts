import { describe, expect, it } from "vitest";
import { calculateFuelCost } from "./fuelCost";

describe("calculateFuelCost", () => {
  it("computes gallons used and total cost", () => {
    const result = calculateFuelCost(300, 30, 3.5);
    expect(result.gallonsUsed).toBe(10);
    expect(result.totalCost).toBe(35);
  });

  it("handles a 0-distance trip", () => {
    const result = calculateFuelCost(0, 30, 3.5);
    expect(result.totalCost).toBe(0);
  });

  it("throws for 0 mpg", () => {
    expect(() => calculateFuelCost(100, 0, 3.5)).toThrow(/greater than 0/i);
  });

  it("throws for negative distance", () => {
    expect(() => calculateFuelCost(-10, 30, 3.5)).toThrow(/negative/i);
  });
});
