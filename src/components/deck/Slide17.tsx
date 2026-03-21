"use client";

import { Logo } from "@/components/Logo";

const VISIONS = [
  {
    icon: "ref",
    title: "Market Reference Layer",
    body: "For land participation data and pricing benchmarks.",
  },
  {
    icon: "std",
    title: "Standard-Setter",
    body: "Defining the gold standard for structured access.",
  },
  {
    icon: "cap",
    title: "Capital Discipline Engine",
    body: "Enforcing financial rigour for developers.",
  },
  {
    icon: "wealth",
    title: "Wealth Creation Platform",
    body: "Democratizing high-yield asset ownership.",
  },
];

const COMPARABLES = [
  { name: "NSE", full: "National Stock Exchange", tag: "For Equity" },
  { name: "CDSL", full: "Central Depository Services", tag: "For Custody" },
  { name: "CRISIL", full: "Risk Intelligence", tag: "For Structured Risk" },
];

function VisionIcon({ type }: { type: string }) {
  const c = "#C9A962";
  if (type === "ref") return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 4h5v5H4zM11 4h5v5h-5zM4 11h5v5H4z" stroke={c} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M13 13l3 3M11 14a3 3 0 1 0 6 0 3 3 0 0 0-6 0z" stroke={c} strokeWidth="1.2" />
    </svg>
  );
  if (type === "std") return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L4 5v4c0 4 2.5 7 6 8.5 3.5-1.5 6-4.5 6-8.5V5l-6-3z" stroke={c} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M7.5 10l2 2 3.5-4" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (type === "cap") return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke={c} strokeWidth="1.2" />
      <path d="M10 6v4l2.5 2.5" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 3l3-1 3 1" stroke={c} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2l2.5 5H18l-4 3.5 1.5 5.5-5.5-3.5L4.5 16l1.5-5.5L2 7h5.5L10 2z" stroke={c} strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

export function Slide17() {
  return (
    <div
      className="relative h-full flex flex-col justify-between overflow-hidden"
      style={{ backgroundColor: "#050505" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(201,169,98,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,98,0.03) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute top-0 bottom-0" style={{ left: "69%", width: "1px", backgroundColor: "rgba(255,255,255,0.025)" }} aria-hidden="true" />

      <header className="flex items-center gap-5 px-8 pt-10 sm:px-12 sm:pt-12">
        <Logo variant="dark" className="w-48 sm:w-52 shrink-0" />
        <div className="h-px w-24" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} aria-hidden="true" />
      </header>

      <div className="flex-1 flex flex-col px-8 sm:px-12 pt-6 min-h-0">
        <p className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.3em] mb-3 animate-[deck-fade-in_600ms_ease-out_both]" style={{ color: "#C9A962" }}>
          Long-Term Vision
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.06] mb-4 animate-[deck-fade-in_600ms_ease-out_100ms_both]">
          What Prophit Becomes
        </h2>
        <div className="mb-5 animate-[deck-fade-in_600ms_ease-out_150ms_both]" style={{ height: "1px", backgroundColor: "rgba(201,169,98,0.15)" }} />

        {/* Vision cards 2x2 */}
        <div className="grid grid-cols-2 gap-4">
          {VISIONS.map((v, i) => (
            <div
              key={i}
              className="rounded-lg border border-neutral-800/70 px-6 py-5 flex items-start gap-4"
              style={{ animation: `deck-fade-in 500ms ease-out ${200 + i * 120}ms both` }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: "rgba(201,169,98,0.1)", border: "1px solid rgba(201,169,98,0.2)" }}
              >
                <VisionIcon type={v.icon} />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-inter)] text-lg font-semibold text-white mb-1" style={{ color: "#C9A962" }}>
                  {v.title}
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-base text-neutral-400 leading-snug">
                  {v.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Conceptually Comparable To */}
        <div className="mt-6">
          <p
            className="font-[family-name:var(--font-inter)] text-[11px] uppercase tracking-[0.2em] mb-3 animate-[deck-fade-in_600ms_ease-out_700ms_both]"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Conceptually Comparable To
          </p>
          <div
            className="mb-4 animate-[deck-fade-in_600ms_ease-out_750ms_both]"
            style={{ height: "1px", backgroundColor: "rgba(201,169,98,0.1)" }}
          />

          <div className="grid grid-cols-3 gap-4">
            {COMPARABLES.map((comp, i) => (
              <div
                key={i}
                className="rounded-lg border border-neutral-800/70 py-5 flex flex-col items-center text-center"
                style={{ animation: `deck-fade-in 500ms ease-out ${800 + i * 100}ms both` }}
              >
                <h4 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white mb-1">
                  {comp.name}
                </h4>
                <p className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.15em] text-neutral-500 mb-3">
                  {comp.full}
                </p>
                <span
                  className="font-[family-name:var(--font-inter)] text-xs px-3 py-1 rounded-full border"
                  style={{ borderColor: "rgba(201,169,98,0.3)", color: "#C9A962", backgroundColor: "rgba(201,169,98,0.06)" }}
                >
                  {comp.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div
          className="rounded-lg px-8 py-4 mt-4 mb-2 flex flex-col items-center text-center animate-[deck-fade-in_600ms_ease-out_1000ms_both]"
          style={{ backgroundColor: "rgba(201,169,98,0.04)", border: "1px solid rgba(201,169,98,0.15)" }}
        >
          <span
            className="font-[family-name:var(--font-playfair)] text-2xl font-bold pointer-events-none mb-1"
            style={{ color: "rgba(201,169,98,0.25)" }}
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <p className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-white">
            This is infrastructure.{" "}
            <span style={{ color: "#C9A962" }}>Infrastructure compounds.</span>
          </p>
        </div>
      </div>

      <footer className="flex items-center justify-between px-8 pb-8 sm:px-12 sm:pb-10 pt-3">
        <span className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.2em] text-neutral-500">Investor Presentation</span>
        <span className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.2em] text-neutral-500">2026</span>
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
