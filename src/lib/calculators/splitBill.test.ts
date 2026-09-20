import { describe, expect, it } from "vitest";
import { calculateSplitBill } from "./splitBill";

describe("calculateSplitBill", () => {
  it("splits a bill with tax and tip evenly", () => {
    const result = calculateSplitBill(100, 8, 20, 4);
    expect(result.taxAmount).toBeCloseTo(8);
    expect(result.tipAmount).toBeCloseTo(20);
    expect(result.total).toBeCloseTo(128);
    expect(result.amountPerPerson).toBeCloseTo(32);
  });

  it("handles zero tax and tip", () => {
    const result = calculateSplitBill(60, 0, 0, 3);
    expect(result.total).toBe(60);
    expect(result.amountPerPerson).toBe(20);
  });

  it("handles a single person", () => {
    const result = calculateSplitBill(50, 10, 15, 1);
    expect(result.amountPerPerson).toBeCloseTo(result.total);
  });

  it("handles a $0 subtotal", () => {
    const result = calculateSplitBill(0, 8, 20, 5);
    expect(result.total).toBe(0);
    expect(result.amountPerPerson).toBe(0);
  });

  it("throws for a negative subtotal", () => {
    expect(() => calculateSplitBill(-10, 8, 20, 2)).toThrow(/negative/i);
  });

  it("throws for fewer than 1 person", () => {
    expect(() => calculateSplitBill(100, 8, 20, 0)).toThrow(/at least 1/i);
  });
});
