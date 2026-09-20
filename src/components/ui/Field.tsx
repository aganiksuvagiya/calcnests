import { ReactNode } from "react";

interface FieldProps {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  /**
   * True when `children` is a group of controls (e.g. a radio group) rather
   * than a single labelable input. Renders the label text as a <span> with
   * an id instead of a <label htmlFor>, since there's no single control for
   * `for` to point to — pair it with `aria-labelledby` on the group.
   */
  asGroup?: boolean;
}

export function Field({ label, htmlFor, hint, error, children, asGroup }: FieldProps) {
  const labelClassName = "text-sm font-medium text-foreground";

  return (
    <div className="flex flex-col gap-1.5">
      {asGroup ? (
        <span id={htmlFor} className={labelClassName}>
          {label}
        </span>
      ) : (
        <label htmlFor={htmlFor} className={labelClassName}>
          {label}
        </label>
      )}
      {children}
      {hint && !error && (
        <p className="text-xs text-muted">{hint}</p>
      )}
      {error && (
        <p role="alert" className="text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
