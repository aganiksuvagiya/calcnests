function FormulaCard({ children }: { children: React.ReactNode }) {
  return (
    <pre className="mt-3 whitespace-pre-wrap rounded-lg bg-surface-muted px-4 py-3 font-mono text-sm text-foreground">
      {children}
    </pre>
  );
}

const examples = [
  {
    question: "What is 20% of 150?",
    formula: "20 ÷ 100 × 150 = 30",
    answer: "30",
  },
  {
    question: "45 is what percentage of 60?",
    formula: "45 ÷ 60 × 100 = 75%",
    answer: "75%",
  },
  {
    question: "What is the percentage increase from 80 to 100?",
    formula: "((100 − 80) ÷ 80) × 100 = 25%",
    answer: "25% increase",
  },
];

export function PercentageExtraContent() {
  return (
    <>
      <section className="flex flex-col gap-3 border-t border-border pt-10">
        <h2 className="text-xl font-semibold text-foreground">What is a percentage?</h2>
        <p className="text-sm leading-relaxed text-muted">
          A percentage represents a number as a fraction of 100. It's a way of expressing a
          proportion — how large one value is relative to a whole — using a common scale that&apos;s
          easy to compare. The percent sign (%) simply means &ldquo;out of 100.&rdquo;
        </p>
        <p className="text-sm leading-relaxed text-muted">
          For example, 20% means 20 out of 100, or 0.20 as a decimal. That same idea applies
          whether you&apos;re calculating a tip, a discount, a grade, or a change in price.
        </p>
      </section>

      <section className="flex flex-col gap-3 border-t border-border pt-10">
        <h2 className="text-xl font-semibold text-foreground">How to calculate a percentage</h2>
        <p className="text-sm leading-relaxed text-muted">
          To find what percentage one number is of another, divide the part by the whole and
          multiply by 100:
        </p>
        <FormulaCard>Percentage = (Part ÷ Whole) × 100</FormulaCard>
        <p className="text-sm leading-relaxed text-muted">
          Example: 45 ÷ 60 × 100 = 75%.
        </p>
      </section>

      <section className="flex flex-col gap-3 border-t border-border pt-10">
        <h2 className="text-xl font-semibold text-foreground">
          How to calculate percentage increase or decrease
        </h2>
        <p className="text-sm leading-relaxed text-muted">
          To find the percentage change between an original value and a new value, subtract the
          original from the new value, divide by the original value, then multiply by 100:
        </p>
        <FormulaCard>{"Percentage change = ((New value − Original value) ÷ Original value) × 100"}</FormulaCard>
        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="text-sm font-medium text-foreground">Increase example</p>
            <p className="mt-1 text-sm text-muted">Original value = 80, New value = 100</p>
            <p className="mt-2 font-mono text-sm text-foreground">((100 − 80) ÷ 80) × 100 = 25%</p>
            <p className="mt-2 text-sm text-muted">
              The value increased by <span className="font-semibold text-foreground">25%</span>.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="text-sm font-medium text-foreground">Decrease example</p>
            <p className="mt-1 text-sm text-muted">Original value = 100, New value = 80</p>
            <p className="mt-2 font-mono text-sm text-foreground">((80 − 100) ÷ 100) × 100 = -20%</p>
            <p className="mt-2 text-sm text-muted">
              The value decreased by <span className="font-semibold text-foreground">20%</span>.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3 border-t border-border pt-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {examples.map((ex) => (
            <div key={ex.question} className="rounded-lg border border-border bg-surface-muted p-4">
              <p className="text-sm font-medium text-foreground">{ex.question}</p>
              <p className="mt-2 font-mono text-xs text-muted">{ex.formula}</p>
              <p className="mt-2 text-lg font-bold text-accent">{ex.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
