"use client";

import { Logo } from "@/components/Logo";

const BARRIERS = [
  {
    keyword: "Trust",
    subtitle: "Opaque Ownership & Pricing",
    body: "Lack of standardized data leads to information asymmetry",
  },
  {
    keyword: "Affordability",
    subtitle: "High Ticket Size",
    body: "Prohibitive entry barrier of \u20B950L\u2013\u20B95Cr+, locking out retail capital",
  },
  {
    keyword: "Accessibility",
    subtitle: "Geographically Restricted",
    body: "Investors are forced into local markets they can physically verify",
  },
  {
    keyword: "Executional Friction",
    subtitle: "Heavy Documentation",
    body: "Non-standardized processes create friction and legal complexity",
  },
];

export function Slide02() {
  return (
    <div
      className="relative h-full flex flex-col justify-between overflow-hidden"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Faint structural grid — matches Slide 01 */}
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

      {/* Vertical guide line — matches Slide 01 */}
      <div
        className="pointer-events-none absolute top-0 bottom-0"
        style={{
          left: "69%",
          width: "1px",
          backgroundColor: "rgba(255,255,255,0.025)",
        }}
        aria-hidden="true"
      />

      {/* ── Top: Logo — matches Slide 01 exactly ── */}
      <header className="flex items-center gap-5 px-8 pt-10 sm:px-12 sm:pt-12">
        <Logo variant="dark" className="w-48 sm:w-52 shrink-0" />
        <div
          className="h-px w-24"
          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
          aria-hidden="true"
        />
      </header>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col px-8 sm:px-12 pt-10">
        {/* Section label */}
        <p
          className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4 animate-[deck-fade-in_600ms_ease-out_both]"
        >
          Problem Statement
        </p>

        {/* Heading */}
        <div className="mb-10 animate-[deck-fade-in_600ms_ease-out_100ms_both]">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.06]">
            The Structural Gap
          </h2>
          <p className="mt-4 whitespace-nowrap font-[family-name:var(--font-inter)] text-lg text-neutral-400 leading-relaxed">
            Indian real estate is defined by structural barriers that restrict broader participation.
          </p>
        </div>

        {/* Two-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 lg:gap-0 flex-1 min-h-0">
          {/* LEFT: Barriers in individual boxes */}
          <div className="lg:border-r lg:border-neutral-800 lg:pr-12 space-y-4 overflow-y-auto">
            {BARRIERS.map((b, i) => (
              <div
                key={i}
                className="rounded-sm border border-neutral-800/60 px-5 py-4"
                style={{
                  animation: `deck-fade-in 500ms ease-out ${200 + i * 100}ms both`,
                }}
              >
                <p className="font-[family-name:var(--font-inter)] text-lg sm:text-xl font-medium text-white">
                  <span style={{ color: "#C9A962" }}>{b.keyword}</span>
                  <span className="text-white font-normal text-base">
                    {" "}· {b.subtitle}
                  </span>
                </p>
                <p className="mt-1.5 font-[family-name:var(--font-inter)] text-base text-white leading-relaxed">
                  {b.body}
                </p>
              </div>
            ))}
          </div>

          {/* RIGHT: Verdict — flush aligned with left column */}
          <div
            className="lg:pl-12 flex flex-col justify-start"
            style={{ animation: "deck-fade-in 500ms ease-out 650ms both" }}
          >
            <p className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.3em] text-neutral-500 mb-5">
              The Result
            </p>
            <div className="space-y-3 mb-8">
              <p className="font-[family-name:var(--font-inter)] text-lg text-white leading-relaxed">
                Participation is narrow.
              </p>
              <p className="font-[family-name:var(--font-inter)] text-lg text-white leading-relaxed">
                Liquidity never compounds.
              </p>
            </div>

            <div className="border-t border-neutral-800 mb-8" />

            <p className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.3em] text-neutral-500 mb-5">
              The Core Insight
            </p>
            <p className="font-[family-name:var(--font-inter)] text-sm text-neutral-300 leading-relaxed">
              This is{" "}
              <span className="text-lg font-semibold text-white">
                not a demand problem.
              </span>
            </p>
            <p className="mt-3 font-[family-name:var(--font-playfair)] text-xl sm:text-2xl font-semibold text-white leading-snug">
              It is a{" "}
              <span style={{ color: "#C9A962" }}>
                market infrastructure problem
              </span>
              .
            </p>
          </div>
        </div>
      </div>

      {/* ── Bottom: Footer — matches Slide 01 exactly ── */}
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
