"use client";

import { useState } from "react";
import { Icon } from "@/components/icons/Icon";

export function ContactEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable — mailto link below still works as a fallback.
    }
  }

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

  return (
    <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
      <span className="text-muted">Or email us directly at</span>
      <a
        href={gmailComposeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-ring rounded font-medium text-accent hover:text-accent-hover"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="focus-ring inline-flex items-center gap-1 rounded text-muted transition-colors hover:text-foreground"
        aria-label="Copy email address"
      >
        <Icon icon={copied ? "check" : "copy"} className="h-3.5 w-3.5" />
        {copied ? "Copied" : "Copy"}
      </button>
    </p>
  );
}
