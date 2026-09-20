import { describe, expect, it } from "vitest";
import { calculateAge } from "./age";

describe("calculateAge", () => {
  it("computes an exact number of years on a birthday", () => {
    const result = calculateAge(new Date(2000, 0, 1), new Date(2025, 0, 1));
    expect(result).toEqual({ years: 25, months: 0, days: 0, totalDays: expect.any(Number) });
  });

  it("computes years, months, and days the day before a birthday", () => {
    // Born Jan 1 2000; the day before the 25th birthday is Dec 31 2024.
    const result = calculateAge(new Date(2000, 0, 1), new Date(2024, 11, 31));
    expect(result.years).toBe(24);
    expect(result.months).toBe(11);
    expect(result.days).toBe(30);
  });

  it("borrows correctly across a month with fewer days", () => {
    // Born Mar 31; "as of" Mar 10 means the day-of-month hasn't been reached
    // yet this month, so it borrows from February (28 days in 2025).
    const result = calculateAge(new Date(2000, 2, 31), new Date(2025, 2, 10));
    expect(result.years).toBe(24);
    expect(result.months).toBe(11);
    expect(result.days).toBe(7);
  });

  it("returns all zeros for a birth date of today", () => {
    const today = new Date(2025, 5, 15);
    const result = calculateAge(today, today);
    expect(result).toEqual({ years: 0, months: 0, days: 0, totalDays: 0 });
  });

  it("throws for a birth date in the future", () => {
    expect(() => calculateAge(new Date(2030, 0, 1), new Date(2025, 0, 1))).toThrow(/future/i);
  });
});
