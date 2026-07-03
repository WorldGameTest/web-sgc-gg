"use client";

import { useEffect, useRef } from "react";

type Spiral = {
  cx: number;
  cy: number;
  size: number;
  dir: number; // rotation direction
  speed: number;
  phase: number;
  alpha: number;
  mirror: boolean; // flip handedness (opposite coil)
};

/**
 * Hero backdrop = two quiet green motifs:
 *  1. a DYNAMIC constellation/plexus web — drifting nodes of varied sizes that
 *     reconnect as they move.
 *  2. a TWIN growth-spiral (two counter-rotating golden spirals coiling from
 *     opposite sides) with a gentle glow pulse. The spiral is pre-rendered once
 *     to an offscreen buffer and drawn twice — cheap and smooth.
 * DPR-aware; respects prefers-reduced-motion (renders one static frame).
 */
export function HeroBackground({ className = "" }: { className?: string }) {
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
    const UNIT = 720; // offscreen unit-spiral size (css px)

    let w = 0;
    let h = 0;
    let raf = 0;
    const start = performance.now();

    let nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
    }[] = [];
    let unit: HTMLCanvasElement | null = null;
    let spirals: Spiral[] = [];

    function seedConstellation() {
      const count = Math.min(54, Math.max(26, Math.floor((w * h) / 26000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: 0.6 + Math.random() * 1.8, // varied node sizes
      }));
    }

    function buildUnitSpiral() {
      const off = document.createElement("canvas");
      off.width = UNIT * dpr;
      off.height = UNIT * dpr;
      const octx = off.getContext("2d");
      if (!octx) return;
      octx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const c = UNIT / 2;
      const base = UNIT * 0.005;
      const b = 0.3063; // golden growth (× φ per quarter turn)
      const strands = 13;
      const rMax = UNIT * 0.5;

      octx.lineCap = "round";
      octx.shadowColor = "rgba(52, 211, 153, 0.6)";
      for (let s = 0; s < strands; s++) {
        const angOff = (s / strands) * Math.PI * 1.15;
        const scale = base * (1 + s * 0.02);
        octx.beginPath();
        let first = true;
        for (let th = 0; th <= 9 * Math.PI; th += 0.055) {
          const r = scale * Math.exp(b * th);
          if (r > rMax) break;
          const a = th + angOff;
          const x = c + r * Math.cos(a);
          const y = c + r * Math.sin(a);
          if (first) {
            octx.moveTo(x, y);
            first = false;
          } else {
            octx.lineTo(x, y);
          }
        }
        const fade = 0.42 * (1 - s / strands) + 0.07;
        octx.strokeStyle = `rgba(120, 233, 190, ${fade})`;
        octx.lineWidth = 1;
        octx.shadowBlur = 6;
        octx.stroke();
      }
      unit = off;
    }

    function layoutSpirals() {
      const m = Math.min(w, h);
      if (w > 900) {
        spirals = [
          {
            cx: w * 0.64,
            cy: h * 0.56,
            size: m * 0.95,
            dir: 1,
            speed: 0.03,
            phase: 0,
            alpha: 0.95,
            mirror: false,
          },
          {
            cx: w * 0.87,
            cy: h * 0.38,
            size: m * 0.5,
            dir: -1,
            speed: 0.026,
            phase: Math.PI,
            alpha: 0.75,
            mirror: true,
          },
        ];
      } else {
        spirals = [
          {
            cx: w * 0.82,
            cy: h * 0.62,
            size: m * 1.0,
            dir: 1,
            speed: 0.03,
            phase: 0,
            alpha: 0.9,
            mirror: false,
          },
          {
            cx: w * 1.05,
            cy: h * 0.4,
            size: m * 0.6,
            dir: -1,
            speed: 0.026,
            phase: Math.PI,
            alpha: 0.6,
            mirror: true,
          },
        ];
      }
    }

    function resize() {
      w = parent!.clientWidth;
      h = parent!.clientHeight;
      canvas!.width = Math.max(1, Math.floor(w * dpr));
      canvas!.height = Math.max(1, Math.floor(h * dpr));
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedConstellation();
      buildUnitSpiral();
      layoutSpirals();
    }

    function frame(now: number) {
      const t = (now - start) / 1000;
      ctx!.clearRect(0, 0, w, h);

      // twin spirals — counter-rotating with a gentle glow pulse
      if (unit) {
        for (const sp of spirals) {
          const rot = reduced ? 0 : t * sp.speed * sp.dir;
          const pulse = reduced ? 1 : 0.8 + 0.2 * Math.sin(t * 0.7 + sp.phase);
          ctx!.save();
          ctx!.translate(sp.cx, sp.cy);
          ctx!.rotate(rot);
          if (sp.mirror) ctx!.scale(-1, 1);
          ctx!.globalAlpha = sp.alpha * pulse;
          ctx!.drawImage(
            unit,
            0,
            0,
            unit.width,
            unit.height,
            -sp.size / 2,
            -sp.size / 2,
            sp.size,
            sp.size
          );
          ctx!.restore();
        }
        ctx!.globalAlpha = 1;
      }

      // dynamic constellation: nodes drift and reconnect as they move
      const link = Math.hypot(w, h) * 0.12;
      if (!reduced) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
      }
      ctx!.lineWidth = 0.8;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < link) {
            ctx!.strokeStyle = `rgba(52, 211, 153, ${(1 - d / link) * 0.16})`;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx!.fillStyle = "rgba(160, 174, 192, 0.5)";
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (!reduced) raf = requestAnimationFrame(frame);
    }

    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
