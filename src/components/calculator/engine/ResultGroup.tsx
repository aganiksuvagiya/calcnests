"use client";

import { useState } from "react";
import { ResultPanel } from "@/components/calculator/ResultPanel";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";
import { formatResultValue } from "@/lib/utils";
import type { ResultFieldDef } from "@/types/calculator";

interface ResultGroupProps {
  resultLabel: string;
  resultFields: ResultFieldDef[];
  result: Record<string, number> | null;
  values?: Record<string, string>;
  copyable?: boolean;
}

export function ResultGroup({ resultLabel, resultFields, result, values, copyable }: ResultGroupProps) {
  const [copied, setCopied] = useState(false);
  const primary = resultFields.find((f) => f.primary) ?? resultFields[0];
  const supporting = resultFields.filter((f) => f !== primary);

  const primaryValue = result && primary ? formatResultValue(primary, result[primary.key], result, values) : "—";

  async function handleCopy() {
    if (!result || !primary) return;
    try {
      await navigator.clipboard.writeText(`${resultLabel}: ${primaryValue}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable — silently ignore, copy is a convenience only.
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <ResultPanel label={resultLabel} value={primaryValue} />

      {result && supporting.length > 0 && (
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {supporting.map((field) => (
            <div
              key={field.key}
              className="flex items-center justify-between rounded-lg border border-border bg-surface-muted px-4 py-3"
            >
              <dt className="text-sm text-muted">{field.label}</dt>
              <dd className="text-sm font-semibold text-foreground">
                {formatResultValue(field, result[field.key], result, values)}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {copyable && result && (
        <Button type="button" variant="secondary" size="sm" onClick={handleCopy} className="self-start">
          <Icon icon={copied ? "check" : "copy"} className="h-4 w-4" />
          {copied ? "Copied" : "Copy result"}
        </Button>
      )}
    </div>
  );
}
