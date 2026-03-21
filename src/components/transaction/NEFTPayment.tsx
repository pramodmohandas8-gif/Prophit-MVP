'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/propertyData';
import { SPV_BANK_DETAILS } from '@/types/transaction';
import { cn } from '@/lib/utils';

interface NEFTPaymentProps {
  amount: number;
  reference: string;
  onConfirm: () => void;
  isLoading: boolean;
}

interface CopyButtonProps {
  value: string;
  label: string;
}

function CopyField({ value, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-gold/5 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-text-muted text-xs mb-0.5">{label}</p>
        <p className="text-white text-sm font-mono truncate">{value}</p>
      </div>
      <button
        onClick={handleCopy}
        className={cn(
          'px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200 ml-3 flex-shrink-0',
          copied
            ? 'bg-success/20 text-success'
            : 'bg-gold/10 text-gold hover:bg-gold/20'
        )}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}

export function NEFTPayment({ amount, reference, onConfirm, isLoading }: NEFTPaymentProps) {
  return (
    <div className="space-y-6">
      {/* Amount Display */}
      <div className="bg-bg-elevated rounded-xl p-4 text-center border border-gold/10">
        <p className="text-text-muted text-sm">Amount to transfer</p>
        <p className="text-gold text-2xl font-semibold heading-luxury mt-1">
          {formatPrice(amount)}
        </p>
      </div>

      {/* Bank Details Card */}
      <div className="bg-bg-card rounded-xl p-4 border border-gold/10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <p className="text-white font-medium">Bank Transfer Details</p>
        </div>

        <div className="space-y-0">
          <CopyField label="Account Name" value={SPV_BANK_DETAILS.accountName} />
          <CopyField label="Bank Name" value={SPV_BANK_DETAILS.bankName} />
          <CopyField label="Account Number" value={SPV_BANK_DETAILS.accountNumber} />
          <CopyField label="IFSC Code" value={SPV_BANK_DETAILS.ifscCode} />
        </div>
      </div>

      {/* Reference - Important */}
      <div className="bg-gold/5 rounded-xl p-4 border border-gold/20">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-gold text-sm font-medium mb-1">Important: Use this reference</p>
            <p className="text-text-secondary text-xs mb-2">
              Add this reference in your transfer remarks for quick verification
            </p>
            <div className="bg-bg-card rounded-lg p-2">
              <p className="font-mono text-xs text-white break-all">{reference}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Transfer Instructions */}
      <div className="bg-bg-card rounded-xl p-4 border border-gold/10">
        <p className="text-text-muted text-xs mb-3">Transfer via</p>
        <div className="flex gap-2">
          {['NEFT', 'RTGS', 'IMPS'].map((method) => (
            <span
              key={method}
              className="px-3 py-1.5 rounded-lg bg-bg-elevated text-text-secondary text-xs font-medium"
            >
              {method}
            </span>
          ))}
        </div>
      </div>

      {/* Confirm Button */}
      <Button
        variant="luxury"
        size="lg"
        className="w-full"
        onClick={onConfirm}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Verifying...
          </span>
        ) : (
          "I've Initiated the Transfer"
        )}
      </Button>

      {/* Note */}
      <p className="text-text-muted text-xs text-center">
        Bank transfers usually take 1-2 business days to verify
      </p>
    </div>
  );
}
