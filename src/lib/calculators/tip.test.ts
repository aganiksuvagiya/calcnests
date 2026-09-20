import { describe, expect, it } from "vitest";
import { calculateTip } from "./tip";

describe("calculateTip", () => {
  it("computes tip, total, and per-person amounts", () => {
    const result = calculateTip(50, 18, 3);
    expect(result.tipAmount).toBeCloseTo(9);
    expect(result.totalAmount).toBeCloseTo(59);
    expect(result.amountPerPerson).toBeCloseTo(19.666666666666668);
  });

  it("handles a single person", () => {
    const result = calculateTip(100, 20, 1);
    expect(result.tipAmount).toBe(20);
    expect(result.totalAmount).toBe(120);
    expect(result.amountPerPerson).toBe(120);
  });

  it("handles a 0% tip", () => {
    const result = calculateTip(40, 0, 2);
    expect(result.tipAmount).toBe(0);
    expect(result.totalAmount).toBe(40);
    expect(result.amountPerPerson).toBe(20);
  });

  it("handles a $0 bill", () => {
    const result = calculateTip(0, 20, 4);
    expect(result.tipAmount).toBe(0);
    expect(result.totalAmount).toBe(0);
    expect(result.amountPerPerson).toBe(0);
  });

  it("supports tips over 100%", () => {
    const result = calculateTip(10, 150, 1);
    expect(result.tipAmount).toBe(15);
    expect(result.totalAmount).toBe(25);
  });

  it("throws for a negative bill amount", () => {
    expect(() => calculateTip(-10, 15, 2)).toThrow(/negative/i);
  });

  it("throws for a negative tip percent", () => {
    expect(() => calculateTip(50, -5, 2)).toThrow(/negative/i);
  });

  it("throws for fewer than 1 person", () => {
    expect(() => calculateTip(50, 15, 0)).toThrow(/at least 1/i);
  });
});
