"use client";

import { useId, useMemo, useState } from "react";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { ResultPanel } from "@/components/calculator/ResultPanel";
import { formatNumber } from "@/lib/utils";
import { percentOfValue, whatPercent, percentageChange } from "@/lib/calculators/percentage";

type Mode = "percent-of" | "what-percent" | "change";

const modes: { id: Mode; label: string }[] = [
  { id: "percent-of", label: "X% of Y" },
  { id: "what-percent", label: "X is what % of Y" },
  { id: "change", label: "% increase/decrease" },
];

function parse(value: string): number | null {
  if (value.trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export function PercentageForm() {
  const [mode, setMode] = useState<Mode>("percent-of");
  const tabsId = useId();

  // percent-of
  const [percent, setPercent] = useState("20");
  const [value, setValue] = useState("150");

  // what-percent
  const [part, setPart] = useState("45");
  const [whole, setWhole] = useState("60");

  // change
  const [from, setFrom] = useState("80");
  const [to, setTo] = useState("100");

  const percentOfResult = useMemo(() => {
    const p = parse(percent);
    const v = parse(value);
    if (p === null || v === null) return null;
    return percentOfValue(p, v);
  }, [percent, value]);

  const whatPercentResult = useMemo(() => {
    const p = parse(part);
    const w = parse(whole);
    if (p === null || w === null || w === 0) return null;
    return whatPercent(p, w);
  }, [part, whole]);

  const changeResult = useMemo(() => {
    const f = parse(from);
    const t = parse(to);
    if (f === null || t === null || f === 0) return null;
    return percentageChange(f, t);
  }, [from, to]);

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <div role="tablist" aria-label="Percentage calculation type" className="flex flex-wrap gap-2">
        {modes.map((m) => (
          <button
            key={m.id}
            id={`${tabsId}-tab-${m.id}`}
            role="tab"
            type="button"
            aria-selected={mode === m.id}
            aria-controls={`${tabsId}-panel-${m.id}`}
            onClick={() => setMode(m.id)}
            className={`focus-ring rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
              mode === m.id
                ? "bg-accent text-white"
                : "bg-surface-muted text-foreground/80 hover:text-foreground"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {mode === "percent-of" && (
        <div
          id={`${tabsId}-panel-percent-of`}
          role="tabpanel"
          aria-labelledby={`${tabsId}-tab-percent-of`}
          className="mt-6 flex flex-col gap-5"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Percentage" htmlFor="percent-of-percent">
              <Input
                id="percent-of-percent"
                inputMode="decimal"
                suffix="%"
                value={percent}
                onChange={(e) => setPercent(e.target.value)}
              />
            </Field>
            <Field label="Of value" htmlFor="percent-of-value">
              <Input
                id="percent-of-value"
                inputMode="decimal"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </Field>
          </div>
          <ResultPanel
            label={`${percent || 0}% of ${value || 0} is`}
            value={percentOfResult ? formatNumber(percentOfResult.result) : "—"}
          />
        </div>
      )}

      {mode === "what-percent" && (
        <div
          id={`${tabsId}-panel-what-percent`}
          role="tabpanel"
          aria-labelledby={`${tabsId}-tab-what-percent`}
          className="mt-6 flex flex-col gap-5"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Part" htmlFor="what-percent-part">
              <Input
                id="what-percent-part"
                inputMode="decimal"
                value={part}
                onChange={(e) => setPart(e.target.value)}
              />
            </Field>
            <Field
              label="Whole"
              htmlFor="what-percent-whole"
              error={parse(whole) === 0 ? "Whole value can't be zero." : undefined}
            >
              <Input
                id="what-percent-whole"
                inputMode="decimal"
                invalid={parse(whole) === 0}
                value={whole}
                onChange={(e) => setWhole(e.target.value)}
              />
            </Field>
          </div>
          <ResultPanel
            label={`${part || 0} is what percent of ${whole || 0}`}
            value={whatPercentResult ? `${formatNumber(whatPercentResult.result)}%` : "—"}
          />
        </div>
      )}

      {mode === "change" && (
        <div
          id={`${tabsId}-panel-change`}
          role="tabpanel"
          aria-labelledby={`${tabsId}-tab-change`}
          className="mt-6 flex flex-col gap-5"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              label="From"
              htmlFor="change-from"
              error={parse(from) === 0 ? "Starting value can't be zero." : undefined}
            >
              <Input
                id="change-from"
                inputMode="decimal"
                invalid={parse(from) === 0}
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </Field>
            <Field label="To" htmlFor="change-to">
              <Input
                id="change-to"
                inputMode="decimal"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </Field>
          </div>
          <ResultPanel
            label={
              changeResult
                ? `Percentage ${changeResult.direction === "decrease" ? "decrease" : "increase"}`
                : "Percentage change"
            }
            value={changeResult ? `${changeResult.result > 0 ? "+" : ""}${formatNumber(changeResult.result)}%` : "—"}
          />
        </div>
      )}
    </div>
  );
}
