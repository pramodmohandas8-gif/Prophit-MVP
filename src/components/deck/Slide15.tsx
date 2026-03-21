"use client";

import { Logo } from "@/components/Logo";

const STACK_ITEMS = [
  { icon: "Q", title: "Asset DD Engine", desc: "Automated land record verification & due diligence" },
  { icon: "doc", title: "Structured SPV/LLP Templates", desc: "Standardized entity creation architecture" },
  { icon: "gear", title: "Compliance Automation Workflows", desc: "Regulatory triggers and auto-filing systems" },
  { icon: "bank", title: "Custodian Integration Layer", desc: "Direct banking APIs for fund protection" },
  { icon: "shield", title: "Investor Risk Disclosure Engine", desc: "Dynamic risk profiling and acceptance tracking" },
  { icon: "chart", title: "Monitoring & Reporting Dashboard", desc: "Real-time asset performance tracking" },
  { icon: "vault", title: "Structured Document Vault", desc: "Immutable record storage and retrieval" },
];

function StackIcon({ type }: { type: string }) {
  const s = { stroke: "#C9A962", strokeWidth: "1.2", fill: "none" };
  if (type === "Q") return (
    <svg width="18" height="18" viewBox="0 0 18 18" {...s}>
      <circle cx="8" cy="8" r="5" /><path d="M12 12l4 4" strokeLinecap="round" />
    </svg>
  );
  if (type === "doc") return (
    <svg width="18" height="18" viewBox="0 0 18 18" {...s}>
      <rect x="3" y="2" width="12" height="14" rx="1.5" /><path d="M6 6h6M6 9h6M6 12h4" strokeLinecap="round" />
    </svg>
  );
  if (type === "gear") return (
    <svg width="18" height="18" viewBox="0 0 18 18" {...s}>
      <circle cx="9" cy="9" r="3" /><path d="M9 2v2M9 14v2M2 9h2M14 9h2M4.2 4.2l1.4 1.4M12.4 12.4l1.4 1.4M4.2 13.8l1.4-1.4M12.4 5.6l1.4-1.4" strokeLinecap="round" />
    </svg>
  );
  if (type === "bank") return (
    <svg width="18" height="18" viewBox="0 0 18 18" {...s}>
      <path d="M9 2L3 5h12L9 2z" strokeLinejoin="round" /><path d="M5 5v7M9 5v7M13 5v7" /><rect x="3" y="12" width="12" height="2" rx="0.5" />
    </svg>
  );
  if (type === "shield") return (
    <svg width="18" height="18" viewBox="0 0 18 18" {...s}>
      <path d="M9 1.5L3 4v5c0 3.5 2.5 6.2 6 7.5 3.5-1.3 6-4 6-7.5V4L9 1.5z" strokeLinejoin="round" /><path d="M9 6v3" strokeLinecap="round" /><circle cx="9" cy="11" r="0.7" fill="#C9A962" />
    </svg>
  );
  if (type === "chart") return (
    <svg width="18" height="18" viewBox="0 0 18 18" {...s}>
      <rect x="2" y="3" width="14" height="10" rx="1" /><path d="M5 9l3-2 2 1.5 3-3" strokeLinecap="round" strokeLinejoin="round" /><path d="M7 15h4M9 13v2" strokeLinecap="round" />
    </svg>
  );
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" {...s}>
      <rect x="3" y="3" width="12" height="12" rx="1.5" /><circle cx="9" cy="9" r="2" /><path d="M7 7l4 4M11 7l-4 4" strokeLinecap="round" />
    </svg>
  );
}

export function Slide15() {
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
          Technology &amp; Product
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.06] mb-4 animate-[deck-fade-in_600ms_ease-out_100ms_both]">
          Governance Tech Stack
        </h2>
        <div className="mb-6 animate-[deck-fade-in_600ms_ease-out_150ms_both]" style={{ height: "1px", backgroundColor: "rgba(201,169,98,0.15)" }} />

        {/* Two-column layout */}
        <div className="flex-1 flex gap-10 min-h-0">
          {/* Left: Stack items */}
          <div className="flex-1 flex flex-col gap-2.5 min-w-0">
            {STACK_ITEMS.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-lg border border-neutral-800/70 px-5 py-3"
                style={{
                  backgroundColor: "rgba(255,255,255,0.02)",
                  animation: `deck-fade-in 500ms ease-out ${200 + i * 80}ms both`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-md flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(201,169,98,0.08)", border: "1px solid rgba(201,169,98,0.15)" }}
                >
                  <StackIcon type={item.icon} />
                </div>
                <div className="min-w-0">
                  <h4 className="font-[family-name:var(--font-inter)] text-base font-semibold text-white">
                    {item.title}
                  </h4>
                  <p className="font-[family-name:var(--font-inter)] text-sm text-neutral-500">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Core Systems + Philosophy */}
          <div className="shrink-0 flex flex-col justify-between" style={{ width: "400px", animation: "deck-fade-in 600ms ease-out 500ms both" }}>
            {/* Core Systems card */}
            <div className="rounded-lg border border-neutral-800/70 p-7 flex-1 flex flex-col">
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center mb-6"
                style={{ backgroundColor: "rgba(201,169,98,0.1)", border: "1px solid rgba(201,169,98,0.25)" }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M14 4L4 9.5l10 5.5 10-5.5L14 4z" stroke="#C9A962" strokeWidth="1.3" strokeLinejoin="round" />
                  <path d="M4 13l10 5.5L24 13" stroke="#C9A962" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 17l10 5.5L24 17" stroke="#C9A962" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <h3 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-white mb-4">
                Core Systems
              </h3>

              <p className="font-[family-name:var(--font-inter)] text-base text-neutral-400 leading-relaxed">
                We are not just building a frontend. We are building the backend rails for a new asset class. This is a deep-tech governance layer.
              </p>
            </div>

            {/* Philosophy quote */}
            <div
              className="rounded-md px-6 py-5 mt-4"
              style={{ backgroundColor: "rgba(255,255,255,0.03)", borderLeft: "3px solid rgba(201,169,98,0.4)" }}
            >
              <p className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: "rgba(201,169,98,0.6)" }}>
                Philosophy
              </p>
              <p className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-white">
                &ldquo;Compliance-led product architecture.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="flex items-center justify-between px-8 pb-8 sm:px-12 sm:pb-10 pt-4">
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
