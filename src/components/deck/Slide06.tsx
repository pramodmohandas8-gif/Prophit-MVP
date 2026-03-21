"use client";

import { Logo } from "@/components/Logo";

/* ── Icon components ── */
function IconStandard() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="2" width="14" height="3" rx="0.5" stroke="#C9A962" strokeWidth="1.2" />
      <rect x="3" y="8" width="14" height="3" rx="0.5" stroke="#C9A962" strokeWidth="1.2" />
      <rect x="3" y="14" width="9" height="3" rx="0.5" stroke="#C9A962" strokeWidth="1.2" />
      <circle cx="16" cy="15.5" r="1" fill="#C9A962" />
    </svg>
  );
}

function IconDatabase() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <ellipse cx="10" cy="5" rx="7" ry="2.5" stroke="#C9A962" strokeWidth="1.2" />
      <path d="M3 5v4c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5V5" stroke="#C9A962" strokeWidth="1.2" />
      <path d="M3 9v4c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5V9" stroke="#C9A962" strokeWidth="1.2" />
    </svg>
  );
}

function IconGovernance() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L4 6h12L10 2z" stroke="#C9A962" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M6 6v8M10 6v8M14 6v8" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" />
      <rect x="3" y="14" width="14" height="2.5" rx="0.5" stroke="#C9A962" strokeWidth="1.2" />
    </svg>
  );
}

function IconNetwork() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 4h14L13 10H7L3 4z" stroke="#C9A962" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M7 10h6l-2 4H9l-2-4z" stroke="#C9A962" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M10 14v3" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconTrust() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="8" width="14" height="9" rx="1" stroke="#C9A962" strokeWidth="1.2" />
      <path d="M6 8V5a4 4 0 0 1 8 0v3" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="10" cy="13" r="1.5" fill="#C9A962" />
    </svg>
  );
}

const MOATS = [
  {
    icon: <IconStandard />,
    title: "Standardization Framework",
    body: "Establishing the first universal data standard for land participation, creating high switching costs for future competitors.",
  },
  {
    icon: <IconDatabase />,
    title: "Data Accumulation Layer",
    body: "Proprietary pricing and liquidity data on private assets that becomes more predictive with every transaction.",
  },
  {
    icon: <IconGovernance />,
    title: "Governance Processes",
    body: "Automated compliance workflows that are difficult to replicate without deep regulatory integration.",
  },
  {
    icon: <IconNetwork />,
    title: "Network Depth",
    body: "Two-sided liquidity network where developer supply attracts investor demand, creating a flywheel effect.",
  },
  {
    icon: <IconTrust />,
    title: "Institutional Trust",
    body: "First-mover advantage in building regulatory credibility and custodian partnerships.",
  },
];

const BOTTOM_PHRASES = [
  { icon: "check", text: "Trust compounds." },
  { icon: "layers", text: "Structure scales." },
  { icon: "shield", text: "Data defends." },
];

export function Slide06() {
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
          Defensibility
        </p>

        {/* Heading */}
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.06] mb-6 animate-[deck-fade-in_600ms_ease-out_100ms_both]">
          Why this compounds
        </h2>

        {/* Card grid: 3 top + 2 bottom centered */}
        <div className="flex-1 flex flex-col gap-4 justify-center min-h-0" style={{ marginTop: "-110px" }}>
          {/* Top row: 3 cards */}
          <div className="grid grid-cols-3 gap-4">
            {MOATS.slice(0, 3).map((m, i) => (
              <MoatCard key={i} moat={m} index={i} />
            ))}
          </div>

          {/* Bottom row: 2 cards centered */}
          <div className="flex gap-4 justify-center">
            <div className="w-[calc(33.333%-0.67rem)]">
              <MoatCard moat={MOATS[3]} index={3} />
            </div>
            <div className="w-[calc(33.333%-0.67rem)]">
              <MoatCard moat={MOATS[4]} index={4} />
            </div>
          </div>
        </div>

        {/* Bottom emphasis bar */}
        <div
          className="mx-auto rounded-full border px-8 py-3 flex items-center gap-6 animate-[deck-fade-in_600ms_ease-out_900ms_both]"
          style={{ marginTop: "-86px", borderColor: "rgba(201,169,98,0.2)", backgroundColor: "rgba(201,169,98,0.04)" }}
        >
          {BOTTOM_PHRASES.map((p, i) => (
            <div key={i} className="flex items-center gap-6">
              {i > 0 && (
                <div
                  className="w-1 h-1 rounded-full shrink-0"
                  style={{ backgroundColor: "rgba(201,169,98,0.4)" }}
                  aria-hidden="true"
                />
              )}
              <div className="flex items-center gap-2.5">
                <BottomIcon type={p.icon} />
                <span className="font-[family-name:var(--font-inter)] text-base font-semibold text-white whitespace-nowrap">
                  {p.text}
                </span>
              </div>
            </div>
          ))}
        </div>
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

/* ── Moat Card ── */
function MoatCard({
  moat,
  index,
}: {
  moat: (typeof MOATS)[number];
  index: number;
}) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <div
      className="relative rounded-lg border border-neutral-800/70 p-5 flex flex-col overflow-hidden"
      style={{
        animation: `deck-fade-in 500ms ease-out ${200 + index * 120}ms both`,
      }}
    >
      {/* Faded number */}
      <span
        className="absolute top-3 right-4 font-[family-name:var(--font-playfair)] text-5xl font-bold pointer-events-none select-none"
        style={{ color: "rgba(255,255,255,0.08)" }}
        aria-hidden="true"
      >
        {num}
      </span>

      {/* Icon + Title row */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-md flex items-center justify-center shrink-0"
          style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {moat.icon}
        </div>
        <h3 className="font-[family-name:var(--font-inter)] text-lg font-semibold text-white">
          {moat.title}
        </h3>
      </div>

      {/* Body */}
      <p className="font-[family-name:var(--font-inter)] text-base text-neutral-400 leading-relaxed">
        {moat.body}
      </p>
    </div>
  );
}

/* ── Bottom bar icons ── */
function BottomIcon({ type }: { type: string }) {
  if (type === "check") {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="8" fill="#C9A962" />
        <path d="M5.5 9L8 11.5L12.5 6.5" stroke="#050505" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "layers") {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2L2 6l7 4 7-4-7-4z" fill="#C9A962" />
        <path d="M2 9l7 4 7-4" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12l7 4 7-4" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  // shield
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 1.5L3 4v5c0 3.5 2.5 6.2 6 7.5 3.5-1.3 6-4 6-7.5V4L9 1.5z" fill="#C9A962" />
    </svg>
  );
}
