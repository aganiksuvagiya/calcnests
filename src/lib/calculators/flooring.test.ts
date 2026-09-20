import { describe, expect, it } from "vitest";
import { calculateFlooringNeeded } from "./flooring";

describe("calculateFlooringNeeded", () => {
  it("adds a waste allowance on top of the room area", () => {
    const result = calculateFlooringNeeded(12, 10, 10);
    expect(result.roomArea).toBe(120);
    expect(result.materialNeeded).toBeCloseTo(132);
  });

  it("handles 0% waste as just the room area", () => {
    const result = calculateFlooringNeeded(10, 10, 0);
    expect(result.materialNeeded).toBe(100);
  });

  it("throws for a 0 dimension", () => {
    expect(() => calculateFlooringNeeded(0, 10, 10)).toThrow();
  });

  it("throws for negative waste", () => {
    expect(() => calculateFlooringNeeded(10, 10, -5)).toThrow(/negative/i);
  });
});
