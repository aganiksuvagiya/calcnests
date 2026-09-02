import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  prefix?: string;
  suffix?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, prefix, suffix, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {prefix && (
          <span className="pointer-events-none absolute left-3 text-sm text-muted">{prefix}</span>
        )}
        <input
          ref={ref}
          aria-invalid={invalid || undefined}
          className={cn(
            "focus-ring w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-base text-foreground placeholder:text-muted transition-colors",
            "hover:border-foreground/20",
            invalid && "border-danger focus-visible:outline-danger",
            prefix && "pl-7",
            suffix && "pr-9",
            className
          )}
          {...props}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 text-sm text-muted">{suffix}</span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
