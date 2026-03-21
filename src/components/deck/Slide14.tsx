"use client";

import { Logo } from "@/components/Logo";

function IconInvestor() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke="#C9A962" strokeWidth="1.3" />
      <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke="#C9A962" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function IconDeveloper() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4 20h16M12 4l8 8H4l8-8z" stroke="#C9A962" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M10 12v8M14 12v8" stroke="#C9A962" strokeWidth="1.3" />
    </svg>
  );
}

function IconMarket() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="14" width="4" height="6" rx="0.5" stroke="#C9A962" strokeWidth="1.3" />
      <rect x="10" y="9" width="4" height="11" rx="0.5" stroke="#C9A962" strokeWidth="1.3" />
      <rect x="17" y="4" width="4" height="16" rx="0.5" stroke="#C9A962" strokeWidth="1.3" />
      <path d="M5 12l7-6 7-2" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const COLUMNS = [
  {
    icon: <IconInvestor />,
    title: "For Investors",
    points: [
      "Forced single-asset exposure",
      "No geographic diversification",
      "Limited transparency",
      "No monitoring post-investment",
    ],
  },
  {
    icon: <IconDeveloper />,
    title: "For Developers",
    points: [
      "Narrow capital pool",
      "Sequential sales cycles",
      "Early capital lock-in",
      "Slow absorption rates",
    ],
  },
  {
    icon: <IconMarket />,
    title: "For the Market",
    points: [
      "No consistent price discovery",
      "No structured ownership layer",
      "No scalable participation memory",
    ],
  },
];

export function Slide14() {
  return (
    <div
      className="relative h-full flex flex-col justify-between overflow-hidden"
      style={{ backgroundColor: "#050505" }}
    >
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
      <div
        className="pointer-events-none absolute top-0 bottom-0"
        style={{ left: "69%", width: "1px", backgroundColor: "rgba(255,255,255,0.025)" }}
        aria-hidden="true"
      />

      <header className="flex items-center gap-5 px-8 pt-10 sm:px-12 sm:pt-12">
        <Logo variant="dark" className="w-48 sm:w-52 shrink-0" />
        <div className="h-px w-24" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} aria-hidden="true" />
      </header>

      <div className="flex-1 flex flex-col px-8 sm:px-12 pt-6 min-h-0">
        <p
          className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.3em] mb-3 animate-[deck-fade-in_600ms_ease-out_both]"
          style={{ color: "#C9A962" }}
        >
          Problem Analysis
        </p>

        <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.06] mb-4 animate-[deck-fade-in_600ms_ease-out_100ms_both]">
          What Restricted Participation Breaks
        </h2>

        <div
          className="mb-6 animate-[deck-fade-in_600ms_ease-out_150ms_both]"
          style={{ height: "1px", backgroundColor: "rgba(201,169,98,0.15)" }}
        />

        {/* 3 columns */}
        <div className="flex-1 grid grid-cols-3 gap-5 min-h-0">
          {COLUMNS.map((col, i) => (
            <div
              key={i}
              className="rounded-lg border border-neutral-800/70 p-6 flex flex-col"
              style={{ animation: `deck-fade-in 500ms ease-out ${200 + i * 150}ms both` }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 mb-5"
                style={{ backgroundColor: "rgba(201,169,98,0.1)", border: "1px solid rgba(201,169,98,0.2)" }}
              >
                {col.icon}
              </div>

              <h3 className="font-[family-name:var(--font-inter)] text-xl font-semibold text-white mb-5">
                {col.title}
              </h3>

              <div
                className="mb-5"
                style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.06)" }}
              />

              <div className="flex flex-col gap-4">
                {col.points.map((p, pi) => (
                  <div key={pi} className="flex items-baseline gap-3">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                      style={{ backgroundColor: "rgba(201,169,98,0.4)" }}
                    />
                    <span className="font-[family-name:var(--font-inter)] text-lg text-neutral-400">
                      {p}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Critical Insight bar */}
        <div
          className="relative w-full rounded-lg px-8 py-5 flex items-center justify-between animate-[deck-fade-in_600ms_ease-out_800ms_both]"
          style={{
            marginTop: "16px",
            marginBottom: "4px",
            backgroundColor: "rgba(255,255,255,0.02)",
            borderLeft: "3px solid #C9A962",
          }}
        >
          <div>
            <p
              className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.2em] mb-1.5"
              style={{ color: "rgba(201,169,98,0.6)" }}
            >
              Critical Insight
            </p>
            <p className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-white">
              Liquidity cannot emerge where{" "}
              <span style={{ color: "#C9A962" }}>participation is constrained.</span>
            </p>
          </div>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="shrink-0 ml-6">
            <rect x="8" y="14" width="16" height="13" rx="2" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
            <path d="M11 14V10a5 5 0 0 1 10 0v4" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="16" cy="21" r="1.5" fill="rgba(255,255,255,0.12)" />
          </svg>
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
