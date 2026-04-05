'use client';

import { formatCurrency } from '@/lib/portfolioData';

interface PortfolioSummaryProps {
  totalCapital: number;
  totalUnits: number;
  activeOpportunities: number;
  closedOpportunities: number;
  fundsInEscrow: number;
  currentExposure: number;
}

export function PortfolioSummary({
  totalCapital,
  totalUnits,
  activeOpportunities,
  closedOpportunities,
  fundsInEscrow,
  currentExposure,
}: PortfolioSummaryProps) {
  const stats = [
    {
      label: 'Current Exposure',
      value: formatCurrency(currentExposure),
      highlight: true,
    },
    {
      label: 'Total Capital Participated',
      value: formatCurrency(totalCapital),
      highlight: false,
    },
    {
      label: 'Total Participation',
      value: totalUnits.toString(),
      highlight: false,
    },
    {
      label: 'Active Opportunities',
      value: activeOpportunities.toString(),
      highlight: false,
    },
    {
      label: 'Closed Opportunities',
      value: closedOpportunities.toString(),
      highlight: false,
    },
  ];

  // Add escrow stat if applicable
  if (fundsInEscrow > 0) {
    stats.push({
      label: 'Funds In Escrow',
      value: formatCurrency(fundsInEscrow),
      highlight: false,
    });
  }

  return (
    <div className="bg-[#0c0c0c] border border-white/[0.06] rounded-2xl p-6">
      <h2 className="text-zinc-400 text-xs uppercase tracking-wider mb-6">Holdings Snapshot</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p
              className={`text-2xl font-light mb-1 ${
                stat.highlight ? 'text-gold' : 'text-white'
              }`}
            >
              {stat.value}
            </p>
            <p className="text-zinc-500 text-xs">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
