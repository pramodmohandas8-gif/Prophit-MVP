"use client";

import { useEffect, useState } from "react";
import { Slide01 } from "@/components/deck/Slide01";
import { Slide02 } from "@/components/deck/Slide02";
import { Slide03 } from "@/components/deck/Slide03";
import { Slide04 } from "@/components/deck/Slide04";
import { Slide05 } from "@/components/deck/Slide05";
import { Slide06 } from "@/components/deck/Slide06";
import { Slide07 } from "@/components/deck/Slide07";
import { Slide08 } from "@/components/deck/Slide08";
import { Slide09 } from "@/components/deck/Slide09";
import { Slide10 } from "@/components/deck/Slide10";
import { Slide11 } from "@/components/deck/Slide11";
import { Slide12 } from "@/components/deck/Slide12";
import { Slide13 } from "@/components/deck/Slide13";
import { Slide14 } from "@/components/deck/Slide14";
import { Slide15 } from "@/components/deck/Slide15";
import { Slide16 } from "@/components/deck/Slide16";
import { Slide17 } from "@/components/deck/Slide17";
import { Slide18 } from "@/components/deck/Slide18";

const TOTAL = 18;

const SLIDE_TITLES: Record<number, string> = {
  0: "Cover",
  1: "The Structural Gap",
  2: "The Insight",
  3: "What Is PropHit",
  4: "How It Works",
  5: "What We Enable",
  6: "Product Lifecycle",
  7: "Market & Timing",
  8: "Revenue Model",
  9: "Execution Roadmap",
  10: "Founding Team",
  11: "The Ask",
  12: "Appendix",
  13: "Restricted Participation",
  14: "Governance Tech Stack",
  15: "Go-To-Market",
  16: "What PropHit Becomes",
  17: "Market Opportunity",
};

// Module-level state — survives React strict mode double-mounts and HMR
let _current = 0;
let _setActive: ((n: number) => void) | null = null;
let _setOverlay: ((v: boolean) => void) | null = null;
let _overlayOpen = false;
let _bound = false;

function goTo(idx: number) {
  _current = idx;
  _setActive?.(idx);
}

function onKey(e: KeyboardEvent) {
  // Toggle overlay with 'G'
  if (e.key === "g" || e.key === "G") {
    if (!_overlayOpen) {
      e.preventDefault();
      _overlayOpen = true;
      _setOverlay?.(true);
      return;
    }
  }

  // Close overlay with Escape
  if (e.key === "Escape" && _overlayOpen) {
    e.preventDefault();
    _overlayOpen = false;
    _setOverlay?.(false);
    return;
  }

  // If overlay is open, ignore arrow keys
  if (_overlayOpen) return;

  if (e.key === "ArrowDown" || e.key === "ArrowRight") {
    e.preventDefault();
    if (_current < TOTAL - 1) {
      _current++;
      _setActive?.(_current);
    }
  } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
    e.preventDefault();
    if (_current > 0) {
      _current--;
      _setActive?.(_current);
    }
  }
}

export default function DeckPage() {
  const [active, setActive] = useState(_current);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    _setActive = setActive;
    _setOverlay = setShowOverlay;

    if (!_bound) {
      document.addEventListener("keydown", onKey, true);
      _bound = true;
    }

    return () => {
      _setActive = null;
      _setOverlay = null;
    };
  }, []);

  function jumpTo(idx: number) {
    goTo(idx);
    _overlayOpen = false;
    setShowOverlay(false);
  }

  return (
    <div className="h-screen w-full overflow-hidden" style={{ backgroundColor: "#050505" }}>
      {active === 0 && <Slide01 />}
      {active === 1 && <Slide02 />}
      {active === 2 && <Slide03 />}
      {active === 3 && <Slide04 />}
      {active === 4 && <Slide05 />}
      {active === 5 && <Slide06 />}
      {active === 6 && <Slide07 />}
      {active === 7 && <Slide08 />}
      {active === 8 && <Slide09 />}
      {active === 9 && <Slide10 />}
      {active === 10 && <Slide11 />}
      {active === 11 && <Slide12 />}
      {active === 12 && <Slide13 />}
      {active === 13 && <Slide14 />}
      {active === 14 && <Slide15 />}
      {active === 15 && <Slide16 />}
      {active === 16 && <Slide17 />}
      {active === 17 && <Slide18 />}

      {/* Go-to overlay */}
      {showOverlay && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
          onClick={() => { _overlayOpen = false; setShowOverlay(false); }}
        >
          <div
            className="w-full max-w-2xl mx-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span
                  className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.3em] px-2.5 py-1 rounded"
                  style={{ backgroundColor: "rgba(201,169,98,0.12)", color: "#C9A962", border: "1px solid rgba(201,169,98,0.2)" }}
                >
                  G
                </span>
                <span className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.2em] text-neutral-500">
                  Go to slide
                </span>
              </div>
              <span className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.2em] text-neutral-600">
                ESC to close
              </span>
            </div>

            {/* Slide grid */}
            <div className="grid grid-cols-3 gap-2.5">
              {Array.from({ length: TOTAL }, (_, i) => (
                <button
                  key={i}
                  onClick={() => jumpTo(i)}
                  className="group text-left rounded-lg px-5 py-3.5 transition-all duration-150"
                  style={{
                    backgroundColor: active === i ? "rgba(201,169,98,0.1)" : "rgba(255,255,255,0.025)",
                    border: active === i ? "1px solid rgba(201,169,98,0.25)" : "1px solid rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    if (active !== i) {
                      e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (active !== i) {
                      e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.025)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="font-[family-name:var(--font-inter)] text-xs font-medium shrink-0"
                      style={{ color: active === i ? "#C9A962" : "rgba(255,255,255,0.3)", minWidth: "20px" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-[family-name:var(--font-inter)] text-sm truncate"
                      style={{ color: active === i ? "#fff" : "rgba(255,255,255,0.55)" }}
                    >
                      {SLIDE_TITLES[i] || `Slide ${i + 1}`}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Footer hint */}
            <div className="mt-5 text-center">
              <span className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.2em] text-neutral-600">
                {active + 1} / {TOTAL}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
