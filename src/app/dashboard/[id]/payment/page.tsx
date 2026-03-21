'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useFlow } from '@/context/FlowContext';
import { useTransaction } from '@/context/TransactionContext';
import { getPropertyById, formatPrice } from '@/lib/propertyData';
import { PaymentVerificationResponse } from '@/types/transaction';
import { CountdownTimer } from '@/components/transaction/CountdownTimer';
import { PaymentMethodCard } from '@/components/transaction/PaymentMethodCard';
import { UPIPayment } from '@/components/transaction/UPIPayment';
import { NEFTPayment } from '@/components/transaction/NEFTPayment';

export default function PaymentPage() {
  const router = useRouter();
  const params = useParams();
  const { state: flowState } = useFlow();
  const { state, setPaymentMethod, setTransactionResult, reset } = useTransaction();
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const propertyId = params.id as string;
  const property = getPropertyById(propertyId);

  // Prevent hydration mismatch by waiting for client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auth guard
  useEffect(() => {
    if (!flowState.displayName || !flowState.isVerified) {
      router.replace('/');
      return;
    }
  }, [flowState.displayName, flowState.isVerified, router]);

  // Transaction guard - redirect if no active transaction
  useEffect(() => {
    if (state.status !== 'locked' || state.propertyId !== propertyId) {
      router.replace(`/dashboard/${propertyId}`);
    }
  }, [state.status, state.propertyId, propertyId, router]);

  // Handle timer expiry
  const handleExpire = useCallback(() => {
    reset();
    router.replace(`/dashboard/${propertyId}`);
  }, [reset, router, propertyId]);

  // Handle payment confirmation
  const handleConfirmPayment = async () => {
    if (!state.paymentMethod || isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: state.propertyId,
          paymentMethod: state.paymentMethod,
          amount: state.totalAmount,
          reference: state.paymentReference,
          units: state.units,
        }),
      });

      const data: PaymentVerificationResponse = await response.json();

      if (response.ok) {
        setTransactionResult(data.status as 'success' | 'pending' | 'failed', data.transactionId);
        router.push(`/dashboard/${propertyId}/confirmation`);
      } else {
        console.error('Payment verification failed');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setIsLoading(false);
    }
  };

  // Early return if not mounted, no property, or no active transaction
  if (!mounted || !property || state.status !== 'locked') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-gold border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-bg-primary/80 backdrop-blur-xl border-b border-gold/5">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                reset();
                router.back();
              }}
              className="p-2 -ml-2 text-text-muted hover:text-white transition-colors"
              aria-label="Go back"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-white font-medium">Payment</h1>
            <div className="w-9" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Timer */}
        {state.lockExpiresAt && (
          <div className="flex justify-center">
            <CountdownTimer
              expiresAt={state.lockExpiresAt}
              onExpire={handleExpire}
            />
          </div>
        )}

        {/* Order Summary */}
        <div className="bg-bg-card rounded-2xl p-4 border border-gold/10">
          <p className="text-text-muted text-xs mb-2">Order Summary</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium text-sm">{property.title}</p>
              <p className="text-text-muted text-xs mt-0.5">
                {state.units} {state.units === 1 ? 'unit' : 'units'} × {formatPrice(state.unitPrice)}
              </p>
            </div>
            <p className="text-gold font-semibold heading-luxury">
              {formatPrice(state.totalAmount)}
            </p>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <p className="text-text-muted text-xs mb-3">Select Payment Method</p>
          <div className="space-y-3">
            <PaymentMethodCard
              title="UPI"
              description="Pay instantly via any UPI app"
              selected={state.paymentMethod === 'UPI'}
              onSelect={() => setPaymentMethod('UPI')}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              }
            />
            <PaymentMethodCard
              title="Bank Transfer"
              description="NEFT / RTGS / IMPS"
              selected={state.paymentMethod === 'NEFT'}
              onSelect={() => setPaymentMethod('NEFT')}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
            />
          </div>
        </div>

        {/* Payment Details */}
        {state.paymentMethod && (
          <div className="animate-fade-in-up">
            {state.paymentMethod === 'UPI' ? (
              <UPIPayment
                amount={state.totalAmount}
                reference={state.paymentReference}
                onConfirm={handleConfirmPayment}
                isLoading={isLoading}
              />
            ) : (
              <NEFTPayment
                amount={state.totalAmount}
                reference={state.paymentReference}
                onConfirm={handleConfirmPayment}
                isLoading={isLoading}
              />
            )}
          </div>
        )}

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-text-muted text-xs">Secured by bank-grade encryption</span>
        </div>
      </main>
    </div>
  );
}
