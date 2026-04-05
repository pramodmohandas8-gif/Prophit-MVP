'use client';

import { useRouter } from 'next/navigation';
import { useSubscription } from '@/context/SubscriptionContext';

interface SubscribeGateProps {
  children: React.ReactNode;
  /** Contextual message shown when gated */
  message: string;
  /** Short description below the message */
  description?: string;
}

/**
 * Wraps content that should only be visible to subscribed users.
 * Non-subscribers see a contextual prompt to subscribe.
 */
export function SubscribeGate({ children, message, description }: SubscribeGateProps) {
  const { isSubscribed } = useSubscription();
  const router = useRouter();

  if (isSubscribed) {
    return <>{children}</>;
  }

  const handleSubscribe = () => {
    localStorage.setItem('prophit_subscribe_return', window.location.pathname);
    router.push('/subscribe');
  };

  return (
    <div className="relative rounded-2xl border border-white/[0.06] bg-[#0c0c0c] overflow-hidden">
      {/* Blurred preview hint */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0c0c0c]/60 to-[#0c0c0c] z-10 pointer-events-none" />

      {/* Faded children as preview */}
      <div className="opacity-[0.08] blur-[6px] pointer-events-none select-none" aria-hidden="true">
        {children}
      </div>

      {/* Subscribe prompt overlay */}
      <div className="absolute inset-0 z-20 flex items-center justify-center p-6">
        <div className="text-center max-w-xs">
          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-3">
            <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <p className="text-white text-sm font-medium mb-1">{message}</p>
          {description && (
            <p className="text-zinc-500 text-xs mb-4 leading-relaxed">{description}</p>
          )}
          <button
            onClick={handleSubscribe}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.9), rgba(178, 144, 70, 0.9))',
              color: '#0a0a0a',
            }}
          >
            Unlock with Prophit Access
          </button>
        </div>
      </div>
    </div>
  );
}
