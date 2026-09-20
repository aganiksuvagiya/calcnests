import { describe, expect, it } from "vitest";
import { simplifyRatio, scaleRatio } from "./ratio";

describe("simplifyRatio", () => {
  it("reduces a ratio to lowest terms", () => {
    const result = simplifyRatio(8, 12);
    expect(result.a).toBe(2);
    expect(result.b).toBe(3);
    expect(result.decimal).toBeCloseTo(8 / 12);
  });

  it("leaves an already-simplified ratio unchanged", () => {
    const result = simplifyRatio(3, 4);
    expect(result).toMatchObject({ a: 3, b: 4 });
  });

  it("handles equal values", () => {
    const result = simplifyRatio(5, 5);
    expect(result.a).toBe(1);
    expect(result.b).toBe(1);
  });

  it("throws for a 0 or negative value", () => {
    expect(() => simplifyRatio(0, 5)).toThrow();
    expect(() => simplifyRatio(5, -1)).toThrow();
  });
});

describe("scaleRatio", () => {
  it("scales a ratio proportionally", () => {
    // 2:3 scaled so "a" becomes 10 → "b" should become 15.
    const result = scaleRatio(2, 3, 10);
    expect(result.scaledB).toBeCloseTo(15);
  });

  it("handles scaling down", () => {
    const result = scaleRatio(4, 8, 1);
    expect(result.scaledB).toBeCloseTo(2);
  });

  it("throws for a negative target", () => {
    expect(() => scaleRatio(2, 3, -5)).toThrow(/negative/i);
  });

  it("throws for a 0 ratio value", () => {
    expect(() => scaleRatio(0, 3, 10)).toThrow();
  });
});
