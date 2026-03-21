'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPropertyById } from '@/lib/propertyData';

interface Participation {
  propertyId: string;
  propertyName: string;
  unitsHeld: number;
  participationDate: string;
  status: 'Active' | 'Locked-in' | 'Exited';
}

// Get participations from localStorage (transaction history)
function getParticipations(): Participation[] {
  if (typeof window === 'undefined') return [];

  const transactionState = localStorage.getItem('prophit_transaction_state');
  if (!transactionState) return [];

  try {
    const state = JSON.parse(transactionState);
    if (state.status === 'completed' && state.propertyId && state.units) {
      const property = getPropertyById(state.propertyId);
      return [
        {
          propertyId: state.propertyId,
          propertyName: property?.title || 'Unknown Property',
          unitsHeld: state.units,
          participationDate: new Date().toISOString(),
          status: 'Active',
        },
      ];
    }
  } catch {
    // Invalid state
  }

  return [];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function ParticipationTable() {
  const router = useRouter();
  const [participations, setParticipations] = useState<Participation[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setParticipations(getParticipations());
  }, []);

  if (!mounted) {
    return (
      <div className="bg-[#0c0c0c] border border-white/[0.06] rounded-2xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-zinc-800 rounded w-1/4" />
          <div className="h-12 bg-zinc-800/50 rounded" />
        </div>
      </div>
    );
  }

  if (participations.length === 0) {
    return (
      <div className="bg-[#0c0c0c] border border-white/[0.06] rounded-2xl p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-zinc-800/50 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <p className="text-zinc-500 text-sm mb-2">No participations yet</p>
        <p className="text-zinc-600 text-xs">
          Your investment history will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#0c0c0c] border border-white/[0.06] rounded-2xl overflow-hidden">
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
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-zinc-500 uppercase tracking-wider">
                View
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {participations.map((participation) => (
              <tr
                key={participation.propertyId}
                className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                onClick={() => router.push(`/dashboard/${participation.propertyId}`)}
              >
                <td className="px-6 py-5">
                  <p className="text-white text-sm font-medium">{participation.propertyName}</p>
                </td>
                <td className="px-6 py-5">
                  <p className="text-white text-sm">{participation.unitsHeld}</p>
                </td>
                <td className="px-6 py-5">
                  <p className="text-zinc-400 text-sm">{formatDate(participation.participationDate)}</p>
                </td>
                <td className="px-6 py-5">
                  <StatusPill status={participation.status} />
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="text-gold hover:text-gold/80 transition-colors">
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
        {participations.map((participation) => (
          <div
            key={participation.propertyId}
            className="p-4 hover:bg-white/[0.02] transition-colors cursor-pointer"
            onClick={() => router.push(`/dashboard/${participation.propertyId}`)}
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-white text-sm font-medium flex-1 pr-4">{participation.propertyName}</p>
              <StatusPill status={participation.status} />
            </div>
            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="text-zinc-500">{participation.unitsHeld} units</span>
                <span className="text-zinc-600 mx-2">·</span>
                <span className="text-zinc-500">{formatDate(participation.participationDate)}</span>
              </div>
              <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: 'Active' | 'Locked-in' | 'Exited' }) {
  const styles = {
    Active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Locked-in': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Exited: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
  };

  return (
    <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full border ${styles[status]}`}>
      {status}
    </span>
  );
}
