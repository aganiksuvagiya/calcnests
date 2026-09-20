import { cn } from "@/lib/utils";
import type { SelectOption } from "@/types/calculator";

interface RadioGroupProps {
  /** Grouping key for the underlying radio inputs' `name` attribute — not shown to the user. */
  name: string;
  /** id of the element (e.g. a Field rendered with `asGroup`) that visibly labels this group. */
  labelledBy: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
}

export function RadioGroup({ name, labelledBy, options, value, onChange }: RadioGroupProps) {
  return (
    <div role="radiogroup" aria-labelledby={labelledBy} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const checked = option.value === value;
        return (
          <label
            key={option.value}
            className={cn(
              "focus-within:outline-2 focus-within:outline-accent focus-within:outline-offset-2",
              "cursor-pointer rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors",
              checked
                ? "border-accent bg-accent-soft text-accent"
                : "border-border bg-surface text-foreground/80 hover:border-foreground/20"
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={checked}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        );
      })}
    </div>
  );
}
