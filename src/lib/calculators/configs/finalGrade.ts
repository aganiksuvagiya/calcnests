import type { CalculatorConfig } from "@/types/calculator";
import { calculateFinalGradeNeeded } from "@/lib/calculators/finalGrade";

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

function validatePercent(label: string, allowZero = true) {
  return (value: string): string | null => {
    const n = toNumber(value);
    if (value.trim() === "" || Number.isNaN(n)) return `Enter a valid ${label}.`;
    if (n < 0 || n > 100) return `${label.charAt(0).toUpperCase()}${label.slice(1)} must be between 0 and 100.`;
    if (!allowZero && n === 0) return `${label.charAt(0).toUpperCase()}${label.slice(1)} can't be 0.`;
    return null;
  };
}

export const finalGradeConfig: CalculatorConfig = {
  slug: "final-grade",
  title: "Final Grade Calculator",
  category: "education",
  icon: "book-open",
  keywords: ["final grade calculator", "final exam calculator"],
  shortDescription: "Find the score you need on your final exam to reach a target grade.",
  explanation:
    "Enter your current grade, how much the final exam is worth, and the grade you want to end up with. The calculator works backward to find the minimum score you need on the final — if that number is over 100, the target isn't achievable with this final alone.",
  formula: "Needed score = (Desired grade − Current grade × (1 − Final weight)) ÷ Final weight",
  example:
    "Currently at 85%, the final is worth 30% of the grade, and the goal is 90% overall: needed score = (90 − 85×0.7) ÷ 0.3 ≈ 101.7% — not achievable, since it's over 100.",
  faqs: [
    {
      question: "What does it mean if the needed score is over 100?",
      answer:
        "It means the target grade isn't mathematically reachable with a single final exam, even with a perfect score. You'd need extra credit, a grade recalculation, or to adjust your target.",
    },
    {
      question: "What if the needed score is negative or very low?",
      answer:
        "That means you've already secured your target grade — even a low score on the final would keep you at or above your goal.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "final-grade",
      label: "Final grade",
      inputs: [
        { name: "currentGrade", label: "Current grade (%)", type: "number", defaultValue: "85", validate: validatePercent("current grade") },
        { name: "finalWeight", label: "Final exam weight (%)", type: "number", defaultValue: "30", validate: validatePercent("final exam weight", false) },
        { name: "desiredGrade", label: "Desired overall grade (%)", type: "number", defaultValue: "90", validate: validatePercent("desired grade") },
      ],
      compute: (values) => {
        const result = calculateFinalGradeNeeded(
          toNumber(values.currentGrade),
          toNumber(values.finalWeight),
          toNumber(values.desiredGrade)
        );
        return { neededScore: result.neededScore, achievable: result.achievable ? 1 : 0 };
      },
      resultFields: [
        { key: "neededScore", label: "Score needed on final", format: "percent", primary: true },
        { key: "achievable", label: "Achievable?", format: "text", labels: ["No — exceeds 100%", "Yes"] },
      ],
      resultLabel: () => "Score needed on the final",
    },
  ],
};
