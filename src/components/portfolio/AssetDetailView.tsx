'use client';

import { PortfolioAsset, formatDate, formatCurrency, getTimelineEvents, LIFECYCLE_CONFIG } from '@/lib/portfolioData';
import { LifecycleStatusPill } from './LifecycleStatusPill';
import { EscrowReassuranceBlock } from './EscrowReassuranceBlock';
import { SubscriptionProgressBar } from './SubscriptionProgressBar';
import { AssetTimeline } from './AssetTimeline';

interface AssetDetailViewProps {
  asset: PortfolioAsset;
  onClose: () => void;
}

export function AssetDetailView({ asset, onClose }: AssetDetailViewProps) {
  const totalParticipationValue = asset.unitsHeld * asset.unitPrice;
  const timelineEvents = getTimelineEvents(asset);
  const lifecycleConfig = LIFECYCLE_CONFIG[asset.lifecycleStatus];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-lg h-full bg-[#0a0a0a] border-l border-white/[0.06] overflow-y-auto"
        style={{ animation: 'slideInRight 0.3s ease-out' }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.04]">
          <div className="flex items-center justify-between p-5">
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white transition-colors -ml-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <LifecycleStatusPill status={asset.lifecycleStatus} />
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-6">
          {/* Asset Name */}
          <div>
            <h2 className="text-white text-xl font-medium mb-1">{asset.name}</h2>
            {asset.locality && asset.city && (
              <p className="text-zinc-500 text-sm">{asset.locality}, {asset.city}</p>
            )}
          </div>

          {/* Lifecycle Description */}
          <div className="bg-white/[0.02] rounded-xl p-4">
            <p className="text-zinc-400 text-sm">{lifecycleConfig.description}</p>
          </div>

          {/* Escrow Block for raise_in_progress */}
          {asset.lifecycleStatus === 'raise_in_progress' && asset.escrowProtected && (
            <EscrowReassuranceBlock expectedCloseDate={asset.expectedCloseDate} />
          )}

          {/* Subscription Progress for raise_in_progress */}
          {asset.lifecycleStatus === 'raise_in_progress' && (
            <div className="bg-[#0c0c0c] border border-white/[0.06] rounded-xl p-5">
              <SubscriptionProgressBar
                subscribedUnits={asset.subscribedUnits}
                totalUnits={asset.totalUnits}
              />
            </div>
          )}

          {/* Key Metrics */}
          <div className="bg-[#0c0c0c] border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-zinc-400 text-xs uppercase tracking-wider mb-4">Participation Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-zinc-500 text-sm">Original Unit Price</span>
                <span className="text-white text-sm">{formatCurrency(asset.unitPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 text-sm">Participation Held</span>
                <span className="text-white text-sm">{asset.unitsHeld}</span>
              </div>
              <div className="h-px bg-white/[0.04]" />
              <div className="flex justify-between">
                <span className="text-zinc-500 text-sm">Total Participation Value</span>
                <span className="text-gold text-sm font-medium">{formatCurrency(totalParticipationValue)}</span>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="bg-[#0c0c0c] border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-zinc-400 text-xs uppercase tracking-wider mb-4">Key Dates</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-zinc-500 text-sm">Participation Date</span>
                <span className="text-white text-sm">{formatDate(asset.participationDate)}</span>
              </div>
              {asset.expectedCloseDate && asset.lifecycleStatus === 'raise_in_progress' && (
                <div className="flex justify-between">
                  <span className="text-zinc-500 text-sm">Expected Close Date</span>
                  <span className="text-white text-sm">{formatDate(asset.expectedCloseDate)}</span>
                </div>
              )}
              {asset.saleTransferDate && (
                <div className="flex justify-between">
                  <span className="text-zinc-500 text-sm">Sale Transfer Date</span>
                  <span className="text-white text-sm">{formatDate(asset.saleTransferDate)}</span>
                </div>
              )}
              {asset.lockInEndDate && (
                <div className="flex justify-between">
                  <span className="text-zinc-500 text-sm">Lock-in End Date</span>
                  <span className="text-white text-sm">{formatDate(asset.lockInEndDate)}</span>
                </div>
              )}
              {asset.exitDate && (
                <div className="flex justify-between">
                  <span className="text-zinc-500 text-sm">Exit Date</span>
                  <span className="text-white text-sm">{formatDate(asset.exitDate)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Settlement Amount for Exited */}
          {asset.lifecycleStatus === 'exited' && asset.exitSettlementAmount && (
            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-5">
              <h3 className="text-zinc-400 text-xs uppercase tracking-wider mb-3">Exit Settlement</h3>
              <p className="text-emerald-400 text-2xl font-light">
                {formatCurrency(asset.exitSettlementAmount)}
              </p>
              <p className="text-zinc-500 text-xs mt-1">
                Settled on {asset.exitDate && formatDate(asset.exitDate)}
              </p>
            </div>
          )}

          {/* Escrow State */}
          {asset.escrowProtected && (
            <div className="bg-[#0c0c0c] border border-white/[0.06] rounded-xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Escrow Protected</p>
                  <p className="text-zinc-500 text-xs">Funds secured until conditions are met</p>
                </div>
              </div>
            </div>
          )}

          {/* Event Timeline */}
          <div className="bg-[#0c0c0c] border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-zinc-400 text-xs uppercase tracking-wider mb-6">Event Timeline</h3>
            <AssetTimeline events={timelineEvents} />
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
