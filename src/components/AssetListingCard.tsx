'use client';

import Image from 'next/image';
import { Property, formatPrice } from '@/lib/propertyData';
import { cn } from '@/lib/utils';

interface AssetListingCardProps {
  property: Property;
  onClick: () => void;
  style?: React.CSSProperties;
}

// Calculate capital raised (mock: based on available units)
function getCapitalRaised(property: Property): { raised: number; total: number; percent: number } {
  const soldUnits = property.totalUnits - property.availableUnits;
  const raised = soldUnits * property.unitPriceInr;
  const total = property.totalUnits * property.unitPriceInr;
  const percent = Math.round((soldUnits / property.totalUnits) * 100);
  return { raised, total, percent };
}

export function AssetListingCard({ property, onClick, style }: AssetListingCardProps) {
  const capital = getCapitalRaised(property);

  // Determine status based on availability
  const status = property.availableUnits === 0 ? 'Closed' :
                 property.availableUnits < property.totalUnits * 0.2 ? 'Closing Soon' : 'Open';
  const statusColor = status === 'Open' ? 'text-emerald-400' :
                      status === 'Closing Soon' ? 'text-amber-400' : 'text-zinc-500';

  return (
    <article
      className={cn(
        'group relative bg-[#0c0c0c] border border-white/[0.06] rounded-lg overflow-hidden cursor-pointer',
        'transition-all duration-300 ease-out',
        'hover:border-gold/25 hover:bg-[#0e0e0e]'
      )}
      style={style}
      onClick={onClick}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick(); }}
    >
      {/* ═══════════════════════════════════════════════════════════════
          HEADER: Asset Name + Location | Risk Grade + Status
          ═══════════════════════════════════════════════════════════════ */}
      <div className="px-4 py-3 border-b border-white/[0.04]">
        <div className="flex items-start justify-between gap-3">
          {/* Left: Name + Location */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white text-sm font-medium leading-tight truncate">
              {property.title}
            </h3>
            <p className="text-zinc-500 text-xs mt-0.5">
              {property.locality}, {property.city}
            </p>
          </div>

          {/* Right: Status */}
          <div className="shrink-0">
            <span className={cn('text-xs font-medium', statusColor)}>
              {status}
            </span>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center gap-2 mt-2">
          {property.titleClearance && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/[0.03] text-zinc-500 text-[10px]">
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Title Verified
            </span>
          )}
          {property.reraNumber && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/[0.03] text-zinc-500 text-[10px]">
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              RERA
            </span>
          )}
          {property.layoutApproved && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/[0.03] text-zinc-500 text-[10px]">
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Approved Layout
            </span>
          )}
          {!property.layoutApproved && property.ecLast30Yrs && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/[0.03] text-zinc-500 text-[10px]">
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              EC Clear
            </span>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          IMAGE SECTION: Asset visual with corner tags
          ═══════════════════════════════════════════════════════════════ */}
      <div className="relative h-36 overflow-hidden bg-zinc-900">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />

        {/* Bottom-left: Asset Type + Size */}
        <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/70 backdrop-blur-sm">
          <span className="text-white/80 text-[10px] font-medium">
            {property.assetType} &middot; {property.sizeSqm.toLocaleString()} sqm
          </span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          PRIMARY CAPITAL BLOCK: Unit Price (Main Anchor)
          ═══════════════════════════════════════════════════════════════ */}
      <div className="px-4 py-4 border-b border-white/[0.04]">
        {/* Unit Price - PRIMARY ANCHOR */}
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <p className="text-zinc-500 text-[10px] uppercase tracking-wider mb-0.5">Unit Price</p>
            <p className="text-gold text-2xl font-semibold tracking-tight">
              {formatPrice(property.unitPriceInr)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-zinc-500 text-[10px] uppercase tracking-wider mb-0.5">Available</p>
            <p className="text-white text-lg font-medium">
              {property.availableUnits}<span className="text-zinc-600">/{property.totalUnits}</span>
            </p>
          </div>
        </div>

        {/* Capital Raised Progress */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-zinc-500">Capital Raised</span>
            <span className="text-zinc-400">
              {formatPrice(capital.raised)} <span className="text-zinc-600">of {formatPrice(capital.total)}</span>
            </span>
          </div>
          <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold/60 to-gold transition-all duration-500"
              style={{ width: `${capital.percent}%` }}
            />
          </div>
          <p className="text-zinc-600 text-[10px] text-right">{capital.percent}% subscribed</p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECONDARY INFO: Total Value, Outlook, Lock-in, Structure
          ═══════════════════════════════════════════════════════════════ */}
      <div className="px-4 py-3 grid grid-cols-2 gap-x-4 gap-y-2">
        <div>
          <p className="text-zinc-600 text-[10px] uppercase tracking-wider">Total Asset Value</p>
          <p className="text-zinc-400 text-xs font-medium">
            {formatPrice(property.priceMinInr)}
          </p>
        </div>
        <div>
          <p className="text-zinc-600 text-[10px] uppercase tracking-wider">2Y Research Outlook</p>
          <p className="text-zinc-400 text-xs font-medium">
            +{property.growthPercent}%
            <span className="text-zinc-600 font-normal ml-1">est.</span>
          </p>
        </div>
        <div>
          <p className="text-zinc-600 text-[10px] uppercase tracking-wider">Lock-in Period</p>
          <p className="text-zinc-400 text-xs font-medium">
            {property.projectedHoldingPeriodYears} Years
          </p>
        </div>
        <div>
          <p className="text-zinc-600 text-[10px] uppercase tracking-wider">Structure</p>
          <p className="text-zinc-400 text-xs font-medium">
            LLP Participation
          </p>
        </div>
      </div>

      {/* Hover Indicator */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </article>
  );
}
