"use client";

import { useI18n } from "@/lib/i18n";
import { socials } from "@/lib/socials";
import { Reveal } from "./Reveal";

export function FollowUs() {
  const { t } = useI18n();
  const f = t.follow;

  return (
    <section className="relative py-16 sm:py-20">
      <div className="container-page">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
                {f.title}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">
                {f.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              {socials.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="group inline-flex items-center gap-2.5 rounded-none border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-slate-200 transition-all hover:border-brand-400/50 hover:bg-brand-500/10 hover:text-white"
                >
                  <Icon className="h-5 w-5 text-slate-300 transition-colors group-hover:text-brand-300" />
                  <span className="uppercase tracking-wider">{name}</span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
