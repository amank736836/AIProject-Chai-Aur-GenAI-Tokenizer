"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/hooks";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
};

/**
 * Ambient background motion: a drifting particle constellation on canvas,
 * layered over animated aurora blobs, a parallax grid and a film-grain overlay.
 */
export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let particles: Particle[] = [];
    const pointer = { x: -9999, y: -9999 };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.round(
        Math.min(96, Math.max(34, (width * height) / 22000))
      );
      particles = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.7 + 0.6,
        hue: 210 + Math.random() * 90,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const linkDistance = width < 720 ? 96 : 132;

      for (const p of particles) {
        // gentle pointer attraction for a "live" feel
        const dx = pointer.x - p.x;
        const dy = pointer.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 180 && dist > 0.001) {
          const force = (1 - dist / 180) * 0.012;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.vx *= 0.995;
        p.vy *= 0.995;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDistance) {
            const alpha = (1 - dist / linkDistance) * 0.32;
            ctx.strokeStyle = `hsla(${(a.hue + b.hue) / 2}, 90%, 62%, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        const nearPointer = Math.hypot(pointer.x - p.x, pointer.y - p.y) < 160;
        ctx.fillStyle = `hsla(${p.hue}, 92%, ${nearPointer ? 70 : 62}%, ${
          nearPointer ? 0.9 : 0.55
        })`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (nearPointer ? 1.5 : 1), 0, Math.PI * 2);
        ctx.fill();
      }

      frame = requestAnimationFrame(draw);
    };

    const renderStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.fillStyle = `hsla(${p.hue}, 90%, 62%, 0.4)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    resize();
    if (reduced) {
      renderStatic();
    } else {
      frame = requestAnimationFrame(draw);
      window.addEventListener("pointermove", onPointer, { passive: true });
    }

    const observer = new ResizeObserver(() => {
      resize();
      if (reduced) renderStatic();
    });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
  }, [reduced]);

  return (
    <div className="bg-layer" aria-hidden="true">
      <div className="aurora">
        <span className="aurora-blob blob-1" />
        <span className="aurora-blob blob-2" />
        <span className="aurora-blob blob-3" />
        <span className="aurora-blob blob-4" />
      </div>
      <div className="bg-grid" />
      <canvas ref={canvasRef} className="bg-particles" />
      <div className="bg-noise" />
      <div className="bg-vignette" />
    </div>
  );
}
