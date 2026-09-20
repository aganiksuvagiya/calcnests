import { describe, expect, it } from "vitest";
import { calculateWeightedGrade } from "./grade";

describe("calculateWeightedGrade", () => {
  it("computes a weighted average across categories", () => {
    // (90*20 + 85*20 + 80*25 + 88*35)/100 = (1800+1700+2000+3080)/100 = 85.8
    const result = calculateWeightedGrade([
      { score: 90, weight: 20 },
      { score: 85, weight: 20 },
      { score: 80, weight: 25 },
      { score: 88, weight: 35 },
    ]);
    expect(result.weightedAverage).toBeCloseTo(85.8);
    expect(result.totalWeight).toBe(100);
  });

  it("skips categories with 0 weight", () => {
    const result = calculateWeightedGrade([
      { score: 100, weight: 50 },
      { score: 0, weight: 0 },
    ]);
    expect(result.weightedAverage).toBe(100);
  });

  it("normalizes when weights don't sum to 100", () => {
    // Equal weights of 1 each act as a plain average regardless of scale.
    const result = calculateWeightedGrade([
      { score: 80, weight: 1 },
      { score: 100, weight: 1 },
    ]);
    expect(result.weightedAverage).toBe(90);
  });

  it("throws for a score outside 0–100", () => {
    expect(() => calculateWeightedGrade([{ score: 150, weight: 10 }])).toThrow(/between 0 and 100/i);
  });

  it("throws when every category has 0 weight", () => {
    expect(() => calculateWeightedGrade([{ score: 90, weight: 0 }])).toThrow();
  });
});
