'use client';

import { useEffect, useState } from 'react';

// Mock participation data - in production would come from API/context
function getParticipationStats() {
  // Check localStorage for any completed transactions
  const transactionState = typeof window !== 'undefined'
    ? localStorage.getItem('prophit_transaction_state')
    : null;

  let totalUnits = 0;
  let activeOpportunities = 0;
  let totalCapital = 0;

  if (transactionState) {
    try {
      const state = JSON.parse(transactionState);
      if (state.status === 'completed' && state.units) {
        totalUnits = state.units;
        activeOpportunities = 1;
        totalCapital = state.totalAmount || 0;
      }
    } catch {
      // Invalid state, use defaults
    }
  }

  return {
    totalUnitsHeld: totalUnits,
    activeOpportunities: activeOpportunities,
    closedOpportunities: 0,
    totalCapital: totalCapital,
  };
}

function formatCurrency(amount: number): string {
  if (amount === 0) return '0';
  if (amount >= 10000000) {
    return `${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `${(amount / 100000).toFixed(2)} L`;
  }
  return new Intl.NumberFormat('en-IN').format(amount);
}

export function ParticipationSummary() {
  const [stats, setStats] = useState({
    totalUnitsHeld: 0,
    activeOpportunities: 0,
    closedOpportunities: 0,
    totalCapital: 0,
  });

  useEffect(() => {
    setStats(getParticipationStats());
  }, []);

  const statItems = [
    {
      label: 'Total Participation',
      value: stats.totalUnitsHeld.toString(),
    },
    {
      label: 'Active Opportunities',
      value: stats.activeOpportunities.toString(),
    },
    {
      label: 'Closed Opportunities',
      value: stats.closedOpportunities.toString(),
    },
    {
      label: 'Total Capital Participated',
      value: stats.totalCapital > 0 ? `₹${formatCurrency(stats.totalCapital)}` : '₹0',
    },
  ];

  return (
    <div className="bg-[#0c0c0c] border border-white/[0.06] rounded-2xl p-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems.map((item) => (
          <div key={item.label} className="text-center lg:text-left">
            <p className="text-white text-2xl lg:text-3xl font-light mb-1">
              {item.value}
            </p>
            <p className="text-zinc-500 text-xs uppercase tracking-wider">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {stats.totalUnitsHeld === 0 && (
        <div className="mt-6 pt-6 border-t border-white/[0.04]">
          <p className="text-zinc-600 text-sm text-center">
            You haven&apos;t participated in any opportunities yet.{' '}
            <a href="/dashboard" className="text-gold hover:text-gold/80 transition-colors">
              Browse available opportunities
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
