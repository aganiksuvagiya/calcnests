import { describe, expect, it } from "vitest";
import { US_STATES, getStateInfo, STATE_OPTIONS } from "./usStates";

describe("US_STATES", () => {
  it("has exactly the 10 supported states", () => {
    expect(US_STATES).toHaveLength(10);
  });

  it("has unique state codes", () => {
    const codes = US_STATES.map((s) => s.code);
    expect(new Set(codes).size).toBe(codes.length);
  });

  it("keeps every rate within a sane range", () => {
    for (const state of US_STATES) {
      expect(state.incomeTaxRatePercent).toBeGreaterThanOrEqual(0);
      expect(state.incomeTaxRatePercent).toBeLessThan(15);
      expect(state.combinedSalesTaxRatePercent).toBeGreaterThan(0);
      expect(state.combinedSalesTaxRatePercent).toBeLessThan(12);
      expect(state.avgPropertyTaxRatePercent).toBeGreaterThan(0);
      expect(state.avgPropertyTaxRatePercent).toBeLessThan(4);
      expect(state.minimumWage).toBeGreaterThanOrEqual(7.25);
      expect(state.costOfLivingIndex).toBeGreaterThan(50);
    }
  });

  it("marks Texas and Florida as having no income tax", () => {
    expect(getStateInfo("TX")?.hasIncomeTax).toBe(false);
    expect(getStateInfo("TX")?.incomeTaxRatePercent).toBe(0);
    expect(getStateInfo("FL")?.hasIncomeTax).toBe(false);
    expect(getStateInfo("FL")?.incomeTaxRatePercent).toBe(0);
  });

  it("returns undefined for an unsupported state code", () => {
    expect(getStateInfo("ZZ")).toBeUndefined();
  });

  it("exposes one select option per state", () => {
    expect(STATE_OPTIONS).toHaveLength(US_STATES.length);
    expect(STATE_OPTIONS[0]).toEqual({ value: US_STATES[0].code, label: US_STATES[0].name });
  });
});
