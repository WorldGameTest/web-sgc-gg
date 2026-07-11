"use client";

import { useI18n } from "@/lib/i18n";
import { socials } from "@/lib/socials";

export function Footer() {
  const { t } = useI18n();
  const f = t.footer;
  const year = new Date().getFullYear();

  const navLinks = [
    { href: "#games", label: t.nav.games },
    { href: "#studio", label: t.nav.about },
    { href: "#team", label: t.nav.team },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="container-page py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/sgc-logo-white.png"
              alt="Sector Games"
              className="h-8 w-auto"
            />
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
                  href="mailto:nichita@sector-games.com"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  nichita@sector-games.com
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
                  className="flex h-9 w-9 items-center justify-center rounded-none border border-white/10 text-slate-400 transition-colors hover:border-brand-400/50 hover:text-brand-300"
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
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="uppercase tracking-wider transition-colors hover:text-white"
            >
              {f.privacy}
            </a>
            <a
              href="#"
              className="uppercase tracking-wider transition-colors hover:text-white"
            >
              {f.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
