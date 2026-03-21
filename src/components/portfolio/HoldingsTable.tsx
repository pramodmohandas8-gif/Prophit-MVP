'use client';

import { PortfolioAsset, formatDate, formatCurrency, getDaysRemaining } from '@/lib/portfolioData';
import { LifecycleStatusPill } from './LifecycleStatusPill';
import { SubscriptionProgressBar } from './SubscriptionProgressBar';

interface HoldingsTableProps {
  assets: PortfolioAsset[];
  onSelectAsset: (assetId: string) => void;
}

export function HoldingsTable({ assets, onSelectAsset }: HoldingsTableProps) {
  const getProgressInfo = (asset: PortfolioAsset): React.ReactNode => {
    switch (asset.lifecycleStatus) {
      case 'raise_in_progress':
        return (
          <div className="w-32">
            <SubscriptionProgressBar
              subscribedUnits={asset.subscribedUnits}
              totalUnits={asset.totalUnits}
              showLabel={false}
            />
            <p className="text-zinc-500 text-xs mt-1">
              {asset.subscribedUnits}/{asset.totalUnits} units
            </p>
          </div>
        );
      case 'locked_in':
        if (asset.lockInEndDate) {
          const days = getDaysRemaining(asset.lockInEndDate);
          return (
            <div>
              <p className="text-white text-sm">{Math.abs(days)} days</p>
              <p className="text-zinc-500 text-xs">
                {days > 0 ? 'until exit window' : 'overdue'}
              </p>
            </div>
          );
        }
        return <span className="text-zinc-500">—</span>;
      case 'exited':
        if (asset.exitSettlementAmount) {
          return (
            <div>
              <p className="text-emerald-400 text-sm">{formatCurrency(asset.exitSettlementAmount)}</p>
              <p className="text-zinc-500 text-xs">Settlement</p>
            </div>
          );
        }
        return <span className="text-zinc-500">—</span>;
      default:
        return <span className="text-zinc-500">—</span>;
    }
  };

  return (
    <div className="bg-[#0c0c0c] border border-white/[0.06] rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-white/[0.04]">
        <h2 className="text-white text-base font-medium">Holdings</h2>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.04]">
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Property Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Units Held
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Participation Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Lifecycle Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Progress / Timeline
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-zinc-500 uppercase tracking-wider">
                View
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {assets.map((asset) => (
              <tr
                key={asset.id}
                className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                onClick={() => onSelectAsset(asset.id)}
              >
                <td className="px-6 py-5">
                  <div>
                    <p className="text-white text-sm font-medium">{asset.name}</p>
                    {asset.locality && asset.city && (
                      <p className="text-zinc-500 text-xs">{asset.locality}, {asset.city}</p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <p className="text-white text-sm">{asset.unitsHeld}</p>
                  <p className="text-zinc-500 text-xs">{formatCurrency(asset.unitPrice)}/unit</p>
                </td>
                <td className="px-6 py-5">
                  <p className="text-zinc-400 text-sm">{formatDate(asset.participationDate)}</p>
                </td>
                <td className="px-6 py-5">
                  <LifecycleStatusPill status={asset.lifecycleStatus} size="sm" />
                </td>
                <td className="px-6 py-5">
                  {getProgressInfo(asset)}
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="text-gold hover:text-gold/80 transition-colors p-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-white/[0.04]">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="p-4 hover:bg-white/[0.02] transition-colors cursor-pointer"
            onClick={() => onSelectAsset(asset.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{asset.name}</p>
                {asset.locality && asset.city && (
                  <p className="text-zinc-500 text-xs">{asset.locality}, {asset.city}</p>
                )}
              </div>
              <LifecycleStatusPill status={asset.lifecycleStatus} size="sm" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-zinc-500 text-xs">Units: </span>
                  <span className="text-white">{asset.unitsHeld}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-xs">{formatDate(asset.participationDate)}</span>
                </div>
              </div>
              <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            {/* Progress bar for raise_in_progress */}
            {asset.lifecycleStatus === 'raise_in_progress' && (
              <div className="mt-3">
                <SubscriptionProgressBar
                  subscribedUnits={asset.subscribedUnits}
                  totalUnits={asset.totalUnits}
                  showLabel={false}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
