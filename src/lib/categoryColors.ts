import type { CategorySlug } from "@/types/calculator";

interface CategoryColor {
  soft: string;
  text: string;
  hoverBg: string;
  glow: string;
}

/**
 * Per-category icon-badge colors, purely decorative — brand actions (links,
 * buttons, focus rings) stay accent purple everywhere. Tailwind classes are
 * spelled out in full (not templated) so the JIT compiler can find them.
 */
export const CATEGORY_COLORS: Record<CategorySlug, CategoryColor> = {
  money: {
    soft: "bg-emerald-50",
    text: "text-emerald-600",
    hoverBg: "group-hover:bg-emerald-600",
    glow: "hover:shadow-emerald-200/60",
  },
  math: {
    soft: "bg-sky-50",
    text: "text-sky-600",
    hoverBg: "group-hover:bg-sky-600",
    glow: "hover:shadow-sky-200/60",
  },
  "date-time": {
    soft: "bg-amber-50",
    text: "text-amber-600",
    hoverBg: "group-hover:bg-amber-600",
    glow: "hover:shadow-amber-200/60",
  },
  education: {
    soft: "bg-violet-50",
    text: "text-violet-600",
    hoverBg: "group-hover:bg-violet-600",
    glow: "hover:shadow-violet-200/60",
  },
  home: {
    soft: "bg-orange-50",
    text: "text-orange-600",
    hoverBg: "group-hover:bg-orange-600",
    glow: "hover:shadow-orange-200/60",
  },
  everyday: {
    soft: "bg-pink-50",
    text: "text-pink-600",
    hoverBg: "group-hover:bg-pink-600",
    glow: "hover:shadow-pink-200/60",
  },
  "us-tools": {
    soft: "bg-indigo-50",
    text: "text-indigo-600",
    hoverBg: "group-hover:bg-indigo-600",
    glow: "hover:shadow-indigo-200/60",
  },
};
