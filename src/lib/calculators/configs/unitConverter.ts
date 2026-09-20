import type { CalculatorConfig, CalculatorVariant } from "@/types/calculator";
import { convertLength, convertWeight, convertVolume, convertTemperature, type TemperatureUnit } from "@/lib/calculators/unitConversion";

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

function validNumber(value: string): string | null {
  return value.trim() === "" || Number.isNaN(Number(value)) ? "Enter a valid number." : null;
}

const LENGTH_UNITS = [
  { value: "in", label: "Inches (in)" },
  { value: "ft", label: "Feet (ft)" },
  { value: "yd", label: "Yards (yd)" },
  { value: "mi", label: "Miles (mi)" },
  { value: "cm", label: "Centimeters (cm)" },
  { value: "m", label: "Meters (m)" },
  { value: "km", label: "Kilometers (km)" },
];

const WEIGHT_UNITS = [
  { value: "oz", label: "Ounces (oz)" },
  { value: "lb", label: "Pounds (lb)" },
  { value: "g", label: "Grams (g)" },
  { value: "kg", label: "Kilograms (kg)" },
];

const VOLUME_UNITS = [
  { value: "tsp", label: "Teaspoons" },
  { value: "tbsp", label: "Tablespoons" },
  { value: "fl-oz", label: "Fluid ounces" },
  { value: "cup", label: "Cups" },
  { value: "pint", label: "Pints" },
  { value: "quart", label: "Quarts" },
  { value: "gallon", label: "Gallons" },
  { value: "ml", label: "Milliliters" },
  { value: "liter", label: "Liters" },
];

const TEMP_UNITS = [
  { value: "F", label: "Fahrenheit (°F)" },
  { value: "C", label: "Celsius (°C)" },
  { value: "K", label: "Kelvin (K)" },
];

function unitVariant(
  id: string,
  label: string,
  units: { value: string; label: string }[],
  defaultFrom: string,
  defaultTo: string,
  defaultValue: string,
  convert: (value: number, from: string, to: string) => number
): CalculatorVariant {
  return {
    id,
    label,
    inputs: [
      { name: "value", label: "Value", type: "number", defaultValue, validate: validNumber },
      { name: "fromUnit", label: "From", type: "select", defaultValue: defaultFrom, options: units },
      { name: "toUnit", label: "To", type: "select", defaultValue: defaultTo, options: units },
    ],
    compute: (values) => ({ converted: convert(toNumber(values.value), values.fromUnit, values.toUnit) }),
    resultFields: [
      { key: "converted", label: "Converted value", format: "number", fractionDigits: 4, suffixFromValue: "toUnit", primary: true },
    ],
    resultLabel: (values) => `${values.value || 0} ${values.fromUnit} =`,
  };
}

export const unitConverterConfig: CalculatorConfig = {
  slug: "unit-converter",
  title: "Unit Converter",
  category: "everyday",
  icon: "arrow-left-right",
  keywords: ["unit converter", "convert units", "measurement converter"],
  shortDescription: "Convert between common units of length, weight, volume, and temperature.",
  explanation:
    "One converter for four common measurement types — switch tabs to convert length, weight, volume, or temperature. For a page focused on just one type with more explanation, see the dedicated Length, Weight, or Temperature converters.",
  formula: "Length/weight/volume: value × (from-unit factor ÷ to-unit factor)\nTemperature: converted via Celsius as an intermediate step",
  example: "3 cups converts to about 709.76 milliliters.",
  faqs: [
    {
      question: "Why is temperature handled differently?",
      answer:
        "Length, weight, and volume units all share a zero point, so converting is just multiplication. Temperature scales have different zero points (32°F = 0°C), so it needs a formula with an offset instead.",
    },
    {
      question: "How precise are these conversions?",
      answer: "All conversions use standard, exact conversion factors — results are as precise as the decimal places shown.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    unitVariant("length", "Length", LENGTH_UNITS, "ft", "m", "10", convertLength),
    unitVariant("weight", "Weight", WEIGHT_UNITS, "lb", "kg", "1", convertWeight),
    unitVariant("volume", "Volume", VOLUME_UNITS, "cup", "ml", "3", convertVolume),
    unitVariant("temperature", "Temperature", TEMP_UNITS, "F", "C", "98.6", (v, f, t) =>
      convertTemperature(v, f as TemperatureUnit, t as TemperatureUnit)
    ),
  ],
};
