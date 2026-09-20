import Link from "next/link";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Disclaimer",
  description:
    "CalcNests calculators produce estimates, not professional financial, tax, legal, or medical advice.",
  path: "/disclaimer",
});

const LAST_UPDATED = "September 2026";

export default function DisclaimerPage() {
  return (
    <LegalPageLayout title="Disclaimer" lastUpdated={LAST_UPDATED}>
      <LegalSection title="Estimates, not guarantees">
        <p>
          Every calculator on CalcNests uses a correct, standard formula for the calculation it
          performs. That doesn&apos;t mean the result is a guarantee — it&apos;s an estimate based on the
          numbers you enter and the assumptions the calculator states on its own page. Change an
          assumption (a tax rate, a compounding frequency, a rounding convention) and the real-world
          answer can change too.
        </p>
      </LegalSection>

      <LegalSection title="Not professional advice">
        <p>
          Nothing on CalcNests is financial, tax, legal, medical, or other professional advice.
          Calculators like the Paycheck, Mortgage, Loan, and State Tax tools are built for
          planning and comparison, not for filing taxes, signing a loan, or making a final
          financial decision. Before acting on a result that matters — especially anything
          involving taxes, a loan, a mortgage, or your health — verify it with a qualified
          professional (an accountant, financial advisor, attorney, or doctor, as appropriate) or
          an official source, such as the{" "}
          <span className="text-foreground">IRS</span> for federal tax questions or your state&apos;s
          official revenue department for state-specific rates.
        </p>
      </LegalSection>

      <LegalSection title="Results depend on your inputs">
        <p>
          A calculator can only be as accurate as what you put into it. Typos, rounding, or an
          input that doesn&apos;t quite match your real situation (for example, a tax filing status or
          a loan&apos;s exact fee structure) will change the result.
        </p>
      </LegalSection>

      <LegalSection title="US state and tax figures">
        <p>
          Calculators that use US state-specific data — like sales tax rates, income tax rates,
          property tax rates, and minimum wage — use figures based on generally published data at
          the time each calculator was last checked, not a live government feed. These figures are
          reasonable planning estimates, not official government calculations, and state and local
          rates change over time. Each state-aware calculator&apos;s own page explains its assumptions
          and, where a rate is a simplified estimate rather than an exact figure (for example, a
          single representative rate standing in for a state&apos;s progressive income tax brackets),
          says so directly.
        </p>
      </LegalSection>

      <LegalSection title="No liability for decisions made from results">
        <p>
          CalcNests and its operators aren&apos;t liable for decisions made or actions taken based on a
          calculator&apos;s results. Use these tools to inform your thinking, not as the final word on
          an important decision.
        </p>
      </LegalSection>

      <LegalSection title="Questions">
        <p>
          If you notice a calculator that seems to produce an incorrect result, please{" "}
          <Link href="/contact" className="font-medium text-accent hover:text-accent-hover">
            let us know
          </Link>{" "}
          — we want the math itself to always be correct, even though results remain estimates.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
