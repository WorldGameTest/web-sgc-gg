"use client";

import { useEffect, useState } from "react";

// Mostly "$" with a sprinkle of data-looking glyphs.
const GLYPHS = "0123456789#%/\\|<>*+=$€£¥".split("");
function randGlyph() {
  return Math.random() < 0.82 ? "$" : GLYPHS[(Math.random() * GLYPHS.length) | 0];
}

/**
 * Decrypt / glitch-scramble reveal: rapidly cycles random characters
 * (heavily weighted to "$") and resolves left-to-right into `text`.
 * Renders the final text on the server / with JS off, and for reduced-motion.
 */
export function Scramble({
  text,
  className = "",
  duration = 1700,
  delay = 400,
  interval = 75,
}: {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  /** how often the random glyphs change, ms — higher = calmer */
  interval?: number;
}) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text);
      return;
    }

    const chars = Array.from(text);
    let glyphs = chars.map(randGlyph);
    let raf = 0;
    let lastGlyph = 0;
    const start = performance.now() + delay;

    let lastLocked = -1;

    const build = (locked: number) =>
      chars
        .map((c, i) => {
          if (c === " ") return " ";
          if (i < locked) return c;
          // the character currently resolving eases toward its final form
          if (i === locked) return Math.random() < 0.5 ? c : glyphs[i];
          return glyphs[i];
        })
        .join("");

    const tick = (now: number) => {
      const t = now - start;
      const p = t < 0 ? 0 : Math.min(1, t / duration);
      const locked = Math.floor(p * chars.length);

      // only repaint on the calm glyph cadence or when a new letter locks
      const changed = now - lastGlyph > interval;
      if (changed) {
        glyphs = glyphs.map(randGlyph);
        lastGlyph = now;
      }
      if (changed || locked !== lastLocked) {
        lastLocked = locked;
        setDisplay(build(locked));
      }

      if (t >= 0 && p >= 1) {
        setDisplay(text);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, duration, delay]);

  return (
    <span className={className} aria-label={text}>
      {display}
    </span>
  );
}
