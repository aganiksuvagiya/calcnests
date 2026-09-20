import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          "focus-ring w-full resize-y rounded-lg border border-border bg-surface px-3.5 py-2.5 text-base text-foreground placeholder:text-muted transition-colors",
          "hover:border-foreground/20",
          invalid && "border-danger focus-visible:outline-danger",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
