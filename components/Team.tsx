"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import { TelegramIcon } from "@/lib/socials";
import { Reveal } from "./Reveal";

export function Team() {
  const { t } = useI18n();
  const team = t.team;

  return (
    <section id="team" className="relative py-24 sm:py-28">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{team.eyebrow}</p>
          <p className="mt-4 text-lg text-slate-400">{team.subtitle}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {team.members.map((member, i) => (
            <Reveal key={member.name} delay={i * 90}>
              <div className="card group h-full p-6 transition-colors hover:border-brand-400/30 sm:p-7">
                <div className="flex items-center gap-5">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden border border-white/10 sm:h-28 sm:w-28">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="112px"
                      className="object-cover object-[center_20%] grayscale transition-all duration-500 group-hover:grayscale-0"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-brand-300">
                      {member.role}
                    </p>
                  </div>
                  {member.telegram && (
                    <a
                      href={member.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on Telegram`}
                      className="ml-auto flex h-9 w-9 flex-shrink-0 items-center justify-center self-start border border-white/10 text-slate-400 transition-colors hover:border-brand-400/50 hover:text-brand-300"
                    >
                      <TelegramIcon className="h-4 w-4" />
                    </a>
                  )}
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
