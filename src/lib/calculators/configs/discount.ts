import type { CalculatorConfig } from "@/types/calculator";
import { calculateDiscount } from "@/lib/calculators/discount";

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

export const discountConfig: CalculatorConfig = {
  slug: "discount",
  title: "Discount Calculator",
  category: "money",
  icon: "tag",
  keywords: ["discount calculator", "sale price", "percent off"],
  shortDescription: "Find sale prices and total savings.",
  explanation:
    "Enter the original price and the discount percentage to see exactly how much you save and what you'll actually pay.\n\nThis works for any single percentage-off discount — a store sale, a coupon, or a promo code — as long as the discount is expressed as a percentage of the original price.",
  formula: "Discount amount = Original price × (Discount % ÷ 100)\nFinal price = Original price − Discount amount",
  example:
    "A $80 jacket is 25% off. Discount amount = $80 × (25 ÷ 100) = $20. Final price = $80 − $20 = $60.",
  faqs: [
    {
      question: "How do I calculate a discount manually?",
      answer:
        "Multiply the original price by the discount percentage divided by 100 to get the discount amount, then subtract that from the original price to get the final price.",
    },
    {
      question: "Does this include sales tax?",
      answer:
        "No. This calculator applies only the percentage discount to the original price. Sales tax, if any, is calculated separately on the final price.",
    },
    {
      question: "Can I use this for stacked discounts?",
      answer:
        "This calculator handles one discount at a time. For stacked discounts, apply the first discount, then run the calculator again using the resulting price as the new original price.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "discount",
      label: "Discount",
      inputs: [
        {
          name: "originalPrice",
          label: "Original price",
          type: "number",
          defaultValue: "80",
          unit: "$",
          unitPosition: "prefix",
          validate: (value) => {
            const n = toNumber(value);
            if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid price.";
            if (n < 0) return "Price can't be negative.";
            return null;
          },
        },
        {
          name: "discountPercent",
          label: "Discount",
          type: "number",
          defaultValue: "25",
          unit: "%",
          unitPosition: "suffix",
          validate: (value) => {
            const n = toNumber(value);
            if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid percentage.";
            if (n < 0 || n > 100) return "Discount must be between 0 and 100.";
            return null;
          },
        },
      ],
      compute: (values) => {
        const result = calculateDiscount(toNumber(values.originalPrice), toNumber(values.discountPercent));
        return {
          discountAmount: result.discountAmount,
          finalPrice: result.finalPrice,
        };
      },
      resultFields: [
        { key: "finalPrice", label: "You pay", format: "currency", primary: true },
        { key: "discountAmount", label: "You save", format: "currency" },
      ],
      resultLabel: () => "Final price",
    },
  ],
};
