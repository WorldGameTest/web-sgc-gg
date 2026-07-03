# Sector Games — Website

Marketing website for **Sector Games**, a PC game publisher for Steam specializing in
simulator, strategy, and cozy experiences.

> "We don't just publish games. We publish market position."

Built with **Next.js 14 (App Router)**, **React 18**, **TypeScript**, and **Tailwind CSS**.

## Features

- 🎮 Featured games showcase (Economic Miracle, Money Garden Simulator)
- 🌐 Bilingual **EN / RU** with a language switcher (remembers your choice)
- 🌱 Dark, premium theme with scroll reveals and animated background glows
- 👥 Co-founders / Team section
- ✉️ "Send us your project" form for indie developers (with an API route)
- 📱 Fully responsive, accessible, SEO metadata

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

## Project structure

```
app/
  layout.tsx              Root layout, fonts, i18n provider, SEO metadata
  page.tsx                Assembles all sections
  globals.css             Theme + Tailwind layers
  api/contact/route.ts    Handles project submissions
components/                Navbar, Hero, About, Games, Team, Contact, Footer, …
lib/
  translations.ts         All EN/RU copy + game data (edit content here)
  i18n.tsx                Language context / provider
  useReveal.ts            Scroll-reveal hook
```

## Editing content

All text and game data live in [`lib/translations.ts`](lib/translations.ts).
Update both the `en` and `ru` objects to keep the two languages in sync.

## Receiving applications (contact form)

Applications can be delivered via **Telegram**, **email**, or both. Configure
whichever you want in `.env.local` (copy from `.env.local.example`) and restart
the server. If none are set, submissions are logged to the server console and
the form still succeeds — so local dev never breaks.

### Option A — Telegram bot (easiest, recommended)
1. In Telegram, message **@BotFather** → `/newbot`, follow the prompts, copy the
   token → `TELEGRAM_BOT_TOKEN`.
2. Message **@userinfobot** to get your numeric id → `TELEGRAM_CHAT_ID`.
3. Open a chat with your new bot and press **Start** (so it's allowed to DM you).
4. Restart the server. Each application arrives as a Telegram message.

### Option B — Email (Resend)
1. Create a free [Resend](https://resend.com) account → **API key** →
   `RESEND_API_KEY`.
2. `CONTACT_TO_EMAIL` = the inbox that receives applications.
3. `CONTACT_FROM_EMAIL` = an address on a domain you **verify** in Resend. For
   testing, `onboarding@resend.dev` works but only delivers to the email on your
   Resend account. Emails set the applicant as **reply-to** so you can reply
   directly.

On Vercel/Netlify, add the same variables in the project's environment settings.

## To finish before launch

- Set the environment variables above so applications reach your inbox.
- Replace the placeholder email `hello@sectorgames.com` (in
  `components/Contact.tsx` and `components/Footer.tsx`) with your real address.
- Confirm the **TikTok** URL in `lib/socials.tsx` (the one provided pointed to
  Instagram; a best-guess `@sector.games` is in place).
```
