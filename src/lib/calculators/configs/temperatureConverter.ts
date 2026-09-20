import type { CalculatorConfig } from "@/types/calculator";
import { convertTemperature, type TemperatureUnit } from "@/lib/calculators/unitConversion";

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

const TEMP_UNITS = [
  { value: "F", label: "Fahrenheit (°F)" },
  { value: "C", label: "Celsius (°C)" },
  { value: "K", label: "Kelvin (K)" },
];

export const temperatureConverterConfig: CalculatorConfig = {
  slug: "temperature-converter",
  title: "Temperature Converter",
  category: "everyday",
  icon: "thermometer",
  keywords: ["temperature converter", "fahrenheit to celsius", "celsius to fahrenheit"],
  shortDescription: "Convert between Fahrenheit, Celsius, and Kelvin.",
  explanation:
    "Enter a temperature and pick the units to convert from and to. Unlike length or weight, temperature scales don't share a zero point, so conversion uses a formula rather than a simple multiplication factor.",
  formula: "°F to °C: (°F − 32) × 5/9\n°C to °F: (°C × 9/5) + 32\n°C to K: °C + 273.15",
  example: "98.6°F (normal body temperature) converts to 37.0°C.",
  faqs: [
    {
      question: "Why can't I just multiply to convert temperature?",
      answer:
        "Fahrenheit and Celsius have different zero points (32°F = 0°C) and different-sized degrees, so conversion needs both a scaling factor and an offset, not just multiplication.",
    },
    {
      question: "What is Kelvin used for?",
      answer:
        "Kelvin is the scientific standard for absolute temperature, starting at absolute zero (−273.15°C). It's used in physics and chemistry rather than everyday weather or cooking.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "temperature",
      label: "Temperature",
      inputs: [
        {
          name: "value",
          label: "Value",
          type: "number",
          defaultValue: "98.6",
          validate: (value) => (value.trim() === "" || Number.isNaN(Number(value)) ? "Enter a valid number." : null),
        },
        { name: "fromUnit", label: "From", type: "select", defaultValue: "F", options: TEMP_UNITS },
        { name: "toUnit", label: "To", type: "select", defaultValue: "C", options: TEMP_UNITS },
      ],
      compute: (values) => {
        const converted = convertTemperature(
          toNumber(values.value),
          values.fromUnit as TemperatureUnit,
          values.toUnit as TemperatureUnit
        );
        return { converted };
      },
      resultFields: [
        { key: "converted", label: "Converted value", format: "number", fractionDigits: 2, suffixFromValue: "toUnit", primary: true },
      ],
      resultLabel: (values) => `${values.value || 0}°${values.fromUnit} =`,
    },
  ],
};
