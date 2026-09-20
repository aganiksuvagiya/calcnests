/**
 * Shared conversion tables, used by both the dedicated Length/Weight/
 * Temperature converters and the all-in-one Unit Converter's matching tabs
 * — one set of correct factors instead of duplicating them.
 */

// Conversion factor to meters.
const LENGTH_TO_METERS: Record<string, number> = {
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344,
  cm: 0.01,
  m: 1,
  km: 1000,
};

export function convertLength(value: number, from: string, to: string): number {
  const fromFactor = LENGTH_TO_METERS[from];
  const toFactor = LENGTH_TO_METERS[to];
  if (fromFactor === undefined || toFactor === undefined) {
    throw new Error("Unrecognized length unit.");
  }
  return (value * fromFactor) / toFactor;
}

// Conversion factor to kilograms.
const WEIGHT_TO_KG: Record<string, number> = {
  oz: 0.0283495,
  lb: 0.453592,
  g: 0.001,
  kg: 1,
};

export function convertWeight(value: number, from: string, to: string): number {
  const fromFactor = WEIGHT_TO_KG[from];
  const toFactor = WEIGHT_TO_KG[to];
  if (fromFactor === undefined || toFactor === undefined) {
    throw new Error("Unrecognized weight unit.");
  }
  return (value * fromFactor) / toFactor;
}

// Conversion factor to liters.
const VOLUME_TO_LITERS: Record<string, number> = {
  tsp: 0.00492892,
  tbsp: 0.0147868,
  "fl-oz": 0.0295735,
  cup: 0.236588,
  pint: 0.473176,
  quart: 0.946353,
  gallon: 3.78541,
  ml: 0.001,
  liter: 1,
};

export function convertVolume(value: number, from: string, to: string): number {
  const fromFactor = VOLUME_TO_LITERS[from];
  const toFactor = VOLUME_TO_LITERS[to];
  if (fromFactor === undefined || toFactor === undefined) {
    throw new Error("Unrecognized volume unit.");
  }
  return (value * fromFactor) / toFactor;
}

export type TemperatureUnit = "F" | "C" | "K";

export function convertTemperature(value: number, from: TemperatureUnit, to: TemperatureUnit): number {
  if (from === to) return value;

  // Convert to Celsius first, then to the target unit.
  let celsius: number;
  switch (from) {
    case "F":
      celsius = ((value - 32) * 5) / 9;
      break;
    case "K":
      celsius = value - 273.15;
      break;
    case "C":
    default:
      celsius = value;
  }

  switch (to) {
    case "F":
      return (celsius * 9) / 5 + 32;
    case "K":
      return celsius + 273.15;
    case "C":
    default:
      return celsius;
  }
}
