'use client';

import { cn } from '@/lib/utils';

interface PaymentMethodCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
}

export function PaymentMethodCard({
  title,
  description,
  icon,
  selected,
  onSelect,
}: PaymentMethodCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'w-full p-4 rounded-xl border text-left transition-all duration-200 ease-luxury',
        'bg-bg-card hover:bg-bg-elevated',
        selected
          ? 'border-gold bg-gold/5 shadow-gold-glow'
          : 'border-gold/10 hover:border-gold/30'
      )}
    >
      <div className="flex items-start gap-4">
        {/* Radio indicator */}
        <div className={cn(
          'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200',
          selected
            ? 'border-gold bg-gold'
            : 'border-gold/30'
        )}>
          {selected && (
            <div className="w-2 h-2 rounded-full bg-bg-primary" />
          )}
        </div>

        {/* Icon */}
        <div className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
          selected ? 'bg-gold/20 text-gold' : 'bg-bg-elevated text-text-muted'
        )}>
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className={cn(
            'font-medium',
            selected ? 'text-gold' : 'text-white'
          )}>
            {title}
          </p>
          <p className="text-text-muted text-sm mt-0.5">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}
