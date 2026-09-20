import { describe, expect, it } from "vitest";
import { calculatePaintNeeded } from "./paint";

describe("calculatePaintNeeded", () => {
  it("computes wall area and gallons needed", () => {
    // 12x10 room, 8ft walls: perimeter area = 2*(12+10)*8 = 352
    // minus 1 door (20) and 2 windows (30) = 302 paintable sqft
    const result = calculatePaintNeeded(12, 10, 8, 1, 2, 1);
    expect(result.wallArea).toBe(352);
    expect(result.paintableArea).toBe(302);
    expect(result.gallonsNeeded).toBeCloseTo(302 / 350);
  });

  it("doubles gallons needed for 2 coats", () => {
    const oneCoat = calculatePaintNeeded(10, 10, 8, 0, 0, 1);
    const twoCoats = calculatePaintNeeded(10, 10, 8, 0, 0, 2);
    expect(twoCoats.gallonsNeeded).toBeCloseTo(oneCoat.gallonsNeeded * 2);
  });

  it("never returns negative paintable area even with excessive door/window deductions", () => {
    const result = calculatePaintNeeded(5, 5, 8, 10, 10, 1);
    expect(result.paintableArea).toBe(0);
    expect(result.gallonsNeeded).toBe(0);
  });

  it("throws for a 0 dimension", () => {
    expect(() => calculatePaintNeeded(0, 10, 8, 1, 1, 1)).toThrow();
  });

  it("throws for fewer than 1 coat", () => {
    expect(() => calculatePaintNeeded(10, 10, 8, 1, 1, 0)).toThrow(/at least 1/i);
  });
});
