'use client';

import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3;
}

const steps = [
  { number: 1, label: 'Aadhaar' },
  { number: 2, label: 'PAN' },
  { number: 3, label: 'Complete' },
];

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          {/* Step Circle */}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300',
                currentStep >= step.number
                  ? 'bg-gold/20 text-gold border border-gold/40'
                  : 'bg-white/[0.03] text-zinc-500 border border-white/[0.06]'
              )}
            >
              {currentStep > step.number ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.number
              )}
            </div>
            <span
              className={cn(
                'text-[10px] mt-1.5 transition-colors',
                currentStep >= step.number ? 'text-gold' : 'text-zinc-600'
              )}
            >
              {step.label}
            </span>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={cn(
                'w-12 h-px mx-2 mb-4 transition-colors',
                currentStep > step.number ? 'bg-gold/40' : 'bg-white/[0.06]'
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
