import type { CalculatorConfig } from "@/types/calculator";
import { calculatePaintNeeded } from "@/lib/calculators/paint";

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

function validateNonNegative(label: string) {
  return (value: string): string | null => {
    const n = toNumber(value);
    if (value.trim() === "" || Number.isNaN(n)) return `Enter a valid ${label}.`;
    if (n < 0) return `${label.charAt(0).toUpperCase()}${label.slice(1)} can't be negative.`;
    return null;
  };
}

export const paintConfig: CalculatorConfig = {
  slug: "paint",
  title: "Paint Calculator",
  category: "home",
  icon: "paintbrush",
  keywords: ["paint calculator", "how much paint do i need"],
  shortDescription: "Estimate how many gallons of paint a room needs.",
  explanation:
    "Enter your room's length, width, and wall height, plus how many doors and windows to subtract (they don't need paint). This estimates paintable wall area and how many gallons you'll need, using the standard US coverage estimate of about 350 square feet per gallon.\n\nActual coverage varies by paint brand, wall texture, and color change — check your specific paint can's coverage rating for a more precise number, and consider rounding up to the next full gallon when buying.",
  formula:
    "Wall area = 2 × (Length + Width) × Height\nPaintable area = Wall area − (Doors × 20 sqft) − (Windows × 15 sqft)\nGallons needed = (Paintable area × Coats) ÷ 350",
  example:
    "A 12×10 ft room with 8 ft walls, 1 door, and 2 windows: wall area = 2×(12+10)×8 = 352 sqft, minus 20 (door) and 30 (2 windows) = 302 sqft paintable — about 0.86 gallons for one coat.",
  faqs: [
    {
      question: "Why 350 square feet per gallon?",
      answer:
        "That's the commonly cited US industry average for one coat of standard latex paint on primed drywall. Textured surfaces, unprimed drywall, or very light-to-dark color changes can reduce actual coverage.",
    },
    {
      question: "Does this include the ceiling?",
      answer: "No — this estimates wall area only. Ceilings are typically painted separately with ceiling-specific paint.",
    },
    {
      question: "Should I round up when buying paint?",
      answer: "Yes — paint is sold in fixed can sizes (usually gallons or quarts), so round up to the next can size you can buy.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "paint",
      label: "Paint",
      inputs: [
        { name: "roomLength", label: "Room length (ft)", type: "number", defaultValue: "12", validate: validatePositive("room length") },
        { name: "roomWidth", label: "Room width (ft)", type: "number", defaultValue: "10", validate: validatePositive("room width") },
        { name: "wallHeight", label: "Wall height (ft)", type: "number", defaultValue: "8", validate: validatePositive("wall height") },
        { name: "doors", label: "Number of doors", type: "number", defaultValue: "1", validate: validateNonNegative("number of doors") },
        { name: "windows", label: "Number of windows", type: "number", defaultValue: "2", validate: validateNonNegative("number of windows") },
        {
          name: "coats",
          label: "Number of coats",
          type: "select",
          defaultValue: "1",
          options: [
            { value: "1", label: "1 coat" },
            { value: "2", label: "2 coats" },
            { value: "3", label: "3 coats" },
          ],
        },
      ],
      compute: (values) => {
        const result = calculatePaintNeeded(
          toNumber(values.roomLength),
          toNumber(values.roomWidth),
          toNumber(values.wallHeight),
          toNumber(values.doors),
          toNumber(values.windows),
          toNumber(values.coats)
        );
        return { gallonsNeeded: result.gallonsNeeded, paintableArea: result.paintableArea, wallArea: result.wallArea };
      },
      resultFields: [
        { key: "gallonsNeeded", label: "Gallons needed", format: "number", fractionDigits: 2, suffix: "gallons", primary: true },
        { key: "paintableArea", label: "Paintable area (sqft)", format: "number" },
        { key: "wallArea", label: "Total wall area (sqft)", format: "number" },
      ],
      resultLabel: () => "Paint needed",
    },
  ],
};
