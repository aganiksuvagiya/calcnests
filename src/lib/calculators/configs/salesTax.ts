import type { CalculatorConfig } from "@/types/calculator";
import { calculateSalesTax, calculateReverseSalesTax } from "@/lib/calculators/salesTax";

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

function validatePositive(label: string) {
  return (value: string): string | null => {
    const n = toNumber(value);
    if (value.trim() === "" || Number.isNaN(n)) return `Enter a valid ${label}.`;
    if (n < 0) return `${label.charAt(0).toUpperCase()}${label.slice(1)} can't be negative.`;
    return null;
  };
}

export const salesTaxConfig: CalculatorConfig = {
  slug: "sales-tax",
  title: "Sales Tax Calculator",
  category: "money",
  icon: "receipt",
  keywords: ["sales tax calculator", "tax rate", "price with tax"],
  shortDescription: "Calculate sales tax and the total price of a purchase.",
  explanation:
    "US sales tax rates are set by state and local governments, so there's no single national rate — combined state and local rates range from 0% (a few states have none) to over 10% in some cities. Enter your local combined rate to get an accurate result.\n\nUse \"Add tax\" when you know the pre-tax price and want the total. Use \"Remove tax\" when you only have a receipt total that already includes tax and want to find the original price.",
  formula: "Tax amount = Price × (Tax rate % ÷ 100)\nTotal = Price + Tax amount",
  example:
    "A $45 item with a 7.25% sales tax rate: tax = $45 × 0.0725 = $3.26, total = $48.26.",
  faqs: [
    {
      question: "Why isn't there a single US sales tax rate?",
      answer:
        "Sales tax in the US is set at the state and local level, not federally. Combined state, county, and city rates vary widely — some states like Oregon and Delaware charge no sales tax at all.",
    },
    {
      question: "How do I find my local sales tax rate?",
      answer:
        "Check your state's department of revenue website, or look at a recent receipt — most US receipts itemize the tax rate applied.",
    },
    {
      question: "How does the reverse calculation work?",
      answer:
        "If you know the tax-inclusive total, divide it by (1 + tax rate) to get the pre-tax price, then subtract that from the total to get the tax amount.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "add",
      label: "Add tax",
      inputs: [
        {
          name: "price",
          label: "Price before tax",
          type: "number",
          defaultValue: "45",
          unit: "$",
          unitPosition: "prefix",
          validate: validatePositive("price"),
        },
        {
          name: "taxRate",
          label: "Sales tax rate",
          type: "number",
          defaultValue: "7.25",
          unit: "%",
          unitPosition: "suffix",
          validate: validatePositive("tax rate"),
        },
      ],
      compute: (values) => {
        const result = calculateSalesTax(toNumber(values.price), toNumber(values.taxRate));
        return { total: result.total, taxAmount: result.taxAmount };
      },
      resultFields: [
        { key: "total", label: "Total price", format: "currency", primary: true },
        { key: "taxAmount", label: "Tax amount", format: "currency" },
      ],
      resultLabel: () => "Total with tax",
    },
    {
      id: "remove",
      label: "Remove tax",
      inputs: [
        {
          name: "total",
          label: "Total (tax included)",
          type: "number",
          defaultValue: "48.26",
          unit: "$",
          unitPosition: "prefix",
          validate: validatePositive("total"),
        },
        {
          name: "taxRate",
          label: "Sales tax rate",
          type: "number",
          defaultValue: "7.25",
          unit: "%",
          unitPosition: "suffix",
          validate: validatePositive("tax rate"),
        },
      ],
      compute: (values) => {
        const result = calculateReverseSalesTax(toNumber(values.total), toNumber(values.taxRate));
        return { preTaxAmount: result.preTaxAmount, taxAmount: result.taxAmount };
      },
      resultFields: [
        { key: "preTaxAmount", label: "Price before tax", format: "currency", primary: true },
        { key: "taxAmount", label: "Tax amount", format: "currency" },
      ],
      resultLabel: () => "Pre-tax price",
    },
  ],
};
