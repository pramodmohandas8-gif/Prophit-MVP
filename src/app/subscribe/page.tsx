'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { useSubscription } from '@/context/SubscriptionContext';

export default function SubscribePage() {
  const router = useRouter();
  const { subscribe, isSubscribed } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState<'founding' | 'annual'>('founding');
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  // If already subscribed, show confirmation and redirect
  if (isSubscribed && !done) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-white text-lg font-medium mb-2">You&apos;re already subscribed</p>
          <p className="text-zinc-500 text-sm mb-6">Prophit Access is active on your account.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="text-gold hover:text-gold/80 text-sm transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleSubscribe = async () => {
    setProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    subscribe(selectedPlan);
    setProcessing(false);
    setDone(true);
  };

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-sm" style={{ opacity: 0, animation: 'fadeInUp 0.6s ease-out forwards' }}>
          <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-white text-2xl font-medium mb-2">Welcome to Prophit Access</h1>
          <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
            Full access to all listings, documents, and location details is now unlocked.
          </p>
          <button
            onClick={() => {
              // Return to the page they came from, or dashboard
              const returnUrl = localStorage.getItem('prophit_subscribe_return');
              localStorage.removeItem('prophit_subscribe_return');
              router.push(returnUrl || '/dashboard');
            }}
            className="w-full py-3.5 rounded-xl font-medium text-sm transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.9), rgba(178, 144, 70, 0.9))',
              color: '#0a0a0a',
            }}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-4">
        <Logo className="w-28 h-5" variant="dark" />
        <button
          onClick={() => router.back()}
          className="text-zinc-500 hover:text-white text-sm transition-colors"
        >
          Back
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 pb-10">
        <div className="w-full max-w-md" style={{ opacity: 0, animation: 'fadeInUp 0.6s ease-out 0.1s forwards' }}>
          {/* Title */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-white text-xl font-medium mb-2">Prophit Access</h1>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Unlock full access to verified documents, exact locations, and detailed due diligence for every listing.
            </p>
          </div>

          {/* What You Get */}
          <div className="bg-[#0c0c0c] border border-white/[0.06] rounded-2xl p-5 mb-6">
            <p className="text-zinc-400 text-xs uppercase tracking-wider mb-4">What&apos;s included</p>
            <div className="space-y-3">
              {[
                'Full document access — title reports, RERA certificates, and due diligence materials',
                'Exact property locations and neighbourhood context',
                'Structured ownership framework and transaction documentation (SPV, agreements, audit trail)',
                'Independent legal verification summaries and compliance checks',
                'Continuous asset monitoring, reporting, and updates',
                'Structured governance participation including voting on key decisions (where applicable)',
                'Priority access to new listings',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-gold/70 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-zinc-300 text-sm leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Plan Selection */}
          <div className="space-y-3 mb-6">
            {/* Founding Member */}
            <button
              onClick={() => setSelectedPlan('founding')}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                selectedPlan === 'founding'
                  ? 'bg-gold/[0.06] border-gold/30'
                  : 'bg-[#0c0c0c] border-white/[0.06] hover:border-white/[0.12]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm font-medium">Founding Member</span>
                  <span className="px-1.5 py-0.5 rounded bg-gold/10 text-gold text-[10px] font-medium uppercase tracking-wider">
                    Limited
                  </span>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  selectedPlan === 'founding' ? 'border-gold' : 'border-zinc-600'
                }`}>
                  {selectedPlan === 'founding' && (
                    <div className="w-2 h-2 rounded-full bg-gold" />
                  )}
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-gold text-2xl font-semibold">{'\u20B9'}2,499</span>
                <span className="text-zinc-500 text-sm">/year</span>
              </div>
              <p className="text-zinc-500 text-xs mt-1">Early adopter pricing. Locked for life.</p>
            </button>

            {/* Annual */}
            <button
              onClick={() => setSelectedPlan('annual')}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                selectedPlan === 'annual'
                  ? 'bg-gold/[0.06] border-gold/30'
                  : 'bg-[#0c0c0c] border-white/[0.06] hover:border-white/[0.12]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-white text-sm font-medium">Annual Access</span>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  selectedPlan === 'annual' ? 'border-gold' : 'border-zinc-600'
                }`}>
                  {selectedPlan === 'annual' && (
                    <div className="w-2 h-2 rounded-full bg-gold" />
                  )}
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-white text-2xl font-semibold">{'\u20B9'}4,999</span>
                <span className="text-zinc-500 text-sm">/year</span>
              </div>
              <p className="text-zinc-500 text-xs mt-1">Standard annual subscription.</p>
            </button>
          </div>

          {/* Subscribe Button */}
          <button
            onClick={handleSubscribe}
            disabled={processing}
            className="w-full py-3.5 rounded-xl font-medium text-sm transition-all duration-300 disabled:opacity-70"
            style={{
              background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.9), rgba(178, 144, 70, 0.9))',
              color: '#0a0a0a',
            }}
          >
            {processing ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing...
              </span>
            ) : (
              `Subscribe — ${'\u20B9'}${selectedPlan === 'founding' ? '2,499' : '4,999'}/year`
            )}
          </button>

          <p className="text-zinc-600 text-xs text-center mt-4 leading-relaxed">
            Secure payment. Cancel anytime. No questions asked.
          </p>
        </div>
      </div>
    </div>
  );
}
