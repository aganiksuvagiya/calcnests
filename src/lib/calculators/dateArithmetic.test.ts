import { describe, expect, it } from "vitest";
import { addToDate } from "./dateArithmetic";

function ymd(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

describe("addToDate", () => {
  it("adds days", () => {
    expect(ymd(addToDate(new Date(2025, 0, 1), 10, "days", "add"))).toBe("2025-1-11");
  });

  it("subtracts days across a month boundary", () => {
    expect(ymd(addToDate(new Date(2025, 2, 1), 5, "days", "subtract"))).toBe("2025-2-24");
  });

  it("adds weeks", () => {
    expect(ymd(addToDate(new Date(2025, 0, 1), 2, "weeks", "add"))).toBe("2025-1-15");
  });

  it("adds months, rolling the year over correctly", () => {
    expect(ymd(addToDate(new Date(2025, 10, 15), 3, "months", "add"))).toBe("2026-2-15");
  });

  it("subtracts years", () => {
    expect(ymd(addToDate(new Date(2025, 5, 1), 5, "years", "subtract"))).toBe("2020-6-1");
  });

  it("handles 0 as a no-op", () => {
    expect(ymd(addToDate(new Date(2025, 5, 15), 0, "days", "add"))).toBe("2025-6-15");
  });

  it("throws for a negative amount", () => {
    expect(() => addToDate(new Date(2025, 0, 1), -5, "days", "add")).toThrow(/negative/i);
  });
});
