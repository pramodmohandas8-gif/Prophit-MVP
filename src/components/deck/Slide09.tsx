"use client";

import { Logo } from "@/components/Logo";

/* ── Icons ── */
function IconParticipation() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 3c-2 0-4 1-5 3l-2 4c-.3.6.1 1.2.8 1.2H5l1 5.5c.1.5.8.5.9 0L8.5 12h3l1.6 4.7c.1.5.8.5.9 0L15 11.2h1.2c.7 0 1.1-.6.8-1.2l-2-4c-1-2-3-3-5-3z" stroke="#C9A962" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function IconSubscription() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="5" width="14" height="10" rx="1.5" stroke="#C9A962" strokeWidth="1.2" />
      <path d="M3 8h14" stroke="#C9A962" strokeWidth="1.2" />
      <path d="M6 12h4" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconStructuring() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 6h12M4 10h12M4 14h12" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M4 6l2-2M4 10l2-2M4 14l2-2" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconMonitoring() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="4" width="16" height="11" rx="1.5" stroke="#C9A962" strokeWidth="1.2" />
      <path d="M5 11l3-3 2 2 5-5" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 17h4" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconExchange() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 8h12M16 8l-3-3M16 12H4M4 12l3 3" stroke="#C9A962" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const REVENUES = [
  {
    icon: <IconParticipation />,
    tag: "Transactional",
    title: "Participation Fees",
    body: "Primary issuance fees charged on successful capital deployment into structured assets.",
  },
  {
    icon: <IconSubscription />,
    tag: "Recurring",
    title: "Subscription Access",
    body: "Tiered membership for access to premium deals, advanced analytics, and data tools.",
  },
  {
    icon: <IconStructuring />,
    tag: "Service",
    title: "Structuring Fees",
    body: "Fees for legal structuring, SPV creation, and compliance readiness for developers.",
  },
  {
    icon: <IconMonitoring />,
    tag: "Recurring",
    title: "Monitoring Fees",
    body: "Ongoing management fees for asset surveillance, reporting, and investor communication.",
  },
  {
    icon: <IconExchange />,
    tag: "Long-Term",
    title: "Exchange Fees",
    body: "Future revenue from secondary transfers and liquidity events within the closed ecosystem.",
  },
];

export function Slide09() {
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
          Business Model
        </p>

        {/* Heading */}
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.06] mb-4 animate-[deck-fade-in_600ms_ease-out_100ms_both]">
          Revenue Model
        </h2>

        {/* Thin separator */}
        <div
          className="mb-6 animate-[deck-fade-in_600ms_ease-out_150ms_both]"
          style={{ height: "1px", backgroundColor: "rgba(201,169,98,0.15)", maxWidth: "100%" }}
        />

        {/* Card grid: 3 top + 2 bottom centered */}
        <div className="flex-1 flex flex-col gap-4 justify-center min-h-0" style={{ marginTop: "-110px" }}>
          {/* Top row: 3 cards */}
          <div className="grid grid-cols-3 gap-4">
            {REVENUES.slice(0, 3).map((r, i) => (
              <RevenueCard key={i} revenue={r} index={i} />
            ))}
          </div>

          {/* Bottom row: 2 cards centered */}
          <div className="flex gap-4 justify-center">
            <div className="w-[calc(33.333%-0.67rem)]">
              <RevenueCard revenue={REVENUES[3]} index={3} />
            </div>
            <div className="w-[calc(33.333%-0.67rem)]">
              <RevenueCard revenue={REVENUES[4]} index={4} />
            </div>
          </div>
        </div>

        {/* Bottom emphasis bar */}
        <div
          className="mx-auto w-full rounded-lg border px-8 py-4 flex items-center gap-6 animate-[deck-fade-in_600ms_ease-out_900ms_both]"
          style={{
            marginTop: "-104px",
            marginBottom: "4px",
            borderColor: "rgba(255,255,255,0.08)",
            backgroundColor: "rgba(255,255,255,0.02)",
          }}
        >
          {/* Check + Revenue Profile */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7" stroke="#C9A962" strokeWidth="1.2" />
                <path d="M5.5 9L8 11.5L12.5 6.5" stroke="#C9A962" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p
                className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.2em]"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Revenue Profile
              </p>
              <p className="font-[family-name:var(--font-inter)] text-lg font-semibold text-white">
                Aligned with structure, not speculation.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-10 shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />

          {/* Recurring Revenue */}
          <div className="flex items-center gap-2.5">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 9a6 6 0 0 1 10.5-4" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M15 9a6 6 0 0 1-10.5 4" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M13.5 3v2h-2" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4.5 15v-2h2" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-[family-name:var(--font-inter)] text-base text-neutral-400 whitespace-nowrap">
              Recurring Revenue
            </span>
          </div>

          {/* Compliance-Aligned */}
          <div className="flex items-center gap-2.5">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 1.5L3 4v5c0 3.5 2.5 6.2 6 7.5 3.5-1.3 6-4 6-7.5V4L9 1.5z" stroke="#C9A962" strokeWidth="1.2" strokeLinejoin="round" />
              <path d="M9 6v4" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="9" cy="12.5" r="0.75" fill="#C9A962" />
            </svg>
            <span className="font-[family-name:var(--font-inter)] text-base text-neutral-400 whitespace-nowrap">
              Compliance-Aligned
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

/* ── Revenue Card ── */
function RevenueCard({
  revenue,
  index,
}: {
  revenue: (typeof REVENUES)[number];
  index: number;
}) {
  return (
    <div
      className="relative rounded-lg border border-neutral-800/70 p-5 flex flex-col overflow-hidden"
      style={{
        animation: `deck-fade-in 500ms ease-out ${200 + index * 120}ms both`,
      }}
    >
      {/* Tag — top right */}
      <span
        className="absolute top-4 right-4 font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.15em]"
        style={{ color: "rgba(201,169,98,0.6)" }}
      >
        {revenue.tag}
      </span>

      {/* Icon + Title row */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-11 h-11 rounded-md flex items-center justify-center shrink-0"
          style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {revenue.icon}
        </div>
        <h3 className="font-[family-name:var(--font-inter)] text-lg font-semibold text-white">
          {revenue.title}
        </h3>
      </div>

      {/* Body */}
      <p className="font-[family-name:var(--font-inter)] text-base text-neutral-400 leading-relaxed">
        {revenue.body}
      </p>
    </div>
  );
}
