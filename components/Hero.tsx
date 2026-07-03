"use client";

import { useI18n } from "@/lib/i18n";
import { HeroBackground } from "./HeroBackground";
import { Scramble } from "./Scramble";

export function Hero() {
  const { t } = useI18n();
  const h = t.hero;

  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      <CosmicScene />

      <div className="container-page relative z-10 flex min-h-screen items-center py-28">
        <div className="w-full max-w-2xl">
          <p className="eyebrow animate-fade-up">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.6)]" />
            {h.eyebrow}
          </p>

          {/* logo */}
          <div
            className="mt-7 animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/sgc-logo-white.png"
              alt="Sector Games"
              className="h-20 w-auto sm:h-28 lg:h-32"
            />
          </div>

          {/* tagline / thesis */}
          <h1
            className="mt-8 max-w-2xl animate-fade-up text-[1.7rem] font-bold leading-[1.15] tracking-tight sm:text-4xl"
            style={{ animationDelay: "160ms" }}
          >
            <span className="block text-white/55 sm:whitespace-nowrap">
              {h.titleLine1}
            </span>
            <span className="block sm:whitespace-nowrap">
              <span className="text-white/85">{h.titleLine2Lead}</span>
              <Scramble
                className="text-gradient"
                text={h.titleLine2Key}
                delay={350}
                duration={475}
                interval={20}
              />
            </span>
          </h1>

          <p
            className="mt-6 max-w-lg animate-fade-up text-base leading-relaxed text-slate-400 sm:text-lg"
            style={{ animationDelay: "240ms" }}
          >
            {h.subtitle}
          </p>

          <div
            className="mt-10 flex animate-fade-up flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "320ms" }}
          >
            <a
              href="#games"
              className="btn-primary w-full px-8 py-4 text-[0.95rem] uppercase tracking-[0.12em] sm:w-auto"
            >
              {h.ctaPrimary}
            </a>
            <a
              href="#studio"
              className="btn-ghost w-full px-8 py-4 text-[0.95rem] uppercase tracking-[0.12em] sm:w-auto"
            >
              {h.ctaSecondary}
            </a>
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <a
        href="#games"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-slate-500 transition-colors hover:text-brand-300 sm:flex"
      >
        Scroll
        <span className="h-9 w-px animate-pulse-glow bg-gradient-to-b from-brand-400/70 to-transparent" />
      </a>
    </section>
  );
}

/** Ambient backdrop: gradient ground, a soft glow behind the spiral, and the
 *  combined constellation + growth-spiral canvas. Kept intentionally minimal. */
function CosmicScene() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* deep green-biased near-black ground */}
      <div className="absolute inset-0 bg-[radial-gradient(125%_120%_at_18%_0%,#0a1512_0%,#07090b_45%,#050608_100%)]" />

      {/* soft glow behind the spiral for a gentle neon bloom */}
      <div className="absolute right-[8%] top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full bg-brand-500/[0.09] blur-[150px] animate-pulse-glow" />

      {/* constellation web + golden growth spiral */}
      <HeroBackground className="absolute inset-0" />

      {/* bottom fade into the page */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
    </div>
  );
}
