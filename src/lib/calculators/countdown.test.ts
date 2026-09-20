import { describe, expect, it } from "vitest";
import { calculateCountdown } from "./countdown";

describe("calculateCountdown", () => {
  it("splits the remaining time into days, hours, and minutes", () => {
    const now = new Date(2025, 0, 1, 0, 0, 0);
    const target = new Date(2025, 0, 3, 5, 30, 0); // 2 days, 5h, 30m later
    const result = calculateCountdown(target, now);
    expect(result.days).toBe(2);
    expect(result.hours).toBe(5);
    expect(result.minutes).toBe(30);
  });

  it("handles less than a full day remaining", () => {
    const now = new Date(2025, 0, 1, 10, 0, 0);
    const target = new Date(2025, 0, 1, 12, 15, 0);
    const result = calculateCountdown(target, now);
    expect(result.days).toBe(0);
    expect(result.hours).toBe(2);
    expect(result.minutes).toBe(15);
  });

  it("throws when the target is in the past", () => {
    const now = new Date(2025, 5, 15);
    const target = new Date(2025, 5, 1);
    expect(() => calculateCountdown(target, now)).toThrow(/future/i);
  });

  it("throws when the target equals now", () => {
    const now = new Date(2025, 5, 15, 12, 0, 0);
    expect(() => calculateCountdown(new Date(now), now)).toThrow(/future/i);
  });
});
