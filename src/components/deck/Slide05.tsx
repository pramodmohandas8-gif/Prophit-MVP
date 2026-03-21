"use client";

import { Logo } from "@/components/Logo";

const LAYERS = [
  {
    number: "03",
    name: "Exchange Infrastructure",
    tag: "LONG-TERM",
    tagColor: "text-neutral-400 border-neutral-600",
    features: [
      "Rules-based transfer",
      "Data Intelligence",
      "Compliance-first secondary mechanism",
      "Institutional alignment",
    ],
    outcome: "Liquidity engineered through structure.",
  },
  {
    number: "02",
    name: "Structured Participation Marketplace",
    tag: null,
    tagColor: "",
    features: [
      "Smaller ticket sizes",
      "Indemnified participation",
      "KYC-gated investors",
      "Standardized documentation",
      "Monitoring + analytics",
    ],
    outcome: "Governed participation at scale.",
  },
  {
    number: "01",
    name: "Trust & Asset Readiness",
    tag: "FOUNDATION",
    tagColor: "text-neutral-400 border-neutral-600",
    features: [
      "Legal & Financial DD",
      "Compliance framework",
      "Custodian structure",
      "Capital protection architecture",
    ],
    outcome: "Verified, structured asset.",
  },
];

export function Slide05() {
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
      <div className="flex-1 flex flex-col px-8 sm:px-12 pt-6 min-h-0">
        {/* Section label */}
        <p
          className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.3em] mb-3 animate-[deck-fade-in_600ms_ease-out_both]"
          style={{ color: "#C9A962" }}
        >
          Architecture
        </p>

        {/* Heading */}
        <h2
          className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.06] mb-6 animate-[deck-fade-in_600ms_ease-out_100ms_both]"
        >
          The Three-Layer Participation Infrastructure
        </h2>

        {/* Thin separator below heading */}
        <div
          className="mb-6 animate-[deck-fade-in_600ms_ease-out_150ms_both]"
          style={{ height: "1px", backgroundColor: "rgba(201,169,98,0.15)", maxWidth: "100%" }}
        />

        {/* Layer stack */}
        <div className="flex-1 flex flex-col gap-3 min-h-0">
          {LAYERS.map((layer, i) => (
            <div
              key={layer.number}
              className="flex items-stretch rounded-lg border border-neutral-800/70 overflow-hidden"
              style={{
                animation: `deck-fade-in 500ms ease-out ${200 + i * 150}ms both`,
                flex: "1 1 0",
              }}
            >
              {/* Layer badge */}
              <div
                className="shrink-0 flex flex-col items-center justify-center px-5"
                style={{
                  backgroundColor: "rgba(201,169,98,0.06)",
                  borderRight: "1px solid rgba(201,169,98,0.12)",
                  minWidth: "80px",
                }}
              >
                <span
                  className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: "#C9A962" }}
                >
                  Layer
                </span>
                <span
                  className="font-[family-name:var(--font-playfair)] text-3xl font-semibold"
                  style={{ color: "rgba(201,169,98,0.5)" }}
                >
                  {layer.number}
                </span>
              </div>

              {/* Content area */}
              <div className="flex-1 flex items-center px-6 py-4 min-w-0">
                <div className="flex-1 min-w-0">
                  {/* Layer title + tag */}
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl font-semibold text-white">
                      {layer.name}
                    </h3>
                    {layer.tag && (
                      <span
                        className={`font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.15em] px-2 py-0.5 rounded border ${layer.tagColor}`}
                      >
                        {layer.tag}
                      </span>
                    )}
                  </div>

                  {/* Features in two columns */}
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                    {layer.features.map((feat, fi) => (
                      <p
                        key={fi}
                        className="font-[family-name:var(--font-inter)] text-base text-neutral-400 flex items-baseline gap-2"
                      >
                        <span style={{ color: "rgba(201,169,98,0.4)" }} aria-hidden="true">›</span>
                        {feat}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Outcome box */}
              <div
                className="shrink-0 flex items-center justify-center px-6"
                style={{ width: "280px" }}
              >
                <div
                  className="rounded-md border px-6 py-5 text-center w-full"
                  style={{ borderColor: "rgba(201,169,98,0.25)", minHeight: "90px", display: "flex", flexDirection: "column", justifyContent: "center" }}
                >
                  <p
                    className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.2em] mb-2"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    Outcome
                  </p>
                  <p
                    className="font-[family-name:var(--font-playfair)] text-xl font-semibold leading-snug"
                    style={{ color: "#C9A962" }}
                  >
                    {layer.outcome}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom: Footer ── */}
      <footer className="flex items-center justify-between px-8 pb-8 sm:px-12 sm:pb-10 pt-4">
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
