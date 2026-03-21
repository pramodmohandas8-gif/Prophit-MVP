'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { useFlow } from '@/context/FlowContext';
import {
  PortfolioHeader,
  PortfolioSummary,
  HoldingsTable,
  AssetDetailView,
} from '@/components/portfolio';
import {
  getAllPortfolioAssets,
  calculatePortfolioSummary,
  PortfolioAsset,
} from '@/lib/portfolioData';

export default function PortfolioPage() {
  const router = useRouter();
  const { state: flowState, reset } = useFlow();
  const [mounted, setMounted] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [assets, setAssets] = useState<PortfolioAsset[]>([]);

  // Prevent hydration mismatch and load assets from localStorage
  useEffect(() => {
    setMounted(true);
    // Load assets including any completed transactions from localStorage
    setAssets(getAllPortfolioAssets());
  }, []);

  // Auth guard
  useEffect(() => {
    if (mounted && (!flowState.displayName || !flowState.isVerified)) {
      router.replace('/');
    }
  }, [flowState.displayName, flowState.isVerified, router, mounted]);

  const handleLogout = () => {
    reset();
    router.push('/');
  };

  const selectedAsset = selectedAssetId ? assets.find(a => a.id === selectedAssetId) : null;
  const summary = calculatePortfolioSummary(assets);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="animate-spin h-8 w-8 border-2 border-gold border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors py-2 pr-2"
                aria-label="Back to dashboard"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <Logo className="w-24 h-4" variant="dark" />
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/profile')}
                className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white/[0.03] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/30 to-gold-dark/30 border border-gold/20 flex items-center justify-center">
                  <span className="text-gold text-xs font-semibold">
                    {flowState.displayName?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <span className="hidden sm:block text-zinc-400 text-sm">{flowState.displayName}</span>
              </button>
              <button
                onClick={handleLogout}
                className="text-zinc-500 hover:text-gold text-sm transition-colors py-2 pl-2"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-24">
        {/* Page Header */}
        <div style={{ opacity: 0, animation: 'fadeInUp 0.5s ease-out 0.1s forwards' }}>
          <PortfolioHeader />
        </div>

        {/* Portfolio Summary */}
        <div
          className="mb-8"
          style={{ opacity: 0, animation: 'fadeInUp 0.5s ease-out 0.15s forwards' }}
        >
          <PortfolioSummary
            totalCapital={summary.totalCapital}
            totalUnits={summary.totalUnits}
            activeOpportunities={summary.activeOpportunities}
            closedOpportunities={summary.closedOpportunities}
            fundsInEscrow={summary.fundsInEscrow}
            currentExposure={summary.currentExposure}
          />
        </div>

        {/* Holdings Table */}
        <div style={{ opacity: 0, animation: 'fadeInUp 0.5s ease-out 0.2s forwards' }}>
          <HoldingsTable
            assets={assets}
            onSelectAsset={setSelectedAssetId}
          />
        </div>

        {/* Disclaimer */}
        <div
          className="mt-12 text-center"
          style={{ opacity: 0, animation: 'fadeInUp 0.5s ease-out 0.25s forwards' }}
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mx-auto mb-4" />
          <p className="text-zinc-600 text-xs leading-relaxed max-w-lg mx-auto">
            Portfolio values are for informational purposes. Actual settlement amounts
            may vary based on exit conditions and market factors. This is not financial advice.
          </p>
        </div>
      </main>

      {/* Asset Detail Slide-in Panel */}
      {selectedAsset && (
        <AssetDetailView
          asset={selectedAsset}
          onClose={() => setSelectedAssetId(null)}
        />
      )}
    </div>
  );
}
