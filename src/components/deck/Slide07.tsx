"use client";

import { Logo } from "@/components/Logo";

/* ── Icons ── */
function IconOnboarding() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="10" cy="8" r="4" stroke="#C9A962" strokeWidth="1.5" />
      <path d="M2 20c0-3.3 3.6-6 8-6" stroke="#C9A962" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19 14v6M16 17h6" stroke="#C9A962" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconParticipation() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M16.24 16.24l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M16.24 7.76l1.41-1.41" stroke="#C9A962" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="4" stroke="#C9A962" strokeWidth="1.5" />
      <path d="M12 10v2.5l1.5 1" stroke="#C9A962" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPostInvestment() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#C9A962" strokeWidth="1.5" />
      <path d="M12 3a9 9 0 0 1 0 18" fill="rgba(201,169,98,0.25)" />
      <path d="M12 7v5l3 3" stroke="#C9A962" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const STAGES = [
  {
    number: "01",
    name: "Onboarding",
    icon: <IconOnboarding />,
    steps: ["Registration", "Subscription", "KYC Validation"],
  },
  {
    number: "02",
    name: "Participation",
    icon: <IconParticipation />,
    steps: ["Discovery", "Structured Research", "Participation"],
  },
  {
    number: "03",
    name: "Post-Investment",
    icon: <IconPostInvestment />,
    steps: ["Monitoring", "Reporting & Analytics", "Controlled Exit"],
  },
];

export function Slide07() {
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
          Execution
        </p>

        {/* Heading */}
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.06] mb-6 animate-[deck-fade-in_600ms_ease-out_100ms_both]">
          Product Lifecycle
        </h2>

        {/* Stage cards with connecting line */}
        <div className="flex-1 flex items-center min-h-0" style={{ marginTop: "-260px" }}>
          <div className="relative w-full">
            {/* Horizontal connecting line — sits behind cards at icon level */}
            <div
              className="absolute left-0 right-0 pointer-events-none"
              style={{
                top: "28px",
                height: "1px",
                backgroundColor: "rgba(255,255,255,0.06)",
              }}
              aria-hidden="true"
            />

            {/* Three stage cards */}
            <div className="grid grid-cols-3 gap-6">
              {STAGES.map((stage, i) => (
                <div
                  key={stage.number}
                  className="relative flex flex-col items-center"
                  style={{
                    animation: `deck-fade-in 500ms ease-out ${200 + i * 150}ms both`,
                  }}
                >
                  {/* Icon circle — overlaps card top */}
                  <div
                    className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: "rgba(30,30,30,1)",
                      border: "1px solid rgba(201,169,98,0.25)",
                    }}
                  >
                    {stage.icon}
                  </div>

                  {/* Card body — pulled up to overlap with icon */}
                  <div
                    className="w-full rounded-lg border border-neutral-800/70 pt-8 pb-6 px-6 flex flex-col items-center"
                    style={{ marginTop: "-28px" }}
                  >
                    {/* Stage label */}
                    <p
                      className="font-[family-name:var(--font-inter)] text-[11px] uppercase tracking-[0.2em] mb-2"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      Stage {stage.number}
                    </p>

                    {/* Stage name */}
                    <h3 className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl font-semibold text-white mb-5 text-center">
                      {stage.name}
                    </h3>

                    {/* Steps flow */}
                    <div
                      className="w-full rounded-md border border-neutral-700/50 px-5 py-5 flex flex-col items-center gap-3"
                      style={{ backgroundColor: "rgba(255,255,255,0.015)" }}
                    >
                      {stage.steps.map((step, si) => (
                        <span
                          key={si}
                          className="font-[family-name:var(--font-inter)] text-base text-neutral-300 text-center"
                        >
                          {step}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom emphasis bar */}
        <div
          className="mx-auto rounded-full border px-8 py-3 flex items-center gap-5 animate-[deck-fade-in_600ms_ease-out_800ms_both]"
          style={{
            marginTop: "-200px",
            marginBottom: "4px",
            borderColor: "rgba(201,169,98,0.2)",
            backgroundColor: "rgba(201,169,98,0.04)",
          }}
        >
          {/* Check + rules-driven */}
          <div className="flex items-center gap-2.5">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" fill="#C9A962" />
              <path d="M5 8l2 2 4-4" stroke="#050505" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-[family-name:var(--font-inter)] text-base font-semibold text-white whitespace-nowrap">
              Clear, rules-driven journey.
            </span>
          </div>

          {/* Divider */}
          <div className="w-px h-4 shrink-0" style={{ backgroundColor: "rgba(201,169,98,0.3)" }} />

          {/* No discretion */}
          <div className="flex items-center gap-2.5">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
              <path d="M4.5 11.5l7-7" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span className="font-[family-name:var(--font-inter)] text-base text-neutral-400 whitespace-nowrap">
              No discretion.
            </span>
          </div>

          {/* 100% Transparency */}
          <span className="font-[family-name:var(--font-inter)] text-sm text-neutral-400 whitespace-nowrap">
            100% Transparency
          </span>
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
