import type { CalculatorConfig } from "@/types/calculator";
import { calculateSplitBill } from "@/lib/calculators/splitBill";

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

const peopleOptions = Array.from({ length: 10 }, (_, i) => {
  const n = i + 2;
  return { value: String(n), label: `${n} people` };
});

export const splitBillConfig: CalculatorConfig = {
  slug: "split-bill",
  title: "Split Bill Calculator",
  category: "money",
  icon: "users",
  keywords: ["split bill calculator", "bill splitter", "group bill"],
  shortDescription: "Split a restaurant bill evenly, including tax and tip.",
  explanation:
    "Enter the bill subtotal (before tax and tip), the local sales tax rate, the tip percentage, and how many people are splitting the check. The calculator adds tax and tip to the subtotal, then divides the total evenly.\n\nTip is calculated on the pre-tax subtotal, which is the most common convention — some people prefer tipping on the post-tax total, which would give a slightly higher tip amount.",
  formula:
    "Tax = Subtotal × (Tax % ÷ 100)\nTip = Subtotal × (Tip % ÷ 100)\nTotal = Subtotal + Tax + Tip\nPer person = Total ÷ Number of people",
  example:
    "A $120 subtotal with 8% tax and a 20% tip split 4 ways: tax = $9.60, tip = $24.00, total = $153.60, and each person pays $38.40.",
  faqs: [
    {
      question: "Does this split the bill evenly or by what each person ordered?",
      answer:
        "This calculator splits the total evenly among everyone. For itemized splitting where each person pays for their own items, you'd need to total each person's items separately, then apply a proportional share of tax and tip.",
    },
    {
      question: "Should tip be calculated before or after tax?",
      answer:
        "Both are common. This calculator applies tip to the pre-tax subtotal, which is the more traditional approach and results in a slightly lower tip than calculating it on the post-tax total.",
    },
    {
      question: "What if someone doesn't want to split evenly?",
      answer:
        "This calculator assumes an even split. If people ordered very different amounts, an itemized split (each person's items plus a proportional share of tax and tip) would be fairer.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "split",
      label: "Split",
      inputs: [
        {
          name: "subtotal",
          label: "Bill subtotal",
          type: "number",
          defaultValue: "120",
          unit: "$",
          unitPosition: "prefix",
          validate: (value) => {
            const n = toNumber(value);
            if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid subtotal.";
            if (n < 0) return "Subtotal can't be negative.";
            return null;
          },
        },
        {
          name: "taxPercent",
          label: "Sales tax",
          type: "number",
          defaultValue: "8",
          unit: "%",
          unitPosition: "suffix",
          validate: (value) => {
            const n = toNumber(value);
            if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid tax rate.";
            if (n < 0) return "Tax rate can't be negative.";
            return null;
          },
        },
        {
          name: "tipPercent",
          label: "Tip",
          type: "radio",
          defaultValue: "20",
          options: [
            { value: "10", label: "10%" },
            { value: "15", label: "15%" },
            { value: "18", label: "18%" },
            { value: "20", label: "20%" },
          ],
        },
        {
          name: "numPeople",
          label: "Split between",
          type: "select",
          defaultValue: "4",
          options: peopleOptions,
        },
      ],
      compute: (values) => {
        const result = calculateSplitBill(
          toNumber(values.subtotal),
          toNumber(values.taxPercent),
          toNumber(values.tipPercent),
          toNumber(values.numPeople)
        );
        return {
          amountPerPerson: result.amountPerPerson,
          total: result.total,
          taxAmount: result.taxAmount,
          tipAmount: result.tipAmount,
        };
      },
      resultFields: [
        { key: "amountPerPerson", label: "Each person pays", format: "currency", primary: true },
        { key: "total", label: "Total bill", format: "currency" },
        { key: "taxAmount", label: "Tax", format: "currency" },
        { key: "tipAmount", label: "Tip", format: "currency" },
      ],
      resultLabel: (values) => `Split ${values.numPeople || 0} ways, each person pays`,
    },
  ],
};
