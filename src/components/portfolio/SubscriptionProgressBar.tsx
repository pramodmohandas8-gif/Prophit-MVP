'use client';

interface SubscriptionProgressBarProps {
  subscribedUnits: number;
  totalUnits: number;
  showLabel?: boolean;
}

export function SubscriptionProgressBar({
  subscribedUnits,
  totalUnits,
  showLabel = true,
}: SubscriptionProgressBarProps) {
  const percentage = Math.round((subscribedUnits / totalUnits) * 100);

  return (
    <div className="space-y-2">
      {showLabel && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-400">Subscription Progress</span>
          <span className="text-white font-medium">
            {subscribedUnits} / {totalUnits} Units
          </span>
        </div>
      )}
      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            background: 'linear-gradient(90deg, #C9A962 0%, #B29046 100%)',
          }}
        />
      </div>
      {showLabel && (
        <p className="text-zinc-500 text-xs text-right">{percentage}% subscribed</p>
      )}
    </div>
  );
}
