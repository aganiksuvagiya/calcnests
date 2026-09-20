import Link from "next/link";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About CalcNests",
  description:
    "CalcNests is a free calculator and everyday-tools website built for speed and simplicity — no sign-up, no clutter, just accurate math.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <LegalPageLayout
      title="About CalcNests"
      intro="All your calculations, in one place. CalcNests is a collection of free, fast calculators for money, math, home, education, and everyday US-specific decisions."
    >
      <LegalSection title="What CalcNests is">
        <p>
          CalcNests is a calculator and everyday-tools website. Each calculator is a small,
          focused tool built around a single task — working out a tip, comparing a loan, checking
          a GPA, or estimating a paycheck — rather than one large, complicated form that tries to
          do everything at once.
        </p>
      </LegalSection>

      <LegalSection title="Why it exists">
        <p>
          A lot of everyday math is simple in theory but easy to get slightly wrong by hand, or
          slow to look up. CalcNests exists to make that math instant: type in your numbers, get
          an answer immediately, with no account, no download, and no unnecessary steps in
          between.
        </p>
      </LegalSection>

      <LegalSection title="What you'll find here">
        <p>
          Calculators are organized into a few broad categories: <Link href="/calculators/money" className="font-medium text-accent hover:text-accent-hover">Money</Link> (tips,
          loans, mortgages, paychecks, and similar financial math),{" "}
          <Link href="/calculators/us-tools" className="font-medium text-accent hover:text-accent-hover">US Tools</Link>{" "}
          (calculators that change by US state, like sales tax and minimum wage), and a set of
          general Math, Date & Time, Education, Home, and Everyday calculators. The full,
          up-to-date list is always on the{" "}
          <Link href="/calculators" className="font-medium text-accent hover:text-accent-hover">All Calculators</Link>{" "}
          page.
        </p>
      </LegalSection>

      <LegalSection title="How the calculators are built">
        <p>
          Every calculator uses a standard, verifiable formula — the same math you&apos;d use with a
          calculator app or find in a textbook, just faster to reach and clearly labeled. Where a
          result depends on assumptions (like a representative tax rate, an average property tax
          rate, or a standard tip convention), that assumption is explained on the calculator&apos;s own
          page rather than hidden.
        </p>
        <p>
          Results on CalcNests are intended as helpful estimates for everyday planning. For
          decisions with real financial, legal, tax, or medical consequences, verify important
          numbers with a qualified professional or an official source — see our{" "}
          <Link href="/disclaimer" className="font-medium text-accent hover:text-accent-hover">Disclaimer</Link>{" "}
          for more detail.
        </p>
      </LegalSection>

      <LegalSection title="Get in touch">
        <p>
          Questions, corrections, or a calculator you&apos;d like to see added? Visit the{" "}
          <Link href="/contact" className="font-medium text-accent hover:text-accent-hover">Contact</Link> page.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
