import { describe, expect, it } from "vitest";
import { calculateMonthlyPayment } from "./amortization";

describe("calculateMonthlyPayment", () => {
  it("computes a standard fixed-rate monthly payment", () => {
    // $200,000 at 6% APR over 30 years is a textbook ~$1,199.10/mo payment.
    const payment = calculateMonthlyPayment(200000, 6, 360);
    expect(payment).toBeCloseTo(1199.1, 1);
  });

  it("handles a 0% interest rate as a plain amortization", () => {
    const payment = calculateMonthlyPayment(12000, 0, 12);
    expect(payment).toBeCloseTo(1000);
  });

  it("handles a short term", () => {
    const payment = calculateMonthlyPayment(1000, 12, 1);
    // Principal + 1 month of interest at 1%/mo.
    expect(payment).toBeCloseTo(1010, 0);
  });

  it("handles a $0 principal", () => {
    expect(calculateMonthlyPayment(0, 5, 360)).toBe(0);
  });

  it("throws for a negative principal", () => {
    expect(() => calculateMonthlyPayment(-1000, 5, 12)).toThrow(/negative/i);
  });

  it("throws for a 0 term", () => {
    expect(() => calculateMonthlyPayment(1000, 5, 0)).toThrow(/greater than 0/i);
  });

  it("throws for a negative rate", () => {
    expect(() => calculateMonthlyPayment(1000, -1, 12)).toThrow(/negative/i);
  });
});
