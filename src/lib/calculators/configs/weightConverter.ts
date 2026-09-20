import type { CalculatorConfig } from "@/types/calculator";
import { convertWeight } from "@/lib/calculators/unitConversion";

const WEIGHT_UNITS = [
  { value: "oz", label: "Ounces (oz)" },
  { value: "lb", label: "Pounds (lb)" },
  { value: "g", label: "Grams (g)" },
  { value: "kg", label: "Kilograms (kg)" },
];

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

export const weightConverterConfig: CalculatorConfig = {
  slug: "weight-converter",
  title: "Weight Converter",
  category: "everyday",
  icon: "weight",
  keywords: ["weight converter", "pounds to kilograms", "kg to lbs"],
  shortDescription: "Convert between pounds, ounces, kilograms, and grams.",
  explanation:
    "Enter a weight and pick the units to convert from and to. Conversions go through kilograms internally as a common reference unit, so any pair — US customary or metric — converts correctly.",
  formula: "Converted value = (Value × From-unit-to-kg factor) ÷ To-unit-to-kg factor",
  example: "1 pound converts to about 0.4536 kilograms.",
  faqs: [
    {
      question: "Is this the same as mass?",
      answer:
        "Colloquially yes — this converts the everyday sense of \"weight\" (pounds, kilograms) that scales measure, not the scientific distinction between mass and weight-as-a-force.",
    },
    {
      question: "How precise are the conversions?",
      answer: "They use standard, exact conversion factors (1 lb = 0.45359237 kg exactly), so results are as precise as the decimal places shown.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "weight",
      label: "Weight",
      inputs: [
        {
          name: "value",
          label: "Value",
          type: "number",
          defaultValue: "1",
          validate: (value) => (value.trim() === "" || Number.isNaN(Number(value)) ? "Enter a valid number." : null),
        },
        { name: "fromUnit", label: "From", type: "select", defaultValue: "lb", options: WEIGHT_UNITS },
        { name: "toUnit", label: "To", type: "select", defaultValue: "kg", options: WEIGHT_UNITS },
      ],
      compute: (values) => {
        const converted = convertWeight(toNumber(values.value), values.fromUnit, values.toUnit);
        return { converted };
      },
      resultFields: [
        { key: "converted", label: "Converted value", format: "number", fractionDigits: 4, suffixFromValue: "toUnit", primary: true },
      ],
      resultLabel: (values) => `${values.value || 0} ${values.fromUnit} =`,
    },
  ],
};
