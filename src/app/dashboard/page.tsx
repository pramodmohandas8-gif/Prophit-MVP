'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { useFlow } from '@/context/FlowContext';
import { useKYC } from '@/context/KYCContext';
import { properties } from '@/lib/propertyData';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AssetListingCard } from '@/components/AssetListingCard';

// Time-aware greeting
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

// Get unique asset type categories
const CATEGORIES = ['All', ...Array.from(new Set(properties.map(p => {
  if (p.exitType.includes('Government')) return 'Government';
  if (p.assetType.includes('Industrial')) return 'Industrial';
  if (p.assetType.includes('Residential')) return 'Residential';
  if (p.assetType.includes('Developer')) return 'Developer';
  return 'Other';
})))];

export default function DashboardPage() {
  const router = useRouter();
  const { state, reset } = useFlow();
  const { isKYCComplete, setReturnUrl } = useKYC();
  const [activeTab, setActiveTab] = useState('All');

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

  // Filter properties by category
  const filteredProperties = activeTab === 'All'
    ? properties
    : properties.filter(p => {
        if (activeTab === 'Government') return p.exitType.includes('Government');
        if (activeTab === 'Industrial') return p.assetType.includes('Industrial');
        if (activeTab === 'Residential') return p.assetType.includes('Residential');
        if (activeTab === 'Developer') return p.assetType.includes('Developer') || p.developerName;
        return true;
      });

  return (
    <div className="min-h-screen flex flex-col px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto safe-top safe-bottom">
      {/* Sticky Header */}
      <header className="flex items-center justify-between mb-8 page-transition sticky top-0 z-20 py-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 bg-titanium-deep/80 backdrop-blur-xl border-b border-white/[0.03]">
        <Logo className="w-36 h-6 sm:w-40 sm:h-7" variant="dark" />

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Portfolio Link */}
          <button
            onClick={() => router.push('/portfolio')}
            className="text-text-muted hover:text-gold text-sm transition-all duration-300 py-2 px-3 min-h-[44px] flex items-center gap-1.5 rounded-lg hover:bg-white/[0.03]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="hidden sm:inline">Portfolio</span>
          </button>

          {/* User Avatar - Links to Profile */}
          <button
            onClick={() => router.push('/profile')}
            className="flex items-center gap-3 py-2 px-2 sm:px-3 rounded-lg hover:bg-white/[0.03] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/30 to-gold-dark/30 border border-gold/20 flex items-center justify-center">
              <span className="text-gold text-xs font-semibold">
                {state.displayName?.charAt(0)?.toUpperCase()}
              </span>
            </div>
            <span className="hidden sm:block text-text-secondary text-sm">{state.displayName}</span>
          </button>

          <button
            onClick={handleLogout}
            className="text-text-muted hover:text-gold text-sm transition-all duration-300 py-2 px-3 min-h-[44px] flex items-center gap-1.5 rounded-lg hover:bg-white/[0.03]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Welcome Hero Banner */}
      <section className="glass-card-hero p-6 sm:p-8 mb-8" style={{ opacity: 0, animation: 'fadeInUp 0.6s ease-out 0.1s forwards' }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-text-muted text-micro uppercase tracking-widest mb-2">{getGreeting()}</p>
            <h1 className="text-display text-white font-display">
              {state.displayName}, <span className="text-shimmer-gold">your portfolio awaits</span>
            </h1>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-6">
            {[
              { value: properties.length.toString(), label: 'Assets' },
              { value: '8', label: 'Cities' },
              { value: '42%', label: 'Avg Growth' },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center" style={{ opacity: 0, animation: `fadeInUp 0.4s ease-out ${0.3 + i * 0.1}s forwards` }}>
                <p className="text-gold font-display text-xl font-light">{stat.value}</p>
                <p className="text-text-ghost text-micro uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KYC Banner - Show if not completed */}
      {!isKYCComplete && (
        <section
          className="mb-6 p-4 bg-gold/5 border border-gold/20 rounded-xl"
          style={{ opacity: 0, animation: 'fadeInUp 0.5s ease-out 0.2s forwards' }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-white text-sm font-medium">Complete your KYC</p>
                <p className="text-zinc-500 text-xs">Verify your identity to participate in opportunities</p>
              </div>
            </div>
            <button
              onClick={handleCompleteKYC}
              className="px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 shrink-0"
              style={{
                background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.9), rgba(178, 144, 70, 0.9))',
                color: '#0a0a0a',
              }}
            >
              Complete KYC
            </button>
          </div>
        </section>
      )}

      {/* Category Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="bg-titanium-surface/50 border border-white/[0.04] h-10 p-1">
          {CATEGORIES.map(cat => (
            <TabsTrigger
              key={cat}
              value={cat}
              className="text-xs data-[state=active]:bg-gold/10 data-[state=active]:text-gold data-[state=active]:shadow-none transition-all duration-300"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

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
