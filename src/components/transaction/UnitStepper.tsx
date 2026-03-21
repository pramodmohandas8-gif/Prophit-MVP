'use client';

import { cn } from '@/lib/utils';

interface UnitStepperProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  disabled?: boolean;
}

export function UnitStepper({ value, onChange, min, max, disabled = false }: UnitStepperProps) {
  const canDecrement = value > min && !disabled;
  const canIncrement = value < max && !disabled;

  const handleDecrement = () => {
    if (canDecrement) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (canIncrement) {
      onChange(value + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4">
      {/* Decrement Button */}
      <button
        type="button"
        onClick={handleDecrement}
        disabled={!canDecrement}
        className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center',
          'bg-bg-card border border-gold/20 text-gold',
          'transition-all duration-200 ease-luxury',
          'hover:border-gold hover:bg-gold/5 hover:shadow-gold-glow',
          'active:scale-95',
          'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gold/20 disabled:hover:bg-bg-card disabled:hover:shadow-none'
        )}
        aria-label="Decrease units"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>

      {/* Value Display */}
      <div className="min-w-[80px] text-center">
        <span className="text-3xl font-semibold text-white heading-luxury">{value}</span>
        <p className="text-xs text-text-muted mt-0.5">
          {value === 1 ? 'unit' : 'units'}
        </p>
      </div>

      {/* Increment Button */}
      <button
        type="button"
        onClick={handleIncrement}
        disabled={!canIncrement}
        className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center',
          'bg-bg-card border border-gold/20 text-gold',
          'transition-all duration-200 ease-luxury',
          'hover:border-gold hover:bg-gold/5 hover:shadow-gold-glow',
          'active:scale-95',
          'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gold/20 disabled:hover:bg-bg-card disabled:hover:shadow-none'
        )}
        aria-label="Increase units"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}
