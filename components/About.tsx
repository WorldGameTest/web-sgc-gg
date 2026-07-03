"use client";

import { useI18n } from "@/lib/i18n";
import { Reveal } from "./Reveal";

export function About() {
  const { t } = useI18n();
  const a = t.about;

  return (
    <section id="studio" className="relative overflow-hidden py-24 sm:py-28">
      {/* faint oversized watermark on the right, like the reference */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-1/2 hidden -translate-y-1/2 select-none text-[16rem] font-extrabold leading-none tracking-tighter text-white/[0.02] lg:block"
      >
        SG
      </span>

      <div className="container-page relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: heading + copy */}
          <Reveal>
            <p className="eyebrow">
              <span className="h-px w-8 bg-brand-400" />
              {a.eyebrow}
            </p>
            <h2 className="mt-5 text-3xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-5xl">
              {a.titleLead}{" "}
              <span className="text-gradient">{a.titleAccent}</span>
            </h2>
            <p className="mt-7 max-w-md text-base leading-relaxed text-slate-400">
              {a.body}
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-slate-400">
              {a.body2}
            </p>
          </Reveal>

          {/* Right: numbered pillar rows */}
          <div className="flex flex-col gap-4">
            {a.pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 90}>
                <div className="group flex items-start gap-5 rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-brand-400/30 hover:bg-white/[0.03] sm:p-6">
                  <span className="text-3xl font-extrabold tabular-nums text-white/10 transition-colors group-hover:text-brand-400/40 sm:text-4xl">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {pillar.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
