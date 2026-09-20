import { notFound } from "next/navigation";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { CalculatorExplanation } from "@/components/calculator/CalculatorExplanation";
import { StateReferenceTable } from "@/components/calculator/StateReferenceTable";
import { GenericCalculatorForm } from "@/components/calculator/engine/GenericCalculatorForm";
import { getCalculator, getRelatedCalculators, getCrossCategoryCalculators } from "@/lib/calculators/registry";
import { getCategory } from "@/lib/categories";
import type { CalculatorConfig } from "@/types/calculator";

export function CalculatorPageView({ config }: { config: CalculatorConfig }) {
  const meta = getCalculator(config.slug);
  const category = getCategory(config.category);
  if (!meta || !category) notFound();

  return (
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
        </>
      }
      faqs={config.faqs}
      related={getRelatedCalculators(meta)}
      crossCategoryRelated={getCrossCategoryCalculators(config.slug)}
    />
  );
}
