import Link from "next/link";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How CalcNests handles information from calculator use, cookies, analytics, and the contact form.",
  path: "/privacy",
});

const LAST_UPDATED = "September 2026";

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated={LAST_UPDATED}>
      <LegalSection title="Overview">
        <p>
          CalcNests does not require an account to use any calculator. Every calculation runs
          directly in your browser — the numbers you type into a calculator are not sent to our
          servers or stored by us. This policy explains what information we do collect, mainly
          through the contact form and standard website analytics.
        </p>
      </LegalSection>

      <LegalSection title="Information you may provide">
        <p>
          If you use the <Link href="/contact" className="font-medium text-accent hover:text-accent-hover">Contact</Link> form,
          we receive the name, email address, and message you submit, so we can read and respond
          to your message. We don&apos;t ask for this information anywhere else on the site.
        </p>
      </LegalSection>

      <LegalSection title="Automatically collected information">
        <p>
          Like most websites, our hosting provider and any analytics service we use may
          automatically log standard technical information when you visit — such as your general
          location (derived from IP address), browser type, device type, pages viewed, and
          approximate time spent on a page. This is aggregate, technical information used to
          understand how the site is used and to keep it running reliably; it is not used to
          identify you personally.
        </p>
      </LegalSection>

      <LegalSection title="Cookies and similar technologies">
        <p>
          CalcNests may use cookies or similar browser storage for basic site functionality (such
          as remembering a display preference), for analytics (to understand which pages are
          useful), and, if and when advertising is enabled on the site, for ad delivery and
          measurement. You can disable cookies in your browser settings; some site functionality
          may not work as expected if you do.
        </p>
      </LegalSection>

      <LegalSection title="Analytics">
        <p>
          We may use a third-party analytics service to understand aggregate traffic patterns —
          for example, which calculators are most used and which pages are hard to find. Analytics
          data is used in aggregate and is not used to identify individual visitors.
        </p>
      </LegalSection>

      <LegalSection title="Advertising">
        <p>
          CalcNests is designed to be supported by advertising in the future. If and when ads are
          enabled, we may work with third-party advertising networks (such as Google AdSense),
          which may use cookies or similar technology to serve ads based on your visits to this and
          other websites. Those networks&apos; own privacy policies govern how they handle that data;
          we don&apos;t control or have access to it.
        </p>
      </LegalSection>

      <LegalSection title="Third-party services">
        <p>
          We may rely on third-party services for hosting, analytics, and (in the future)
          advertising. These providers process technical and usage data on our behalf, subject to
          their own privacy policies and applicable law. We do not sell personal information to
          third parties.
        </p>
      </LegalSection>

      <LegalSection title="How information may be used">
        <p>
          Information submitted through the contact form is used solely to respond to your
          message. Aggregate analytics data is used to improve the site — for example, deciding
          which calculators to build next or fixing pages that aren&apos;t working well.
        </p>
      </LegalSection>

      <LegalSection title="Data retention">
        <p>
          Contact form messages are kept only as long as needed to respond to your inquiry and for
          a reasonable period afterward for our records, then deleted. Aggregate analytics data may
          be retained longer since it isn&apos;t tied to an identifiable individual.
        </p>
      </LegalSection>

      <LegalSection title="Your choices">
        <p>
          You can use nearly all of CalcNests — every calculator — without providing any personal
          information at all. You can decline to use the contact form, and you can block or clear
          cookies through your browser at any time.
        </p>
      </LegalSection>

      <LegalSection title="Security">
        <p>
          We take reasonable steps to protect information submitted to us, including basic spam
          and abuse protection on the contact form. No method of transmission or storage over the
          internet is 100% secure, and we can&apos;t guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection title="Children's privacy">
        <p>
          CalcNests is not directed at children under 13, and we do not knowingly collect personal
          information from children under 13.
        </p>
      </LegalSection>

      <LegalSection title="Changes to this policy">
        <p>
          We may update this policy from time to time, for example as the site adds analytics or
          advertising. The &ldquo;Last updated&rdquo; date at the top of this page reflects the most recent
          revision.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about this policy? Reach out through the{" "}
          <Link href="/contact" className="font-medium text-accent hover:text-accent-hover">Contact</Link> page.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
