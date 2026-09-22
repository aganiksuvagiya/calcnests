export type CategorySlug =
  | "money"
  | "math"
  | "date-time"
  | "education"
  | "home"
  | "everyday"
  | "us-tools";

export interface Category {
  slug: CategorySlug;
  title: string;
  /** Short one-liner used in cards, nav, and meta descriptions. */
  description: string;
  icon: string;
  /** Longer intro paragraph(s) for the category landing page. Paragraphs separated by "\n\n". */
  intro: string;
  /** Only included when there are genuinely distinct questions for this category. */
  faqs: FaqItem[];
  /** Other categories worth cross-linking from this one. */
  relatedCategories: CategorySlug[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface CalculatorMeta {
  slug: string;
  title: string;
  shortTitle?: string;
  category: CategorySlug;
  shortDescription: string;
  description: string;
  icon: string;
  keywords: string[];
  /** Set to false while a calculator is registered but not yet built. */
  isLive: boolean;
}

// ---------------------------------------------------------------------------
// Config-driven calculator engine
//
// A CalculatorConfig fully describes one calculator: its inputs, the math
// that turns those inputs into a result, and the SEO/explanatory content
// around it. GenericCalculatorForm renders any config without calculator-
// specific UI code, so adding a new calculator is just: write a pure math
// function + a config object + register the slug.
// ---------------------------------------------------------------------------

export type CalculatorFieldType = "number" | "text" | "select" | "radio" | "date";

export interface SelectOption {
  value: string;
  label: string;
}

export interface CalculatorInputField {
  /** Key this field's value is stored under in the form values map. */
  name: string;
  label: string;
  type: CalculatorFieldType;
  defaultValue: string;
  /**
   * For fields whose sensible default changes over time (e.g. a date field
   * that should default to "30 days from today"). If present, this is
   * called fresh on every mount/reset instead of using the static
   * `defaultValue` — necessary because calculator pages are statically
   * generated, so a plain string default would freeze at build time.
   */
  getDefaultValue?: () => string;
  placeholder?: string;
  /** Symbol shown attached to the input, e.g. "$" or "%". Ignored for select/radio. */
  unit?: string;
  unitPosition?: "prefix" | "suffix";
  /** Options for "select" and "radio" fields. */
  options?: SelectOption[];
  helpText?: string;
  /** Field-level validation, run on every change. Return an error message or null. */
  validate?: (value: string, allValues: Record<string, string>) => string | null;
}

export type ResultFormat = "currency" | "percent" | "number" | "text" | "date" | "time" | "fraction" | "ratio";

export interface ResultFieldDef {
  /** Key read from the object returned by compute(). */
  key: string;
  label: string;
  format?: ResultFormat;
  fractionDigits?: number;
  /** Shown large in the primary result panel instead of the supporting list. */
  primary?: boolean;
  /** Prefix positive values with "+" (e.g. percentage change). */
  signed?: boolean;
  /** For format "text": maps a numeric code from compute() to a display label, e.g. [0]="Underweight". */
  labels?: string[];
  /** For format "fraction" or "ratio": key of the second number in the same compute() result. */
  denominatorKey?: string;
  /** Unit label appended after the formatted value, e.g. "days" → "28 days". */
  suffix?: string;
  /** Like `suffix`, but read from the submitted form value of this input name — for units chosen via a select, e.g. "toUnit". */
  suffixFromValue?: string;
}

export interface CalculatorVariant {
  /** Unique within the calculator; used as the tab id when there are multiple variants. */
  id: string;
  /** Tab label. Only shown when a calculator has more than one variant. */
  label: string;
  inputs: CalculatorInputField[];
  /**
   * Pure function: form values in, result fields out. Throw an Error with a
   * human-readable message for validation failures not caught by a field's
   * own `validate`.
   */
  compute: (values: Record<string, string>) => Record<string, number>;
  resultFields: ResultFieldDef[];
  /** Optional dynamic label for the primary result, e.g. "20% of 150 is". */
  resultLabel?: (values: Record<string, string>, result: Record<string, number>) => string;
  /**
   * Optional plain-text worked calculation shown under the primary result,
   * e.g. "20 ÷ 100 × 150 = 30" — makes the result feel transparent rather
   * than a black box. Omit for calculators where this wouldn't add clarity.
   */
  resultFormula?: (values: Record<string, string>, result: Record<string, number>) => string;
}

export type StateTableCellFormat = "percent" | "currency" | "number" | "text";

export interface StateTableColumn {
  key: string;
  label: string;
  format?: StateTableCellFormat;
}

export interface StateTableRow {
  state: string;
  values: Record<string, string | number>;
}

export interface StateReferenceTable {
  title: string;
  lastUpdated: string;
  columns: StateTableColumn[];
  rows: StateTableRow[];
  note?: string;
}

export interface CalculatorConfig {
  slug: string;
  title: string;
  category: CategorySlug;
  icon: string;
  keywords: string[];
  shortDescription: string;
  /** Overrides the <title> tag when it should differ from `title` (e.g. a longer SEO-optimized title). Falls back to `title`. */
  metaTitle?: string;
  /** Overrides the meta description when it should differ from `shortDescription`. Falls back to `shortDescription`. */
  metaDescription?: string;
  /** "How it works" prose shown below the calculator. Paragraphs separated by "\n\n". */
  explanation: string;
  /** Plain-text formula shown in its own section, e.g. "Tip = Bill × (Tip % ÷ 100)". */
  formula: string;
  /** A short worked example, in prose. */
  example: string;
  faqs: FaqItem[];
  /** "instant" recalculates on every change; "button" waits for Calculate. */
  mode: "instant" | "button";
  /** Whether to show a "Copy result" button next to the primary result. */
  copyable?: boolean;
  /** One entry for a simple calculator; multiple for a tabbed, multi-mode one. */
  variants: CalculatorVariant[];
  /**
   * Optional state-by-state comparison table (plain data only — no
   * functions — so it's safe on both sides of the Server/Client boundary).
   * This is what makes a calculator "state-aware" without needing a
   * separate page per state.
   */
  stateTable?: StateReferenceTable;
}
