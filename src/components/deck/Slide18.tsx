"use client";

import { Logo } from "@/components/Logo";

export function Slide18() {
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
          Market Opportunity
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.06] mb-6 animate-[deck-fade-in_600ms_ease-out_100ms_both]">
          Under-Financialized Participation at Scale
        </h2>

        {/* Table structure */}
        <div
          className="flex-1 flex flex-col min-h-0 animate-[deck-fade-in_600ms_ease-out_200ms_both]"
          style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", overflow: "hidden" }}
        >
          {/* Column headers */}
          <div className="grid grid-cols-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="px-6 py-4 text-center" style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>
              <h3
                className="font-[family-name:var(--font-inter)] text-[11px] uppercase tracking-[0.2em]"
                style={{ color: "rgba(201,169,98,0.7)" }}
              >
                Asset Base
              </h3>
            </div>
            <div className="px-6 py-4 text-center" style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>
              <h3
                className="font-[family-name:var(--font-inter)] text-[11px] uppercase tracking-[0.2em]"
                style={{ color: "rgba(201,169,98,0.7)" }}
              >
                Financial Participation Layer
              </h3>
            </div>
            <div className="px-6 py-4 text-center">
              <h3
                className="font-[family-name:var(--font-inter)] text-[11px] uppercase tracking-[0.2em]"
                style={{ color: "rgba(201,169,98,0.7)" }}
              >
                Structural Opportunity
              </h3>
            </div>
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-3 flex-1" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            {/* Asset Base - Row 1 */}
            <div className="px-6 py-5 flex flex-col justify-center text-center" style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white mb-1">
                US$5.8 Trillion
              </p>
              <p className="font-[family-name:var(--font-inter)] text-sm text-neutral-500">
                Projected sector scale
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[10px] text-neutral-600 mt-0.5">
                Source: IBEF
              </p>
            </div>

            {/* Financial Participation - Row 1 */}
            <div className="px-6 py-5 flex items-center" style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-baseline gap-3">
                <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1" style={{ backgroundColor: "rgba(201,169,98,0.5)" }} />
                <div>
                  <p className="font-[family-name:var(--font-inter)] text-lg font-semibold text-white mb-0.5">
                    60&ndash;70%
                  </p>
                  <p className="font-[family-name:var(--font-inter)] text-sm text-neutral-500 leading-relaxed">
                    Household savings in<br />physical assets
                  </p>
                </div>
              </div>
            </div>

            {/* Structural Opportunity - Row 1 */}
            <div className="px-6 py-5 flex items-center">
              <p className="font-[family-name:var(--font-inter)] text-base leading-relaxed">
                <span className="text-neutral-300">Real estate is large.</span><br />
                <span className="font-semibold text-white">Structured participation is small.</span>
              </p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-3 flex-1" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            {/* Asset Base - Row 2 */}
            <div className="px-6 py-5 flex flex-col justify-center text-center" style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white mb-1">
                &#x20B9; 4.88 Lakh Crore
              </p>
              <p className="font-[family-name:var(--font-inter)] text-sm text-neutral-500">
                Annual residential transaction<br />value (2024)
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[10px] text-neutral-600 mt-0.5">
                Source: ANAROCK, 2024
              </p>
            </div>

            {/* Financial Participation - Row 2 */}
            <div className="px-6 py-5 flex items-center" style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-baseline gap-3">
                <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1" style={{ backgroundColor: "rgba(201,169,98,0.5)" }} />
                <div>
                  <p className="font-[family-name:var(--font-inter)] text-base font-semibold text-white mb-0.5">
                    Listed / REIT exposure
                  </p>
                  <p className="font-[family-name:var(--font-inter)] text-sm text-neutral-500">
                    Small fraction of total property stock
                  </p>
                </div>
              </div>
            </div>

            {/* Structural Opportunity - Row 2 */}
            <div className="px-6 py-5 flex items-center">
              <p className="font-[family-name:var(--font-inter)] text-base text-neutral-300 leading-relaxed">
                Financialization of even<br />a modest share represents a<br />multi-lakh crore opportunity.
              </p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-3 flex-1">
            {/* Asset Base - Row 3 */}
            <div className="px-6 py-5 flex flex-col justify-center text-center" style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white mb-1">
                7&ndash;8% of GDP
              </p>
              <p className="font-[family-name:var(--font-inter)] text-sm text-neutral-500">
                Current sector contribution
              </p>
            </div>

            {/* Financial Participation - Row 3 */}
            <div className="px-6 py-5 flex items-center" style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-baseline gap-3">
                <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1" style={{ backgroundColor: "rgba(201,169,98,0.5)" }} />
                <div>
                  <p className="font-[family-name:var(--font-inter)] text-base font-semibold text-white mb-0.5">
                    Land &amp; parcels
                  </p>
                  <p className="font-[family-name:var(--font-inter)] text-sm text-neutral-500">
                    Largely outside structured markets
                  </p>
                </div>
              </div>
            </div>

            {/* Structural Opportunity - Row 3 (empty) */}
            <div className="px-6 py-5" />
          </div>
        </div>

        {/* Bottom emphasis */}
        <div className="mx-auto py-5 text-center animate-[deck-fade-in_600ms_ease-out_600ms_both]">
          <p className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-white">
            Large asset base.{" "}
            <span style={{ color: "#C9A962" }}>Thin participation layer.</span>
          </p>
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
