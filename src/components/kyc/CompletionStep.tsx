'use client';

import { useRouter } from 'next/navigation';
import { useKYC } from '@/context/KYCContext';

export function CompletionStep() {
  const router = useRouter();
  const { state, getReturnUrl, clearReturnUrl } = useKYC();

  const handleProceed = () => {
    const returnUrl = getReturnUrl();
    clearReturnUrl();
    router.push(returnUrl || '/dashboard');
  };

  return (
    <div className="bg-[#0c0c0c] border border-emerald-500/20 rounded-2xl p-8 text-center">
      {/* Success Icon */}
      <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      {/* Title */}
      <h3 className="text-white text-xl font-medium mb-2">KYC Completed</h3>
      <p className="text-zinc-500 text-sm mb-8">
        Your identity has been verified successfully. You can now participate in opportunities.
      </p>

      {/* Verification Summary */}
      <div className="space-y-3 mb-8">
        {/* Aadhaar */}
        <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-white text-sm font-medium">Aadhaar Verified</p>
              <p className="text-zinc-500 text-xs">{state.aadhaarData?.maskedNumber}</p>
            </div>
          </div>
          <span className="text-emerald-400 text-xs">Verified</span>
        </div>

        {/* PAN */}
        <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-white text-sm font-medium">PAN Verified</p>
              <p className="text-zinc-500 text-xs">{state.panData?.number}</p>
            </div>
          </div>
          <span className="text-emerald-400 text-xs">Verified</span>
        </div>
      </div>

      {/* Proceed Button */}
      <button
        onClick={handleProceed}
        className="w-full py-3.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2"
        style={{
          background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.9), rgba(178, 144, 70, 0.9))',
          color: '#0a0a0a',
        }}
      >
        Proceed to Participation
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>

      {/* Note */}
      <p className="text-zinc-600 text-xs mt-6">
        Your KYC details are securely stored and encrypted
      </p>
    </div>
  );
}
