import type { CalculatorConfig } from "@/types/calculator";
import { percentageConfig } from "./percentage";
import { tipConfig } from "./tip";
import { discountConfig } from "./discount";
import { splitBillConfig } from "./splitBill";
import { salesTaxConfig } from "./salesTax";
import { interestConfig } from "./interest";
import { loanConfig } from "./loan";
import { mortgageConfig } from "./mortgage";
import { rentConfig } from "./rent";
import { salaryConfig } from "./salary";
import { overtimeConfig } from "./overtime";
import { paycheckConfig } from "./paycheck";
import { minimumWageConfig } from "./minimumWage";
import { stateSalesTaxConfig } from "./stateSalesTax";
import { statePaycheckConfig } from "./statePaycheck";
import { stateMortgageConfig } from "./stateMortgage";
import { costOfLivingConfig } from "./costOfLiving";
import { averageConfig } from "./average";
import { ratioConfig } from "./ratio";
import { fractionConfig } from "./fraction";
import { ageConfig } from "./age";
import { dateCalculatorConfig } from "./dateCalculator";
import { timeCalculatorConfig } from "./timeCalculator";
import { daysBetweenConfig } from "./daysBetween";
import { countdownConfig } from "./countdown";
import { gpaConfig } from "./gpa";
import { gradeConfig } from "./grade";
import { finalGradeConfig } from "./finalGrade";
import { paintConfig } from "./paint";
import { flooringConfig } from "./flooring";
import { squareFootageConfig } from "./squareFootage";
import { bmiConfig } from "./bmi";
import { fuelCostConfig } from "./fuelCost";
import { unitConverterConfig } from "./unitConverter";
import { temperatureConverterConfig } from "./temperatureConverter";
import { lengthConverterConfig } from "./lengthConverter";
import { weightConverterConfig } from "./weightConverter";

/**
 * Every calculator that has a full interactive config, keyed by slug.
 * Adding a calculator = write its pure math fn, add a config here, and flip
 * `isLive: true` in the registry. No new route or page file needed.
 */
export const calculatorConfigs: Record<string, CalculatorConfig> = {
  [percentageConfig.slug]: percentageConfig,
  [tipConfig.slug]: tipConfig,
  [discountConfig.slug]: discountConfig,
  [splitBillConfig.slug]: splitBillConfig,
  [salesTaxConfig.slug]: salesTaxConfig,
  [interestConfig.slug]: interestConfig,
  [loanConfig.slug]: loanConfig,
  [mortgageConfig.slug]: mortgageConfig,
  [rentConfig.slug]: rentConfig,
  [salaryConfig.slug]: salaryConfig,
  [overtimeConfig.slug]: overtimeConfig,
  [paycheckConfig.slug]: paycheckConfig,
  [minimumWageConfig.slug]: minimumWageConfig,
  [stateSalesTaxConfig.slug]: stateSalesTaxConfig,
  [statePaycheckConfig.slug]: statePaycheckConfig,
  [stateMortgageConfig.slug]: stateMortgageConfig,
  [costOfLivingConfig.slug]: costOfLivingConfig,
  [averageConfig.slug]: averageConfig,
  [ratioConfig.slug]: ratioConfig,
  [fractionConfig.slug]: fractionConfig,
  [ageConfig.slug]: ageConfig,
  [dateCalculatorConfig.slug]: dateCalculatorConfig,
  [timeCalculatorConfig.slug]: timeCalculatorConfig,
  [daysBetweenConfig.slug]: daysBetweenConfig,
  [countdownConfig.slug]: countdownConfig,
  [gpaConfig.slug]: gpaConfig,
  [gradeConfig.slug]: gradeConfig,
  [finalGradeConfig.slug]: finalGradeConfig,
  [paintConfig.slug]: paintConfig,
  [flooringConfig.slug]: flooringConfig,
  [squareFootageConfig.slug]: squareFootageConfig,
  [bmiConfig.slug]: bmiConfig,
  [fuelCostConfig.slug]: fuelCostConfig,
  [unitConverterConfig.slug]: unitConverterConfig,
  [temperatureConverterConfig.slug]: temperatureConverterConfig,
  [lengthConverterConfig.slug]: lengthConverterConfig,
  [weightConverterConfig.slug]: weightConverterConfig,
};

export function getCalculatorConfig(slug: string): CalculatorConfig | undefined {
  return calculatorConfigs[slug];
}
