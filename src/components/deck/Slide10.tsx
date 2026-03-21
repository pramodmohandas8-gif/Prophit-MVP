"use client";

import { Logo } from "@/components/Logo";

/* ── Tiny bullet icons for each phase ── */
function IconShield() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5L3 3.5v4c0 3 2 5.2 5 6 3-.8 5-3 5-6v-4L8 1.5z" stroke="#C9A962" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}
function IconTemplate() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="2" width="12" height="12" rx="1.5" stroke="#C9A962" strokeWidth="1" />
      <path d="M2 6h12M6 6v8" stroke="#C9A962" strokeWidth="1" />
    </svg>
  );
}
function IconDiamond() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2L3 7l5 7 5-7-5-5z" stroke="#C9A962" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}
function IconMonitor() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="3" width="12" height="8" rx="1" stroke="#C9A962" strokeWidth="1" />
      <path d="M6 13h4M8 11v2" stroke="#C9A962" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
function IconLayers() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2L2 5.5l6 3.5 6-3.5L8 2z" stroke="#C9A962" strokeWidth="1" strokeLinejoin="round" />
      <path d="M2 8l6 3.5L14 8" stroke="#C9A962" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 10.5L8 14l6-3.5" stroke="#C9A962" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconMap() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 3l4 1.5v9L2 12V3zM6 4.5l4-1.5v9l-4 1.5M10 3l4 1.5v9L10 12" stroke="#C9A962" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}
function IconData() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <ellipse cx="8" cy="4" rx="5" ry="2" stroke="#C9A962" strokeWidth="1" />
      <path d="M3 4v3.5c0 1.1 2.24 2 5 2s5-.9 5-2V4" stroke="#C9A962" strokeWidth="1" />
      <path d="M3 7.5V11c0 1.1 2.24 2 5 2s5-.9 5-2V7.5" stroke="#C9A962" strokeWidth="1" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="6" cy="5" r="2.5" stroke="#C9A962" strokeWidth="1" />
      <path d="M1 13c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" stroke="#C9A962" strokeWidth="1" strokeLinecap="round" />
      <circle cx="11.5" cy="5.5" r="2" stroke="#C9A962" strokeWidth="0.8" />
      <path d="M13 13c1.2-.7 2-2 2-3.5" stroke="#C9A962" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}
function IconTransfer() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 6h10M13 6l-2.5-2.5M13 10H3M3 10l2.5 2.5" stroke="#C9A962" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconInstitution() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2L3 5h10L8 2z" stroke="#C9A962" strokeWidth="1" strokeLinejoin="round" />
      <path d="M4.5 5v6M8 5v6M11.5 5v6" stroke="#C9A962" strokeWidth="1" />
      <path d="M3 11h10M3 13h10" stroke="#C9A962" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
function IconGlobe() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="#C9A962" strokeWidth="1" />
      <ellipse cx="8" cy="8" rx="2.5" ry="6" stroke="#C9A962" strokeWidth="0.8" />
      <path d="M2 8h12" stroke="#C9A962" strokeWidth="0.8" />
    </svg>
  );
}
function IconStar() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2l1.8 3.6L14 6.4l-3 2.9.7 4.1L8 11.5l-3.7 1.9.7-4.1-3-2.9 4.2-.8L8 2z" stroke="#C9A962" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}

const PHASES = [
  {
    phase: 1,
    timeline: "0–18 Months",
    name: "Trust Foundation",
    subtitle: "Establish governance core & initial assets",
    borderColor: "rgba(255,255,255,0.12)",
    badgeStyle: { backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.12)" },
    items: [
      { icon: <IconShield />, text: "Build governance core & tech foundation" },
      { icon: <IconTemplate />, text: "Standardize structuring templates" },
      { icon: <IconDiamond />, text: "Launch limited curated assets" },
      { icon: <IconMonitor />, text: "Deploy monitoring backbone" },
    ],
    goal: "Credibility, not scale.",
    goalBorder: "rgba(255,255,255,0.12)",
  },
  {
    phase: 2,
    timeline: "18–36 Months",
    name: "Structured Scale",
    subtitle: "Expand throughput & distribution depth",
    borderColor: "rgba(201,169,98,0.3)",
    badgeStyle: { backgroundColor: "rgba(201,169,98,0.12)", color: "#C9A962", border: "1px solid rgba(201,169,98,0.3)" },
    items: [
      { icon: <IconLayers />, text: "Increase asset throughput & variety" },
      { icon: <IconMap />, text: "Expand geographic footprint" },
      { icon: <IconData />, text: "Strengthen data & analytics layer" },
      { icon: <IconUsers />, text: "Deepen distribution channels" },
    ],
    goal: "Responsible expansion.",
    goalBorder: "rgba(201,169,98,0.3)",
  },
  {
    phase: 3,
    timeline: "36–60 Months",
    name: "Engineered Liquidity",
    subtitle: "Secondary markets & institutional integration",
    borderColor: "#C9A962",
    badgeStyle: { backgroundColor: "rgba(201,169,98,0.15)", color: "#C9A962", border: "1px solid rgba(201,169,98,0.5)" },
    items: [
      { icon: <IconTransfer />, text: "Rules-based secondary transfer" },
      { icon: <IconInstitution />, text: "Institutional capital participation" },
      { icon: <IconGlobe />, text: "Capital markets integration" },
      { icon: <IconStar />, text: "Full ecosystem maturity" },
    ],
    goal: "Structure-driven liquidity.",
    goalBorder: "#C9A962",
  },
];

export function Slide10() {
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
          Execution Roadmap
        </p>

        {/* Heading */}
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.06] mb-4 animate-[deck-fade-in_600ms_ease-out_100ms_both]">
          Phased Infrastructure Build
        </h2>

        {/* Thin separator */}
        <div
          className="mb-6 animate-[deck-fade-in_600ms_ease-out_150ms_both]"
          style={{ height: "1px", backgroundColor: "rgba(201,169,98,0.15)", maxWidth: "100%" }}
        />

        {/* Phase columns */}
        <div className="flex-1 grid grid-cols-3 gap-5 min-h-0">
          {PHASES.map((phase, i) => (
            <div
              key={phase.phase}
              className="flex flex-col rounded-lg border border-neutral-800/70 overflow-hidden"
              style={{
                animation: `deck-fade-in 500ms ease-out ${200 + i * 150}ms both`,
              }}
            >
              {/* Colored top border */}
              <div
                className="h-[3px] shrink-0"
                style={{ backgroundColor: phase.borderColor }}
              />

              {/* Card content */}
              <div className="flex-1 flex flex-col p-6">
                {/* Phase badge + timeline */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="font-[family-name:var(--font-inter)] text-[11px] uppercase tracking-[0.15em] px-3 py-1 rounded-full"
                    style={phase.badgeStyle}
                  >
                    Phase {phase.phase}
                  </span>
                  <span
                    className="font-[family-name:var(--font-inter)] text-[11px] uppercase tracking-[0.15em]"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    {phase.timeline}
                  </span>
                </div>

                {/* Phase name */}
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-white mb-1.5">
                  {phase.name}
                </h3>

                {/* Subtitle */}
                <p className="font-[family-name:var(--font-inter)] text-sm text-neutral-500 mb-5">
                  {phase.subtitle}
                </p>

                {/* Separator */}
                <div
                  className="mb-5"
                  style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.06)" }}
                />

                {/* Items */}
                <div className="flex flex-col gap-3.5 flex-1">
                  {phase.items.map((item, ii) => (
                    <div key={ii} className="flex items-center gap-3">
                      <span className="shrink-0">{item.icon}</span>
                      <span className="font-[family-name:var(--font-inter)] text-base text-neutral-300">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Strategic goal box */}
                <div
                  className="rounded-md px-5 py-4 mt-5"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    borderLeft: `3px solid ${phase.goalBorder}`,
                  }}
                >
                  <p
                    className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.2em] mb-1.5"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    Strategic Goal
                  </p>
                  <p className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-white">
                    {phase.goal}
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
