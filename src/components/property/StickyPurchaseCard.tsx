'use client';

import { Button } from '@/components/ui/button';
import { Property, formatPrice } from '@/lib/propertyData';
import { useSubscription } from '@/context/SubscriptionContext';

interface StickyPurchaseCardProps {
  property: Property;
  onBuyUnits: () => void;
  isKYCComplete?: boolean;
}

// Get simple exit type label
function getSimpleExitLabel(exitType: string): string {
  const exitMap: Record<string, string> = {
    'Government Allotment': 'Authority Transfer',
    'Government Auction': 'Re-auction Exit',
    'Land Pooling Return': 'Pooling Return',
    'DMIC Tender': 'Tender Exit',
    'Developer Buyback': 'Buyback Window',
    'Port Tender': 'Port Authority Exit',
    'Special Allotment': 'Special Transfer',
    'Developer Offtake': 'Developer Purchase',
    'Leasehold Conversion': 'Conversion Exit',
  };
  return exitMap[exitType] || exitType;
}

export function StickyPurchaseCard({ property, onBuyUnits, isKYCComplete = false }: StickyPurchaseCardProps) {
  const { isSubscribed } = useSubscription();
  return (
    <div className="bg-[#0c0c0c] border border-white/[0.08] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-white/[0.06]">
        <h1 className="text-white text-lg font-medium leading-tight mb-1">
          {isSubscribed ? property.title : (
            <>
              {property.title.split(' ').slice(0, 2).join(' ')}{' '}
              <span className="select-none blur-[5px]">{property.title.split(' ').slice(2).join(' ')}</span>
            </>
          )}
        </h1>
        <p className="text-zinc-500 text-sm">
          {isSubscribed ? `${property.locality}, ${property.city}` : property.city}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="p-5 space-y-4">
        {/* Unit Price - Primary */}
        <div className="pb-4 border-b border-white/[0.06]">
          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Unit Price</p>
          <p className="text-gold text-2xl font-semibold">{formatPrice(property.unitPriceInr)}</p>
        </div>

        {/* Key Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Hold Period</p>
            <p className="text-white text-sm font-medium">{property.projectedHoldingPeriodYears} Years</p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Exit Path</p>
            <p className="text-white text-sm font-medium">{getSimpleExitLabel(property.exitType)}</p>
          </div>
        </div>

        {/* Summary */}
        <div className="pt-4 border-t border-white/[0.06]">
          <p className="text-zinc-400 text-sm leading-relaxed">
            {property.shortRationale}
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="p-5 pt-0 space-y-3">
        <Button
          variant="luxury"
          size="lg"
          className="w-full"
          onClick={onBuyUnits}
          disabled={property.availableUnits === 0}
        >
          {property.availableUnits === 0
            ? 'Fully Subscribed'
            : isKYCComplete
            ? 'Participate'
            : 'Complete KYC'}
        </Button>

        <button className="w-full py-2 text-zinc-400 text-sm hover:text-gold transition-colors flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          View Documents
        </button>
      </div>

      {/* Trust Indicators */}
      <div className="px-5 py-4 bg-white/[0.02] border-t border-white/[0.06]">
        <div className="flex items-center justify-center gap-4 text-zinc-500 text-xs">
          {property.titleClearance && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Title Verified
            </span>
          )}
          {property.escrowAmountInr > 0 && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Escrow Secured
            </span>
          )}
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            LLP Structure
          </span>
        </div>
      </div>
    </div>
  );
}
