"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { GenericCalculatorFormInner } from "@/components/calculator/engine/GenericCalculatorFormInner";

/**
 * One dynamic import per calculator, each resolving to a tiny wrapper
 * around the shared `GenericCalculatorFormInner`. `ssr: true` (the default)
 * means Next still renders full, correct HTML for the calculator on the
 * server — there's no loading skeleton or content swap — while on the
 * client each calculator page's JS bundle only pulls in that one
 * calculator's config instead of every calculator's config bundled
 * together (~17 of them). Add a new calculator here, matching its slug in
 * `lib/calculators/configs/index.ts`.
 */
const FORMS: Record<string, ComponentType> = {
  percentage: dynamic(() =>
    import("@/lib/calculators/configs/percentage").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.percentageConfig} />,
    }))
  ),
  tip: dynamic(() =>
    import("@/lib/calculators/configs/tip").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.tipConfig} />,
    }))
  ),
  discount: dynamic(() =>
    import("@/lib/calculators/configs/discount").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.discountConfig} />,
    }))
  ),
  "split-bill": dynamic(() =>
    import("@/lib/calculators/configs/splitBill").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.splitBillConfig} />,
    }))
  ),
  "sales-tax": dynamic(() =>
    import("@/lib/calculators/configs/salesTax").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.salesTaxConfig} />,
    }))
  ),
  interest: dynamic(() =>
    import("@/lib/calculators/configs/interest").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.interestConfig} />,
    }))
  ),
  loan: dynamic(() =>
    import("@/lib/calculators/configs/loan").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.loanConfig} />,
    }))
  ),
  mortgage: dynamic(() =>
    import("@/lib/calculators/configs/mortgage").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.mortgageConfig} />,
    }))
  ),
  rent: dynamic(() =>
    import("@/lib/calculators/configs/rent").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.rentConfig} />,
    }))
  ),
  salary: dynamic(() =>
    import("@/lib/calculators/configs/salary").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.salaryConfig} />,
    }))
  ),
  overtime: dynamic(() =>
    import("@/lib/calculators/configs/overtime").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.overtimeConfig} />,
    }))
  ),
  paycheck: dynamic(() =>
    import("@/lib/calculators/configs/paycheck").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.paycheckConfig} />,
    }))
  ),
  "minimum-wage": dynamic(() =>
    import("@/lib/calculators/configs/minimumWage").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.minimumWageConfig} />,
    }))
  ),
  "state-sales-tax": dynamic(() =>
    import("@/lib/calculators/configs/stateSalesTax").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.stateSalesTaxConfig} />,
    }))
  ),
  "state-paycheck": dynamic(() =>
    import("@/lib/calculators/configs/statePaycheck").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.statePaycheckConfig} />,
    }))
  ),
  "state-mortgage": dynamic(() =>
    import("@/lib/calculators/configs/stateMortgage").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.stateMortgageConfig} />,
    }))
  ),
  "cost-of-living": dynamic(() =>
    import("@/lib/calculators/configs/costOfLiving").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.costOfLivingConfig} />,
    }))
  ),
  average: dynamic(() =>
    import("@/lib/calculators/configs/average").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.averageConfig} />,
    }))
  ),
  ratio: dynamic(() =>
    import("@/lib/calculators/configs/ratio").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.ratioConfig} />,
    }))
  ),
  fraction: dynamic(() =>
    import("@/lib/calculators/configs/fraction").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.fractionConfig} />,
    }))
  ),
  age: dynamic(() =>
    import("@/lib/calculators/configs/age").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.ageConfig} />,
    }))
  ),
  date: dynamic(() =>
    import("@/lib/calculators/configs/dateCalculator").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.dateCalculatorConfig} />,
    }))
  ),
  time: dynamic(() =>
    import("@/lib/calculators/configs/timeCalculator").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.timeCalculatorConfig} />,
    }))
  ),
  "days-between-dates": dynamic(() =>
    import("@/lib/calculators/configs/daysBetween").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.daysBetweenConfig} />,
    }))
  ),
  countdown: dynamic(() =>
    import("@/lib/calculators/configs/countdown").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.countdownConfig} />,
    }))
  ),
  gpa: dynamic(() =>
    import("@/lib/calculators/configs/gpa").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.gpaConfig} />,
    }))
  ),
  grade: dynamic(() =>
    import("@/lib/calculators/configs/grade").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.gradeConfig} />,
    }))
  ),
  "final-grade": dynamic(() =>
    import("@/lib/calculators/configs/finalGrade").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.finalGradeConfig} />,
    }))
  ),
  paint: dynamic(() =>
    import("@/lib/calculators/configs/paint").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.paintConfig} />,
    }))
  ),
  flooring: dynamic(() =>
    import("@/lib/calculators/configs/flooring").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.flooringConfig} />,
    }))
  ),
  "square-footage": dynamic(() =>
    import("@/lib/calculators/configs/squareFootage").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.squareFootageConfig} />,
    }))
  ),
  bmi: dynamic(() =>
    import("@/lib/calculators/configs/bmi").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.bmiConfig} />,
    }))
  ),
  "fuel-cost": dynamic(() =>
    import("@/lib/calculators/configs/fuelCost").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.fuelCostConfig} />,
    }))
  ),
  "unit-converter": dynamic(() =>
    import("@/lib/calculators/configs/unitConverter").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.unitConverterConfig} />,
    }))
  ),
  "temperature-converter": dynamic(() =>
    import("@/lib/calculators/configs/temperatureConverter").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.temperatureConverterConfig} />,
    }))
  ),
  "length-converter": dynamic(() =>
    import("@/lib/calculators/configs/lengthConverter").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.lengthConverterConfig} />,
    }))
  ),
  "weight-converter": dynamic(() =>
    import("@/lib/calculators/configs/weightConverter").then((m) => ({
      default: () => <GenericCalculatorFormInner config={m.weightConverterConfig} />,
    }))
  ),
};

export function GenericCalculatorForm({ slug }: { slug: string }) {
  const Form = FORMS[slug];
  return Form ? <Form /> : null;
}
