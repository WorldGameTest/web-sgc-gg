"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  base: number; // base alpha
  speed: number; // twinkle speed
  phase: number;
  drift: number; // horizontal drift px/frame
  green: boolean;
};

/**
 * Ambient starfield — faint stars that gently twinkle and drift.
 * Canvas-based, DPR-aware, respects prefers-reduced-motion (static frame).
 */
export function CosmicBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let raf = 0;
    let start = performance.now();

    function seed() {
      const count = Math.min(170, Math.max(60, Math.floor((width * height) / 9000)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.1 + 0.35,
        base: Math.random() * 0.5 + 0.18,
        speed: Math.random() * 1.4 + 0.4,
        phase: Math.random() * Math.PI * 2,
        drift: (Math.random() * 0.05 + 0.01) * (Math.random() < 0.5 ? -1 : 1),
        green: Math.random() < 0.12,
      }));
    }

    function resize() {
      width = parent!.clientWidth;
      height = parent!.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function frame(now: number) {
      const t = (now - start) / 1000;
      ctx!.clearRect(0, 0, width, height);

      for (const s of stars) {
        s.x += s.drift;
        if (s.x < 0) s.x = width;
        else if (s.x > width) s.x = 0;

        const twinkle = 0.55 + 0.45 * Math.sin(t * s.speed + s.phase);
        const alpha = s.base * twinkle;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = s.green
          ? `rgba(110, 231, 183, ${alpha})`
          : `rgba(226, 232, 240, ${alpha})`;
        ctx!.fill();
      }

      if (!reduced) raf = requestAnimationFrame(frame);
    }

    resize();
    start = performance.now();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
