'use client';

import { useState, useEffect } from 'react';
import { useKYC } from '@/context/KYCContext';
import { VerificationCard } from './VerificationCard';

// PAN validation regex
const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

// Mock PAN verification
function mockPANVerification(
  pan: string,
  name: string
): Promise<{ success: boolean; name: string; number: string; verifiedAt: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate 90% success rate
      if (Math.random() > 0.1) {
        resolve({
          success: true,
          name: name.toUpperCase(),
          number: pan,
          verifiedAt: new Date().toISOString(),
        });
      } else {
        reject(new Error('PAN verification failed. Please try again.'));
      }
    }, 1500);
  });
}

export function PANStep() {
  const { state, verifyPAN } = useKYC();
  const [panNumber, setPanNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  // Pre-fill name from Aadhaar if available
  useEffect(() => {
    if (state.aadhaarData?.name) {
      setFullName(state.aadhaarData.name);
    }
  }, [state.aadhaarData]);

  const handlePANChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (value.length <= 10) {
      setPanNumber(value);
      setError('');
    }
  };

  const handleVerify = async () => {
    // Validate PAN format
    if (!PAN_REGEX.test(panNumber)) {
      setError('Please enter a valid PAN number');
      return;
    }

    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      const result = await mockPANVerification(panNumber, fullName);
      verifyPAN({
        number: result.number,
        name: result.name,
        verifiedAt: result.verifiedAt,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setIsVerifying(false);
    }
  };

  // If already verified, show verified state
  if (state.panVerified && state.panData) {
    return (
      <VerificationCard
        title="PAN Verified"
        verified
        verifiedData={[
          { label: 'Name', value: state.panData.name },
          { label: 'PAN', value: state.panData.number },
          {
            label: 'Verified',
            value: new Date(state.panData.verifiedAt).toLocaleDateString('en-IN', {
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

  const isPANValid = PAN_REGEX.test(panNumber);

  return (
    <div className="bg-[#0c0c0c] border border-white/[0.06] rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
          <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
          </svg>
        </div>
        <div>
          <h3 className="text-white text-base font-medium mb-1">Verify PAN</h3>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Enter your PAN details for verification. This helps us comply with regulatory requirements.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        {/* PAN Number Input */}
        <div>
          <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">
            PAN Number
          </label>
          <div className="relative">
            <input
              type="text"
              value={panNumber}
              onChange={handlePANChange}
              placeholder="ABCDE1234F"
              className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-gold/30 transition-colors uppercase tracking-widest font-mono"
              maxLength={10}
            />
            {isPANValid && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Full Name Input */}
        <div>
          <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">
            Full Name (as on PAN)
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              setError('');
            }}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-gold/30 transition-colors"
          />
          {state.aadhaarData?.name && (
            <p className="text-zinc-600 text-xs mt-1.5">
              Auto-filled from Aadhaar verification
            </p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-amber-400 text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
          </p>
        )}
      </div>

      {/* Verify Button */}
      <button
        onClick={handleVerify}
        disabled={isVerifying || !isPANValid || !fullName.trim()}
        className="w-full mt-6 py-3.5 rounded-xl font-medium text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        style={{
          background: isPANValid && fullName.trim()
            ? 'linear-gradient(135deg, rgba(201, 169, 98, 0.9), rgba(178, 144, 70, 0.9))'
            : 'rgba(255, 255, 255, 0.05)',
          color: isPANValid && fullName.trim() ? '#0a0a0a' : '#71717a',
        }}
      >
        {isVerifying ? (
          <>
            <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
            Verifying...
          </>
        ) : (
          'Verify PAN'
        )}
      </button>
    </div>
  );
}
