"use client";

import { Logo } from "@/components/Logo";

/* ── Icons ── */
function IconRegulatory() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="3" y="4" width="16" height="14" rx="2" stroke="#C9A962" strokeWidth="1.2" />
      <path d="M7 1v4M15 1v4" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M3 9h16" stroke="#C9A962" strokeWidth="1.2" />
      <path d="M7 13h3M7 16h5" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconDigitization() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="4" y="3" width="14" height="16" rx="1.5" stroke="#C9A962" strokeWidth="1.2" />
      <path d="M8 7h6M8 10h6M8 13h4" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="16" cy="16" r="4" fill="#050505" stroke="#C9A962" strokeWidth="1.2" />
      <path d="M14.5 16l1 1 2-2" stroke="#C9A962" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconHardAssets() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="9" r="3.5" stroke="#C9A962" strokeWidth="1.2" />
      <circle cx="7" cy="15" r="3" stroke="#C9A962" strokeWidth="1.2" />
      <circle cx="15" cy="15" r="3" stroke="#C9A962" strokeWidth="1.2" />
    </svg>
  );
}

function IconTier2() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="2" y="12" width="4" height="7" rx="0.5" stroke="#C9A962" strokeWidth="1.2" />
      <rect x="9" y="8" width="4" height="11" rx="0.5" stroke="#C9A962" strokeWidth="1.2" />
      <rect x="16" y="4" width="4" height="15" rx="0.5" stroke="#C9A962" strokeWidth="1.2" />
      <path d="M4 10l7-6 7-1" stroke="#C9A962" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconAlternatives() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="8" stroke="#C9A962" strokeWidth="1.2" />
      <ellipse cx="11" cy="11" rx="3.5" ry="8" stroke="#C9A962" strokeWidth="1.2" />
      <path d="M3 11h16" stroke="#C9A962" strokeWidth="1.2" />
      <path d="M4.5 7h13M4.5 15h13" stroke="#C9A962" strokeWidth="0.8" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="11" stroke="#C9A962" strokeWidth="1.5" />
      <path d="M14 7v7.5l4.5 3" stroke="#C9A962" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const DRIVERS = [
  {
    icon: <IconRegulatory />,
    title: "Regulatory Clarity Improving",
    body: "RERA implementation and stricter compliance norms creating structure.",
  },
  {
    icon: <IconDigitization />,
    title: "Digitization of Land Records",
    body: "Government push for digital cadastre accelerating verification speed.",
  },
  {
    icon: <IconHardAssets />,
    title: "Investors Seeking Hard Assets",
    body: "Inflation hedging driving capital towards tangible asset classes.",
  },
  {
    icon: <IconTier2 />,
    title: "Tier 2 Growth Momentum",
    body: "Infrastructure expansion shifting value creation beyond metros.",
  },
  {
    icon: <IconAlternatives />,
    title: "Alternatives Gaining Adoption Globally",
    body: "Growing acceptance of REITs and fractional ownership models.",
  },
];

export function Slide08() {
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
          Market &amp; Timing
        </p>

        {/* Heading */}
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.06] mb-4 animate-[deck-fade-in_600ms_ease-out_100ms_both]">
          Why Now
        </h2>

        {/* Thin separator */}
        <div
          className="mb-6 animate-[deck-fade-in_600ms_ease-out_150ms_both]"
          style={{ height: "1px", backgroundColor: "rgba(201,169,98,0.15)", maxWidth: "100%" }}
        />

        {/* Two-column layout */}
        <div className="flex-1 flex gap-10 min-h-0">
          {/* Left: Driver cards */}
          <div className="flex-1 flex flex-col gap-3 min-w-0">
            {DRIVERS.map((d, i) => (
              <div
                key={i}
                className="flex items-center gap-5 rounded-lg border border-neutral-800/70 px-5 py-4"
                style={{
                  backgroundColor: "rgba(255,255,255,0.02)",
                  animation: `deck-fade-in 500ms ease-out ${200 + i * 100}ms both`,
                }}
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {d.icon}
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <h3 className="font-[family-name:var(--font-inter)] text-lg font-semibold text-white mb-0.5">
                    {d.title}
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-base text-neutral-500 leading-snug">
                    {d.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Window of Opportunity */}
          <div
            className="flex flex-col justify-center shrink-0"
            style={{
              width: "400px",
              animation: "deck-fade-in 600ms ease-out 500ms both",
            }}
          >
            {/* Clock icon + Heading row */}
            <div className="flex items-center gap-5 mb-5">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: "rgba(201,169,98,0.1)",
                  border: "1px solid rgba(201,169,98,0.25)",
                }}
              >
                <IconClock />
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-semibold text-white leading-tight">
                The Window of{" "}
                <span style={{ color: "#C9A962" }}>Opportunity</span>
              </h3>
            </div>

            {/* Paragraph */}
            <p className="font-[family-name:var(--font-inter)] text-base text-neutral-400 leading-relaxed mb-8">
              Historically, Indian real estate was too opaque for structured products. Today, digital infrastructure and policy frameworks have finally converged.
            </p>

            {/* Conclusion box */}
            <div
              className="rounded-md px-6 py-5"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                borderLeft: "3px solid #C9A962",
              }}
            >
              <p
                className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.2em] mb-2"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Conclusion
              </p>
              <p className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-white leading-snug">
                Conditions are aligning for{" "}
                <span className="underline underline-offset-4" style={{ textDecorationColor: "rgba(201,169,98,0.5)" }}>
                  participation infrastructure.
                </span>
              </p>
            </div>
          </div>
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
