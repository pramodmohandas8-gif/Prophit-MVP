'use client';

import { Property, formatPrice } from '@/lib/propertyData';
import { useSubscription } from '@/context/SubscriptionContext';

interface ParticipationOverviewProps {
  property: Property;
}

export function ParticipationOverview({ property }: ParticipationOverviewProps) {
  const { isSubscribed } = useSubscription();
  const soldUnits = property.totalUnits - property.availableUnits;
  const soldPercent = Math.round((soldUnits / property.totalUnits) * 100);

  // Mock investor count based on sold units
  const investorCount = Math.max(Math.floor(soldUnits * 0.7), 1);

  return (
    <section className="py-10 border-t border-white/[0.06]">
      <h2 className="text-white text-lg font-medium mb-6">Participation Snapshot</h2>

      <div className="bg-[#0c0c0c] border border-white/[0.06] rounded-xl p-6">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-zinc-400 text-sm">Subscription Progress</span>
            <span className={`text-white text-sm font-medium ${!isSubscribed ? 'select-none blur-[5px]' : ''}`}>
              {isSubscribed ? `${soldPercent}%` : 'XX%'}
            </span>
          </div>
          <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${soldPercent}%`,
                background: 'linear-gradient(90deg, rgba(201, 169, 98, 0.6), rgba(201, 169, 98, 1))',
              }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white/[0.02] rounded-lg">
            <p className="text-2xl font-semibold text-white mb-1">
              {property.totalUnits}
            </p>
            <p className="text-zinc-500 text-xs">Total Participation</p>
          </div>

          <div className="text-center p-4 bg-white/[0.02] rounded-lg">
            <p className={`text-2xl font-semibold text-emerald-400 mb-1 ${!isSubscribed ? 'select-none blur-[6px]' : ''}`}>
              {isSubscribed ? soldUnits : '??'}
            </p>
            <p className="text-zinc-500 text-xs">Subscribed</p>
          </div>

          <div className="text-center p-4 bg-white/[0.02] rounded-lg">
            <p className={`text-2xl font-semibold text-gold mb-1 ${!isSubscribed ? 'select-none blur-[6px]' : ''}`}>
              {isSubscribed ? property.availableUnits : '??'}
            </p>
            <p className="text-zinc-500 text-xs">Available</p>
          </div>

          <div className="text-center p-4 bg-white/[0.02] rounded-lg">
            <p className={`text-2xl font-semibold text-white mb-1 ${!isSubscribed ? 'select-none blur-[6px]' : ''}`}>
              {isSubscribed ? investorCount : '??'}
            </p>
            <p className="text-zinc-500 text-xs">Participants</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-white/[0.06] grid grid-cols-2 gap-6">
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Capital Raised</p>
            <p className={`text-white text-lg font-medium ${!isSubscribed ? 'select-none blur-[6px]' : ''}`}>
              {isSubscribed ? formatPrice(soldUnits * property.unitPriceInr) : '₹XX.X Cr'}
            </p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Target Size</p>
            <p className={`text-white text-lg font-medium ${!isSubscribed ? 'select-none blur-[6px]' : ''}`}>
              {isSubscribed ? formatPrice(property.totalUnits * property.unitPriceInr) : '₹XX.X Cr'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
