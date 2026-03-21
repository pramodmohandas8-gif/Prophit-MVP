'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/propertyData';
import { generateUPILink, UPI_CONFIG } from '@/types/transaction';
import { cn } from '@/lib/utils';

interface UPIPaymentProps {
  amount: number;
  reference: string;
  onConfirm: () => void;
  isLoading: boolean;
}

export function UPIPayment({ amount, reference, onConfirm, isLoading }: UPIPaymentProps) {
  const [copied, setCopied] = useState(false);
  const upiLink = generateUPILink(amount, reference);

  const handleCopyUPI = async () => {
    try {
      await navigator.clipboard.writeText(UPI_CONFIG.vpa);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleOpenUPI = () => {
    window.location.href = upiLink;
  };

  return (
    <div className="space-y-6">
      {/* QR Code */}
      <div className="flex flex-col items-center">
        <div className="bg-white p-4 rounded-xl">
          <QRCodeSVG
            value={upiLink}
            size={180}
            level="H"
            includeMargin={false}
          />
        </div>
        <p className="text-text-muted text-xs mt-3">
          Scan with any UPI app
        </p>
      </div>

      {/* Amount Display */}
      <div className="bg-bg-elevated rounded-xl p-4 text-center border border-gold/10">
        <p className="text-text-muted text-sm">Amount to pay</p>
        <p className="text-gold text-2xl font-semibold heading-luxury mt-1">
          {formatPrice(amount)}
        </p>
      </div>

      {/* UPI ID */}
      <div className="bg-bg-card rounded-xl p-4 border border-gold/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text-muted text-xs mb-1">UPI ID</p>
            <p className="text-white font-mono text-sm">{UPI_CONFIG.vpa}</p>
          </div>
          <button
            onClick={handleCopyUPI}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
              copied
                ? 'bg-success/20 text-success'
                : 'bg-gold/10 text-gold hover:bg-gold/20'
            )}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Reference */}
      <div className="bg-bg-card rounded-xl p-4 border border-gold/10">
        <p className="text-text-muted text-xs mb-1">Payment Reference</p>
        <p className="text-text-secondary font-mono text-xs break-all">{reference}</p>
      </div>

      {/* Deep Link Button */}
      <Button
        variant="outline"
        size="lg"
        className="w-full border-gold/20 text-gold hover:bg-gold/10"
        onClick={handleOpenUPI}
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
        Open UPI App
      </Button>

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
          "I've Completed the Payment"
        )}
      </Button>
    </div>
  );
}
