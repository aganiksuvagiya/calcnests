import { cn } from "@/lib/utils";

interface AdSlotProps {
  variant?: "banner" | "sidebar" | "inline";
  className?: string;
}

/**
 * Placeholder ad slot. Swap the inner content for a real ad network
 * script/component when ready — layout and spacing are already reserved.
 */
export function AdSlot({ variant = "banner", className }: AdSlotProps) {
  const dims = {
    banner: "h-24 w-full",
    sidebar: "h-64 w-full",
    inline: "h-20 w-full",
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex items-center justify-center rounded-xl border border-dashed border-border bg-surface-muted text-xs text-muted",
        dims[variant],
        className
      )}
    >
      Advertisement
    </div>
  );
}
