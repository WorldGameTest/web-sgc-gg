"use client";

import { useI18n } from "@/lib/i18n";
import { Game } from "@/lib/translations";
import { Reveal } from "./Reveal";

export function Games() {
  const { t } = useI18n();
  const g = t.games;

  return (
    <section id="games" className="relative py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-ink-900/40 to-transparent" />
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{g.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
            {g.title}
          </h2>
          <p className="mt-4 text-lg text-slate-400">{g.subtitle}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-7">
          {g.items.map((game, i) => (
            <Reveal key={game.title} delay={i * 90}>
              <GameCard game={game} viewLabel={g.viewOnSteam} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function GameCard({ game, viewLabel }: { game: Game; viewLabel: string }) {
  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-500 hover:-translate-y-1"
      style={
        {
          // colored border + drop shadow on hover, driven by each game's glow
          ["--glow" as string]: game.glow,
        } as React.CSSProperties
      }
    >
      {/* hover light: colored radial glow that fades in over the block */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120% 80% at 50% 0%, rgba(${game.glow}, 0.28), rgba(${game.glow}, 0.06) 45%, transparent 72%)`,
        }}
      />
      {/* colored border ring on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow: `inset 0 0 0 1px rgba(${game.glow}, 0.55), 0 24px 60px -20px rgba(${game.glow}, 0.5)`,
        }}
      />

      {/* Media */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${game.accent}`}
          aria-hidden="true"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={game.image}
          alt={game.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/10 to-transparent" />

        {/* status badge — top left */}
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-md border border-white/15 bg-ink-950/75 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur">
          <span
            className="h-2 w-2 rounded-full"
            style={{
              backgroundColor: game.badge,
              boxShadow: `0 0 8px ${game.badge}`,
            }}
          />
          {game.status}
        </span>

        {/* year — top right */}
        <span className="absolute right-4 top-4 text-sm font-bold tracking-wider text-white/70">
          {game.year}
        </span>
      </div>

      {/* Body */}
      <div className="relative flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          {game.genre}
        </p>

        <div className="mt-2 flex items-start justify-between gap-4">
          <h3 className="text-2xl font-bold text-white sm:text-[1.7rem]">
            {game.title}
          </h3>
          <a
            href={game.steamUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${game.title} — ${viewLabel}`}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition-colors group-hover:border-white/25 hover:text-white"
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <p className="mt-1 text-sm font-medium text-brand-300">
          {game.tagline}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-slate-400">
          {game.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {game.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={game.steamUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white/[0.06]"
        >
          <SteamIcon className="h-4 w-4" />
          {viewLabel}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}

function ArrowUpRight({ className }: { className?: string }) {
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
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

function SteamIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M11.98 2C6.72 2 2.4 6.02 2 11.14l5.34 2.2a2.79 2.79 0 0 1 1.58-.49l2.37-3.44v-.05a3.74 3.74 0 1 1 3.74 3.74h-.08l-3.38 2.42v.1a2.81 2.81 0 0 1-5.6.34l-3.82-1.58A10 10 0 1 0 11.98 2Zm-3.6 15.18-1.22-.5a2.11 2.11 0 0 0 3.85-1.05 2.12 2.12 0 0 0-2.85-1.98l1.27.53a1.56 1.56 0 1 1-1.2 2.87l.15.06Zm7.3-6.42a2.49 2.49 0 1 0 0-4.98 2.49 2.49 0 0 0 0 4.98Zm0-.78a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Z" />
    </svg>
  );
}
