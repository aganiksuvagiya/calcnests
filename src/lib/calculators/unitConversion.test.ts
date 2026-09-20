import { describe, expect, it } from "vitest";
import { convertLength, convertWeight, convertVolume, convertTemperature } from "./unitConversion";

describe("convertLength", () => {
  it("converts feet to meters", () => {
    expect(convertLength(10, "ft", "m")).toBeCloseTo(3.048);
  });

  it("converts miles to kilometers", () => {
    expect(convertLength(1, "mi", "km")).toBeCloseTo(1.609344);
  });

  it("returns the same value for identical units", () => {
    expect(convertLength(42, "ft", "ft")).toBe(42);
  });

  it("round-trips through a conversion and back", () => {
    const converted = convertLength(100, "in", "cm");
    const back = convertLength(converted, "cm", "in");
    expect(back).toBeCloseTo(100);
  });

  it("throws for an unrecognized unit", () => {
    expect(() => convertLength(1, "furlong", "m")).toThrow(/unrecognized/i);
  });
});

describe("convertWeight", () => {
  it("converts pounds to kilograms", () => {
    expect(convertWeight(1, "lb", "kg")).toBeCloseTo(0.453592);
  });

  it("converts ounces to grams", () => {
    expect(convertWeight(1, "oz", "g")).toBeCloseTo(28.3495);
  });
});

describe("convertVolume", () => {
  it("converts gallons to liters", () => {
    expect(convertVolume(1, "gallon", "liter")).toBeCloseTo(3.78541);
  });

  it("converts cups to milliliters", () => {
    expect(convertVolume(1, "cup", "ml")).toBeCloseTo(236.588);
  });
});

describe("convertTemperature", () => {
  it("converts Fahrenheit to Celsius", () => {
    expect(convertTemperature(212, "F", "C")).toBeCloseTo(100);
    expect(convertTemperature(32, "F", "C")).toBeCloseTo(0);
  });

  it("converts Celsius to Fahrenheit", () => {
    expect(convertTemperature(0, "C", "F")).toBeCloseTo(32);
    expect(convertTemperature(100, "C", "F")).toBeCloseTo(212);
  });

  it("converts Celsius to Kelvin", () => {
    expect(convertTemperature(0, "C", "K")).toBeCloseTo(273.15);
  });

  it("converts Kelvin to Fahrenheit", () => {
    expect(convertTemperature(273.15, "K", "F")).toBeCloseTo(32);
  });

  it("returns the same value for identical units", () => {
    expect(convertTemperature(98.6, "F", "F")).toBe(98.6);
  });
});
