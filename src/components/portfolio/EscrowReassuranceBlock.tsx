'use client';

interface EscrowReassuranceBlockProps {
  expectedCloseDate?: string;
}

export function EscrowReassuranceBlock({ expectedCloseDate }: EscrowReassuranceBlockProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
          <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-white text-sm font-medium mb-1">
            Your funds are secured in escrow
          </p>
          <p className="text-zinc-400 text-xs leading-relaxed">
            Sale will complete once full subscription is reached.
            {expectedCloseDate && (
              <> Expected close date: <span className="text-zinc-300">{formatDate(expectedCloseDate)}</span>.</>
            )}
          </p>
          <p className="text-zinc-500 text-xs mt-2">
            If full subscription is not reached by the close date, funds will be returned.
          </p>
        </div>
      </div>
    </div>
  );
}
