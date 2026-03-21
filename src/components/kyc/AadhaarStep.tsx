'use client';

import { useState } from 'react';
import { useKYC } from '@/context/KYCContext';
import { useFlow } from '@/context/FlowContext';
import { VerificationCard } from './VerificationCard';

// Mock DigiLocker response
function mockDigiLockerVerification(userName: string): Promise<{
  name: string;
  maskedNumber: string;
  verifiedAt: string;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: userName || 'Verified User',
        maskedNumber: 'XXXX XXXX ' + Math.floor(1000 + Math.random() * 9000),
        verifiedAt: new Date().toISOString(),
      });
    }, 2000);
  });
}

export function AadhaarStep() {
  const { state, verifyAadhaar } = useKYC();
  const { state: flowState } = useFlow();
  const [isVerifying, setIsVerifying] = useState(false);

  const handleConnectDigiLocker = async () => {
    setIsVerifying(true);
    try {
      const result = await mockDigiLockerVerification(flowState.displayName || '');
      verifyAadhaar(result);
    } catch (error) {
      console.error('DigiLocker verification failed:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  // If already verified, show verified state
  if (state.aadhaarVerified && state.aadhaarData) {
    return (
      <VerificationCard
        title="Aadhaar Verified"
        verified
        verifiedData={[
          { label: 'Name', value: state.aadhaarData.name },
          { label: 'Aadhaar', value: state.aadhaarData.maskedNumber },
          {
            label: 'Verified',
            value: new Date(state.aadhaarData.verifiedAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ]}
      />
    );
  }

  return (
    <div className="bg-[#0c0c0c] border border-white/[0.06] rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
          <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div>
          <h3 className="text-white text-base font-medium mb-1">Verify Aadhaar via DigiLocker</h3>
          <p className="text-zinc-500 text-sm leading-relaxed">
            We use DigiLocker for secure Aadhaar verification. No documents will be stored on our servers.
          </p>
        </div>
      </div>

      {/* DigiLocker Info */}
      <div className="bg-white/[0.02] rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-zinc-300 text-sm font-medium">DigiLocker</span>
        </div>
        <ul className="space-y-2 text-zinc-500 text-xs">
          <li className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            Government of India initiative
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            Secure document verification
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            No physical documents required
          </li>
        </ul>
      </div>

      {/* Connect Button */}
      <button
        onClick={handleConnectDigiLocker}
        disabled={isVerifying}
        className="w-full py-3.5 rounded-xl font-medium text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        style={{
          background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.9), rgba(178, 144, 70, 0.9))',
          color: '#0a0a0a',
        }}
      >
        {isVerifying ? (
          <>
            <div className="w-4 h-4 border-2 border-[#0a0a0a]/30 border-t-[#0a0a0a] rounded-full animate-spin" />
            Connecting to DigiLocker...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Connect DigiLocker
          </>
        )}
      </button>
    </div>
  );
}
