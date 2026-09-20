"use client";

import { useId, useMemo, useState } from "react";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";
import { ResultGroup } from "@/components/calculator/engine/ResultGroup";
import type { CalculatorConfig, CalculatorVariant } from "@/types/calculator";

function defaultsFor(variant: CalculatorVariant): Record<string, string> {
  return Object.fromEntries(
    variant.inputs.map((input) => [input.name, input.getDefaultValue ? input.getDefaultValue() : input.defaultValue])
  );
}

export function GenericCalculatorFormInner({ config }: { config: CalculatorConfig }) {
  const tabsId = useId();
  const [variantId, setVariantId] = useState(config.variants[0].id);
  const variant = config.variants.find((v) => v.id === variantId) ?? config.variants[0];

  const [values, setValues] = useState<Record<string, string>>(() => defaultsFor(variant));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [committedValues, setCommittedValues] = useState<Record<string, string>>(values);

  function switchVariant(id: string) {
    const next = config.variants.find((v) => v.id === id);
    if (!next) return;
    const defaults = defaultsFor(next);
    setVariantId(id);
    setValues(defaults);
    setCommittedValues(defaults);
    setErrors({});
  }

  function handleChange(name: string, value: string) {
    const next = { ...values, [name]: value };
    setValues(next);

    const field = variant.inputs.find((f) => f.name === name);
    const fieldError = field?.validate ? field.validate(value, next) : null;
    setErrors((prev) => ({ ...prev, [name]: fieldError ?? "" }));

    if (config.mode === "instant") {
      setCommittedValues(next);
    }
  }

  function handleReset() {
    const defaults = defaultsFor(variant);
    setValues(defaults);
    setCommittedValues(defaults);
    setErrors({});
  }

  function handleCalculate() {
    setCommittedValues(values);
  }

  const hasFieldErrors = Object.values(errors).some(Boolean);

  const { result, formError } = useMemo(() => {
    if (hasFieldErrors) return { result: null, formError: null };
    try {
      return { result: variant.compute(committedValues), formError: null };
    } catch (err) {
      return {
        result: null,
        formError: err instanceof Error ? err.message : "Couldn't calculate a result from these values.",
      };
    }
  }, [variant, committedValues, hasFieldErrors]);

  const resultLabel = variant.resultLabel?.(committedValues, result ?? {}) ?? config.title;

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      {config.variants.length > 1 && (
        <div role="tablist" aria-label={`${config.title} mode`} className="mb-6 flex flex-wrap gap-2">
          {config.variants.map((v) => (
            <button
              key={v.id}
              id={`${tabsId}-tab-${v.id}`}
              role="tab"
              type="button"
              aria-selected={variant.id === v.id}
              aria-controls={`${tabsId}-panel-${v.id}`}
              onClick={() => switchVariant(v.id)}
              className={`focus-ring rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                variant.id === v.id
                  ? "bg-accent text-white"
                  : "bg-surface-muted text-foreground/80 hover:text-foreground"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      )}

      <div
        id={`${tabsId}-panel-${variant.id}`}
        role={config.variants.length > 1 ? "tabpanel" : undefined}
        aria-labelledby={config.variants.length > 1 ? `${tabsId}-tab-${variant.id}` : undefined}
        className="flex flex-col gap-5"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {variant.inputs.map((input) => {
            const fieldId = `${tabsId}-${variant.id}-${input.name}`;
            const error = errors[input.name] || undefined;

            return (
              <Field
                key={input.name}
                label={input.label}
                htmlFor={fieldId}
                error={error}
                asGroup={input.type === "radio"}
              >
                {input.type === "select" ? (
                  <Select
                    id={fieldId}
                    options={input.options ?? []}
                    value={values[input.name]}
                    invalid={Boolean(error)}
                    onChange={(e) => handleChange(input.name, e.target.value)}
                  />
                ) : input.type === "radio" ? (
                  <RadioGroup
                    name={fieldId}
                    labelledBy={fieldId}
                    options={input.options ?? []}
                    value={values[input.name]}
                    onChange={(value) => handleChange(input.name, value)}
                  />
                ) : input.type === "date" ? (
                  <Input
                    id={fieldId}
                    type="date"
                    invalid={Boolean(error)}
                    value={values[input.name]}
                    onChange={(e) => handleChange(input.name, e.target.value)}
                  />
                ) : (
                  <Input
                    id={fieldId}
                    type="text"
                    inputMode={input.type === "number" ? "decimal" : "text"}
                    placeholder={input.placeholder}
                    prefix={input.unitPosition !== "suffix" ? input.unit : undefined}
                    suffix={input.unitPosition === "suffix" ? input.unit : undefined}
                    invalid={Boolean(error)}
                    value={values[input.name]}
                    onChange={(e) => handleChange(input.name, e.target.value)}
                  />
                )}
                {input.helpText && !error && (
                  <p className="text-xs text-muted">{input.helpText}</p>
                )}
              </Field>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2">
          {config.mode === "button" && (
            <Button type="button" onClick={handleCalculate} disabled={hasFieldErrors}>
              Calculate
            </Button>
          )}
          <Button type="button" variant="secondary" onClick={handleReset}>
            <Icon icon="refresh-ccw" className="h-4 w-4" />
            Reset
          </Button>
        </div>

        {formError && (
          <p role="alert" className="rounded-lg bg-danger/10 px-4 py-2.5 text-sm font-medium text-danger">
            {formError}
          </p>
        )}

        <ResultGroup
          resultLabel={resultLabel}
          resultFields={variant.resultFields}
          result={result}
          values={committedValues}
          copyable={config.copyable}
        />
      </div>
    </div>
  );
}
