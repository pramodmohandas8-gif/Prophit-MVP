'use client';

import { TimelineEvent, formatDate } from '@/lib/portfolioData';

interface AssetTimelineProps {
  events: TimelineEvent[];
}

export function AssetTimeline({ events }: AssetTimelineProps) {
  return (
    <div className="space-y-0">
      {events.map((event, index) => (
        <div key={event.id} className="flex gap-4">
          {/* Timeline Line & Dot */}
          <div className="flex flex-col items-center">
            <div
              className={`w-3 h-3 rounded-full border-2 shrink-0 ${
                event.status === 'completed'
                  ? 'bg-emerald-500/20 border-emerald-500'
                  : event.status === 'current'
                  ? 'bg-gold/20 border-gold'
                  : 'bg-zinc-800 border-zinc-600'
              }`}
            />
            {index < events.length - 1 && (
              <div
                className={`w-px flex-1 min-h-[32px] ${
                  event.status === 'completed' ? 'bg-emerald-500/30' : 'bg-zinc-800'
                }`}
              />
            )}
          </div>

          {/* Event Content */}
          <div className="pb-6 -mt-0.5">
            <p
              className={`text-sm font-medium ${
                event.status === 'completed'
                  ? 'text-white'
                  : event.status === 'current'
                  ? 'text-gold'
                  : 'text-zinc-500'
              }`}
            >
              {event.label}
            </p>
            {event.date && (
              <p className="text-zinc-500 text-xs mt-0.5">
                {event.status === 'upcoming' ? 'Expected: ' : ''}
                {formatDate(event.date)}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
