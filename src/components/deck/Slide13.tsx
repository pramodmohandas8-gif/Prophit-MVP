"use client";

import { Logo } from "@/components/Logo";

export function Slide13() {
  return (
    <div
      className="relative h-full flex flex-col justify-between overflow-hidden"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Faint structural grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,169,98,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,98,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      {/* ── Top: Logo ── */}
      <header className="flex items-center gap-5 px-8 pt-10 sm:px-12 sm:pt-12">
        <Logo variant="dark" className="w-48 sm:w-52 shrink-0" />
        <div
          className="h-px w-24"
          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
          aria-hidden="true"
        />
      </header>

      {/* ── Center: Appendix ── */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div
          className="w-20 h-px mb-8 animate-[deck-fade-in_600ms_ease-out_both]"
          style={{ backgroundColor: "rgba(201,169,98,0.3)" }}
        />
        <h2
          className="font-[family-name:var(--font-playfair)] text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white animate-[deck-fade-in_600ms_ease-out_150ms_both]"
        >
          Appendix
        </h2>
        <div
          className="w-20 h-px mt-8 animate-[deck-fade-in_600ms_ease-out_300ms_both]"
          style={{ backgroundColor: "rgba(201,169,98,0.3)" }}
        />
      </div>

      {/* ── Bottom: Footer ── */}
      <footer className="flex items-center justify-between px-8 pb-8 sm:px-12 sm:pb-10 pt-3">
        <span className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.2em] text-neutral-500">
          Investor Presentation
        </span>
        <span className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.2em] text-neutral-500">
          2026
        </span>
      </footer>

      <style>{`
        @keyframes deck-fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
