import { describe, expect, it } from "vitest";
import { calculateLoan } from "./loan";

describe("calculateLoan", () => {
  it("computes payment, total paid, and total interest for a standard loan", () => {
    // $30,000 auto loan at 6% over 5 years.
    const result = calculateLoan(30000, 6, 5);
    expect(result.monthlyPayment).toBeCloseTo(579.98, 1);
    expect(result.totalPaid).toBeCloseTo(result.monthlyPayment * 60);
    expect(result.totalInterest).toBeCloseTo(result.totalPaid - 30000);
  });

  it("handles a 0% interest loan", () => {
    const result = calculateLoan(12000, 0, 1);
    expect(result.monthlyPayment).toBeCloseTo(1000);
    expect(result.totalInterest).toBeCloseTo(0);
  });

  it("charges more total interest for a longer term at the same rate", () => {
    const short = calculateLoan(20000, 7, 3);
    const long = calculateLoan(20000, 7, 6);
    expect(long.totalInterest).toBeGreaterThan(short.totalInterest);
  });

  it("throws for a 0 term", () => {
    expect(() => calculateLoan(10000, 5, 0)).toThrow(/greater than 0/i);
  });

  it("throws for a negative principal", () => {
    expect(() => calculateLoan(-500, 5, 3)).toThrow(/negative/i);
  });
});
