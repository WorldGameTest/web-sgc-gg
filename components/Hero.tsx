"use client";

import { useI18n } from "@/lib/i18n";
import { Logo } from "./Logo";
import { NetworkBackground } from "./NetworkBackground";

export function Hero() {
  const { t } = useI18n();
  const h = t.hero;

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
    >
      {/* background layers */}
      <NetworkBackground className="pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_at_30%_40%,black_10%,transparent_70%)]" />
      <div className="pointer-events-none absolute left-[8%] top-[38%] -z-10 h-[520px] w-[720px] -translate-y-1/2 rounded-full bg-brand-500/15 blur-[130px] animate-pulse-glow" />

      <div className="container-page relative w-full">
        <div className="max-w-3xl">
          <p className="eyebrow animate-fade-up">
            <span className="h-px w-8 bg-brand-400" />
            {h.eyebrow}
          </p>

          {/* wordmark */}
          <div
            className="mt-6 flex animate-fade-up items-center gap-4"
            style={{ animationDelay: "60ms" }}
          >
            <Logo className="h-12 w-12 sm:h-14 sm:w-14" />
            <span className="text-4xl font-extrabold uppercase tracking-tight text-white sm:text-6xl">
              Sector Games
            </span>
          </div>

          {/* tagline */}
          <h1
            className="mt-8 max-w-2xl animate-fade-up text-2xl font-bold leading-[1.15] sm:text-4xl"
            style={{ animationDelay: "140ms" }}
          >
            <span className="text-white/60">{h.titleLine1} </span>
            <span className="text-gradient">{h.titleLine2}</span>
          </h1>

          <p
            className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-slate-400 sm:text-lg"
            style={{ animationDelay: "220ms" }}
          >
            {h.subtitle}
          </p>

          <div
            className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "300ms" }}
          >
            <a href="#games" className="btn-primary w-full sm:w-auto">
              {h.ctaPrimary}
            </a>
            <a href="#contact" className="btn-ghost w-full sm:w-auto">
              {h.ctaSecondary}
            </a>
          </div>

          {/* stats */}
          <div
            className="mt-14 flex animate-fade-up items-start gap-10 border-t border-white/10 pt-8"
            style={{ animationDelay: "380ms" }}
          >
            <Stat value={h.stat1Value} label={h.stat1Label} />
            <Stat value={h.stat2Value} label={h.stat2Label} />
            <Stat value={h.stat3Value} label={h.stat3Label} />
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <a
        href="#studio"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-slate-500 transition-colors hover:text-brand-300 sm:flex"
      >
        Scroll
        <span className="h-8 w-px bg-gradient-to-b from-brand-400/60 to-transparent" />
      </a>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-extrabold text-white sm:text-4xl">
        {value}
      </div>
      <div className="mt-1 max-w-[7rem] text-[11px] uppercase tracking-wider text-slate-500">
        {label}
      </div>
    </div>
  );
}
