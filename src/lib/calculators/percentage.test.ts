import { describe, expect, it } from "vitest";
import { percentOfValue, whatPercent, percentageChange } from "./percentage";

describe("percentOfValue", () => {
  it("computes a basic percentage of a value", () => {
    expect(percentOfValue(20, 150).result).toBe(30);
  });

  it("handles 0%", () => {
    expect(percentOfValue(0, 500).result).toBe(0);
  });

  it("handles 100%", () => {
    expect(percentOfValue(100, 42).result).toBe(42);
  });

  it("handles percentages over 100%", () => {
    expect(percentOfValue(150, 10).result).toBe(15);
  });

  it("handles negative values", () => {
    expect(percentOfValue(20, -150).result).toBe(-30);
  });

  it("handles decimal inputs", () => {
    expect(percentOfValue(12.5, 80).result).toBe(10);
  });
});

describe("whatPercent", () => {
  it("computes what percent one number is of another", () => {
    expect(whatPercent(45, 60).result).toBe(75);
  });

  it("returns 100 when part equals whole", () => {
    expect(whatPercent(30, 30).result).toBe(100);
  });

  it("returns 0 when part is 0", () => {
    expect(whatPercent(0, 60).result).toBe(0);
  });

  it("supports a part greater than the whole", () => {
    expect(whatPercent(90, 60).result).toBe(150);
  });

  it("throws when the whole is zero", () => {
    expect(() => whatPercent(10, 0)).toThrow(/zero/i);
  });
});

describe("percentageChange", () => {
  it("computes a percentage increase", () => {
    const result = percentageChange(80, 100);
    expect(result.result).toBeCloseTo(25);
    expect(result.direction).toBe("increase");
  });

  it("computes a percentage decrease", () => {
    const result = percentageChange(100, 80);
    expect(result.result).toBeCloseTo(-20);
    expect(result.direction).toBe("decrease");
  });

  it("reports no change when values are equal", () => {
    const result = percentageChange(50, 50);
    expect(result.result).toBe(0);
    expect(result.direction).toBe("none");
  });

  it("handles a negative starting value", () => {
    const result = percentageChange(-50, -25);
    expect(result.result).toBeCloseTo(50);
    expect(result.direction).toBe("increase");
  });

  it("throws when the starting value is zero", () => {
    expect(() => percentageChange(0, 10)).toThrow(/zero/i);
  });
});
