import Link from "next/link";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description: "The terms that apply to using CalcNests' free calculators and website.",
  path: "/terms",
});

const LAST_UPDATED = "September 2026";

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Use" lastUpdated={LAST_UPDATED}>
      <LegalSection title="Acceptance of terms">
        <p>
          By using CalcNests, you agree to these Terms of Use. If you don&apos;t agree with them,
          please don&apos;t use the site.
        </p>
      </LegalSection>

      <LegalSection title="Using the website">
        <p>
          CalcNests provides free calculators and reference tools for personal, informational use.
          You may use the site and its calculators for any lawful purpose. You agree not to misuse
          the site — for example, by attempting to disrupt it, scrape it at a disruptive scale, or
          use it in a way that could damage, disable, or impair it for other users.
        </p>
      </LegalSection>

      <LegalSection title="Calculator results">
        <p>
          Every calculator on CalcNests is built on a standard, correct formula, but results are
          estimates based on the inputs and assumptions you and the calculator use — they are not
          guarantees, official government figures, or professional advice. See our{" "}
          <Link href="/disclaimer" className="font-medium text-accent hover:text-accent-hover">
            Disclaimer
          </Link>{" "}
          for more detail, particularly for financial calculators.
        </p>
      </LegalSection>

      <LegalSection title="Your responsibilities">
        <p>
          You&apos;re responsible for how you use the information a calculator gives you. For decisions
          with real financial, legal, tax, or medical consequences, verify important numbers with a
          qualified professional or an official source before relying on them.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual property">
        <p>
          The CalcNests name, design, and site content (including calculator explanations, FAQs,
          and layout) belong to CalcNests unless otherwise noted. You may link to CalcNests pages
          freely. You may not copy, republish, or redistribute substantial parts of the site&apos;s
          content without permission.
        </p>
      </LegalSection>

      <LegalSection title="External links">
        <p>
          CalcNests may link to third-party websites for reference or context. We don&apos;t control
          those sites and aren&apos;t responsible for their content, accuracy, or privacy practices.
          Links don&apos;t imply an endorsement.
        </p>
      </LegalSection>

      <LegalSection title="Availability">
        <p>
          We aim to keep CalcNests available and working correctly, but we don&apos;t guarantee
          uninterrupted access. The site may be unavailable at times for maintenance, technical
          issues, or reasons outside our control.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>
          CalcNests is provided &ldquo;as is,&rdquo; without warranties of any kind, express or implied. To
          the fullest extent permitted by law, CalcNests and its operators are not liable for any
          damages or losses arising from your use of the site or reliance on its calculators,
          including decisions made based on calculator results.
        </p>
      </LegalSection>

      <LegalSection title="Changes to these terms">
        <p>
          We may update these Terms of Use from time to time. The &ldquo;Last updated&rdquo; date at the top
          of this page reflects the most recent revision. Continued use of the site after a change
          means you accept the updated terms.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about these terms? Reach out through the{" "}
          <Link href="/contact" className="font-medium text-accent hover:text-accent-hover">
            Contact
          </Link>{" "}
          page.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
