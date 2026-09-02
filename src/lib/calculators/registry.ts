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
    faqs: [
      {
        question: "How do I calculate a percentage of a number?",
        answer:
          "Multiply the number by the percentage, then divide by 100. For example, 20% of 150 is (20 × 150) / 100 = 30.",
      },
      {
        question: "How do I find what percentage one number is of another?",
        answer:
          "Divide the part by the whole and multiply by 100. For example, 45 out of 60 is (45 / 60) × 100 = 75%.",
      },
      {
        question: "How is percentage increase or decrease calculated?",
        answer:
          "Subtract the original value from the new value, divide by the original value, then multiply by 100. A positive result is an increase; a negative result is a decrease.",
      },
    ],
  },
  { slug: "tip", title: "Tip Calculator", category: "money", shortDescription: "Calculate tips and split the bill fairly.", description: "Work out how much to tip based on your bill total and desired tip percentage, and split it evenly among a group.", icon: "hand-coins", keywords: ["tip calculator", "gratuity"], isLive: false, faqs: [] },
  { slug: "discount", title: "Discount Calculator", category: "money", shortDescription: "Find sale prices and total savings.", description: "Calculate the final price after a percentage-off discount and see exactly how much you save.", icon: "tag", keywords: ["discount calculator", "sale price"], isLive: false, faqs: [] },
  { slug: "mortgage", title: "Mortgage Calculator", category: "money", shortDescription: "Estimate your monthly mortgage payment.", description: "Estimate monthly principal and interest payments on a home loan based on loan amount, rate, and term.", icon: "house", keywords: ["mortgage calculator", "home loan"], isLive: false, faqs: [] },
  { slug: "rent", title: "Rent Calculator", category: "money", shortDescription: "Figure out how much rent you can afford.", description: "Estimate an affordable monthly rent based on your income and expenses.", icon: "key", keywords: ["rent calculator", "affordability"], isLive: false, faqs: [] },
  { slug: "loan", title: "Loan Calculator", category: "money", shortDescription: "Estimate monthly loan payments.", description: "Calculate monthly payments, total interest, and payoff timelines for personal or auto loans.", icon: "landmark", keywords: ["loan calculator", "amortization"], isLive: false, faqs: [] },
  { slug: "interest", title: "Interest Calculator", category: "money", shortDescription: "Calculate simple and compound interest.", description: "Work out how much interest accrues on savings or debt over time, with simple or compound interest.", icon: "trending-up", keywords: ["interest calculator", "compound interest"], isLive: false, faqs: [] },
  { slug: "salary", title: "Salary Calculator", category: "money", shortDescription: "Convert salary between hourly, weekly, and annual.", description: "Convert between hourly, weekly, monthly, and annual pay based on hours worked.", icon: "wallet", keywords: ["salary calculator", "annual salary"], isLive: false, faqs: [] },
  { slug: "overtime", title: "Overtime Calculator", category: "money", shortDescription: "Calculate overtime pay and total earnings.", description: "Estimate overtime pay using standard time-and-a-half rules based on regular hourly rate and hours worked.", icon: "clock", keywords: ["overtime calculator", "overtime pay"], isLive: false, faqs: [] },
  { slug: "split-bill", title: "Split Bill Calculator", category: "money", shortDescription: "Split a bill evenly or by share.", description: "Divide a restaurant or group bill evenly among any number of people, including tax and tip.", icon: "users", keywords: ["split bill calculator", "bill splitter"], isLive: false, faqs: [] },
  { slug: "sales-tax", title: "Sales Tax Calculator", category: "money", shortDescription: "Calculate sales tax and total price.", description: "Calculate the sales tax owed on a purchase and the final price including tax for any US state rate.", icon: "receipt", keywords: ["sales tax calculator", "tax rate"], isLive: false, faqs: [] },
  { slug: "paycheck", title: "Paycheck Calculator", category: "money", shortDescription: "Estimate take-home pay after taxes.", description: "Estimate your net paycheck after federal tax withholding, FICA, and common deductions.", icon: "file-text", keywords: ["paycheck calculator", "take home pay"], isLive: false, faqs: [] },

  // ---------------- Math ----------------
  { slug: "average", title: "Average Calculator", category: "math", shortDescription: "Calculate the mean of a set of numbers.", description: "Find the average (mean), sum, and count for any list of numbers.", icon: "sigma", keywords: ["average calculator", "mean"], isLive: false, faqs: [] },
  { slug: "ratio", title: "Ratio Calculator", category: "math", shortDescription: "Simplify and scale ratios.", description: "Simplify ratios to their lowest terms or scale them to a target value.", icon: "divide", keywords: ["ratio calculator"], isLive: false, faqs: [] },
  { slug: "fraction", title: "Fraction Calculator", category: "math", shortDescription: "Add, subtract, multiply, and divide fractions.", description: "Perform arithmetic on fractions and simplify the results automatically.", icon: "pi", keywords: ["fraction calculator"], isLive: false, faqs: [] },

  // ---------------- Date & Time ----------------
  { slug: "age", title: "Age Calculator", category: "date-time", shortDescription: "Calculate exact age from a birth date.", description: "Find your exact age in years, months, and days from a date of birth.", icon: "cake",  keywords: ["age calculator"], isLive: false, faqs: [] },
  { slug: "date", title: "Date Calculator", category: "date-time", shortDescription: "Add or subtract days from a date.", description: "Add or subtract days, weeks, months, or years from any date.", icon: "calendar-plus", keywords: ["date calculator"], isLive: false, faqs: [] },
  { slug: "time", title: "Time Calculator", category: "date-time", shortDescription: "Add or subtract hours and minutes.", description: "Add or subtract hours, minutes, and seconds between times.", icon: "clock-3", keywords: ["time calculator"], isLive: false, faqs: [] },
  { slug: "days-between-dates", title: "Days Between Dates", category: "date-time", shortDescription: "Count the days between two dates.", description: "Calculate the exact number of days, weeks, and months between two dates.", icon: "calendar-range", keywords: ["days between dates calculator"], isLive: false, faqs: [] },
  { slug: "countdown", title: "Countdown Calculator", category: "date-time", shortDescription: "Count down to any future date.", description: "See exactly how much time is left until a future date and time.", icon: "hourglass", keywords: ["countdown calculator"], isLive: false, faqs: [] },

  // ---------------- Education ----------------
  { slug: "gpa", title: "GPA Calculator", category: "education", shortDescription: "Calculate your grade point average.", description: "Calculate your GPA from course grades and credit hours using the standard 4.0 scale.", icon: "graduation-cap", keywords: ["gpa calculator"], isLive: false, faqs: [] },
  { slug: "grade", title: "Grade Calculator", category: "education", shortDescription: "Calculate a weighted course grade.", description: "Calculate your overall grade from individual weighted assignment and test scores.", icon: "award", keywords: ["grade calculator"], isLive: false, faqs: [] },
  { slug: "final-grade", title: "Final Grade Calculator", category: "education", shortDescription: "Find the score you need on your final exam.", description: "Calculate the minimum score you need on a final exam to reach your target course grade.", icon: "book-open", keywords: ["final grade calculator"], isLive: false, faqs: [] },

  // ---------------- Home ----------------
  { slug: "paint", title: "Paint Calculator", category: "home", shortDescription: "Estimate how much paint you need.", description: "Estimate the amount of paint required for a room based on wall area and coverage.", icon: "paintbrush", keywords: ["paint calculator"], isLive: false, faqs: [] },
  { slug: "flooring", title: "Flooring Calculator", category: "home", shortDescription: "Estimate flooring material needed.", description: "Estimate the amount of flooring material needed based on room dimensions.", icon: "layout-grid", keywords: ["flooring calculator"], isLive: false, faqs: [] },
  { slug: "square-footage", title: "Square Footage Calculator", category: "home", shortDescription: "Calculate area in square feet.", description: "Calculate the square footage of a room or space from its dimensions.", icon: "ruler", keywords: ["square footage calculator"], isLive: false, faqs: [] },

  // ---------------- Everyday ----------------
  { slug: "bmi", title: "BMI Calculator", category: "everyday", shortDescription: "Calculate Body Mass Index.", description: "Calculate Body Mass Index (BMI) from height and weight using US units.", icon: "activity", keywords: ["bmi calculator"], isLive: false, faqs: [] },
  { slug: "fuel-cost", title: "Fuel Cost Calculator", category: "everyday", shortDescription: "Estimate trip fuel costs.", description: "Estimate the fuel cost of a trip based on distance, fuel efficiency, and gas price.", icon: "fuel", keywords: ["fuel cost calculator", "gas calculator"], isLive: false, faqs: [] },
  { slug: "unit-converter", title: "Unit Converter", category: "everyday", shortDescription: "Convert between common units.", description: "Convert between common units of length, weight, volume, and temperature.", icon: "arrow-left-right", keywords: ["unit converter"], isLive: false, faqs: [] },
  { slug: "temperature-converter", title: "Temperature Converter", category: "everyday", shortDescription: "Convert Fahrenheit, Celsius, and Kelvin.", description: "Convert temperatures between Fahrenheit, Celsius, and Kelvin.", icon: "thermometer", keywords: ["temperature converter"], isLive: false, faqs: [] },
  { slug: "length-converter", title: "Length Converter", category: "everyday", shortDescription: "Convert feet, meters, inches, and more.", description: "Convert lengths between feet, inches, meters, centimeters, and miles.", icon: "ruler",  keywords: ["length converter"], isLive: false, faqs: [] },
  { slug: "weight-converter", title: "Weight Converter", category: "everyday", shortDescription: "Convert pounds, kilograms, and ounces.", description: "Convert weights between pounds, ounces, kilograms, and grams.", icon: "weight", keywords: ["weight converter"], isLive: false, faqs: [] },

  // ---------------- US Tools ----------------
  { slug: "us-federal-tax", title: "US Federal Tax Estimator", category: "us-tools", shortDescription: "Estimate federal income tax owed.", description: "Estimate federal income tax owed based on filing status and taxable income using current IRS brackets.", icon: "landmark", keywords: ["us federal tax calculator"], isLive: false, faqs: [] },
  { slug: "minimum-wage", title: "Minimum Wage Calculator", category: "us-tools", shortDescription: "Calculate earnings at minimum wage by state.", description: "Calculate weekly, monthly, and annual earnings based on US state minimum wage rates.", icon: "banknote", keywords: ["minimum wage calculator"], isLive: false, faqs: [] },
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

export function getRelatedCalculators(current: CalculatorMeta, limit = 4): CalculatorMeta[] {
  return calculatorRegistry
    .filter((c) => c.category === current.category && c.slug !== current.slug)
    .slice(0, limit);
}
