"use client";

import { Logo } from "@/components/Logo";

const SUPPLY = [
  { icon: "dev", text: "Curated developer onboarding" },
  { icon: "legal", text: "Legal & structuring support" },
  { icon: "land", text: "Land-bank partnerships" },
  { icon: "filter", text: "Governance-first screening" },
];

const DEMAND = [
  { icon: "sub", text: "Subscription-based access" },
  { icon: "edu", text: "Education-first positioning" },
  { icon: "kyc", text: "KYC-gated participation" },
  { icon: "research", text: "Digital research tools" },
  { icon: "longterm", text: "Long-term aligned capital base" },
];

function StratIcon({ type }: { type: string }) {
  const c = "#C9A962";
  if (type === "dev") return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="7" cy="6" r="3" stroke={c} strokeWidth="1.1" />
      <path d="M1 15c0-2.5 2.7-4.5 6-4.5" stroke={c} strokeWidth="1.1" strokeLinecap="round" />
      <path d="M13 10v6M10 13h6" stroke={c} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
  if (type === "legal") return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2v14M5 5l4-3 4 3" stroke={c} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 5l3 5h-6l3-5zM15 5l3 5h-6l3-5z" stroke={c} strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M4 16h10" stroke={c} strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
  if (type === "land") return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2 14l4-3 3 2 4-4 3 2" stroke={c} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 16h14" stroke={c} strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="13" cy="5" r="2" stroke={c} strokeWidth="1.1" />
    </svg>
  );
  if (type === "filter") return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2 3h14l-5 6v5l-4 2V9L2 3z" stroke={c} strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  );
  if (type === "sub") return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="3" y="4" width="12" height="10" rx="1.5" stroke={c} strokeWidth="1.1" />
      <path d="M3 7h12" stroke={c} strokeWidth="1.1" />
      <path d="M6 11h3" stroke={c} strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
  if (type === "edu") return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 3L2 7l7 4 7-4-7-4z" stroke={c} strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M4 8.5v4c0 1.5 2.2 3 5 3s5-1.5 5-3v-4" stroke={c} strokeWidth="1.1" />
      <path d="M15 7v5" stroke={c} strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
  if (type === "kyc") return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="3" y="3" width="12" height="12" rx="1.5" stroke={c} strokeWidth="1.1" />
      <circle cx="9" cy="7.5" r="2" stroke={c} strokeWidth="1" />
      <path d="M6 13c0-1.5 1.3-2.5 3-2.5s3 1 3 2.5" stroke={c} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
  if (type === "research") return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="2" width="14" height="14" rx="1.5" stroke={c} strokeWidth="1.1" />
      <path d="M5 6h8M5 9h5M5 12h7" stroke={c} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 3v12M5 7l4-4 4 4" stroke={c} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 15h12" stroke={c} strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function SupplyIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="3" y="3" width="16" height="16" rx="2" stroke="#C9A962" strokeWidth="1.2" />
      <circle cx="8" cy="9" r="2" stroke="#C9A962" strokeWidth="1" />
      <circle cx="14" cy="9" r="2" stroke="#C9A962" strokeWidth="1" />
      <path d="M6 15c0-1 .9-2 2-2h6c1.1 0 2 1 2 2" stroke="#C9A962" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function DemandIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="8" cy="8" r="3" stroke="#C9A962" strokeWidth="1.2" />
      <circle cx="14" cy="8" r="3" stroke="#C9A962" strokeWidth="1.2" />
      <path d="M3 18c0-2.5 2.2-4.5 5-4.5" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M19 18c0-2.5-2.2-4.5-5-4.5" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M11 13.5c1.5 0 2.8.8 3.5 2" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function Slide16() {
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
          Market Strategy
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.06] mb-4 animate-[deck-fade-in_600ms_ease-out_100ms_both]">
          Go-To-Market
        </h2>

        {/* Two strategy columns */}
        <div className="flex-1 grid grid-cols-2 gap-5 min-h-0">
          {/* Supply */}
          <div
            className="rounded-lg border border-neutral-800/70 flex flex-col overflow-hidden"
            style={{ animation: "deck-fade-in 500ms ease-out 200ms both" }}
          >
            <div className="h-[3px] shrink-0" style={{ backgroundColor: "#C9A962" }} />
            <div className="flex-1 flex flex-col p-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-11 h-11 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(201,169,98,0.08)", border: "1px solid rgba(201,169,98,0.15)" }}>
                  <SupplyIcon />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-inter)] text-xl font-semibold text-white">Supply Strategy</h3>
                  <p className="font-[family-name:var(--font-inter)] text-sm text-neutral-500">Unlock Asset Access</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-4 flex-1">
                {SUPPLY.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3.5 rounded-lg border border-neutral-800/50 px-4 py-3"
                    style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                  >
                    <div className="w-9 h-9 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <StratIcon type={s.icon} />
                    </div>
                    <span className="font-[family-name:var(--font-inter)] text-base text-neutral-300">{s.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Demand */}
          <div
            className="rounded-lg border border-neutral-800/70 flex flex-col overflow-hidden"
            style={{ animation: "deck-fade-in 500ms ease-out 350ms both" }}
          >
            <div className="h-[3px] shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
            <div className="flex-1 flex flex-col p-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-11 h-11 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <DemandIcon />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-inter)] text-xl font-semibold text-white">Demand Strategy</h3>
                  <p className="font-[family-name:var(--font-inter)] text-sm text-neutral-500">Scale Capital Participation</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-4 flex-1">
                {DEMAND.map((d, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3.5 rounded-lg border border-neutral-800/50 px-4 py-3"
                    style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                  >
                    <div className="w-9 h-9 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <StratIcon type={d.icon} />
                    </div>
                    <span className="font-[family-name:var(--font-inter)] text-base text-neutral-300">{d.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom tags */}
        <div className="flex items-center gap-4 mt-4 mb-2 animate-[deck-fade-in_600ms_ease-out_700ms_both]">
          <div className="flex items-center gap-2 rounded-full border border-neutral-700 px-4 py-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="#ef4444" strokeWidth="1.2" />
              <path d="M5 5l4 4M9 5l-4 4" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span className="font-[family-name:var(--font-inter)] text-sm text-neutral-400">Not volume-led</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-neutral-700 px-4 py-2" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="#22c55e" strokeWidth="1.2" />
              <path d="M4.5 7L6.5 9L9.5 5.5" stroke="#22c55e" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-[family-name:var(--font-inter)] text-sm text-white font-medium">Quality-led</span>
          </div>
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
