import type { CalculatorConfig } from "@/types/calculator";
import { calculateFuelCost } from "@/lib/calculators/fuelCost";

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

export const fuelCostConfig: CalculatorConfig = {
  slug: "fuel-cost",
  title: "Fuel Cost Calculator",
  category: "everyday",
  icon: "fuel",
  keywords: ["fuel cost calculator", "gas cost calculator", "trip fuel cost"],
  shortDescription: "Estimate the fuel cost of a trip.",
  explanation:
    "Enter the trip distance, your vehicle's fuel efficiency, and the price per gallon to estimate total fuel cost. Check your vehicle's actual combined MPG rating (or your own tracked average) for the most accurate estimate — city and highway driving affect real-world efficiency.",
  formula: "Gallons used = Distance ÷ MPG\nTotal cost = Gallons used × Price per gallon",
  example: "A 300-mile trip at 30 MPG with gas at $3.50/gallon: gallons used = 300 ÷ 30 = 10, total cost = 10 × $3.50 = $35.00.",
  faqs: [
    {
      question: "Where do I find my car's MPG?",
      answer:
        "Check your vehicle's window sticker, owner's manual, or the EPA's fueleconomy.gov — or use your own tracked average from recent fill-ups for a more personalized estimate.",
    },
    {
      question: "Does this account for city vs. highway driving?",
      answer:
        "Not directly — enter the MPG figure that best matches your trip (city, highway, or combined) for a more accurate result.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "fuel-cost",
      label: "Fuel cost",
      inputs: [
        {
          name: "distance",
          label: "Trip distance (miles)",
          type: "number",
          defaultValue: "300",
          validate: (value) => {
            const n = toNumber(value);
            if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid distance.";
            if (n < 0) return "Distance can't be negative.";
            return null;
          },
        },
        {
          name: "mpg",
          label: "Fuel efficiency (MPG)",
          type: "number",
          defaultValue: "30",
          validate: (value) => {
            const n = toNumber(value);
            if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid MPG.";
            if (n <= 0) return "MPG must be greater than 0.";
            return null;
          },
        },
        {
          name: "pricePerGallon",
          label: "Price per gallon",
          type: "number",
          defaultValue: "3.50",
          unit: "$",
          unitPosition: "prefix",
          validate: (value) => {
            const n = toNumber(value);
            if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid price.";
            if (n < 0) return "Price can't be negative.";
            return null;
          },
        },
      ],
      compute: (values) => {
        const result = calculateFuelCost(toNumber(values.distance), toNumber(values.mpg), toNumber(values.pricePerGallon));
        return { totalCost: result.totalCost, gallonsUsed: result.gallonsUsed };
      },
      resultFields: [
        { key: "totalCost", label: "Total fuel cost", format: "currency", primary: true },
        { key: "gallonsUsed", label: "Gallons used", format: "number", fractionDigits: 2 },
      ],
      resultLabel: () => "Estimated fuel cost",
    },
  ],
};
