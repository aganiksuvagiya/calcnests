import { describe, expect, it } from "vitest";
import { calculateDaysBetween } from "./daysBetween";

describe("calculateDaysBetween", () => {
  it("counts days between two dates", () => {
    const result = calculateDaysBetween(new Date(2025, 0, 1), new Date(2025, 0, 11));
    expect(result.days).toBe(10);
    expect(result.weeks).toBeCloseTo(10 / 7);
  });

  it("is order-independent", () => {
    const a = calculateDaysBetween(new Date(2025, 0, 1), new Date(2025, 0, 11));
    const b = calculateDaysBetween(new Date(2025, 0, 11), new Date(2025, 0, 1));
    expect(a.days).toBe(b.days);
  });

  it("returns 0 for the same date", () => {
    const d = new Date(2025, 5, 15);
    expect(calculateDaysBetween(d, d).days).toBe(0);
  });

  it("computes an approximate month count", () => {
    const result = calculateDaysBetween(new Date(2025, 0, 1), new Date(2026, 0, 1));
    expect(result.months).toBeCloseTo(12, 0);
  });
});
