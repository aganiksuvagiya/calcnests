import type { CalculatorConfig } from "@/types/calculator";
import { calculateTip } from "@/lib/calculators/tip";

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

const peopleOptions = Array.from({ length: 10 }, (_, i) => {
  const n = i + 1;
  return { value: String(n), label: n === 1 ? "1 person" : `${n} people` };
});

export const tipConfig: CalculatorConfig = {
  slug: "tip",
  title: "Tip Calculator",
  category: "money",
  icon: "hand-coins",
  keywords: ["tip calculator", "gratuity", "bill split"],
  shortDescription: "Calculate tips and split the bill fairly.",
  explanation:
    "Enter your bill total, choose a tip percentage, and pick how many people are splitting the check. The calculator instantly shows the tip amount, the total bill, and what each person owes.\n\nA standard tip in the US is 15–20% for sit-down service, though it's always your choice.",
  formula:
    "Tip amount = Bill × (Tip % ÷ 100)\nTotal = Bill + Tip amount\nPer person = Total ÷ Number of people",
  example:
    "For a $50 bill with an 18% tip split between 3 people: tip = $50 × 0.18 = $9. Total = $59. Each person pays $19.67.",
  faqs: [
    {
      question: "What is a standard tip percentage in the US?",
      answer:
        "15–20% of the bill before tax is typical for sit-down restaurant service in the US, with 20% common for excellent service.",
    },
    {
      question: "Should I tip on the pre-tax or post-tax amount?",
      answer:
        "Most etiquette guides recommend tipping on the pre-tax subtotal, but tipping on the total is also common and never considered rude.",
    },
    {
      question: "How is the per-person amount calculated?",
      answer:
        "The total bill, including tip, is divided evenly by the number of people. For itemized splitting, each person would instead pay for their own items plus a share of tax and tip.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "tip",
      label: "Tip",
      inputs: [
        {
          name: "billAmount",
          label: "Bill amount",
          type: "number",
          defaultValue: "50",
          unit: "$",
          unitPosition: "prefix",
          validate: (value) => {
            const n = toNumber(value);
            if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid bill amount.";
            if (n < 0) return "Bill amount can't be negative.";
            return null;
          },
        },
        {
          name: "tipPercent",
          label: "Tip percentage",
          type: "radio",
          defaultValue: "18",
          options: [
            { value: "10", label: "10%" },
            { value: "15", label: "15%" },
            { value: "18", label: "18%" },
            { value: "20", label: "20%" },
            { value: "25", label: "25%" },
          ],
        },
        {
          name: "numPeople",
          label: "Split between",
          type: "select",
          defaultValue: "1",
          options: peopleOptions,
        },
      ],
      compute: (values) => {
        const result = calculateTip(
          toNumber(values.billAmount),
          toNumber(values.tipPercent),
          toNumber(values.numPeople)
        );
        return {
          tipAmount: result.tipAmount,
          totalAmount: result.totalAmount,
          amountPerPerson: result.amountPerPerson,
        };
      },
      resultFields: [
        { key: "totalAmount", label: "Total bill", format: "currency", primary: true },
        { key: "tipAmount", label: "Tip amount", format: "currency" },
        { key: "amountPerPerson", label: "Per person", format: "currency" },
      ],
      resultLabel: () => "Total with tip",
    },
  ],
};
