"use client";

import { Logo } from "@/components/Logo";

/* ── Icons ── */
function IconCapital() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2l2 3h4l-3 3 1 4-4-2-4 2 1-4-3-3h4l2-3z" stroke="#C9A962" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M6 15h8M7 17h6" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconIndustrial() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 17V9l4-3v3l4-3v3l4-3v11H3z" stroke="#C9A962" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M7 14v3M11 14v3" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconLongTerm() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="7" cy="10" r="3" stroke="#C9A962" strokeWidth="1.2" />
      <circle cx="13" cy="10" r="3" stroke="#C9A962" strokeWidth="1.2" />
      <path d="M10 8.5v3" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconGovernance() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 3l-6 4h12l-6-4z" stroke="#C9A962" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M6 7v6M10 7v6M14 7v6" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" />
      <rect x="3" y="13" width="14" height="2" rx="0.5" stroke="#C9A962" strokeWidth="1.2" />
    </svg>
  );
}

const PARTNERS = [
  {
    icon: <IconCapital />,
    title: "Strategic Capital Partners",
    body: "Investors who understand the long-term value of infrastructure over quick flips.",
  },
  {
    icon: <IconIndustrial />,
    title: "Sectoral Industrialists",
    body: "Deep domain expertise in real estate, construction, or financial services.",
  },
  {
    icon: <IconLongTerm />,
    title: "Long-term Aligned",
    body: "Patient capital committed to building generational wealth creation tools.",
  },
  {
    icon: <IconGovernance />,
    title: "Governance-First",
    body: "Collaborators who prioritize transparency, compliance, and structure.",
  },
];

export function Slide12() {
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
          The Ask
        </p>

        {/* Thin separator */}
        <div
          className="mb-8 animate-[deck-fade-in_600ms_ease-out_100ms_both]"
          style={{ height: "1px", backgroundColor: "rgba(201,169,98,0.15)", maxWidth: "100%" }}
        />

        {/* Two-column layout */}
        <div className="flex-1 flex gap-10 min-h-0">
          {/* Left column: Ideal Partners */}
          <div
            className="flex flex-col min-w-0 shrink-0"
            style={{ width: "55%", animation: "deck-fade-in 600ms ease-out 200ms both" }}
          >
            <p
              className="font-[family-name:var(--font-inter)] text-[11px] uppercase tracking-[0.2em] mb-3"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Ideal Partners
            </p>

            <h3 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-white mb-8">
              Who we are looking for
            </h3>

            {/* Partner cards */}
            <div className="flex flex-col gap-4">
              {PARTNERS.map((p, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-lg border border-neutral-800/70 px-5 py-4"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    borderLeft: "3px solid rgba(201,169,98,0.3)",
                    animation: `deck-fade-in 500ms ease-out ${300 + i * 100}ms both`,
                  }}
                >
                  <span className="shrink-0 mt-0.5">{p.icon}</span>
                  <div>
                    <h4 className="font-[family-name:var(--font-inter)] text-lg font-semibold text-white mb-1">
                      {p.title}
                    </h4>
                    <p className="font-[family-name:var(--font-inter)] text-base text-neutral-500 leading-snug">
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center divider */}
          <div
            className="shrink-0 self-stretch"
            style={{ width: "1px", backgroundColor: "rgba(255,255,255,0.06)" }}
          />

          {/* Right column: Mission */}
          <div
            className="flex flex-col justify-center shrink-0"
            style={{
              width: "540px",
              animation: "deck-fade-in 600ms ease-out 600ms both",
            }}
          >
            {/* Mission box */}
            <div
              className="relative rounded-md px-8 py-8"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                borderLeft: "3px solid #C9A962",
              }}
            >
              {/* Decorative quotation marks */}
              <span
                className="absolute top-5 right-6 font-[family-name:var(--font-playfair)] text-7xl font-bold pointer-events-none select-none"
                style={{ color: "rgba(201,169,98,0.15)" }}
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <p
                className="font-[family-name:var(--font-inter)] text-[11px] uppercase tracking-[0.2em] mb-4"
                style={{ color: "rgba(201,169,98,0.6)" }}
              >
                The Mission
              </p>

              <p className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-semibold text-white leading-snug mb-5">
                We are building{" "}
                <span style={{ color: "#C9A962" }}>India&rsquo;s real estate participation infrastructure.</span>
              </p>

              <div
                className="mb-0"
                style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.06)" }}
              />

              <p
                className="font-[family-name:var(--font-inter)] text-lg mt-5"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Liquidity will be the outcome &mdash; not the promise.
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
