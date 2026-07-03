"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; vx: number; vy: number };

/**
 * Animated "network / constellation" background — slowly drifting nodes
 * connected by faint lines when they come close, echoing the reference site.
 * Rendered on a canvas, DPR-aware, and respects prefers-reduced-motion.
 */
export function NetworkBackground({ className = "" }: { className?: string }) {
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
    let points: Point[] = [];
    let raf = 0;
    const LINK_DIST = 140;

    const mouse = { x: -9999, y: -9999 };

    function seed() {
      const density = Math.min(
        90,
        Math.max(28, Math.floor((width * height) / 15000))
      );
      points = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
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

    function frame() {
      ctx!.clearRect(0, 0, width, height);

      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      // connecting lines
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const opacity = (1 - dist / LINK_DIST) * 0.32;
            ctx!.strokeStyle = `rgba(52, 211, 153, ${opacity})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      // lines to cursor + node highlight
      for (const p of points) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        const near = dist < LINK_DIST * 1.4;
        if (near) {
          const opacity = (1 - dist / (LINK_DIST * 1.4)) * 0.5;
          ctx!.strokeStyle = `rgba(110, 231, 183, ${opacity})`;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(mouse.x, mouse.y);
          ctx!.stroke();
        }
        ctx!.fillStyle = near
          ? "rgba(110, 231, 183, 0.9)"
          : "rgba(148, 163, 184, 0.5)";
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, near ? 2 : 1.4, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (!reduced) raf = requestAnimationFrame(frame);
    }

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    resize();
    frame();

    window.addEventListener("resize", resize);
    if (!reduced) {
      parent.addEventListener("pointermove", onMove);
      parent.addEventListener("pointerleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
