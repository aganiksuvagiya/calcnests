import { cn } from "@/lib/utils";
import { ADS_ENABLED } from "@/lib/ads";

export type AdSlotVariant = "header" | "inline" | "in-content" | "sidebar" | "bottom";

interface AdSlotProps {
  variant: AdSlotVariant;
  className?: string;
}

/**
 * Reserved, labeled ad placeholder — no ad network script is wired in yet.
 * Swap the inner content for a real ad tag when ready; everything else
 * (sizing, labeling, placement rules) is already handled so that doesn't
 * shift layout or change the page's UX.
 *
 * Design rules this component enforces:
 * - Fixed height per placement, reserved up front, so a real ad loading
 *   in later never causes layout shift (CLS).
 * - Always visibly labeled "Advertisement" — never disguised as content.
 * - Never styled like a button or CTA: dashed border, muted background,
 *   no shadow, no accent fill, no hover affordance.
 * - `role="complementary"` + `aria-label`, not `aria-hidden` — this is
 *   real (eventual) content, and screen reader users should be able to
 *   identify and skip it like any other ad region.
 * - Gated by `ADS_ENABLED`: flipping that one flag removes every slot,
 *   including its reserved space, sitewide.
 */
export function AdSlot({ variant, className }: AdSlotProps) {
  if (!ADS_ENABLED) return null;

  const dims: Record<AdSlotVariant, string> = {
    header: "h-[50px] sm:h-[90px] w-full",
    inline: "h-24 w-full",
    "in-content": "h-28 w-full",
    sidebar: "h-[250px] w-full",
    bottom: "h-[50px] sm:h-[90px] w-full",
  };

  return (
    <div
      role="complementary"
      aria-label="Advertisement"
      className={cn(
        "flex items-center justify-center rounded-lg border border-dashed border-border bg-surface-muted text-xs font-medium uppercase tracking-wide text-muted",
        dims[variant],
        className
      )}
    >
      Advertisement
    </div>
  );
}
