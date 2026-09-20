import { describe, expect, it } from "vitest";
import { calculateFinalGradeNeeded } from "./finalGrade";

describe("calculateFinalGradeNeeded", () => {
  it("computes the score needed on the final", () => {
    // current 85, final worth 30%, want 90: (90 - 85*0.7)/0.3 = (90-59.5)/0.3 = 101.67
    const result = calculateFinalGradeNeeded(85, 30, 90);
    expect(result.neededScore).toBeCloseTo(101.666, 2);
    expect(result.achievable).toBe(false);
  });

  it("flags an achievable target", () => {
    // current 90, final worth 20%, want 85: (85 - 90*0.8)/0.2 = (85-72)/0.2 = 65
    const result = calculateFinalGradeNeeded(90, 20, 85);
    expect(result.neededScore).toBeCloseTo(65);
    expect(result.achievable).toBe(true);
  });

  it("returns exactly the current grade when the final has no effect on the target", () => {
    const result = calculateFinalGradeNeeded(88, 100, 88);
    expect(result.neededScore).toBeCloseTo(88);
  });

  it("throws for a 0 final weight", () => {
    expect(() => calculateFinalGradeNeeded(85, 0, 90)).toThrow(/between 0 and 100/i);
  });

  it("throws for an out-of-range grade", () => {
    expect(() => calculateFinalGradeNeeded(150, 30, 90)).toThrow(/between 0 and 100/i);
  });
});
