"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Logo } from "./Logo";

export function Navbar() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#studio", label: t.nav.about },
    { href: "#games", label: t.nav.games },
    { href: "#team", label: t.nav.team },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-ink-950/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Sector Games home">
          <Logo className="h-7 w-7" />
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            Sector Games
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LangSwitch lang={lang} setLang={setLang} />
          <a href="#contact" className="btn-primary hidden text-sm sm:inline-flex">
            {t.nav.cta}
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white md:hidden"
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-5 bg-current transition-transform ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-current transition-opacity ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-current transition-transform ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-ink-950/95 backdrop-blur-xl md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-slate-300 hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 w-full"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function LangSwitch({
  lang,
  setLang,
}: {
  lang: "en" | "ru";
  setLang: (l: "en" | "ru") => void;
}) {
  return (
    <div className="flex items-center rounded-full border border-white/10 bg-white/[0.03] p-0.5 text-xs font-semibold">
      {(["en", "ru"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`rounded-full px-2.5 py-1 uppercase tracking-wider transition-colors ${
            lang === code
              ? "bg-white text-ink-950"
              : "text-slate-400 hover:text-white"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
