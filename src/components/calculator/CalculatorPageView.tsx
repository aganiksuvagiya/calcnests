import { notFound } from "next/navigation";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { CalculatorExplanation } from "@/components/calculator/CalculatorExplanation";
import { StateReferenceTable } from "@/components/calculator/StateReferenceTable";
import { PercentageExtraContent } from "@/components/calculator/PercentageExtraContent";
import { GenericCalculatorForm } from "@/components/calculator/engine/GenericCalculatorForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCalculator, getRelatedCalculators, getCrossCategoryCalculators } from "@/lib/calculators/registry";
import { getCategory } from "@/lib/categories";
import { howToJsonLd } from "@/lib/seo";
import type { CalculatorConfig } from "@/types/calculator";

export function CalculatorPageView({ config }: { config: CalculatorConfig }) {
  const meta = getCalculator(config.slug);
  const category = getCategory(config.category);
  if (!meta || !category) notFound();

  return (
    <>
      <JsonLd
        data={howToJsonLd({
          title: config.title,
          slug: config.slug,
          description: config.shortDescription,
          inputLabels: config.variants[0]?.inputs.map((input) => input.label) ?? [],
          formula: config.formula.split("\n")[0] ?? config.formula,
        })}
      />
      <CalculatorShell
        slug={config.slug}
        title={config.title}
        description={config.shortDescription}
        breadcrumbs={[
          { name: "Calculators", path: "/calculators" },
          { name: category.title, path: `/calculators/${category.slug}` },
          { name: config.title, path: `/calculators/${config.slug}` },
        ]}
        form={<GenericCalculatorForm slug={config.slug} />}
        content={
          <>
            <CalculatorExplanation
              explanation={config.explanation}
              formula={config.formula}
              example={config.example}
            />
            {config.stateTable && <StateReferenceTable table={config.stateTable} />}
            {config.slug === "percentage" && <PercentageExtraContent />}
          </>
        }
        faqs={config.faqs}
        related={getRelatedCalculators(meta)}
        crossCategoryRelated={getCrossCategoryCalculators(config.slug)}
      />
    </>
  );
}
