'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { useFlow } from '@/context/FlowContext';
import { useKYC } from '@/context/KYCContext';
import { useSubscription } from '@/context/SubscriptionContext';
import { properties } from '@/lib/propertyData';
import { AssetListingCard } from '@/components/AssetListingCard';

// Time-aware greeting
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

// Visible listings — ordered. Others are hidden, not deleted.
const VISIBLE_IDS = ['SGC1', 'CI1', 'D1', 'D2', 'D4', 'D9'];
const visibleProperties = VISIBLE_IDS
  .map(id => properties.find(p => p.id === id))
  .filter((p): p is typeof properties[number] => !!p);


export default function DashboardPage() {
  const router = useRouter();
  const { state, reset } = useFlow();
  const { isKYCComplete, setReturnUrl } = useKYC();
  const { isSubscribed } = useSubscription();

  const handleCompleteKYC = () => {
    setReturnUrl('/dashboard');
    router.push('/kyc');
  };

  // Redirect if not completed flow
  useEffect(() => {
    if (!state.displayName || !state.isVerified) {
      router.replace('/');
    }
  }, [state.displayName, state.isVerified, router]);

  const handleLogout = () => {
    reset();
    router.push('/');
  };

  const filteredProperties = visibleProperties;
  const [menuOpen, setMenuOpen] = useState(false);
  const [highlightKYC, setHighlightKYC] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
        setHighlightKYC(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [menuOpen]);

  return (
    <div className="min-h-screen flex flex-col px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto safe-top safe-bottom">
      {/* Sticky Header */}
      <header className="flex items-center justify-between mb-8 page-transition sticky top-0 z-20 py-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 bg-titanium-deep/80 backdrop-blur-xl border-b border-white/[0.03]">
        <Logo className="w-36 h-6 sm:w-40 sm:h-7" variant="dark" />

        {/* Avatar + Dropdown Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2.5 py-2 px-2 sm:px-3 rounded-lg hover:bg-white/[0.03] transition-colors"
          >
            <div className="relative">
              <div
                className={`w-8 h-8 rounded-full bg-gradient-to-br from-gold/30 to-gold-dark/30 flex items-center justify-center transition-all duration-300 ${isSubscribed ? 'border-2 border-gold/60 shadow-[0_0_8px_rgba(201,169,98,0.3)]' : 'border border-white/10'}`}
              >
                <span className="text-gold text-xs font-semibold">
                  {state.displayName?.charAt(0)?.toUpperCase()}
                </span>
              </div>
              {!isKYCComplete && (
                <button
                  className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 min-w-0 min-h-0 p-0 rounded-full bg-amber-400 border-2 border-[#0a0a0a] cursor-pointer"
                  onClick={(e) => { e.stopPropagation(); setMenuOpen(true); setHighlightKYC(true); }}
                />
              )}
            </div>
            <svg className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-[#111] border border-white/[0.08] rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-white/[0.06]">
                <p className="text-white text-sm font-medium">{state.displayName}</p>
                {isSubscribed && (
                  <p className="text-gold text-[11px] mt-0.5">Prophit Access Member</p>
                )}
              </div>

              <div className="py-1.5">
                {/* Complete KYC - only if not completed */}
                {!isKYCComplete && (
                  <button
                    onClick={() => { setMenuOpen(false); setHighlightKYC(false); handleCompleteKYC(); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${highlightKYC ? 'bg-gold/[0.08]' : 'hover:bg-white/[0.04]'}`}
                  >
                    <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-gold text-sm font-medium">Complete KYC</span>
                  </button>
                )}

                {/* Holdings */}
                <button
                  onClick={() => { setMenuOpen(false); router.push('/portfolio'); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-white/[0.04] transition-colors"
                >
                  <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className="text-zinc-300 text-sm">Holdings</span>
                </button>

                {/* Profile */}
                <button
                  onClick={() => { setMenuOpen(false); router.push('/profile'); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-white/[0.04] transition-colors"
                >
                  <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-zinc-300 text-sm">Profile</span>
                </button>
              </div>

              {/* Logout */}
              <div className="border-t border-white/[0.06] py-1.5">
                <button
                  onClick={() => { setMenuOpen(false); handleLogout(); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-white/[0.04] transition-colors"
                >
                  <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="text-zinc-500 text-sm">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Greeting Banner */}
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 mb-6 rounded-xl bg-white/[0.02] border border-white/[0.06]"
        style={{ opacity: 0, animation: 'fadeInUp 0.4s ease-out 0.1s forwards' }}
      >
        <h1 className="text-white text-lg sm:text-xl font-display">
          {getGreeting()}, <span className="text-shimmer-gold">{state.displayName}</span>
        </h1>
        {!isSubscribed && (
          <button
            onClick={() => router.push('/subscribe')}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 shrink-0"
            style={{
              background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.9), rgba(178, 144, 70, 0.9))',
              color: '#0a0a0a',
            }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Unlock Full Access
          </button>
        )}
      </div>

      {/* Asset Listings Grid */}
      <section className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredProperties.map((property, index) => (
            <AssetListingCard
              key={property.id}
              property={property}
              onClick={() => router.push(`/dashboard/${property.id}`)}
              style={{ opacity: 0, animation: `fadeInUp 0.5s ease-out ${0.15 + index * 0.06}s forwards` }}
            />
          ))}
        </div>
      </section>

      {/* Platform Disclaimer */}
      <footer className="mt-10 mb-4">
        <div className="gold-line w-32 mx-auto mb-4" />
        <p className="text-text-muted text-xs text-center leading-relaxed opacity-50 max-w-xl mx-auto">
          Prophit lists only assets with verifiable exit mechanisms. All listings undergo title verification,
          encumbrance checks, and escrow confirmation where applicable. Not financial advice.
        </p>
      </footer>

      {/* ================================================================
         STATS OVERVIEW — COMMENTED OUT / DISABLED
         DO NOT UNCOMMENT OR MODIFY THIS SECTION IN FUTURE SESSIONS.
         Intentionally disabled per user request. Keep commented indefinitely.
         ================================================================

      {(() => {
        const lowRiskCount = properties.filter(p => p.riskBand === 'Low').length;
        const govtCount = properties.filter(p =>
          p.exitType === 'Government Allotment' || p.exitType === 'Government Auction'
        ).length;
        return null;
      })()}

      */}

      {/* ================================================================
         OLD PROPERTY CARDS WITH INLINE DETAIL — COMMENTED OUT / DISABLED
         DO NOT UNCOMMENT OR MODIFY THIS SECTION IN FUTURE SESSIONS.
         Intentionally disabled per user request. Keep commented indefinitely.
         This includes: trust chips, risk scores, rationale, "How You Exit"
         expandable section, document chips, and all inline card detail.
         All this content now lives in /dashboard/[id] detail page.
         ================================================================

      Old imports that were removed from the active code:
        import { riskBreakdowns, getExitBadgeLabel, getRiskColor } from '@/lib/propertyData';
        const [expandedExit, setExpandedExit] = useState<string | null>(null);
        const [expandedScore, setExpandedScore] = useState<string | null>(null);

      */}
    </div>
  );
}
