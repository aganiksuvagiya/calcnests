"use client";

import { FormEvent, useId, useState } from "react";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const formId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot — left blank by real users
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const errors: Record<string, string> = {};
    if (name.trim().length === 0) errors.name = "Enter your name.";
    if (!EMAIL_RE.test(email.trim())) errors.email = "Enter a valid email address.";
    if (message.trim().length < 10) errors.message = "Message must be at least 10 characters.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMessage("Couldn't send your message. Check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-2 rounded-xl border border-accent/20 bg-accent-soft p-6"
      >
        <div className="flex items-center gap-2 text-accent">
          <Icon icon="check-circle" className="h-5 w-5" />
          <p className="font-semibold">Message sent</p>
        </div>
        <p className="text-sm text-foreground/80">
          Thanks for reaching out — we appreciate you taking the time to write in.
        </p>
        <Button type="button" variant="secondary" size="sm" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <Field label="Name" htmlFor={`${formId}-name`} error={fieldErrors.name}>
        <Input
          id={`${formId}-name`}
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          invalid={Boolean(fieldErrors.name)}
        />
      </Field>

      <Field label="Email" htmlFor={`${formId}-email`} error={fieldErrors.email}>
        <Input
          id={`${formId}-email`}
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          invalid={Boolean(fieldErrors.email)}
        />
      </Field>

      <Field label="Message" htmlFor={`${formId}-message`} error={fieldErrors.message}>
        <Textarea
          id={`${formId}-message`}
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          invalid={Boolean(fieldErrors.message)}
        />
      </Field>

      {/* Honeypot field: hidden from sighted users via CSS (not display:none,
          which some bots skip), never via inert/aria-hidden alone so it stays
          out of the tab order too. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`${formId}-company`}>Company</label>
        <input
          id={`${formId}-company`}
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-lg bg-danger/10 px-4 py-2.5 text-sm font-medium text-danger">
          {errorMessage}
        </p>
      )}

      <Button type="submit" disabled={status === "submitting"} className="self-start">
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
