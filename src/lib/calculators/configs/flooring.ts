import type { CalculatorConfig } from "@/types/calculator";
import { calculateFlooringNeeded } from "@/lib/calculators/flooring";

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

function validatePositive(label: string) {
  return (value: string): string | null => {
    const n = toNumber(value);
    if (value.trim() === "" || Number.isNaN(n)) return `Enter a valid ${label}.`;
    if (n <= 0) return `${label.charAt(0).toUpperCase()}${label.slice(1)} must be greater than 0.`;
    return null;
  };
}

export const flooringConfig: CalculatorConfig = {
  slug: "flooring",
  title: "Flooring Calculator",
  category: "home",
  icon: "layout-grid",
  keywords: ["flooring calculator", "how much flooring do i need"],
  shortDescription: "Estimate how much flooring material a room needs, including waste.",
  explanation:
    "Enter your room's length and width, plus a waste allowance for cuts and offcuts (10% is a common starting point for straight-laid flooring; more complex patterns like diagonal layouts typically need 15–20%).",
  formula: "Room area = Length × Width\nMaterial needed = Room area × (1 + Waste % ÷ 100)",
  example: "A 12×10 ft room with 10% waste: room area = 120 sqft, material needed = 120 × 1.10 = 132 sqft.",
  faqs: [
    {
      question: "Why do I need extra material for waste?",
      answer:
        "Cutting flooring to fit around edges, doorways, and obstacles always produces some unusable offcuts. Ordering extra avoids running short mid-installation and needing to match a dye lot later.",
    },
    {
      question: "How much waste allowance should I use?",
      answer:
        "10% is standard for a simple rectangular room laid straight. Diagonal patterns, herringbone, or rooms with lots of angles typically need 15–20%.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "flooring",
      label: "Flooring",
      inputs: [
        { name: "roomLength", label: "Room length (ft)", type: "number", defaultValue: "12", validate: validatePositive("room length") },
        { name: "roomWidth", label: "Room width (ft)", type: "number", defaultValue: "10", validate: validatePositive("room width") },
        {
          name: "wastePercent",
          label: "Waste allowance",
          type: "number",
          defaultValue: "10",
          unit: "%",
          unitPosition: "suffix",
          validate: (value) => {
            const n = toNumber(value);
            if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid waste percentage.";
            if (n < 0) return "Waste percentage can't be negative.";
            return null;
          },
        },
      ],
      compute: (values) => {
        const result = calculateFlooringNeeded(
          toNumber(values.roomLength),
          toNumber(values.roomWidth),
          toNumber(values.wastePercent)
        );
        return { materialNeeded: result.materialNeeded, roomArea: result.roomArea };
      },
      resultFields: [
        { key: "materialNeeded", label: "Material needed (sqft)", format: "number", suffix: "sq ft", primary: true },
        { key: "roomArea", label: "Room area (sqft)", format: "number" },
      ],
      resultLabel: () => "Flooring needed",
    },
  ],
};
