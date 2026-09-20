import { describe, expect, it } from "vitest";
import { calculateGpa } from "./gpa";

describe("calculateGpa", () => {
  it("computes a weighted GPA across courses", () => {
    // (4.0*3 + 3.0*4 + 3.7*3) / 10 = (12 + 12 + 11.1) / 10 = 3.51
    const result = calculateGpa([
      { grade: "A", credits: 3 },
      { grade: "B", credits: 4 },
      { grade: "A-", credits: 3 },
    ]);
    expect(result.gpa).toBeCloseTo(3.51);
    expect(result.totalCredits).toBe(10);
    expect(result.courseCount).toBe(3);
  });

  it("skips courses with 0 credits", () => {
    const result = calculateGpa([
      { grade: "A", credits: 3 },
      { grade: "F", credits: 0 },
    ]);
    expect(result.gpa).toBe(4.0);
    expect(result.courseCount).toBe(1);
  });

  it("returns 0.0 for all F's", () => {
    const result = calculateGpa([{ grade: "F", credits: 3 }]);
    expect(result.gpa).toBe(0);
  });

  it("returns 4.0 for a single A", () => {
    const result = calculateGpa([{ grade: "A", credits: 3 }]);
    expect(result.gpa).toBe(4.0);
  });

  it("throws when every course has 0 credits", () => {
    expect(() => calculateGpa([{ grade: "A", credits: 0 }])).toThrow();
  });

  it("throws for an unrecognized grade", () => {
    expect(() => calculateGpa([{ grade: "Z", credits: 3 }])).toThrow(/unrecognized/i);
  });
});
