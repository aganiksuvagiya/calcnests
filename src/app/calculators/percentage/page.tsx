import { notFound } from "next/navigation";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { PercentageForm } from "@/components/calculator/percentage/PercentageForm";
import { SeoContent } from "@/components/seo/SeoContent";
import { getCalculator, getRelatedCalculators } from "@/lib/calculators/registry";
import { getCategory } from "@/lib/categories";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const calculator = getCalculator("percentage")!;
const category = getCategory(calculator.category)!;

export const metadata: Metadata = buildMetadata({
  title: calculator.title,
  description: calculator.description,
  path: `/calculators/${calculator.slug}`,
  keywords: calculator.keywords,
});

export default function PercentageCalculatorPage() {
  if (!calculator) notFound();

  return (
    <CalculatorShell
      calculator={calculator}
      breadcrumbs={[
        { name: "Calculators", path: "/calculators" },
        { name: category.title, path: `/calculators/${category.slug}` },
        { name: calculator.title, path: `/calculators/${calculator.slug}` },
      ]}
      form={<PercentageForm />}
      related={getRelatedCalculators(calculator)}
      content={
        <SeoContent title="How the percentage calculator works">
          <p>
            This calculator covers the three most common percentage calculations: finding a
            percentage of a number, finding what percentage one number is of another, and finding
            the percentage change between two values.
          </p>
          <p>
            <strong>Percentage of a value:</strong> multiply the value by the percentage and divide
            by 100. For example, 20% of 150 is (20 × 150) ÷ 100 = 30.
          </p>
          <p>
            <strong>What percent is X of Y:</strong> divide the part by the whole and multiply by
            100. For example, 45 out of 60 is (45 ÷ 60) × 100 = 75%.
          </p>
          <p>
            <strong>Percentage increase or decrease:</strong> subtract the original value from the
            new value, divide by the original value, then multiply by 100. A positive result means
            an increase; a negative result means a decrease.
          </p>
        </SeoContent>
      }
    />
  );
}
