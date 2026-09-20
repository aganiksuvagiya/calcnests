import { describe, expect, it } from "vitest";
import { addToTime } from "./timeArithmetic";

describe("addToTime", () => {
  it("adds a duration within the same day", () => {
    expect(addToTime(9, 30, 2, 15, "add").resultMinutes).toBe(11 * 60 + 45);
  });

  it("wraps forward past midnight", () => {
    expect(addToTime(23, 0, 2, 0, "add").resultMinutes).toBe(60); // 1:00 AM
  });

  it("wraps backward past midnight", () => {
    expect(addToTime(1, 0, 2, 0, "subtract").resultMinutes).toBe(23 * 60); // 11:00 PM
  });

  it("handles a 0 duration as a no-op", () => {
    expect(addToTime(14, 30, 0, 0, "add").resultMinutes).toBe(14 * 60 + 30);
  });

  it("throws for an out-of-range hour", () => {
    expect(() => addToTime(24, 0, 0, 0, "add")).toThrow(/hour/i);
  });

  it("throws for a negative duration", () => {
    expect(() => addToTime(10, 0, -1, 0, "add")).toThrow(/negative/i);
  });
});
