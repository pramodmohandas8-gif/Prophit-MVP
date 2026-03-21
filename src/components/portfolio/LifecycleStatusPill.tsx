'use client';

import { LifecycleStatus, LIFECYCLE_CONFIG } from '@/lib/portfolioData';

interface LifecycleStatusPillProps {
  status: LifecycleStatus;
  size?: 'sm' | 'md';
}

const colorStyles = {
  gold: 'bg-gold/10 text-gold border-gold/20',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  zinc: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  red: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export function LifecycleStatusPill({ status, size = 'md' }: LifecycleStatusPillProps) {
  const config = LIFECYCLE_CONFIG[status];
  const colorClass = colorStyles[config.color];

  return (
    <span
      className={`inline-flex items-center gap-1.5 border rounded-full font-medium ${colorClass} ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs'
      }`}
    >
      {/* Animated dot for active states */}
      {(status === 'raise_in_progress' || status === 'exit_window_open') && (
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              status === 'raise_in_progress' ? 'bg-amber-400' : 'bg-gold'
            }`}
          />
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              status === 'raise_in_progress' ? 'bg-amber-400' : 'bg-gold'
            }`}
          />
        </span>
      )}
      {config.label}
    </span>
  );
}
