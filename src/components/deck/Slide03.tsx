"use client";

import { Logo } from "@/components/Logo";

const GRID_ITEMS = [
  { label: "Access Broadens" },
  { label: "Trust Compounds" },
  { label: "Governance Scales" },
  { label: "Participation becomes repeatable" },
];

export function Slide03() {
  return (
    <div
      className="relative h-full flex flex-col justify-between overflow-hidden"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Faint structural grid — matches Slide 01/02 */}
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

      {/* Vertical guide line — matches Slide 01/02 */}
      <div
        className="pointer-events-none absolute top-0 bottom-0"
        style={{
          left: "69%",
          width: "1px",
          backgroundColor: "rgba(255,255,255,0.025)",
        }}
        aria-hidden="true"
      />

      {/* ── Top: Logo — matches Slide 01/02 ── */}
      <header className="flex items-center gap-5 px-8 pt-10 sm:px-12 sm:pt-12">
        <Logo variant="dark" className="w-48 sm:w-52 shrink-0" />
        <div
          className="h-px w-24"
          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
          aria-hidden="true"
        />
      </header>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col px-8 sm:px-12 pt-8 min-h-0">
        {/* Section label */}
        <p
          className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4 animate-[deck-fade-in_600ms_ease-out_both]"
        >
          Strategic Outcome
        </p>

        {/* Heading */}
        <h2
          className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.06] animate-[deck-fade-in_600ms_ease-out_100ms_both]"
        >
          The Insight
        </h2>

        {/* Main statement + grid — shifted 40px right */}
        <div style={{ transform: "translateX(40px)" }}>
        <div className="mt-10 max-w-4xl mx-auto text-center animate-[deck-fade-in_600ms_ease-out_200ms_both]">
          <p className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-semibold text-white leading-snug">
            <span style={{ color: "#C9A962" }}>Liquidity</span> is not created by{" "}
            <span className="line-through text-neutral-500">trading</span>.
          </p>
        </div>

        {/* Subtext */}
        <p className="mt-6 text-center font-[family-name:var(--font-inter)] text-xl sm:text-2xl text-neutral-400 animate-[deck-fade-in_600ms_ease-out_300ms_both]">
          Liquidity emerges when:
        </p>

        {/* Two-column insight grid */}
        <div className="relative mt-10 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-24 gap-y-8 sm:gap-y-10">
          {/* Vertical separator */}
          <div
            className="hidden sm:block absolute top-0 bottom-0 left-1/2 -translate-x-px w-px"
            style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            aria-hidden="true"
          />

          {GRID_ITEMS.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-5"
              style={{
                animation: `deck-fade-in 500ms ease-out ${400 + i * 100}ms both`,
              }}
            >
              <div
                className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center"
                style={{ border: "1px solid rgba(201,169,98,0.3)" }}
                aria-hidden="true"
              >
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                  <path d="M1 5.5L5 9.5L13 1.5" stroke="#C9A962" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="font-[family-name:var(--font-inter)] text-xl sm:text-2xl font-medium text-white">
                {item.label}
              </p>
            </div>
          ))}
        </div>
        </div>

        {/* Bottom emphasis block */}
        <div
          className="mt-14 mb-2 max-w-4xl mx-auto w-full rounded-lg border border-neutral-800 p-6 text-center animate-[deck-fade-in_600ms_ease-out_800ms_both]"
          style={{ transform: "translateX(-60px) translateY(10px)" }}
        >
          <p className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-semibold text-white">
            Participation first.{" "}
            <span style={{ color: "#C9A962" }}>Liquidity later.</span>
          </p>
        </div>
      </div>

      {/* ── Bottom: Footer — matches Slide 01/02 ── */}
      <footer className="flex items-center justify-between px-8 pb-8 sm:px-12 sm:pb-10">
        <span className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.2em] text-neutral-500">
          Investor Presentation
        </span>
        <span className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.2em] text-neutral-500">
          2026
        </span>
      </footer>

      <style>{`
        @keyframes deck-fade-in {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
