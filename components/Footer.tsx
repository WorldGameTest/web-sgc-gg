"use client";

import { useI18n } from "@/lib/i18n";
import { socials } from "@/lib/socials";
import { Logo } from "./Logo";

export function Footer() {
  const { t } = useI18n();
  const f = t.footer;
  const year = new Date().getFullYear();

  const navLinks = [
    { href: "#studio", label: t.nav.about },
    { href: "#games", label: t.nav.games },
    { href: "#team", label: t.nav.team },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="container-page py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo className="h-7 w-7" />
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-white">
                Sector Games
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              {f.tagline}
            </p>
            <p className="mt-4 text-xs uppercase tracking-wider text-slate-600">
              {f.madeIn}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {f.nav}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {f.contact}
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="mailto:collaborationsgc@mail.com"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  collaborationsgc@mail.com
                </a>
              </li>
              <li>
                <a
                  href="https://store.steampowered.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Steam
                </a>
              </li>
            </ul>

            <div className="mt-5 flex gap-2.5">
              {socials.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-brand-400/50 hover:text-brand-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>
            © {year} Sector Games. {f.rights}
          </p>
          <p>Simulator · Strategy · Cozy</p>
        </div>
      </div>
    </footer>
  );
}
