"use client";

import { Logo } from "@/components/Logo";

export function Slide01() {
  return (
    <div
      className="relative h-full flex flex-col justify-between overflow-hidden"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Faint structural grid — almost invisible */}
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

      {/* Subtle radial gold tint — top right */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-[700px] h-[700px]"
        style={{
          background:
            "radial-gradient(circle at 70% 20%, rgba(201,169,98,0.045) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* Vertical guide line at ~69% viewport width */}
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

      {/* ── Center: Headline Block ── */}
      <div className="flex-1 flex items-center px-8 sm:px-12">
        <div className="max-w-5xl">
          <h1 className="font-[family-name:var(--font-playfair)] leading-[1.06] tracking-tight">
            <span className="block text-4xl sm:text-5xl lg:text-[4rem] font-normal text-white/85">
              Building
            </span>
            <span
              className="block text-5xl sm:text-[4.5rem] lg:text-[5.5rem] font-semibold"
              style={{ color: "#B5A05A" }}
            >
              Market&nbsp;Infrastructure
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-[4rem] font-normal text-white/85">
              For Real Estate
            </span>
          </h1>

          {/* Gold divider — structural */}
          <div
            className="mt-8"
            style={{
              height: "2px",
              width: "9.5ch",
              backgroundColor: "#B5A05A",
              fontFamily: "var(--font-playfair)",
              fontSize: "4rem",
            }}
          />

          <p className="mt-5 max-w-xl font-[family-name:var(--font-inter)] text-lg leading-relaxed text-neutral-300">
            Democratizing access to India&apos;s largest asset class.
          </p>
        </div>
      </div>

      {/* ── Bottom: Footer Bar ── */}
      <footer className="flex items-center justify-between px-8 pb-8 sm:px-12 sm:pb-10">
        <span className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.2em] text-neutral-500">
          Investor Presentation
        </span>
        <span className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.2em] text-neutral-500">
          2026
        </span>
      </footer>
    </div>
  );
}
