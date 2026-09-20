import type { CalculatorConfig } from "@/types/calculator";
import { convertLength } from "@/lib/calculators/unitConversion";

const LENGTH_UNITS = [
  { value: "in", label: "Inches (in)" },
  { value: "ft", label: "Feet (ft)" },
  { value: "yd", label: "Yards (yd)" },
  { value: "mi", label: "Miles (mi)" },
  { value: "cm", label: "Centimeters (cm)" },
  { value: "m", label: "Meters (m)" },
  { value: "km", label: "Kilometers (km)" },
];

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

export const lengthConverterConfig: CalculatorConfig = {
  slug: "length-converter",
  title: "Length Converter",
  category: "everyday",
  icon: "ruler",
  keywords: ["length converter", "feet to meters", "miles to kilometers"],
  shortDescription: "Convert between feet, meters, inches, miles, and more.",
  explanation:
    "Enter a length and pick the units to convert from and to. Conversions go through meters internally as a common reference unit, so any pair of supported units — metric or US customary — converts correctly.",
  formula: "Converted value = (Value × From-unit-to-meters factor) ÷ To-unit-to-meters factor",
  example: "10 feet converts to about 3.05 meters.",
  faqs: [
    {
      question: "Which units are supported?",
      answer: "Inches, feet, yards, and miles (US customary), plus centimeters, meters, and kilometers (metric) — convert between any two.",
    },
    {
      question: "How precise are the conversions?",
      answer: "They use standard, exact conversion factors (e.g., 1 inch = 2.54 cm exactly), so results are as precise as the decimal places shown.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "length",
      label: "Length",
      inputs: [
        {
          name: "value",
          label: "Value",
          type: "number",
          defaultValue: "10",
          validate: (value) => (value.trim() === "" || Number.isNaN(Number(value)) ? "Enter a valid number." : null),
        },
        { name: "fromUnit", label: "From", type: "select", defaultValue: "ft", options: LENGTH_UNITS },
        { name: "toUnit", label: "To", type: "select", defaultValue: "m", options: LENGTH_UNITS },
      ],
      compute: (values) => {
        const converted = convertLength(toNumber(values.value), values.fromUnit, values.toUnit);
        return { converted };
      },
      resultFields: [
        { key: "converted", label: "Converted value", format: "number", fractionDigits: 4, suffixFromValue: "toUnit", primary: true },
      ],
      resultLabel: (values) => `${values.value || 0} ${values.fromUnit} =`,
    },
  ],
};
