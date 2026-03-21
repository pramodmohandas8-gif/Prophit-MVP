'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useKYC } from '@/context/KYCContext';

interface KYCState {
  aadhaarVerified: boolean;
  panVerified: boolean;
  kycCompleted: boolean;
  aadhaarData: {
    name: string;
    maskedNumber: string;
    verifiedAt: string;
  } | null;
  panData: {
    number: string;
    name: string;
    verifiedAt: string;
  } | null;
}

interface IdentityCardProps {
  name: string;
  phone: string;
  kycState: KYCState;
}

export function IdentityCard({ name, phone, kycState }: IdentityCardProps) {
  const router = useRouter();
  const { setReturnUrl } = useKYC();
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');

  const handleCompleteKYC = () => {
    setReturnUrl('/profile');
    router.push('/kyc');
  };

  // Mock email/city - in production would come from user profile
  const displayEmail = email || 'Add email address';
  const displayCity = city || 'Add city';

  const handleSave = () => {
    setIsEditing(false);
    // In production, save to backend
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-[#0c0c0c] border border-white/[0.06] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/[0.04]">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-lg font-medium">Identity & Verification</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="text-gold text-sm hover:text-gold/80 transition-colors"
            >
              Edit
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="text-zinc-500 text-sm hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="text-gold text-sm hover:text-gold/80 transition-colors"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contact Details */}
      <div className="p-6 space-y-5">
        {/* Full Name - Read Only */}
        <div>
          <label className="text-zinc-500 text-xs uppercase tracking-wider block mb-2">
            Full Name
          </label>
          <p className="text-white text-sm">{name}</p>
        </div>

        {/* Email */}
        <div>
          <label className="text-zinc-500 text-xs uppercase tracking-wider block mb-2">
            Email
          </label>
          {isEditing ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-gold/30 transition-colors"
            />
          ) : (
            <p className={`text-sm ${email ? 'text-white' : 'text-zinc-600'}`}>
              {displayEmail}
            </p>
          )}
        </div>

        {/* Mobile - Read Only */}
        <div>
          <label className="text-zinc-500 text-xs uppercase tracking-wider block mb-2">
            Mobile
          </label>
          <p className="text-white text-sm">+91 {phone}</p>
        </div>

        {/* City */}
        <div>
          <label className="text-zinc-500 text-xs uppercase tracking-wider block mb-2">
            City
          </label>
          {isEditing ? (
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-gold/30 transition-colors"
            />
          ) : (
            <p className={`text-sm ${city ? 'text-white' : 'text-zinc-600'}`}>
              {displayCity}
            </p>
          )}
        </div>
      </div>

      {/* KYC Status */}
      <div className="p-6 bg-white/[0.02] border-t border-white/[0.04]">
        <label className="text-zinc-500 text-xs uppercase tracking-wider block mb-4">
          Verification Status
        </label>

        <div className="flex flex-wrap gap-3 mb-4">
          {/* Aadhaar Badge */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
              kycState.aadhaarVerified
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-zinc-800/50 text-zinc-500 border border-zinc-700/50'
            }`}
          >
            {kycState.aadhaarVerified ? (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01" />
              </svg>
            )}
            Aadhaar {kycState.aadhaarVerified ? 'Verified' : 'Pending'}
          </div>

          {/* PAN Badge */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
              kycState.panVerified
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-zinc-800/50 text-zinc-500 border border-zinc-700/50'
            }`}
          >
            {kycState.panVerified ? (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01" />
              </svg>
            )}
            PAN {kycState.panVerified ? 'Verified' : 'Pending'}
          </div>

          {/* KYC Complete Badge */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
              kycState.kycCompleted
                ? 'bg-gold/10 text-gold border border-gold/20'
                : 'bg-zinc-800/50 text-zinc-500 border border-zinc-700/50'
            }`}
          >
            {kycState.kycCompleted ? (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01" />
              </svg>
            )}
            KYC {kycState.kycCompleted ? 'Complete' : 'Incomplete'}
          </div>
        </div>

        {/* Verification Date */}
        {kycState.kycCompleted && kycState.panData?.verifiedAt && (
          <p className="text-zinc-600 text-xs">
            Verified on {formatDate(kycState.panData.verifiedAt)}
          </p>
        )}

        {/* Complete KYC CTA */}
        {!kycState.kycCompleted && (
          <button
            onClick={handleCompleteKYC}
            className="inline-flex items-center gap-2 mt-2 text-gold text-sm hover:text-gold/80 transition-colors"
          >
            Complete Verification
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
