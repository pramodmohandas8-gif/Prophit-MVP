'use client';

import { Property, formatPrice } from '@/lib/propertyData';

interface MarketContextProps {
  property: Property;
}

// Simulate realistic area price trend (₹/sqft) based on property data
function generatePriceTrend(property: Property) {
  const currentPricePerSqft = Math.round(property.priceMinInr / property.sizeSqm);
  const annualGrowth = property.growthPercent / property.growthPeriodYears / 100;

  // Work backward from current price to generate historical data
  const years = ['2021', '2022', '2023', '2024', '2025', '2026'];
  const currentYearIndex = 4; // 2025

  return years.map((year, i) => {
    const yearsFromNow = i - currentYearIndex;
    const price = Math.round(currentPricePerSqft / Math.pow(1 + annualGrowth, -yearsFromNow));
    return { year, price };
  });
}

function formatPriceShort(value: number): string {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toString();
}

export function MarketContext({ property }: MarketContextProps) {
  const trendData = generatePriceTrend(property);
  const maxPrice = Math.max(...trendData.map(d => d.price));
  const minPrice = Math.min(...trendData.map(d => d.price));
  const range = maxPrice - minPrice;
  // Use a floor so bars have visible height even for the smallest value
  const floor = minPrice - range * 0.3;

  // Determine demand level based on available units
  const getDemandLevel = () => {
    const soldPercent = ((property.totalUnits - property.availableUnits) / property.totalUnits) * 100;
    if (soldPercent >= 70) return { level: 'High', color: 'text-emerald-400', bg: 'bg-emerald-400' };
    if (soldPercent >= 40) return { level: 'Moderate', color: 'text-amber-400', bg: 'bg-amber-400' };
    return { level: 'Growing', color: 'text-zinc-400', bg: 'bg-zinc-400' };
  };

  const demand = getDemandLevel();

  return (
    <section className="py-10 border-t border-white/[0.06]">
      <h2 className="text-white text-lg font-medium mb-6">Market Context</h2>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Price Trend Chart */}
        <div className="bg-[#0c0c0c] border border-white/[0.06] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-zinc-400 text-sm">Area Price Trend</p>
            <span className="text-emerald-400 text-xs font-medium">
              +{property.growthPercent}% ({property.growthPeriodYears}Y)
            </span>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end justify-between gap-2 h-36 mb-3">
            {trendData.map((data, index) => {
              const barHeight = Math.max(((data.price - floor) / (maxPrice - floor)) * 100, 8);
              const isLatest = index === trendData.length - 1;
              const isProjected = index === trendData.length - 1;

              return (
                <div key={data.year} className="flex-1 flex flex-col items-center gap-1.5">
                  {/* Price label on top */}
                  <span className={`text-[10px] font-medium ${isLatest ? 'text-gold' : 'text-zinc-500'}`}>
                    {formatPriceShort(data.price)}
                  </span>
                  {/* Bar */}
                  <div
                    className={`w-full rounded-t transition-all duration-500 ${isProjected ? 'border border-dashed border-gold/30' : ''}`}
                    style={{
                      height: `${barHeight}%`,
                      background: isLatest
                        ? 'linear-gradient(to top, rgba(201, 169, 98, 0.25), rgba(201, 169, 98, 0.6))'
                        : `rgba(255, 255, 255, ${0.05 + index * 0.02})`,
                    }}
                  />
                  {/* Year label */}
                  <span className={`text-[10px] ${isLatest ? 'text-gold font-medium' : 'text-zinc-600'}`}>
                    {data.year}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-white/10" />
              <span className="text-zinc-600 text-[10px]">Historical</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-gold/40" />
              <span className="text-zinc-600 text-[10px]">Projected</span>
            </div>
          </div>

          <p className="text-zinc-600 text-[10px] mt-2">
            ₹/sqft &middot; {property.growthSource} &middot; {property.locality}
          </p>
        </div>

        {/* Market Indicators */}
        <div className="space-y-4">
          {/* Transaction Range */}
          <div className="bg-[#0c0c0c] border border-white/[0.06] rounded-xl p-5">
            <p className="text-zinc-400 text-sm mb-3">Nearby Transaction Range</p>
            <div className="flex items-baseline gap-2">
              <span className="text-white text-xl font-semibold">
                {formatPrice(property.priceMinInr)}
              </span>
              <span className="text-zinc-500">—</span>
              <span className="text-white text-xl font-semibold">
                {formatPrice(property.priceMaxInr)}
              </span>
            </div>
            <p className="text-zinc-500 text-xs mt-2">
              For similar {property.assetType.toLowerCase()} in the area
            </p>
          </div>

          {/* Demand Indicator */}
          <div className="bg-[#0c0c0c] border border-white/[0.06] rounded-xl p-5">
            <p className="text-zinc-400 text-sm mb-3">Demand Indicator</p>
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {[1, 2, 3].map((bar) => (
                  <div
                    key={bar}
                    className={`w-4 rounded-full transition-all ${
                      (demand.level === 'High' && bar <= 3) ||
                      (demand.level === 'Moderate' && bar <= 2) ||
                      (demand.level === 'Growing' && bar <= 1)
                        ? demand.bg
                        : 'bg-zinc-700'
                    }`}
                    style={{ height: `${bar * 10 + 10}px` }}
                  />
                ))}
              </div>
              <span className={`text-lg font-medium ${demand.color}`}>
                {demand.level}
              </span>
            </div>
            <p className="text-zinc-500 text-xs mt-2">
              Based on subscription rate and market interest
            </p>
          </div>

          {/* Asset Type Performance */}
          <div className="bg-[#0c0c0c] border border-white/[0.06] rounded-xl p-5">
            <p className="text-zinc-400 text-sm mb-3">{property.assetType} Performance</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold/60 to-gold rounded-full"
                  style={{ width: `${Math.min(property.riskScore, 100)}%` }}
                />
              </div>
              <span className="text-white text-sm font-medium">
                {property.riskScore}/100
              </span>
            </div>
            <p className="text-zinc-500 text-xs mt-2">
              Overall opportunity score
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
