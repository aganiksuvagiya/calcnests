interface CalculatorExplanationProps {
  explanation: string;
  formula: string;
  example: string;
}

export function CalculatorExplanation({ explanation, formula, example }: CalculatorExplanationProps) {
  const paragraphs = explanation.split("\n\n");
  const formulaLines = formula.split("\n");

  return (
    <section className="flex flex-col gap-8 border-t border-border pt-10">
      <div>
        <h2 className="text-xl font-semibold text-foreground">How it works</h2>
        <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-muted">
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-foreground">Formula</h2>
        <pre className="mt-3 whitespace-pre-wrap rounded-lg bg-surface-muted px-4 py-3 font-mono text-sm text-foreground">
          {formulaLines.join("\n")}
        </pre>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-foreground">Example</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">{example}</p>
      </div>
    </section>
  );
}
