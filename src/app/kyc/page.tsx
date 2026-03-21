'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { useFlow } from '@/context/FlowContext';
import { useKYC } from '@/context/KYCContext';
import { AadhaarStep } from '@/components/kyc/AadhaarStep';
import { PANStep } from '@/components/kyc/PANStep';
import { CompletionStep } from '@/components/kyc/CompletionStep';
import { StepIndicator } from '@/components/kyc/StepIndicator';

function KYCContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state: flowState } = useFlow();
  const { state: kycState } = useKYC();
  const [mounted, setMounted] = useState(false);

  // Check if this is part of the onboarding flow (skippable)
  const isOnboarding = searchParams.get('onboarding') === 'true';

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auth guard
  useEffect(() => {
    if (mounted && (!flowState.displayName || !flowState.isVerified)) {
      router.replace('/');
    }
  }, [flowState.displayName, flowState.isVerified, router, mounted]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-gold border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="max-w-xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Back button - only show when not in onboarding mode */}
            {!isOnboarding ? (
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors py-2 pr-2"
                aria-label="Go back"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            ) : (
              <div className="w-9" />
            )}
            <Logo className="w-24 h-4" variant="dark" />
            {/* Skip button - only show in onboarding mode and before completion */}
            {isOnboarding && kycState.currentStep < 3 ? (
              <button
                onClick={() => router.replace('/dashboard')}
                className="text-zinc-500 hover:text-gold text-sm transition-colors py-2 pl-2"
              >
                Skip
              </button>
            ) : (
              <div className="w-9" />
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div
          className="text-center mb-8"
          style={{ opacity: 0, animation: 'fadeInUp 0.5s ease-out 0.1s forwards' }}
        >
          <h1 className="text-white text-xl font-medium mb-2">Identity Verification</h1>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-sm mx-auto">
            KYC is required before participation. Your information is encrypted and stored securely.
          </p>
        </div>

        {/* Step Indicator */}
        <div style={{ opacity: 0, animation: 'fadeInUp 0.5s ease-out 0.2s forwards' }}>
          <StepIndicator currentStep={kycState.currentStep} />
        </div>

        {/* Step Content */}
        <div
          className="mt-8"
          style={{ opacity: 0, animation: 'fadeInUp 0.5s ease-out 0.3s forwards' }}
        >
          {kycState.currentStep === 1 && <AadhaarStep />}
          {kycState.currentStep === 2 && <PANStep />}
          {kycState.currentStep === 3 && <CompletionStep />}
        </div>

        {/* Skip for now - only during onboarding and before completion */}
        {isOnboarding && kycState.currentStep < 3 && (
          <div
            className="text-center mt-8"
            style={{ opacity: 0, animation: 'fadeInUp 0.5s ease-out 0.5s forwards' }}
          >
            <button
              onClick={() => router.replace('/dashboard')}
              className="text-zinc-500 hover:text-white text-sm transition-colors underline underline-offset-4"
            >
              Skip for now, I&apos;ll do this later
            </button>
            <p className="text-zinc-600 text-xs mt-2">
              You can complete KYC anytime from your dashboard
            </p>
          </div>
        )}

        {/* Security Badge */}
        <div
          className="flex items-center justify-center gap-2 mt-12"
          style={{ opacity: 0, animation: 'fadeInUp 0.5s ease-out 0.4s forwards' }}
        >
          <svg className="w-4 h-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-zinc-600 text-xs">256-bit encryption</span>
        </div>
      </main>
    </div>
  );
}

export default function KYCPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-gold border-t-transparent rounded-full" />
      </div>
    }>
      <KYCContent />
    </Suspense>
  );
}
