/**
 * Pure percentage math. No React, no DOM — unit-testable in isolation.
 */

export interface PercentageOfResult {
  percent: number;
  value: number;
  result: number;
}

/** What is X% of Y? */
export function percentOfValue(percent: number, value: number): PercentageOfResult {
  return { percent, value, result: (percent / 100) * value };
}

export interface WhatPercentResult {
  part: number;
  whole: number;
  result: number;
}

/** X is what percent of Y? */
export function whatPercent(part: number, whole: number): WhatPercentResult {
  if (whole === 0) {
    throw new Error("The 'whole' value must not be zero.");
  }
  return { part, whole, result: (part / whole) * 100 };
}

export interface PercentageChangeResult {
  from: number;
  to: number;
  result: number;
  direction: "increase" | "decrease" | "none";
}

/** Percentage increase/decrease from one value to another. */
export function percentageChange(from: number, to: number): PercentageChangeResult {
  if (from === 0) {
    throw new Error("The starting value must not be zero.");
  }
  const result = ((to - from) / Math.abs(from)) * 100;
  const direction = result > 0 ? "increase" : result < 0 ? "decrease" : "none";
  return { from, to, result, direction };
}
