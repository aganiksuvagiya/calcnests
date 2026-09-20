import { describe, expect, it } from "vitest";
import { parseNumberList, calculateAverage } from "./average";

describe("parseNumberList", () => {
  it("parses a comma-separated list", () => {
    expect(parseNumberList("1, 2, 3")).toEqual([1, 2, 3]);
  });

  it("parses a space-separated list", () => {
    expect(parseNumberList("1 2 3")).toEqual([1, 2, 3]);
  });

  it("handles mixed separators and extra whitespace", () => {
    expect(parseNumberList(" 1,  2 ,3,4 ")).toEqual([1, 2, 3, 4]);
  });

  it("handles negative and decimal numbers", () => {
    expect(parseNumberList("-1.5, 2.25")).toEqual([-1.5, 2.25]);
  });

  it("throws for an empty input", () => {
    expect(() => parseNumberList("")).toThrow();
  });

  it("throws when a value isn't a number", () => {
    expect(() => parseNumberList("1, two, 3")).toThrow();
  });
});

describe("calculateAverage", () => {
  it("computes mean, sum, count, min, and max", () => {
    const result = calculateAverage([2, 4, 6, 8]);
    expect(result.mean).toBe(5);
    expect(result.sum).toBe(20);
    expect(result.count).toBe(4);
    expect(result.min).toBe(2);
    expect(result.max).toBe(8);
  });

  it("handles a single number", () => {
    const result = calculateAverage([7]);
    expect(result.mean).toBe(7);
    expect(result.min).toBe(7);
    expect(result.max).toBe(7);
  });

  it("handles negative numbers", () => {
    const result = calculateAverage([-5, 5]);
    expect(result.mean).toBe(0);
  });

  it("throws for an empty array", () => {
    expect(() => calculateAverage([])).toThrow();
  });
});
