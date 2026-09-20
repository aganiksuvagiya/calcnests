import { describe, expect, it } from "vitest";
import { calculateAnnualFromHourly, calculateHourlyFromAnnual } from "./salary";

describe("calculateAnnualFromHourly", () => {
  it("converts a standard full-time hourly rate to annual pay", () => {
    const result = calculateAnnualFromHourly(25, 40, 52);
    expect(result.weeklyPay).toBe(1000);
    expect(result.annualPay).toBe(52000);
    expect(result.biweeklyPay).toBe(2000);
    expect(result.monthlyPay).toBeCloseTo(4333.33, 2);
  });

  it("handles part-time hours", () => {
    const result = calculateAnnualFromHourly(20, 20, 50);
    expect(result.annualPay).toBe(20000);
  });

  it("handles a $0 hourly rate", () => {
    const result = calculateAnnualFromHourly(0, 40, 52);
    expect(result.annualPay).toBe(0);
  });

  it("throws for 0 hours per week", () => {
    expect(() => calculateAnnualFromHourly(20, 0, 52)).toThrow(/greater than 0/i);
  });

  it("throws for a negative hourly rate", () => {
    expect(() => calculateAnnualFromHourly(-10, 40, 52)).toThrow(/negative/i);
  });
});

describe("calculateHourlyFromAnnual", () => {
  it("converts annual salary back to an hourly rate", () => {
    const result = calculateHourlyFromAnnual(52000, 40, 52);
    expect(result.hourlyRate).toBe(25);
  });

  it("round-trips with calculateAnnualFromHourly", () => {
    const annual = calculateAnnualFromHourly(31.25, 40, 52);
    const hourly = calculateHourlyFromAnnual(annual.annualPay, 40, 52);
    expect(hourly.hourlyRate).toBeCloseTo(31.25);
  });

  it("throws for 0 weeks per year", () => {
    expect(() => calculateHourlyFromAnnual(50000, 40, 0)).toThrow(/greater than 0/i);
  });

  it("throws for a negative annual salary", () => {
    expect(() => calculateHourlyFromAnnual(-1000, 40, 52)).toThrow(/negative/i);
  });
});
