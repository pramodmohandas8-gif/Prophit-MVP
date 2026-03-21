'use client';

import { cn } from '@/lib/utils';

interface VerificationDataItem {
  label: string;
  value: string;
}

interface VerificationCardProps {
  title: string;
  verified?: boolean;
  verifiedData?: VerificationDataItem[];
  className?: string;
}

export function VerificationCard({
  title,
  verified = false,
  verifiedData = [],
  className,
}: VerificationCardProps) {
  return (
    <div
      className={cn(
        'bg-[#0c0c0c] border rounded-2xl p-6 transition-all duration-300',
        verified ? 'border-emerald-500/20' : 'border-white/[0.06]',
        className
      )}
    >
      {/* Header with Verified Badge */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center',
              verified ? 'bg-emerald-500/10' : 'bg-gold/10'
            )}
          >
            {verified ? (
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            )}
          </div>
          <h3 className="text-white text-base font-medium">{title}</h3>
        </div>

        {verified && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Verified
          </span>
        )}
      </div>

      {/* Verified Data */}
      {verified && verifiedData.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-white/[0.04]">
          {verifiedData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-zinc-500 text-sm">{item.label}</span>
              <span className="text-white text-sm font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
