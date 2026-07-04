import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sector-games.com"),
  title: {
    default: "Sector Games — We publish market position",
    template: "%s · Sector Games",
  },
  description:
    "Sector Games creates PC games for Steam, specializing in simulator, strategy, and cozy experiences designed for specific player audiences.",
  keywords: [
    "Sector Games",
    "game publisher",
    "Steam",
    "simulator games",
    "strategy games",
    "cozy games",
    "indie publishing",
  ],
  openGraph: {
    title: "Sector Games — We publish market position",
    description:
      "PC games for Steam — simulator, strategy, and cozy experiences designed for specific player audiences.",
    type: "website",
    siteName: "Sector Games",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sector Games",
    description:
      "We don't just publish games. We publish market position.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
