"use client";

import { useI18n } from "@/lib/i18n";
import { Reveal } from "./Reveal";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Team() {
  const { t } = useI18n();
  const team = t.team;

  return (
    <section id="team" className="relative py-24 sm:py-28">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{team.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
            {team.title}
          </h2>
          <p className="mt-4 text-lg text-slate-400">{team.subtitle}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {team.members.map((member, i) => (
            <Reveal key={member.name} delay={i * 90}>
              <div className="card group h-full p-7 transition-colors hover:border-brand-400/30 sm:p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-lg font-bold text-ink-950">
                    {initials(member.name)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {member.name}
                    </h3>
                    <p className="mt-0.5 text-sm font-medium text-brand-300">
                      {member.role}
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-slate-400">
                  {member.bio}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
