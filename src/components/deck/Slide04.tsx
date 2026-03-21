"use client";

import { Logo } from "@/components/Logo";

const CAPABILITIES = [
  "Makes assets participation-ready",
  "Standardizes documentation",
  "Reduces minimum entry size",
  "Preserves governance at scale",
  "Enables structured ownership",
];

export function Slide04() {
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

      {/* Vertical guide line */}
      <div
        className="pointer-events-none absolute top-0 bottom-0"
        style={{
          left: "69%",
          width: "1px",
          backgroundColor: "rgba(255,255,255,0.025)",
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

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col px-8 sm:px-12 pt-8">
        {/* Section label */}
        <p
          className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.3em] mb-4 animate-[deck-fade-in_600ms_ease-out_both]"
          style={{ color: "#C9A962" }}
        >
          Core Distinction
        </p>

        {/* Heading */}
        <h2
          className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.06] mb-8 animate-[deck-fade-in_600ms_ease-out_100ms_both]"
        >
          Prophit Is Not a Marketplace
        </h2>

        {/* Two-column layout with center divider */}
        <div className="flex-1 flex items-center min-h-0">
          <div className="flex w-full items-stretch" style={{ transform: "translateX(100px) translateY(-40px)" }}>
            {/* LEFT: Positioning card */}
            <div
              className="flex-1 pr-10"
              style={{ animation: "deck-fade-in 500ms ease-out 200ms both" }}
            >
              <div className="rounded-lg border border-neutral-800 p-8 h-full flex flex-col">
                <p className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.3em] text-neutral-500 mb-6">
                  Our Positioning
                </p>
                <p className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-semibold text-white leading-snug">
                  We are building{" "}
                  <span className="text-3xl sm:text-4xl font-bold" style={{ color: "#C9A962" }}>
                    market infrastructure
                  </span>
                  , not listings.
                </p>

                <div className="mt-auto pt-8">
                  <div
                    className="mb-6"
                    style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)", maxWidth: "280px" }}
                  />
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 font-[family-name:var(--font-inter)]">
                      <span className="text-base text-neutral-500 line-through">Listings</span>
                      <span className="text-neutral-600">→</span>
                      <span className="text-base font-semibold text-white">Structured Access</span>
                    </div>
                    <div className="flex items-center gap-3 font-[family-name:var(--font-inter)]">
                      <span className="text-base text-neutral-500 line-through">Aggregation</span>
                      <span className="text-neutral-600">→</span>
                      <span className="text-base font-semibold text-white">Market Rails</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CENTER: Vertical divider */}
            <div
              className="w-px shrink-0 self-stretch"
              style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
              aria-hidden="true"
            />

            {/* RIGHT: Infrastructure capabilities */}
            <div
              className="flex-1 pl-10 flex flex-col justify-center"
              style={{ animation: "deck-fade-in 500ms ease-out 400ms both" }}
            >
              <p className="font-[family-name:var(--font-inter)] text-xl sm:text-2xl text-neutral-400 mb-8">
                Infrastructure that:
              </p>

              <div className="space-y-5">
                {CAPABILITIES.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-5"
                    style={{
                      animation: `deck-fade-in 500ms ease-out ${500 + i * 100}ms both`,
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-md shrink-0 flex items-center justify-center"
                      style={{ border: "1px solid rgba(201,169,98,0.35)" }}
                    >
                      <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                        <path
                          d="M1 5.5L5 9.5L13 1.5"
                          stroke="#C9A962"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="font-[family-name:var(--font-inter)] text-lg sm:text-xl font-medium text-white">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom: Footer ── */}
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
