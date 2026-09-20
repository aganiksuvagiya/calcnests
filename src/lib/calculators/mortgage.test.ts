import { describe, expect, it } from "vitest";
import { calculateMortgage } from "./mortgage";

describe("calculateMortgage", () => {
  it("computes loan amount and P&I for a standard 30-year mortgage", () => {
    // $400,000 home, 20% down => $320,000 loan at 6% over 30 years.
    const result = calculateMortgage(400000, 20, 6, 30, 1.1, 1500, 0);
    expect(result.downPaymentAmount).toBeCloseTo(80000);
    expect(result.loanAmount).toBeCloseTo(320000);
    expect(result.monthlyPrincipalAndInterest).toBeCloseTo(1918.56, 1);
  });

  it("adds property tax, insurance, and HOA into the total monthly payment", () => {
    const result = calculateMortgage(300000, 10, 6, 30, 1.2, 1200, 50);
    const expectedTax = (300000 * 0.012) / 12;
    const expectedInsurance = 1200 / 12;
    expect(result.monthlyPropertyTax).toBeCloseTo(expectedTax);
    expect(result.monthlyInsurance).toBeCloseTo(expectedInsurance);
    expect(result.totalMonthlyPayment).toBeCloseTo(
      result.monthlyPrincipalAndInterest + expectedTax + expectedInsurance + 50
    );
  });

  it("handles a 0% down payment", () => {
    const result = calculateMortgage(250000, 0, 5, 30, 1, 1000, 0);
    expect(result.loanAmount).toBe(250000);
    expect(result.downPaymentAmount).toBe(0);
  });

  it("handles a 100% down payment (no loan)", () => {
    const result = calculateMortgage(250000, 100, 5, 30, 1, 1000, 0);
    expect(result.loanAmount).toBe(0);
    expect(result.monthlyPrincipalAndInterest).toBe(0);
  });

  it("throws for a down payment over 100%", () => {
    expect(() => calculateMortgage(200000, 150, 5, 30, 1, 1000, 0)).toThrow(/between 0 and 100/i);
  });

  it("throws for a 0 term", () => {
    expect(() => calculateMortgage(200000, 20, 5, 0, 1, 1000, 0)).toThrow(/greater than 0/i);
  });

  it("throws for a negative home price", () => {
    expect(() => calculateMortgage(-1000, 20, 5, 30, 1, 1000, 0)).toThrow(/negative/i);
  });
});
