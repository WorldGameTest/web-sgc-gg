"use client";

import { useEffect, useState } from "react";

/**
 * Branded intro loader: shows the logo with a progress bar counting to 100%,
 * then fades out to reveal the site. CSS drives the bar + fade (so it works
 * even without JS); JS animates the percentage. Skipped for reduced-motion.
 */
export function Loader() {
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGone(true);
      return;
    }
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(100, Math.round(((now - start) / duration) * 100));
      setPct(p);
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const hide = window.setTimeout(() => setGone(true), 2200);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hide);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className="loader-overlay fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950 px-6"
      role="status"
      aria-label="Loading"
    >
      <div className="pointer-events-none absolute h-56 w-[min(90vw,24rem)] rounded-full bg-brand-500/10 blur-[110px]" />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/sgc-logo-white.png"
        alt="Sector Games"
        className="relative h-16 w-auto max-w-[70vw] sm:h-24"
      />

      <div className="relative mt-9 w-[min(72vw,420px)]">
        <div className="h-px w-full overflow-hidden bg-white/10">
          <div className="loader-bar h-full bg-gradient-to-r from-brand-500 to-brand-300" />
        </div>
        <div className="mt-3 flex justify-between text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
          <span>Loading</span>
          <span className="tabular-nums">{pct}%</span>
        </div>
      </div>
    </div>
  );
}
