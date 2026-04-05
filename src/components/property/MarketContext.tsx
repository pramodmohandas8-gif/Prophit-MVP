'use client';

import { Property } from '@/lib/propertyData';

interface MarketContextProps {
  property: Property;
}

function generatePriceTrend(property: Property) {
  const currentPricePerSqft = Math.round(property.priceMinInr / property.sizeSqm);
  const annualGrowth = property.growthPercent / property.growthPeriodYears / 100;

  // Only show data for the growth period + 1 year projected
  const currentYear = 2025;
  const startYear = currentYear - property.growthPeriodYears;
  const endYear = currentYear + 1;
  const years: string[] = [];
  for (let y = startYear; y <= endYear; y++) {
    years.push(y.toString());
  }

  const currentYearIndex = years.indexOf(currentYear.toString());

  return years.map((year, i) => {
    const yearsFromCurrent = i - currentYearIndex;
    const price = Math.round(currentPricePerSqft / Math.pow(1 + annualGrowth, -yearsFromCurrent));
    return { year, price };
  });
}

function formatPriceShort(value: number): string {
  if (value >= 100000) return `₹${(value / 1000).toFixed(0)}K`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
  return `₹${value}`;
}

export function MarketContext({ property }: MarketContextProps) {
  const trendData = generatePriceTrend(property);
  const prices = trendData.map(d => d.price);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);

  const startPrice = trendData[0].price;
  const endPrice = trendData[trendData.length - 1].price;
  const actualGrowth = Math.round(((endPrice - startPrice) / startPrice) * 100);

  const graphPadTop = 20;
  const graphPadBottom = 8;
  const graphHeight = 120;
  const usableHeight = graphHeight - graphPadTop - graphPadBottom;

  const pointSpacing = 100 / (trendData.length - 1);
  const points = trendData.map((d, i) => {
    const x = i * pointSpacing;
    const y = graphPadTop + usableHeight - ((d.price - minPrice) / (maxPrice - minPrice)) * usableHeight;
    return { x, y };
  });

  const pathParts = points.map((point, i) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const prev = points[i - 1];
    const cpx1 = prev.x + pointSpacing * 0.4;
    const cpx2 = point.x - pointSpacing * 0.4;
    return `C ${cpx1} ${prev.y}, ${cpx2} ${point.y}, ${point.x} ${point.y}`;
  });
  const linePath = pathParts.join(' ');

  const lastPoint = points[points.length - 1];
  const firstPoint = points[0];
  const fillPath = `${linePath} L ${lastPoint.x} ${graphHeight} L ${firstPoint.x} ${graphHeight} Z`;

  const totalYears = trendData.length - 1;

  return (
    <section className="py-10 border-t border-white/[0.06]">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white text-lg font-medium">Area Price Trend</h2>
        <span className="text-emerald-400/80 text-xs font-medium">
          +{actualGrowth}% over {totalYears}Y
        </span>
      </div>

      <div className="bg-[#0c0c0c] border border-white/[0.06] rounded-xl p-4 sm:p-5">
        {/* Graph */}
        <div className="relative pl-9 sm:pl-10">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 flex flex-col justify-between h-[100px] sm:h-[120px] pointer-events-none w-8 sm:w-9">
            <span className="text-[9px] sm:text-[10px] text-zinc-600 leading-none translate-y-4 text-right">{formatPriceShort(maxPrice)}</span>
            <span className="text-[9px] sm:text-[10px] text-zinc-600 leading-none -translate-y-0.5 text-right">{formatPriceShort(minPrice)}</span>
          </div>

          <svg
            viewBox={`0 0 100 ${graphHeight}`}
            preserveAspectRatio="none"
            className="w-full h-[100px] sm:h-[120px]"
          >
            <defs>
              <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(201, 169, 98, 0.12)" />
                <stop offset="100%" stopColor="rgba(201, 169, 98, 0)" />
              </linearGradient>
              <linearGradient id="strokeFill" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(201, 169, 98, 0.25)" />
                <stop offset="100%" stopColor="rgba(201, 169, 98, 0.85)" />
              </linearGradient>
            </defs>

            <line x1="0" y1={graphPadTop} x2="100" y2={graphPadTop} stroke="rgba(255,255,255,0.03)" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
            <line x1="0" y1={graphPadTop + usableHeight} x2="100" y2={graphPadTop + usableHeight} stroke="rgba(255,255,255,0.03)" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />

            <path d={fillPath} fill="url(#areaFill)" />

            <path
              d={linePath}
              fill="none"
              stroke="url(#strokeFill)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle
              cx={lastPoint.x}
              cy={lastPoint.y}
              r="2.5"
              fill="#c9a962"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* X-axis years */}
          <div className="flex justify-between mt-1.5">
            {trendData.map((d, i) => (
              <span
                key={d.year}
                className={`text-[9px] sm:text-[10px] ${i === trendData.length - 1 ? 'text-gold/80 font-medium' : 'text-zinc-600'}`}
              >
                {d.year}
              </span>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mt-4 pt-3.5 border-t border-white/[0.04]">
          <span className="text-zinc-300 text-sm">{formatPriceShort(startPrice)}</span>
          <span className="text-zinc-600 text-xs">→</span>
          <span className="text-gold text-sm font-medium">{formatPriceShort(endPrice)}</span>
          <span className="text-zinc-600 text-xs">per sq ft</span>
          <span className="text-zinc-700 text-[10px] ml-auto hidden sm:inline">{property.growthSource} · {property.locality}</span>
        </div>
        <p className="text-zinc-700 text-[10px] mt-2 sm:hidden">{property.growthSource} · {property.locality}</p>
      </div>
    </section>
  );
}
