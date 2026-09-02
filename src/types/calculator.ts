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
  description: string;
  icon: string;
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
  faqs: FaqItem[];
  /** Set to false while a calculator is registered but not yet built. */
  isLive: boolean;
}
