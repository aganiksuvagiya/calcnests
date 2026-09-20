import { describe, expect, it } from "vitest";
import { calculateOvertime } from "./overtime";

describe("calculateOvertime", () => {
  it("splits hours into regular and overtime at the 40-hour threshold", () => {
    const result = calculateOvertime(20, 45, 1.5);
    expect(result.regularHours).toBe(40);
    expect(result.overtimeHours).toBe(5);
    expect(result.regularPay).toBe(800);
    expect(result.overtimePay).toBe(150);
    expect(result.totalPay).toBe(950);
  });

  it("pays no overtime for 40 or fewer hours", () => {
    const result = calculateOvertime(20, 40, 1.5);
    expect(result.overtimeHours).toBe(0);
    expect(result.overtimePay).toBe(0);
    expect(result.totalPay).toBe(800);
  });

  it("supports a 2x double-time multiplier", () => {
    const result = calculateOvertime(20, 48, 2);
    expect(result.overtimeHours).toBe(8);
    expect(result.overtimePay).toBe(320);
    expect(result.totalPay).toBe(1120);
  });

  it("handles 0 hours worked", () => {
    const result = calculateOvertime(20, 0, 1.5);
    expect(result.totalPay).toBe(0);
  });

  it("throws for a negative hourly rate", () => {
    expect(() => calculateOvertime(-10, 45, 1.5)).toThrow(/negative/i);
  });

  it("throws for a multiplier below 1", () => {
    expect(() => calculateOvertime(20, 45, 0.5)).toThrow(/at least 1/i);
  });
});
