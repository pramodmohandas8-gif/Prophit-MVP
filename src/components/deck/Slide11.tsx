"use client";

import { Logo } from "@/components/Logo";

/* ── Icons ── */
function IconExecution() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 2l2 4 4.5.7-3.3 3.1.8 4.5L11 12.1 6.9 14.3l.8-4.5L4.5 6.7 9 6l2-4z" stroke="#C9A962" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M14 14l3 5H5l3-5" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconFintech() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="8" cy="8" r="3" stroke="#C9A962" strokeWidth="1.2" />
      <path d="M8 6v4l2 1" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 11h6M13 14h4M13 17h5" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M11 13v6H3v-6" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconMarketDesign() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 3v4M11 15v4" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M4 7l3.5 2L11 7l3.5 2L18 7" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 13l3.5 2L11 13l3.5 2L18 13" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="11" cy="10" r="2" fill="#C9A962" fillOpacity="0.3" stroke="#C9A962" strokeWidth="1" />
    </svg>
  );
}

function IconCompliance() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 3L5 6v5c0 4.4 2.6 7 6 8.5 3.4-1.5 6-4.1 6-8.5V6l-6-3z" stroke="#C9A962" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M8.5 11.5L10 13l3.5-4" stroke="#C9A962" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconRealEstate() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="3" y="9" width="16" height="10" rx="1" stroke="#C9A962" strokeWidth="1.2" />
      <path d="M11 3L3 9h16L11 3z" stroke="#C9A962" strokeWidth="1.2" strokeLinejoin="round" />
      <rect x="9" y="13" width="4" height="6" stroke="#C9A962" strokeWidth="1.2" />
      <path d="M5 13h3v3H5z" stroke="#C9A962" strokeWidth="0.8" />
      <path d="M14 13h3v3h-3z" stroke="#C9A962" strokeWidth="0.8" />
    </svg>
  );
}

const COMPETENCIES = [
  {
    icon: <IconExecution />,
    title: "Entrepreneurial Execution",
    body: "Proven track record of building scalable businesses from zero to one with operational rigor.",
  },
  {
    icon: <IconFintech />,
    title: "Fintech Product Depth",
    body: "Deep expertise in digital product architecture, payment rails, and user-centric financial systems.",
  },
  {
    icon: <IconMarketDesign />,
    title: "Market Design Thinking",
    body: "Engineering economic incentives and market structures to solve liquidity and access problems.",
  },
  {
    icon: <IconCompliance />,
    title: "Compliance Understanding",
    body: "Navigating complex regulatory landscapes with a focus on investor protection and transparency.",
  },
  {
    icon: <IconRealEstate />,
    title: "Real Estate Structuring",
    body: "Specialized knowledge in land acquisition, legal DD, and asset-backed security frameworks.",
  },
];

export function Slide11() {
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
          Founding Team
        </p>

        {/* Heading */}
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.06] mb-4 animate-[deck-fade-in_600ms_ease-out_100ms_both]">
          Founding Team
        </h2>

        {/* Thin separator */}
        <div
          className="mb-6 animate-[deck-fade-in_600ms_ease-out_150ms_both]"
          style={{ height: "1px", backgroundColor: "rgba(201,169,98,0.15)", maxWidth: "100%" }}
        />

        {/* Card grid: 3 top + 2 bottom centered */}
        <div className="flex-1 flex flex-col gap-4 justify-center min-h-0" style={{ marginTop: "-180px" }}>
          {/* Top row: 3 cards */}
          <div className="grid grid-cols-3 gap-4">
            {COMPETENCIES.slice(0, 3).map((c, i) => (
              <CompetencyCard key={i} comp={c} index={i} />
            ))}
          </div>

          {/* Bottom row: 2 cards centered */}
          <div className="flex gap-4 justify-center">
            <div className="w-[calc(33.333%-0.67rem)]">
              <CompetencyCard comp={COMPETENCIES[3]} index={3} />
            </div>
            <div className="w-[calc(33.333%-0.67rem)]">
              <CompetencyCard comp={COMPETENCIES[4]} index={4} />
            </div>
          </div>
        </div>

        {/* Bottom emphasis bar */}
        <div
          className="mx-auto w-full rounded-lg border px-8 py-4 flex items-center gap-6 animate-[deck-fade-in_600ms_ease-out_900ms_both]"
          style={{
            marginTop: "-154px",
            marginBottom: "4px",
            borderColor: "rgba(255,255,255,0.08)",
            backgroundColor: "rgba(255,255,255,0.02)",
          }}
        >
          {/* Our DNA */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div
              className="h-10 w-[3px] rounded-full shrink-0"
              style={{ backgroundColor: "#C9A962" }}
            />
            <div>
              <p
                className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.2em]"
                style={{ color: "rgba(201,169,98,0.6)" }}
              >
                Our DNA
              </p>
              <p className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-white">
                Built for{" "}
                <span className="underline underline-offset-4" style={{ textDecorationColor: "rgba(201,169,98,0.5)" }}>
                  governance.
                </span>
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-10 shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />

          {/* Not transaction velocity */}
          <div className="flex items-center gap-2.5">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7" stroke="#ef4444" strokeWidth="1.2" />
              <path d="M6 6l6 6M12 6l-6 6" stroke="#ef4444" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span className="font-[family-name:var(--font-inter)] text-base text-neutral-400 whitespace-nowrap">
              Not transaction velocity
            </span>
          </div>

          {/* Long-term value creation */}
          <div className="flex items-center gap-2.5">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7" stroke="#22c55e" strokeWidth="1.2" />
              <path d="M5.5 9L8 11.5L12.5 6.5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-[family-name:var(--font-inter)] text-base text-neutral-400 whitespace-nowrap">
              Long-term value creation
            </span>
          </div>
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

/* ── Competency Card ── */
function CompetencyCard({
  comp,
  index,
}: {
  comp: (typeof COMPETENCIES)[number];
  index: number;
}) {
  return (
    <div
      className="relative rounded-lg border border-neutral-800/70 p-5 flex flex-col overflow-hidden"
      style={{
        animation: `deck-fade-in 500ms ease-out ${200 + index * 120}ms both`,
      }}
    >
      {/* Icon + Title row */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: "rgba(201,169,98,0.1)", border: "1px solid rgba(201,169,98,0.2)" }}
        >
          {comp.icon}
        </div>
        <h3 className="font-[family-name:var(--font-inter)] text-lg font-semibold text-white">
          {comp.title}
        </h3>
      </div>

      {/* Body */}
      <p className="font-[family-name:var(--font-inter)] text-base text-neutral-400 leading-relaxed">
        {comp.body}
      </p>
    </div>
  );
}
