"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

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
    { href: "#games", label: t.nav.games },
    { href: "#studio", label: t.nav.about },
    { href: "#team", label: t.nav.team },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.07] bg-ink-950/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        {/* Wordmark */}
        <a
          href="#top"
          className="text-base font-extrabold uppercase tracking-[0.22em] text-white sm:text-lg"
          aria-label="Sector Games home"
        >
          Sector <span className="text-brand-400">Games</span>
        </a>

        {/* Right cluster */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-brand-400 after:transition-transform after:duration-300 after:ease-out after:content-[''] hover:text-white hover:after:scale-x-100"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden border border-brand-500 px-5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-400 transition-colors hover:bg-brand-500 hover:text-ink-950 sm:inline-flex"
          >
            {t.nav.cta}
          </a>

          <LangSwitch lang={lang} setLang={setLang} />

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center border border-white/15 text-white md:hidden"
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
                className="px-3 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-300 hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex justify-center border border-brand-500 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-brand-400 transition-colors hover:bg-brand-500 hover:text-ink-950"
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
    <div className="flex items-center border border-white/15 text-xs font-bold">
      {(["en", "ru"] as const).map((code, i) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`px-3 py-2 uppercase tracking-wider transition-colors ${
            i > 0 ? "border-l border-white/15" : ""
          } ${
            lang === code
              ? "bg-brand-500/20 text-white"
              : "text-slate-500 hover:text-white"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
