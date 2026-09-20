import type { CalculatorMeta } from "@/types/calculator";

/**
 * Single source of truth for every calculator on the site.
 * `isLive: false` entries render as "Coming soon" cards on category pages
 * and are excluded from the sitemap and search index until built.
 */
export const calculatorRegistry: CalculatorMeta[] = [
  // ---------------- Money ----------------
  {
    slug: "percentage",
    title: "Percentage Calculator",
    category: "money",
    shortDescription: "Find percentages, increases, and decreases instantly.",
    description:
      "Calculate what percentage one number is of another, find a percentage of a value, or work out percentage increase and decrease between two numbers.",
    icon: "percent",
    keywords: ["percentage", "percent", "percentage increase", "percentage decrease"],
    isLive: true,
  },
  { slug: "tip", title: "Tip Calculator", category: "money", shortDescription: "Calculate tips and split the bill fairly.", description: "Work out how much to tip based on your bill total and desired tip percentage, and split it evenly among a group.", icon: "hand-coins", keywords: ["tip calculator", "gratuity"], isLive: true },
  { slug: "discount", title: "Discount Calculator", category: "money", shortDescription: "Find sale prices and total savings.", description: "Calculate the final price after a percentage-off discount and see exactly how much you save.", icon: "tag", keywords: ["discount calculator", "sale price"], isLive: true },
  { slug: "mortgage", title: "Mortgage Calculator", category: "money", shortDescription: "Estimate your monthly mortgage payment.", description: "Estimate monthly principal and interest payments on a home loan based on loan amount, rate, and term.", icon: "home", keywords: ["mortgage calculator", "home loan"], isLive: true },
  { slug: "rent", title: "Rent Calculator", category: "money", shortDescription: "Figure out how much rent you can afford.", description: "Estimate an affordable monthly rent based on your income and expenses.", icon: "key", keywords: ["rent calculator", "affordability"], isLive: true },
  { slug: "loan", title: "Loan Calculator", category: "money", shortDescription: "Estimate monthly loan payments.", description: "Calculate monthly payments, total interest, and payoff timelines for personal or auto loans.", icon: "landmark", keywords: ["loan calculator", "amortization"], isLive: true },
  { slug: "interest", title: "Interest Calculator", category: "money", shortDescription: "Calculate simple and compound interest.", description: "Work out how much interest accrues on savings or debt over time, with simple or compound interest.", icon: "trending-up", keywords: ["interest calculator", "compound interest"], isLive: true },
  { slug: "salary", title: "Salary Calculator", category: "money", shortDescription: "Convert salary between hourly, weekly, and annual.", description: "Convert between hourly, weekly, monthly, and annual pay based on hours worked.", icon: "wallet", keywords: ["salary calculator", "annual salary"], isLive: true },
  { slug: "overtime", title: "Overtime Calculator", category: "money", shortDescription: "Calculate overtime pay and total earnings.", description: "Estimate overtime pay using standard time-and-a-half rules based on regular hourly rate and hours worked.", icon: "clock", keywords: ["overtime calculator", "overtime pay"], isLive: true },
  { slug: "split-bill", title: "Split Bill Calculator", category: "money", shortDescription: "Split a bill evenly or by share.", description: "Divide a restaurant or group bill evenly among any number of people, including tax and tip.", icon: "users", keywords: ["split bill calculator", "bill splitter"], isLive: true },
  { slug: "sales-tax", title: "Sales Tax Calculator", category: "money", shortDescription: "Calculate sales tax and total price.", description: "Calculate the sales tax owed on a purchase and the final price including tax for any US state rate.", icon: "receipt", keywords: ["sales tax calculator", "tax rate"], isLive: true },
  { slug: "paycheck", title: "Paycheck Calculator", category: "money", shortDescription: "Estimate take-home pay after taxes.", description: "Estimate your net paycheck after federal tax withholding, FICA, and common deductions.", icon: "file-text", keywords: ["paycheck calculator", "take home pay"], isLive: true },

  // ---------------- Math ----------------
  { slug: "average", title: "Average Calculator", category: "math", shortDescription: "Calculate the mean of a set of numbers.", description: "Find the average (mean), sum, and count for any list of numbers.", icon: "sigma", keywords: ["average calculator", "mean"], isLive: true },
  { slug: "ratio", title: "Ratio Calculator", category: "math", shortDescription: "Simplify and scale ratios.", description: "Simplify ratios to their lowest terms or scale them to a target value.", icon: "divide", keywords: ["ratio calculator"], isLive: true },
  { slug: "fraction", title: "Fraction Calculator", category: "math", shortDescription: "Add, subtract, multiply, and divide fractions.", description: "Perform arithmetic on fractions and simplify the results automatically.", icon: "pi", keywords: ["fraction calculator"], isLive: true },

  // ---------------- Date & Time ----------------
  { slug: "age", title: "Age Calculator", category: "date-time", shortDescription: "Calculate exact age from a birth date.", description: "Find your exact age in years, months, and days from a date of birth.", icon: "cake",  keywords: ["age calculator"], isLive: true },
  { slug: "date", title: "Date Calculator", category: "date-time", shortDescription: "Add or subtract days from a date.", description: "Add or subtract days, weeks, months, or years from any date.", icon: "calendar-plus", keywords: ["date calculator"], isLive: true },
  { slug: "time", title: "Time Calculator", category: "date-time", shortDescription: "Add or subtract hours and minutes.", description: "Add or subtract hours, minutes, and seconds between times.", icon: "clock-3", keywords: ["time calculator"], isLive: true },
  { slug: "days-between-dates", title: "Days Between Dates", category: "date-time", shortDescription: "Count the days between two dates.", description: "Calculate the exact number of days, weeks, and months between two dates.", icon: "calendar-range", keywords: ["days between dates calculator"], isLive: true },
  { slug: "countdown", title: "Countdown Calculator", category: "date-time", shortDescription: "Count down to any future date.", description: "See exactly how much time is left until a future date and time.", icon: "hourglass", keywords: ["countdown calculator"], isLive: true },

  // ---------------- Education ----------------
  { slug: "gpa", title: "GPA Calculator", category: "education", shortDescription: "Calculate your grade point average.", description: "Calculate your GPA from course grades and credit hours using the standard 4.0 scale.", icon: "graduation-cap", keywords: ["gpa calculator"], isLive: true },
  { slug: "grade", title: "Grade Calculator", category: "education", shortDescription: "Calculate a weighted course grade.", description: "Calculate your overall grade from individual weighted assignment and test scores.", icon: "award", keywords: ["grade calculator"], isLive: true },
  { slug: "final-grade", title: "Final Grade Calculator", category: "education", shortDescription: "Find the score you need on your final exam.", description: "Calculate the minimum score you need on a final exam to reach your target course grade.", icon: "book-open", keywords: ["final grade calculator"], isLive: true },

  // ---------------- Home ----------------
  { slug: "paint", title: "Paint Calculator", category: "home", shortDescription: "Estimate how much paint you need.", description: "Estimate the amount of paint required for a room based on wall area and coverage.", icon: "paintbrush", keywords: ["paint calculator"], isLive: true },
  { slug: "flooring", title: "Flooring Calculator", category: "home", shortDescription: "Estimate flooring material needed.", description: "Estimate the amount of flooring material needed based on room dimensions.", icon: "layout-grid", keywords: ["flooring calculator"], isLive: true },
  { slug: "square-footage", title: "Square Footage Calculator", category: "home", shortDescription: "Calculate area in square feet.", description: "Calculate the square footage of a room or space from its dimensions.", icon: "ruler", keywords: ["square footage calculator"], isLive: true },

  // ---------------- Everyday ----------------
  { slug: "bmi", title: "BMI Calculator", category: "everyday", shortDescription: "Calculate Body Mass Index.", description: "Calculate Body Mass Index (BMI) from height and weight using US units.", icon: "activity", keywords: ["bmi calculator"], isLive: true },
  { slug: "fuel-cost", title: "Fuel Cost Calculator", category: "everyday", shortDescription: "Estimate trip fuel costs.", description: "Estimate the fuel cost of a trip based on distance, fuel efficiency, and gas price.", icon: "fuel", keywords: ["fuel cost calculator", "gas calculator"], isLive: true },
  { slug: "unit-converter", title: "Unit Converter", category: "everyday", shortDescription: "Convert between common units.", description: "Convert between common units of length, weight, volume, and temperature.", icon: "arrow-left-right", keywords: ["unit converter"], isLive: true },
  { slug: "temperature-converter", title: "Temperature Converter", category: "everyday", shortDescription: "Convert Fahrenheit, Celsius, and Kelvin.", description: "Convert temperatures between Fahrenheit, Celsius, and Kelvin.", icon: "thermometer", keywords: ["temperature converter"], isLive: true },
  { slug: "length-converter", title: "Length Converter", category: "everyday", shortDescription: "Convert feet, meters, inches, and more.", description: "Convert lengths between feet, inches, meters, centimeters, and miles.", icon: "ruler",  keywords: ["length converter"], isLive: true },
  { slug: "weight-converter", title: "Weight Converter", category: "everyday", shortDescription: "Convert pounds, kilograms, and ounces.", description: "Convert weights between pounds, ounces, kilograms, and grams.", icon: "weight", keywords: ["weight converter"], isLive: true },

  // ---------------- US Tools ----------------
  { slug: "minimum-wage", title: "Minimum Wage Calculator", category: "us-tools", shortDescription: "Calculate earnings at minimum wage by state.", description: "Calculate weekly, monthly, and annual earnings based on US state minimum wage rates.", icon: "banknote", keywords: ["minimum wage calculator"], isLive: true },
  { slug: "state-sales-tax", title: "State Sales Tax Calculator", category: "us-tools", shortDescription: "Calculate sales tax using each state's actual rate.", description: "Calculate sales tax and total price using the combined state and average local sales tax rate for any of 10 major US states.", icon: "receipt", keywords: ["state sales tax calculator", "sales tax by state"], isLive: true },
  { slug: "state-paycheck", title: "State Paycheck Calculator", category: "us-tools", shortDescription: "Estimate take-home pay including state income tax.", description: "Estimate net paycheck after federal tax, FICA, and state income tax for 10 major US states.", icon: "file-text", keywords: ["state paycheck calculator", "take home pay by state"], isLive: true },
  { slug: "state-mortgage", title: "State Mortgage Calculator", category: "us-tools", shortDescription: "Estimate a mortgage payment using state property tax rates.", description: "Estimate a full monthly mortgage payment using each state's average property tax rate and home insurance cost.", icon: "home", keywords: ["state mortgage calculator", "property tax by state"], isLive: true },
  { slug: "cost-of-living", title: "Cost of Living Calculator", category: "us-tools", shortDescription: "See what salary you'd need in a different state.", description: "Compare the cost of living between US states and find the equivalent salary needed to maintain your standard of living.", icon: "map-pin", keywords: ["cost of living calculator", "cost of living by state"], isLive: true },
];

export function getCalculator(slug: string): CalculatorMeta | undefined {
  return calculatorRegistry.find((c) => c.slug === slug);
}

export function getCalculatorsByCategory(category: string): CalculatorMeta[] {
  return calculatorRegistry.filter((c) => c.category === category);
}

export function getLiveCalculators(): CalculatorMeta[] {
  return calculatorRegistry.filter((c) => c.isLive);
}

export function getRelatedCalculators(current: CalculatorMeta, limit = 5): CalculatorMeta[] {
  return calculatorRegistry
    .filter((c) => c.category === current.category && c.slug !== current.slug)
    .slice(0, limit);
}

/**
 * Cross-links between Money calculators and their US-Tools counterpart
 * (and back), for calculators where the two are genuinely complementary —
 * e.g. the Paycheck Calculator and the State Paycheck Calculator. Keeps
 * "relevant US tools" internal linking accurate instead of guessing from
 * category alone.
 */
const CROSS_CATEGORY_LINKS: Record<string, string[]> = {
  paycheck: ["state-paycheck", "minimum-wage"],
  salary: ["minimum-wage", "cost-of-living"],
  mortgage: ["state-mortgage"],
  loan: ["state-mortgage"],
  rent: ["cost-of-living"],
  "sales-tax": ["state-sales-tax"],
  "split-bill": ["state-sales-tax"],
  overtime: ["minimum-wage"],
  "state-paycheck": ["paycheck", "salary"],
  "state-sales-tax": ["sales-tax", "split-bill"],
  "state-mortgage": ["mortgage", "loan", "rent"],
  "minimum-wage": ["salary", "paycheck"],
  "cost-of-living": ["salary", "rent"],
};

export function getCrossCategoryCalculators(slug: string): CalculatorMeta[] {
  const relatedSlugs = CROSS_CATEGORY_LINKS[slug] ?? [];
  return relatedSlugs
    .map((s) => getCalculator(s))
    .filter((c): c is CalculatorMeta => Boolean(c && c.isLive));
}
