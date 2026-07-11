"use client";

import { FormEvent, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "./Reveal";

const CONTACT_EMAIL = "nichita@sector-games.com";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const { t } = useI18n();
  const c = t.contact;
  const [status, setStatus] = useState<Status>("idle");
  const [role, setRole] = useState("");
  const roleRef = useRef<HTMLInputElement>(null);

  function pickRole(title: string) {
    setRole(title);
    // bring the form field into view and focus it
    roleRef.current?.focus();
    roleRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
      setRole("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute right-1/4 top-1/3 -z-10 h-[420px] w-[620px] rounded-full bg-brand-500/10 blur-[130px]" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 top-1/2 hidden -translate-y-1/2 select-none text-[13rem] font-extrabold leading-none tracking-tighter text-white/[0.02] xl:block"
      >
        JOIN
      </span>

      <div className="container-page relative">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          {/* Left: heading + intro + open positions */}
          <Reveal>
            <p className="eyebrow">
              <span className="h-px w-8 bg-brand-400" />
              {c.eyebrow}
            </p>
            <h2 className="mt-5 text-3xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-5xl">
              {c.titleLead}{" "}
              <span className="text-gradient">{c.titleAccent}</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-slate-400">
              {c.subtitle}
            </p>

            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              {c.listTitle}
            </p>
            <ul className="mt-4 space-y-3">
              {c.listItems.map((item) => (
                <li key={item.title}>
                  <button
                    type="button"
                    onClick={() => pickRole(item.title)}
                    aria-label={`${c.roleLabel}: ${item.title}`}
                    className={`group flex w-full items-center justify-between rounded-none border px-5 py-4 text-left transition-colors ${
                      role === item.title
                        ? "border-brand-400/50 bg-brand-500/[0.06]"
                        : "border-white/10 bg-white/[0.02] hover:border-brand-400/30 hover:bg-white/[0.03]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-bold text-white">
                          {item.title}
                        </span>
                        {item.hot && (
                          <span className="rounded-none border border-brand-400/40 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-300">
                            {c.wanted}
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-xs uppercase tracking-wider text-slate-500">
                        {item.tags}
                      </div>
                    </div>
                    <Chevron className="h-4 w-4 flex-shrink-0 text-slate-600 transition-all group-hover:translate-x-0.5 group-hover:text-brand-300" />
                  </button>
                </li>
              ))}
            </ul>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-slate-500">
              {c.listFooter}
            </p>
          </Reveal>

          {/* Right: application form card */}
          <Reveal delay={80}>
            <div className="card p-6 sm:p-8">
              {status === "success" ? (
                <div className="flex min-h-[440px] flex-col items-center justify-center py-8 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-none bg-brand-500/15 text-2xl text-brand-300">
                    ✓
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">
                    {c.successTitle}
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
                    {c.successBody}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="btn-ghost mt-6"
                  >
                    {c.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold text-white">
                    {c.formHeading}
                  </h3>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      name="name"
                      label={c.nameLabel}
                      placeholder={c.namePlaceholder}
                      required
                    />
                    <Field
                      name="email"
                      type="email"
                      label={c.emailLabel}
                      placeholder={c.emailPlaceholder}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="role" className="field-label">
                      {c.roleLabel}
                      <span className="text-brand-400"> *</span>
                    </label>
                    <input
                      id="role"
                      name="role"
                      ref={roleRef}
                      required
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder={c.rolePlaceholder}
                      className="field-input"
                    />
                  </div>

                  <Field
                    name="link"
                    type="url"
                    label={c.linkLabel}
                    placeholder={c.linkPlaceholder}
                  />

                  <Field
                    name="discord"
                    label={c.discordLabel}
                    placeholder={c.discordPlaceholder}
                  />

                  <div>
                    <label htmlFor="message" className="field-label">
                      {c.messageLabel}
                      <span className="text-brand-400"> *</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder={c.messagePlaceholder}
                      className="field-input resize-y"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-red-400">
                      Something went wrong. Please email us at {CONTACT_EMAIL}.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-primary w-full uppercase tracking-wider disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <SendIcon className="h-4 w-4" />
                    {status === "submitting" ? c.submitting : c.submit}
                  </button>

                  <p className="text-center text-xs text-slate-500">
                    {c.responseNote}
                  </p>
                  <p className="text-center text-xs text-slate-600">
                    {c.directLine}{" "}
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-brand-300 hover:underline"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="field-label">
        {label}
        {required && <span className="text-brand-400"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="field-input"
      />
    </div>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M3.4 20.4l17.45-7.48a1 1 0 0 0 0-1.84L3.4 3.6a.993.993 0 0 0-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91Z" />
    </svg>
  );
}
